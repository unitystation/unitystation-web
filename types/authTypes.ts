import {FieldError, GeneralError} from "../lib/errors";

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

export interface AuthContext {
    isLoggedIn: boolean;
    authContext?: LoginResponse;
    error?: GeneralError | FieldError;
    revalidateAuth: () => void;
}