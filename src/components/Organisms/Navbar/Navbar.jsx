import { element } from "prop-types"
import { useRouter } from "next/router"

// Redux
import { connect } from "react-redux"

// Actions
import { toggleSidebar } from "src/store/modules/layout/actions"
import { signOut } from "src/store/modules/auth/actions"

// Icons
import { RiDashboardLine } from "react-icons/ri"
import { IoIosArrowRoundBack } from "react-icons/io"

// Components
import {
  AppBar,
  useScrollTrigger,
  Slide,
  Container,
  Box,
  useMediaQuery,
  IconButton,
  Avatar,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { Text, Link, Button } from "src/components/Atoms"
import InputSearch from "src/components/Molecules/InputSearch"

// styles
import styles from "./styles"

function HideOnScroll({ children, openSidebar }) {
  const trigger = useScrollTrigger()

  if (openSidebar) return <>{children}</>

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: element,
}

const Navbar = ({ toggleSidebar, openSidebar, isAuth, signOut }) => {
  const classes = styles()
  const theme = useTheme()
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"))
  const matchesXs = useMediaQuery(theme.breakpoints.down("xs"))
  const validateMenu = isAuth || matchesSm

  const { push } = useRouter()

  return (
    <HideOnScroll openSidebar={openSidebar}>
      <AppBar position="sticky" className={classes.root}>
        <Container className={classes.content} fixed>
          <Box display="flex" alignItems="center">
            {validateMenu && (
              <IconButton
                edge="start"
                color="secondary"
                className={`${classes.menuButton} ${classes.right}`}
                aria-label="menu"
                onClick={toggleSidebar}
              >
                {openSidebar ? (
                  <IoIosArrowRoundBack color="#fff" />
                ) : (
                  <div className={classes.menuContent}>
                    <div />
                    <div />
                  </div>
                )}
              </IconButton>
            )}
            <Link href="/" className={classes.title}>
              Firebase App
              <RiDashboardLine style={{ marginLeft: 10 }} />
            </Link>
          </Box>

          {!matchesXs && <InputSearch />}

          {!matchesSm && (
            <>
              {isAuth ? (
                <>
                  <div>
                    <Button className={classes.button} color="secondary">
                      <Avatar className={classes.avatar}>
                        <Text>JB</Text>
                      </Avatar>
                      <Text className={classes.textAvatar}>
                        Juan Carlos Barrios
                      </Text>
                    </Button>

                    <Button
                      className={classes.button}
                      color="secondary"
                      onClick={signOut}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                </>
              ) : (
                <div>
                  <Button
                    className={classes.button}
                    color="secondary"
                    onClick={() => push("/iniciar-sesion")}
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    className={classes.button}
                    color="secondary"
                    onClick={() => push("/crear-cuenta")}
                  >
                    Crear cuenta
                  </Button>
                </div>
              )}
            </>
          )}
        </Container>
        {matchesXs && <InputSearch />}
      </AppBar>
    </HideOnScroll>
  )
}

const mapStateToProps = ({
  layout: { openCart, openSidebar },
  auth: { isAuth },
}) => ({
  openCart,
  openSidebar,
  isAuth,
})

export default connect(mapStateToProps, { toggleSidebar, signOut })(Navbar)
