import { useEffect } from "react";

import { Route, Switch } from "react-router-dom";

import Footer from "./components/footer/";
import Navbar from "./components/navbar/";
import Login from "./pages/login";
import Register from "./pages/register";

import { RootState, store } from "./store";

import AuthRoute from "./common/HOC/authRoute";
import { useSelector } from "react-redux";
import { AuthState } from "./common/interface/dto/auth.dto";
import authThunk from "./store/auth/thunk";

import Cookies from "universal-cookie";

function App() {
        const auth = useSelector<RootState, AuthState>((state) => state.auth);

        const cookies = new Cookies();

        useEffect(() => {
                const authToken = cookies.get("x-auth-token");
                if (authToken) store.dispatch(authThunk.getUserInfo());
        }, [auth.isLogin]);

        return (
                <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <div className="flex-1 h-auto">
                                <Switch>
                                        <Route path="/login">
                                                <Login />
                                        </Route>
                                        <Route path="/register">
                                                <Register />
                                        </Route>
                                        <Route path="/">
                                                <div className="text-black text-2xl">
                                                        <p>Info</p>
                                                        <p>{`Email: ${auth.email}`}</p>
                                                        <p>{`Username: ${auth.username}`}</p>
                                                        <p>{`Fullname: ${auth.fullname}`}</p>
                                                        <p>{`isLogin: ${auth.isLogin}`}</p>
                                                </div>
                                        </Route>
                                </Switch>
                        </div>
                        <Footer />
                </div>
        );
}

export default App;
