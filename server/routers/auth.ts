import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { getDb } from "../app/db";
import { joiValidator } from "../middleware/joiValidator";
import { UserDto } from "../modules/user/dto";
import { User } from "../modules/user";
import { auth } from "../middleware/auth";
import { ObjectId } from "mongodb";

import _ from "lodash";

const router = express.Router();

const loginSchema = Joi.object({
        username: Joi.string().alphanum().min(8).max(40).required(),
        password: Joi.string().alphanum().min(8).max(40).required(),
});

const registerSchema = Joi.object({
        username: Joi.string().alphanum().min(8).max(40).required(),
        password: Joi.string().alphanum().min(8).max(40).required(),
        confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
        fullname: Joi.string().min(8).max(40).required(),
        email: Joi.string().email().required(),
});

interface LoginDto {
        username: string;
        password: string;
}

router.post("/login", joiValidator(loginSchema), async (req, res) => {
        const db = getDb();
        const { username, password } = req.body as LoginDto;
        const user = (await db?.collection("users").findOne({ username })) as UserDto | undefined;

        if (!user) return res.status(404).send("Username or password invalid");
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(404).send("Username or password invalid");
        const token = new User(user.username, user.password, user.fullname, user.email, user._id).generateAuthToken();
        res.cookie("x-auth-token", token, { maxAge: 900000 });
        res.status(200).send("Login successfully");
});

router.post("/register", joiValidator(registerSchema), async (req, res) => {
        const { username, password, email, fullname } = req.body as UserDto;
        const db = getDb();

        let user = (await db?.collection("users").findOne({ username })) as UserDto | undefined;
        if (user) return res.status(400).send("This username already register");

        const salt = await bcrypt.genSalt(10);

        const newUser = await getDb()
                ?.collection("users")
                .insertOne({ username: username, password: bcrypt.hashSync(password, salt), fullname: fullname, email: email });

        if (!newUser) return res.status(400).send("Register failed");

        res.status(200).send("Register successfully");
});

router.get("/", auth, async (req, res) => {
        const { _id } = req.user as { _id: string };

        const user = await getDb()
                ?.collection("users")
                .findOne({ _id: new ObjectId(_id) });
        if (!user) return res.status(404).send("User not found");
        res.send(_.pick(user, ["username", "fullname", "email"]));
});

export default router;
