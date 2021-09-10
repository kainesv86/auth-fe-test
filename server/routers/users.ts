import express from "express";
import { getDb } from "../app/db";
import { auth } from "../middleware/auth";

import _ from "lodash";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", auth, async (req, res) => {
        const { _id } = req.user as { _id: string };

        const user = await getDb()
                ?.collection("users")
                .findOne({ _id: new ObjectId(_id) });
        if (!user) return res.status(404).send("User not found");
        res.send(_.pick(user, ["username", "fullname", "email"]));
});

export default router;
