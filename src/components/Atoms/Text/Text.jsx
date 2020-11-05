import classnames from "classnames"
import { get } from "lodash"
import Typography from "@material-ui/core/Typography"

import styles from "./styles"

const Text = ({ theme, className, children, ...rest }) => {
  const classes = styles()

  const classNames = classnames({
    [get(classes, theme, "default")]: true,
    [className]: !!className,
  })

  return (
    <Typography className={classNames} {...rest}>
      {children}
    </Typography>
  )
}

Text.defaultProps = {
  className: "",
  theme: "default",
}

export default Text
