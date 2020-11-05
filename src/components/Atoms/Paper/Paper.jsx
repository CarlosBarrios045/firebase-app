import classnames from "classnames"
import PaperBase from "@material-ui/core/Paper"

import styles from "./styles"

const Paper = ({ theme, className, children, ...rest }) => {
  const classes = styles()

  const classNames = classnames({
    [classes.default]: true,
    [className]: !!className,
  })

  return (
    <PaperBase className={classNames} {...rest}>
      {children}
    </PaperBase>
  )
}

Paper.defaultProps = {
  className: "",
}

export default Paper
