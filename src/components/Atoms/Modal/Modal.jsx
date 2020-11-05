import { forwardRef } from "react"
import { string, node, bool, func } from "prop-types"
import classnames from "classnames"
import { Dialog, IconButton, Slide } from "@material-ui/core"
import { BsX } from "react-icons/bs"

// Styles
import styles from "./styles"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Modal = ({ open, handleCloseModal, className, children, fullScreen }) => {
  const classes = styles()
  const classNames = classnames({
    [className]: !!className,
  })

  const classNamesPaper = classnames({
    [classes.root]: true,
    [classes.fullScreen]: fullScreen,
  })

  const classNamesContent = classnames({
    [classes.content]: true,
    [classes.contentFullScreen]: fullScreen,
  })

  const classNamesButton = classnames({
    [classes.closeBtn]: true,
    [classes.closeBtnFullScreen]: fullScreen,
  })

  return (
    <Dialog
      open={open}
      classes={{ paper: classNamesPaper }}
      className={classNames}
      fullScreen={fullScreen}
      TransitionComponent={Transition}
    >
      {handleCloseModal && (
        <IconButton onClick={handleCloseModal} className={classNamesButton}>
          <BsX size={26} />
        </IconButton>
      )}
      <div className={classNamesContent}>{children}</div>
    </Dialog>
  )
}

Modal.propTypes = {
  className: string,
  children: node.isRequired,
  open: bool.isRequired,
  handleCloseModal: func.isRequired,
  fullScreen: bool,
}

Modal.defaultProps = {
  className: "",
  fullScreen: false,
}

export default Modal
