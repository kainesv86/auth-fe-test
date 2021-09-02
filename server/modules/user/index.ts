import jwt, { Secret } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { UserDto } from "./dto";

export class User implements UserDto {
        _id: string;
        username: string;
        password: string;
        fullname: string;
        email: string;

        constructor(username: string, password: string, fullname: string, email: string, _id?: string) {
                this.username = username;
                this.password = password;
                this.fullname = fullname;
                this.email = email;
                this._id = _id || "";
        }

        generateAuthToken = () => {
                return jwt.sign({ _id: this._id }, process.env.jwtPrivateKey as Secret);
        };
}
