import * as React from "react";
import { useForm } from "react-hook-form";
import { UserRegisterDto } from "../common/interface/dto/auth.dto";
import { store } from "../store";
import { authThunk } from "../store/auth/thunk";

export interface RegisterProps {}

const Register: React.FunctionComponent<RegisterProps> = () => {
        const { register, handleSubmit } = useForm<UserRegisterDto>();
        const onSubmit = (data: UserRegisterDto) => {
                store.dispatch(authThunk.loginUser(data));
        };
        return (
                <div className="flex flex-col justify-center items-center">
                        <h1 className="text-gray-800 text-4xl">Register</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col border-gray-800 rounded p-4 border-2 bg-gray-500 text-white">
                                        <div className="mb-2">
                                                <p>Username</p>
                                                <input type="text" className="text-gray-900" {...register("username")} />
                                        </div>
                                        <div className="mb-2">
                                                <p>Password</p>
                                                <input type="password" className="text-gray-900" {...register("password")} />
                                        </div>
                                        <div className="mb-2">
                                                <p>Confirm Password</p>
                                                <input type="password" className="text-gray-900" {...register("confirmPassword")} />
                                        </div>
                                        <div className="mb-2">
                                                <p>Email</p>
                                                <input type="text" className="text-gray-900" {...register("email")} />
                                        </div>
                                        <button className="py-1 px-2 border-gray-100 border-2" type="submit">
                                                Register
                                        </button>
                                </div>
                        </form>
                </div>
        );
};

export default Register;
