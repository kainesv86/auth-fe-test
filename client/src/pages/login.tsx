import * as React from "react";
import { useForm } from "react-hook-form";
import { UserLoginDto } from "../common/interface/dto/auth.dto";
import { store } from "../store";
import { authThunk } from "../store/auth/thunk";

export interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
        const { register, handleSubmit } = useForm<UserLoginDto>();
        const onSubmit = (data: UserLoginDto) => {
                store.dispatch(authThunk.loginUser(data));
        };
        return (
                <div className="flex flex-col justify-center items-center">
                        <h1 className="text-gray-800 text-4xl">Login</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col border-gray-800 rounded p-4 border-2 bg-gray-500 text-white">
                                        <div className="mb-2">
                                                <p>Username</p>
                                                <input type="text" className="text-gray-900" {...register("username")} />
                                        </div>
                                        <div className="mb-2">
                                                <p>password</p>
                                                <input type="password" className="text-gray-900" {...register("password")} />
                                        </div>
                                        <button className="py-1 px-2 border-gray-100 border-2" type="submit">
                                                Login
                                        </button>
                                </div>
                        </form>
                </div>
        );
};

export default Login;
