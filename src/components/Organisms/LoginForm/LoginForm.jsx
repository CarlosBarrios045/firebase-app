import { useFormik } from "formik"

// Layout
import { Text, Input, Button, Link, Paper } from "src/components/Atoms"

// Auth
import { useAuth } from "src/lib/auth"

// Validations
import useValidations from "src/hooks/useValidations"
import useValidationsInput from "src/hooks/useValidationsInput"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
  content: {
    height: "100%",
    borderRadius: 0,
    clipPath: "polygon(17% 0, 100% 0%, 100% 100%, 0 100%)",
    paddingLeft: "15%",
    paddingTop: 60,

    [breakpoints.down("sm")]: {
      clipPath: "none",
      padding: "0 6px",
      paddingBottom: 40,
    },
  },
  title: {
    marginTop: 70,
    fontSize: 34,
    textAlign: "center",
    fontWeight: "bold",
  },
  form: {
    padding: "0 35px",
    display: "flex",
    flexDirection: "column",

    [breakpoints.down("sm")]: {
      padding: "0 85px",
    },

    [breakpoints.down("xs")]: {
      padding: "0 15px",
    },
  },
  contentLinks: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 20,
    marginBottom: 16,
    height: 44,
  },
}))

const LoginForm = () => {
  const classes = styles()

  // Validations
  const { SignInSchema } = useValidations()
  const { funcIsError, funcIsTextError } = useValidationsInput()

  // Func SignUp
  const { signinWithEmail } = useAuth()

  const {
    handleSubmit,
    errors,
    values,
    handleChange,
    touched,
    setErrors,
  } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      const { success } = await signinWithEmail(values)
      if (!success) {
        setErrors({
          password: "El correo electrónico o contraseña son incorrectos",
        })
      }
    },
    validationSchema: SignInSchema,
  })

  return (
    <Paper className={classes.content}>
      <Text component="h1" className={classes.title}>
        Iniciar sesión
      </Text>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          name="email"
          label="Correo electrónico"
          value={values.email}
          onChange={handleChange}
          error={funcIsError(errors.email || errors.password, touched.email)}
          helperText={funcIsTextError(errors.email, touched.email)}
        />
        <Input
          name="password"
          type="password"
          label="Contraseña"
          value={values.password}
          onChange={handleChange}
          error={funcIsError(errors.password, touched.password)}
          helperText={funcIsTextError(errors.password, touched.password)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Iniciar sesión
        </Button>

        <div className={classes.contentLinks}>
          <Link href="/olvidaste-tu-contraseña">¿Olvidaste tu contraseña?</Link>
          <Link href="/crear-cuenta">Crear cuenta</Link>
        </div>
      </form>
    </Paper>
  )
}

export default LoginForm
