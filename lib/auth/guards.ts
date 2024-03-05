import {LoginResponse} from "./types";

interface ErrorBase {
    status: number;
}

export interface GeneralError extends ErrorBase{
    error: string;
}

export interface FieldError extends ErrorBase {
    error: {
        [field: string]: string[];
    };
}

export const isLoginResponse = (response: any): response is LoginResponse =>
    response && response.account && typeof response.token === 'string';

export const isGeneralError = (error: any): error is GeneralError =>
    typeof error.error === 'string';

export const isFieldError = (error: any): error is FieldError =>
    typeof error.error === 'object' && !Array.isArray(error.error) && error.error !== null

export const parseError = (error: any) => {
    if (isGeneralError(error)) {
        return error as GeneralError;
    } else if (isFieldError(error)) {
        return error as FieldError;
    } else {
        return {
            status: 500,
            error: 'Unknown error structure'
        } as GeneralError;
    }
};