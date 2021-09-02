import express from "express";
import Joi from "joi";
import { getDb } from "../app/db";
import { joiValidator } from "../middleware/joiValidator";
import { auth } from "../middleware/auth";

import bcrypt from "bcrypt";
import _ from "lodash";

import { User } from "../modules/user";
import { UserDto } from "../modules/user/dto";
import { ObjectId } from "mongodb";

const router = express.Router();

const registerSchema = Joi.object({
        username: Joi.string().alphanum().min(8).max(40).required(),
        password: Joi.string().alphanum().min(8).max(40).required(),
        confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
        fullname: Joi.string().min(8).max(40).required(),
        email: Joi.string().email().required(),
});

router.get("/", auth, async (req, res) => {
        const { _id } = req.user as { _id: string };

        const user = await getDb()
                ?.collection("users")
                .findOne({ _id: new ObjectId(_id) });
        if (!user) return res.status(404).send("User not found");
        res.send(_.pick(user, ["username", "fullname", "email"]));
});

router.post("/", joiValidator(registerSchema), async (req, res) => {
        const { username, password, email, fullname } = req.body as UserDto;
        const db = getDb();

        let user = await db?.collection("users").findOne({ username });
        if (user) return res.status(400).send("This username already register");

        const salt = await bcrypt.genSalt(10);

        user = new User(username, bcrypt.hashSync(password, salt), fullname, email);

        await getDb()?.collection("users").insertOne(user);
        res.status(200).send(user);
});

export default router;
