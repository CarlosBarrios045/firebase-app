import Router from "next/router"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import { Text, Button, Image } from "src/components/Atoms"

// Styles
import styles from "./styles"

export default function Product() {
  const classes = styles()

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => Router.push("/productos/camisa-nueva")}>
        <Image src="/images/shirt2.jpg" height="auto" alt="Product" />

        <CardContent className={classes.content}>
          <Text component="h2">iPhone 12</Text>

          <Text className={classes.company}>Agencia Digitel</Text>

          <Text className={classes.price}>1.800.000 Bs ($3.5)</Text>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button
          className={classes.button}
          color="secondary"
          variant="contained"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}
