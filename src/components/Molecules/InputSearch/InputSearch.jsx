// import { useState } from "react"

// Layout
import { InputAdornment, IconButton } from "@material-ui/core"
import Input from "src/components/Atoms/Input"

// Icons
import { FiSearch } from "react-icons/fi"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, transitions }) => ({
  input: {
    width: 200,
    transition: transitions.create("width"),
    padding: "10px",
    fontSize: 15,

    "&:focus": {
      width: 240,
    },

    [breakpoints.only("sm")]: {
      "&:focus": {
        width: 200,
      },
    },
  },
  underline: {
    "&:before, &:after": {
      border: "none !important",
    },
  },
  inputSearch: {
    borderRadius: 10,
    transition: "ease .5s all",
    backgroundColor: palette.secondary.dark,

    "&:hover": {
      backgroundColor: palette.secondary.ultraDark,
    },
  },
}))

const InputSearch = () => {
  const classes = styles()

  return (
    <div className={classes.contentInput}>
      <Input
        className={classes.inputSearch}
        InputProps={{
          classes: { input: classes.input, root: classes.underline },
          startAdornment: (
            <InputAdornment position="end">
              <IconButton style={{ padding: "6px 2px" }}>
                <FiSearch style={{ margin: "0 5px" }} size={16} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        margin="none"
      />
    </div>
  )
}

export default InputSearch
