import { AxiosInstance } from "axios";

import http from "./axiosCommon";
import { User, UserLoginDto } from "../common/interface/dto/auth.dto";

export class AuthAPI {
        constructor(private readonly apiCall: AxiosInstance, readonly prefix: string) {}

        async loginUser(input: UserLoginDto) {
                const url = `${this.prefix + "/login"}`;
                const res = await this.apiCall.post(url, input);
                return res;
        }

        async getUserInfo() {
                const url = `${this.prefix + "/"}`;
                const res = await this.apiCall.get<User>(url);
                return res;
        }
}

export const authApi = new AuthAPI(http, "/auth");
export default authApi;
