import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(({ palette }) => ({
  root: {
    maxWidth: 345,
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  content: {
    overflowY: "auto",
    overflowX: "hidden",
    height: 123,
    maxHeight: 123,
  },
  actions: {
    height: 80,
    display: "flex",
    justifyContent: "center",
  },
  button: {
    color: palette.secondary.main,
    backgroundColor: palette.primary.lighter,
    width: 200,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 6,
    boxShadow: "none",

    "&:hover": {
      backgroundColor: palette.primary.lighter,
      boxShadow: "none ",
    },

    "&:active": {
      boxShadow: "none ",
    },
  },
  company: {
    color: palette.gray.main,
    fontSize: 16,
  },
  price: {
    color: palette.primary.lighter,
    fontSize: 20,
    marginTop: 10,
  },
}))
