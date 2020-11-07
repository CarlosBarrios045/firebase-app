import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Layout
import { Container } from "@material-ui/core"
import { Text } from "src/components/Atoms"

// Firebase
// import { db } from "src/lib/db"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
  root: {
    width: "100%",
    minHeight: "calc(100vh - 72px)",
    backgroundColor: palette.primary.main,

    [breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 110px)",
    },
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  // Content Header
  contentHeader: {
    "& > h1": {
      color: palette.secondary.main,
      fontSize: 24,
      margin: "15px 0",
      fontWeight: "bold",
    },

    "& button": {
      marginBottom: 40,
    },
  },
  // Content
  content: {
    width: "100%",
    display: "grid",
    gridGap: "10px",
    gap: "10px",

    "& > p": {
      color: palette.secondary.main,
    },
  },
}))

const Product = () => {
  const classes = styles()
  const [data, setData] = useState({})

  /* const handleProductos = (snapshot) => {
    const productsDB = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setProducts(productsDB)
  } */
  /*

  const getProductos = async () => {
    await db
      .collection("products")
      .orderBy("created", "desc")
      .onSnapshot(handleProductos)
  } */

  const {
    query: { id },
  } = useRouter()

  useEffect(() => {
    setData({})
  }, [])

  console.log({ data })

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.contentHeader}>
          <Text component="h1">Desde {id}</Text>
        </div>
      </Container>
    </div>
  )
}

export default Product
