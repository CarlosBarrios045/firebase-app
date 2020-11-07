import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { isEmpty } from "lodash"
import { useFormik } from "formik"
import shortid from "short-uuid"

import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { es } from "date-fns/locale"

// Validations
import useValidations from "src/hooks/useValidations"
import useValidationsInput from "src/hooks/useValidationsInput"

// Layout
import { Container, Divider } from "@material-ui/core"
import { Text, Image, Input, Button } from "src/components/Atoms"

// Firebase
import { addVote, getProductFirebase } from "src/lib/db"
import { useAuth } from "src/lib/auth"

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

    "& p": {
      color: palette.secondary.main,
    },
  },
  // Content Header
  contentHeader: {
    width: "100%",
    "& > h1": {
      color: palette.secondary.main,
      fontSize: 24,
      margin: "15px 0",
      fontWeight: "bold",
      marginTop: 40,
      textAlign: "center",
    },
  },
  // Content
  content: {
    width: "100%",
    marginTop: 20,
    marginBottom: 40,
    display: "grid",
    gridTemplateColumns: "60% auto",
    gridGap: "20px",
    gap: "20px",

    [breakpoints.down("sm")]: {
      gridTemplateColumns: "100%",
    },
  },
  contentImage: {
    marginBottom: 10,
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: palette.secondary.main,
  },
  sidebar: {
    "& button": {
      width: "100%",
    },

    "& > p": {
      marginTop: 20,
      marginBottom: 20,
      textAlign: "center",
    },
  },
}))

const Product = () => {
  const classes = styles()
  const [data, setData] = useState({})

  const {
    query: { id },
    push,
  } = useRouter()
  const { user } = useAuth()

  // Get product
  useEffect(async () => {
    if (id) {
      const product = await getProductFirebase(id)
      if (!product.exists) {
        push("/")
      } else {
        setData({ id: product.id, ...product.data() })
      }
    }
  }, [id])

  // Product
  const {
    id: idProduct,
    comments,
    created,
    description,
    company,
    name,
    image,
    votes,
    votesUser,
    url,
    user: userProduct,
  } = data

  /* Create comment */
  // Validations
  const { newCommentSchema } = useValidations()
  const { funcIsError, funcIsTextError } = useValidationsInput()

  const { handleSubmit, errors, values, handleChange, touched } = useFormik({
    initialValues: { comment: "" },
    onSubmit: async ({ comment }) => {
      console.log(comment)
    },
    validationSchema: newCommentSchema,
  })

  // Votes
  const handleVote = async () => {
    if (!user) {
      push("/iniciar-sesion")
    }

    // Save DB
    if (votesUser.includes(user.uid)) return
    const newVotes = votes + 1
    const newVotesUser = [...votesUser, user.uid]

    await addVote(idProduct, { votes: newVotes, votesUser: newVotesUser })

    // Save local
    setData({ ...data, votes: newVotes, votesUser: newVotesUser })
  }

  // Loading
  if (isEmpty(data)) return <Text component="h1">Cargando...</Text>

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.contentHeader}>
          <Text component="h1">{name}</Text>
        </div>

        <Text variant="body2" color="textSecondary">
          Publicado hace{" "}
          {formatDistanceToNow(new Date(created), {
            locale: es,
          })}
        </Text>
        <div className={classes.content}>
          <div>
            <Image
              src={image}
              alt="Product"
              width="100%"
              wrapperClassName={classes.contentImage}
            />

            <Text>{description}</Text>
          </div>
          <div className={classes.sidebar}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button color="secondary" variant="contained">
                Ver URL
              </Button>
            </a>

            <Text>Votos: {votes}</Text>
            {user && user.uid !== userProduct.id && (
              <>
                {votesUser.includes(user.uid) ? (
                  <Button color="secondary" variant="contained">
                    Ya votaste
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleVote}
                  >
                    Votar
                  </Button>
                )}
              </>
            )}

            <Text>Empresa {company}</Text>
            <Text>Por {userProduct.name}</Text>
          </div>
          <div>
            <div className={classes.contentHeader}>
              <Text component="h1">Comentarios</Text>
            </div>
            {user && (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Input
                  variant="filled"
                  name="comment"
                  label="Comentario"
                  value={values.comment}
                  onChange={handleChange}
                  error={funcIsError(errors.comment, touched.comment)}
                  helperText={funcIsTextError(errors.comment, touched.comment)}
                  color="secondary"
                  multiline
                />
                <Button color="secondary" variant="contained" type="submit">
                  Comentar
                </Button>
              </form>
            )}

            <Divider className={classes.divider} />

            {comments.length ? (
              <>
                {comments.map((c) => (
                  <div key={shortid.generate()}>
                    <Text component="h6">{c.cotent}</Text>
                    <Text>Escrito por: {c.nameUser}</Text>
                  </div>
                ))}
              </>
            ) : (
              <Text>Aún no hay comentarios.</Text>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Product
