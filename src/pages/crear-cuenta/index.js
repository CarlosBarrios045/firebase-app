// Layout
import Text from "src/components/Atoms/Text"
import SignUpForm from "src/components/Organisms/SignUpForm"
import useMediaQuery from "@material-ui/core/useMediaQuery"

// Styles
import { makeStyles, useTheme } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
  root: {
    height: "calc(100vh - 72px)",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto 60%",
    alignItems: "center",
    backgroundColor: palette.secondary.main,

    [breakpoints.down("sm")]: {
      gridTemplateColumns: "100%",
      gridTemplateRows: "auto 12%",
    },

    [breakpoints.down("xs")]: {
      gridTemplateRows: "auto 8%",
    },
  },
  contentImage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",

    "& > h1": {
      fontSize: 50,
      fontFamily: fonts.secondary,
      lineHeight: 1.4,
    },

    "& > p": {
      [breakpoints.down("xs")]: {
        fontSize: 14,
        padding: "0 20px",
      },
    },
  },
}))

const SignUpPage = () => {
  const classes = styles()
  const { breakpoints } = useTheme()
  const match = useMediaQuery(breakpoints.down("sm"))

  return (
    <div className={classes.root}>
      <SignUpForm />
      <div className={classes.contentImage}>
        {!match && <Text component="h1">Firebase App</Text>}
        <Text>Vende tus productos fácil y rápido, sin ningún costo.</Text>
      </div>
    </div>
  )
}

export default SignUpPage