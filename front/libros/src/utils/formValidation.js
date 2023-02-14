import * as Yup from "yup";

export const EMAIL_REQUIRED = "Email is required.";
export const EMAIL_FORMAT = "Invalid email.";
export const EMAIL_TYPE = "Email must contain only alphabets characters.";
export const NAME_REQUIRED = "Name is required.";
export const NAME_TYPE = "Name must contain only alphabets characters.";
export const USERNAME_REQUIRED = "Username is required.";
export const USERNAME_TYPE = "Username must be at string format.";
export const PASSWORD_REQUIRED = "Password is required.";
export const PASSWORD_TYPE = "Password must be at string format.";
export const PASSWORD_MIN = "The password must contain a min of 7 characters.";
export const PASSWORD_MAX = "The password must contain a max of 14 characters.";
export const PASSWORD_CONFIRM_REQUIRED = "Please confirm your password";
export const PASSWORD_MATCH = "The passwords do not match.";

export const initialValues = {
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

export const valuesSchema = {
    username: Yup
        .string(USERNAME_TYPE)
        .required(USERNAME_REQUIRED),
    name: Yup
        .string(NAME_TYPE)
        .required(NAME_REQUIRED),
    email: Yup
        .string(EMAIL_TYPE)
        .email(EMAIL_FORMAT)
        .required(EMAIL_REQUIRED),
    password: Yup
        .string(PASSWORD_TYPE)
        .required(PASSWORD_REQUIRED)
        .min(7, PASSWORD_MIN)
        .max(14, PASSWORD_MAX),
    confirmPassword: Yup
        .string()
        .required(PASSWORD_CONFIRM_REQUIRED)
        .min(7, PASSWORD_MIN)
        .max(14, PASSWORD_MAX)
        .oneOf([Yup.ref('password'), null], PASSWORD_MATCH),
}

export const formSchema = (valuesSchema) => {
    return Yup.object().shape(valuesSchema);
}