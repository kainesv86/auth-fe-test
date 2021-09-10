import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../common/interface/dto/auth.dto";
import { authThunk } from "./thunk";

const initialState: AuthState = {
        username: "",
        fullname: "",
        email: "",
        isLogin: false,
};

const auth = createSlice({
        name: "auth",
        initialState,
        reducers: {
                resetAuth: () => {
                        return initialState;
                },
        },
        extraReducers: (builder) => {
                builder.addCase(authThunk.loginUser.fulfilled, (state) => ({ ...state, isLogin: true }));
                builder.addCase(authThunk.registerUser.fulfilled, (state) => ({ ...state, isLogin: true }));
                builder.addCase(authThunk.getUserInfo.fulfilled, (state, { payload }) => {
                        const newState = { ...state };
                        newState.email = payload.email;
                        newState.fullname = payload.fullname;
                        newState.username = payload.username;
                        newState.isLogin = true;
                        return newState;
                });
                builder.addCase(authThunk.logoutUser.fulfilled, (state) => ({ ...state, initialState }));
        },
});

export const authActions = { ...auth.actions };

export const authReducer = auth.reducer;
