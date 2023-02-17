import * as Yup from "yup";

export const EMAIL_REQUIRED = "El email es requerido.";
export const EMAIL_FORMAT = "Email inválido.";
export const EMAIL_TYPE = "Email must contain only alphabets characters.";
export const NAME_REQUIRED = "El nombre es requerido.";
export const NAME_TYPE = "El nombre no puede comer signos ni números.";
export const USERNAME_REQUIRED = "El nombre de usuario es requerido.";
export const USERNAME_TYPE = "Username must be at string format.";
export const PASSWORD_REQUIRED = "La contraseña es requerida.";
export const PASSWORD_TYPE = "Password must be at string format.";
export const PASSWORD_MIN = "La contraseña debe contener un mínimo de 6 caracteres.";
export const PASSWORD_MAX = "La contraseña debe contener un máximo de 14 caracteres.";
export const PASSWORD_CONFIRM_REQUIRED = "Confirma tu contraseña";
export const PASSWORD_MATCH = "Las contraseñas no coinciden.";

export const initialValues = {
    username: "",
    name: "",
    email: "",
    password: "",
    rePassword: "",
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
        .min(6, PASSWORD_MIN)
        .max(14, PASSWORD_MAX),
    rePassword: Yup
        .string()
        .required(PASSWORD_CONFIRM_REQUIRED)
        .min(7, PASSWORD_MIN)
        .max(14, PASSWORD_MAX)
        .oneOf([Yup.ref('password'), null], PASSWORD_MATCH),
}

export const formSchema = (valuesSchema) => {
    return Yup.object().shape(valuesSchema);
}