import * as Yup from "yup"

// SignUp Validation
const required = "Este campo es requerido"
const SignupSchema = Yup.object().shape({
  name: Yup.string().required(required),
  dni: Yup.string()
    .max(11, "Debe contener al menos 11 cáracteres")
    .required(required),
  email: Yup.string()
    .email("No es un correo electrónico válido")
    .required(required),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 cáracteres")
    .max(16, "La contraseña debe tener máximo 16 cáracteres")
    .required(required),
})

export default function useValidations() {
  return { SignupSchema }
}
