import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthState } from "../../common/interface/dto/auth.dto";
import { RootState, store } from "../../store";
import authThunk from "../../store/auth/thunk";

export interface NavBarProps {}

const NavBar: React.FunctionComponent<NavBarProps> = () => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);

        const handleOnClick = () => {
                store.dispatch(authThunk.logoutUser());
        };

        return (
                <div className="bg-blue-400 p-4">
                        <button className="py-1 px-2 bg-white border-2 border-gray-800 rounded mr-2">
                                <Link to="/">Home</Link>
                        </button>
                        {authState.isLogin ? (
                                <button className="py-1 px-2 bg-white border-2 border-gray-800 rounded" onClick={() => handleOnClick()}>
                                        Logout
                                </button>
                        ) : (
                                <>
                                        <button className="py-1 px-2 bg-white border-2 border-gray-800 rounded mr-2">
                                                <Link to="/login">Login</Link>
                                        </button>
                                        <button className="py-1 px-2 bg-white border-2 border-gray-800 rounded mr-2">
                                                <Link to="/register">Register</Link>
                                        </button>
                                </>
                        )}
                </div>
        );
};

export default NavBar;
