import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserLoginDto, User } from "../../common/interface/dto/auth.dto";
import { AuthAPI, authApi } from "../../api/authApi";

class AuthThunk {
        constructor(private readonly apiCall: AuthAPI) {}

        loginUser = createAsyncThunk<null, UserLoginDto>("UserLoginDto", async (input) => {
                await this.apiCall.loginUser(input);
                return null;
        });

        getUserInfo = createAsyncThunk<User, void>("UserInfoDto", async () => {
                const res = await this.apiCall.getUserInfo();
                return res.data;
        });
}

export const authThunk = new AuthThunk(authApi);
export default authThunk;
