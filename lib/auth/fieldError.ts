import { FieldError, GeneralError, isFieldError } from "../../lib/auth/guards";

/** Pull one field's validation message out of an API error, if present. */
export function fieldErrorFor(
    error: GeneralError | FieldError | undefined,
    field: string,
): string | undefined {
    if (!error || !isFieldError(error)) return undefined;
    const value = error.error[field];
    if (!value) return undefined;
    return Array.isArray(value) ? value.join(" ") : String(value);
}
