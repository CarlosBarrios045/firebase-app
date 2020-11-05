import React from "react"
import classnames from "classnames"
import RouteLink from "next/link"

import styles from "./styles"

const Link = ({
  href = "",
  normal,
  label,
  children,
  className,
  disabled,
  style,
  ...rest
}) => {
  const classes = styles()

  const classNames = classnames({
    [classes.default]: true,
    [className]: !!className,
  })

  if (!normal) {
    return (
      <RouteLink href={!disabled && href} {...rest}>
        <a className={classNames} style={style}>
          {children}
        </a>
      </RouteLink>
    )
  }

  return (
    <a href={!disabled ? href : null} className={classNames}>
      {children}
    </a>
  )
}

export default Link
