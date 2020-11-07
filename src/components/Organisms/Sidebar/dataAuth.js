import { BiHelpCircle } from "react-icons/bi"
import { FiShoppingBag } from "react-icons/fi"
import { IoIosAddCircleOutline } from "react-icons/io"

export default [
  {
    Icon: FiShoppingBag,
    link: "Productos",
    href: "/",
    size: 22,
  },
  {
    Icon: IoIosAddCircleOutline,
    link: "Nuevo producto",
    href: "/nuevo-producto",
  },
  {
    Icon: BiHelpCircle,
    link: "Ayuda",
    href: "/ayuda",
  },
]
