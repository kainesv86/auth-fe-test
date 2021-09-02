import * as React from "react";
import { Link } from "react-router-dom";

export interface NavBarProps {}

const NavBar: React.FunctionComponent<NavBarProps> = () => {
        return (
                <div className="bg-blue-400 p-4">
                        <button className="py-1 px-2 bg-white border-2 border-gray-800 rounded mr-2">
                                <Link to="/">Home</Link>
                        </button>
                        <button className="py-1 px-2 bg-white border-2 border-gray-800 rounded mr-2">
                                <Link to="/login">Login</Link>
                        </button>
                        <button className="py-1 px-2 bg-white border-2 border-gray-800 rounded ">
                                <Link to="/register">Register</Link>
                        </button>
                </div>
        );
};

export default NavBar;
