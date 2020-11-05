import { object } from "prop-types"
import classnames from "classnames"
import { Pagination as PaginationBase } from "@material-ui/lab"

// Styles
import styles from "./styles"

const Pagination = ({ classNameContent, className, ...rest }) => {
  const classes = styles()

  const classNamesContent = classnames({
    [classes.root]: true,
    [classNameContent]: !!classNameContent,
  })

  const classNames = classnames({
    [classes.default]: true,
    [className]: !!className,
  })

  return (
    <div className={classNamesContent}>
      <PaginationBase className={classNames} {...rest} />
    </div>
  )
}

Pagination.propTypes = {
  classNameContent: object,
}

export default Pagination
