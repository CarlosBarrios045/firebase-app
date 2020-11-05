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
  password: Yup.string().required(required),
})

export default function useValidations() {
  return { SignupSchema }
}
