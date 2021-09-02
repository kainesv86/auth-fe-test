import * as React from "react";

import { Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AuthState } from "../interface/dto/auth.dto";

export interface AuthRouteProps {}

const AuthRoute: React.FunctionComponent<AuthRouteProps> = ({ children }) => {
        const authState = useSelector<RootState, AuthState>((item) => item.auth);

        if (!authState.isLogin) return <Redirect to="/login" />;

        return <>{children}</>;
};

export default AuthRoute;
