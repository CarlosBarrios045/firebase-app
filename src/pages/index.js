import { useEffect, useState } from "react"
import Router from "next/router"

// Layout
import { Container } from "@material-ui/core"
import { Text, Button } from "src/components/Atoms"
import ProductList from "src/components/Molecules/ProductList"

// Firebase
import { db } from "src/lib/db"

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

const Home = () => {
  const classes = styles()
  const [products, setProducts] = useState([])

  const handleProductos = (snapshot) => {
    const productsDB = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setProducts(productsDB)
  }

  const getProductos = async () => {
    await db
      .collection("products")
      .orderBy("created", "desc")
      .onSnapshot(handleProductos)
  }

  useEffect(() => {
    getProductos()
  }, [])

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.contentHeader}>
          <Text component="h1">Tus productos</Text>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => Router.push("/nuevo-producto")}
          >
            Nuevo producto
          </Button>
        </div>
        <div className={classes.content}>
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <ProductList product={product} key={product.id} />
              ))}
            </>
          ) : (
            <Text>No hay productos aún.</Text>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Home
