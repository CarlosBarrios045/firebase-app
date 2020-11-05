import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 26px",

    "& > p": {
      marginTop: 12,
      marginBottom: 10,
    },

    [breakpoints.down("sm")]: {
      alignItems: "flex-start",

      "& p": {
        fontSize: 16,
      },

      "& > h1": {
        fontSize: 19,
      },

      "& > div": {
        marginBottom: 20,
      },
    },
  },
  imgWrapper: {
    marginTop: 20,
    marginBottom: 10,

    [breakpoints.down("sm")]: {
      margin: "0 auto",
    },
  },
  img: {
    width: 460,

    [breakpoints.down("xs")]: {
      width: 300,
    },
  },
}))
