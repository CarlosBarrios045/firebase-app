import Router from "next/router"

// Layout
import { /* useMediaQuery */ Container } from "@material-ui/core"
import { Text, Image, Button } from "src/components/Atoms"
import Product from "src/components/Molecules/Product"

// Styles
import { makeStyles /* useTheme */ } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
  root: {
    width: "100%",
    backgroundColor: palette.primary.main,
  },
  contentImage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",

    "& > h1": {
      fontSize: 50,
      color: palette.secondary.main,
      fontFamily: fonts.secondary,
      lineHeight: 1.4,
    },

    "& > p": {
      color: palette.secondary.main,

      [breakpoints.down("xs")]: {
        fontSize: 14,
        padding: "0 20px",
      },
    },
  },
}))

const ProductsPage = () => {
  const classes = styles()
  /* const { breakpoints } = useTheme()
  const match = useMediaQuery(breakpoints.down("sm")) */

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.contentHeader}>
          <Text component="h1">Tus productos</Text>
        </div>
        <div className={classes.content}>
          <Product />
        </div>
      </Container>
    </div>
  )
}

export default ProductsPage
