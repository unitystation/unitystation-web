import {FieldError, GeneralError} from "./guards";

export interface AccountPublicData {
    unique_identifier: string;
    username: string;
    legacy_id?: string;
    is_verified: boolean;
}

export interface LoginResponse {
    account: AccountPublicData;
    token: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    authContext?: LoginResponse;
    error?: GeneralError | FieldError;
}

export interface AuthContext {
    state: AuthState;
    credentialsLogin: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}