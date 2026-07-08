import { LoginResponse } from "./types";

interface ErrorBase {
    status: number;
}

export interface GeneralError extends ErrorBase {
    error: string;
}

export interface FieldError extends ErrorBase {
    error: {
        [field: string]: string[];
    };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

export const isLoginResponse = (response: unknown): response is LoginResponse =>
    isRecord(response) && isRecord(response.account) && typeof response.token === "string";

export const isGeneralError = (error: unknown): error is GeneralError =>
    isRecord(error) && typeof error.error === "string";

export const isFieldError = (error: unknown): error is FieldError =>
    isRecord(error) && isRecord(error.error) && !Array.isArray(error.error);

export const parseError = (error: unknown): GeneralError | FieldError => {
    if (isGeneralError(error) || isFieldError(error)) {
        return error;
    }
    return {
        status: 500,
        error: "Unknown error structure",
    };
};
