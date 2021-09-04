export interface User {
        username: string;
        fullname: string;
        email: string;
}

export interface AuthState extends User {
        isLogin: boolean;
}

export interface UserLoginDto {
        username: string;
        password: string;
}

export interface UserRegisterDto {
        fullname: string;
        username: string;
        password: string;
        confirmPassword: string;
        email: string;
}
