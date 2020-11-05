// Redux
import { connect } from "react-redux"

// Actions
import { signIn } from "src/store/modules/auth/actions"

// Layout
import { Text, Input, Button, Link, Paper } from "src/components/Atoms"

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

const LoginForm = ({ signIn }) => {
  const classes = styles()

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn({ email: "juan", password: "1234" })
  }

  return (
    <Paper className={classes.content}>
      <Text component="h1" className={classes.title}>
        Iniciar sesión
      </Text>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Input type="text" label="Correo electrónico" />
        <Input type="password" label="Contraseña" />
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

export default connect(null, { signIn })(LoginForm)
