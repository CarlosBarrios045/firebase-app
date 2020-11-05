import { makeStyles } from "@material-ui/core"

export default makeStyles(({ breakpoints, shadows }) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderRadius: 18,
    position: "relative",
    margin: 8,
    overflowX: "hidden",
    minHeight: 300,
    zIndex: 1001,
    boxShadow: shadows[10],
  },
  fullScreen: {
    margin: 0,
    borderRadius: 0,
  },
  content: {
    overflowX: "hidden",
    width: "100%",
    maxHeight: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "column",

    [breakpoints.up("md")]: {
      "&::-webkit-scrollbar": {
        width: 8,
        backgroundColor: "transparent",
      },

      "&::-webkit-scrollbar-thumb ": {
        backgroundColor: "#ccc",
      },
    },
  },
  contentFullScreen: {
    padding: 0,
    maxHeight: "auto",
    overflowY: "visible",
    overflowX: "visible",
  },
  closeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 8,
  },
  closeBtnFullScreen: {
    position: "relative",
    alignSelf: "flex-end",
  },
}))
