export default [
  // Restricted: false
  {
    pathname: "/iniciar-sesion",
    restricted: false,
  },
  {
    pathname: "/crear-cuenta",
    restricted: false,
  },
  {
    pathname: "/olvidaste-tu-contraseña",
    restricted: false,
  },
  // Restricted: true
  {
    pathname: "/",
    restricted: true,
  },
  {
    pathname: "/productos",
    restricted: true,
  },
  {
    pathname: "/nuevp-producto",
    restricted: true,
  },
  {
    pathname: "/productos/[id]",
    restricted: true,
  },
  {
    pathname: "/perfil",
    restricted: true,
  },
  {
    pathname: "/populares",
    restricted: true,
  },
]
