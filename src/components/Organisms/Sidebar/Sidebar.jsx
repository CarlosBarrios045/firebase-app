import classnames from "classnames"
import map from "lodash/map"

// Redux
import { connect } from "react-redux"
import { closeSidebar } from "src/store/modules/layout/actions"

// Layout
import { Drawer } from "@material-ui/core"
import Link from "src/components/Atoms/Link"

// Data
import data from "./data"
import dataAuth from "./dataAuth"

// Styles
import styles from "./styles"

const Sidebar = ({ open, isAuth }) => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Drawer
        className={classnames({
          [classes.drawer]: true,
          [classes.drawerOpen]: open,
        })}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {open && (
          <div className={classes.content}>
            <div className={classes.contentLinks}>
              <div>
                {map(isAuth ? dataAuth : data, ({ Icon, href, link, size }) => (
                  <Link href={href} key={href}>
                    <Icon
                      size={!size ? 24 : size}
                      style={{ marginRight: 12 }}
                    />
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

const mapStateToProps = ({ layout: { openSidebar }, auth: { isAuth } }) => ({
  open: openSidebar,
  isAuth,
})

export default connect(mapStateToProps, { closeSidebar })(Sidebar)
