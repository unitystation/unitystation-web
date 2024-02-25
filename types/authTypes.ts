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

export interface LoginWithCredentialsRequest {
    email: string;
    password: string;
}

export interface AuthContext {
    isLoggedIn: boolean;
    account?: AccountPublicData;
    encryptedToken?: string;
}