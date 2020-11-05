import { string } from "prop-types"
import classnames from "classnames"
import { LazyLoadImage } from "react-lazy-load-image-component"

// Styles
import styles from "./styles"

const Image = ({ className, ...rest }) => {
  const classes = styles()

  const classNames = classnames({
    [classes.default]: true,
    [className]: !!className,
  })

  return <LazyLoadImage effect="blur" className={classNames} {...rest} />
}

Image.propTypes = {
  className: string,
}

export default Image
