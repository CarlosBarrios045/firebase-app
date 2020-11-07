import { useState, useEffect } from "react"
import ReactMapGL, { Marker } from "react-map-gl"

// Layout
import Text from "src/components/Atoms/Text"

// Icons
import { RiMapPinUserLine } from "react-icons/ri"
import { FaMapPin } from "react-icons/fa"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    height: "100%",
    width: "100%",
    marginTop: 14,

    "& > p": {
      marginBottom: 10,
    },
  },
  map: {
    backgroundColor: palette.secondary.dark,
    width: "100% !important",
  },
}))

const MiniMap = () => {
  const classes = styles()
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 340,
    latitude: 9.0314155732963,
    longitude: -69.7348595762737,
    zoom: 16,
  })
  const [positionCurrent, setPositionCurrent] = useState({
    latitude: 9.0314155732963,
    longitude: -69.7348595762737,
  })

  const [error, setError] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setViewport((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }))

        setPositionCurrent({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        console.log(error)
      },
      {
        enableHighAccuracy: true,
      }
    )
  }, [])

  return (
    <div className={classes.root}>
      {error && (
        <Text>Oops, tenemos un error con el mapa, revisa tu conexión.</Text>
      )}
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => {
          setViewport(nextViewport)
        }}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_TOKEN_MAPBOX}
        onError={(e) => setError(true)}
        mapStyle="mapbox://styles/carlosb045/ckgwwhio90z9c19p8b2e500tr"
        className={classes.map}
      >
        <Marker {...positionCurrent} offsetLeft={-20} offsetTop={-10}>
          <RiMapPinUserLine size={26} color="#2E2C2D" />
        </Marker>
        <Marker
          latitude={9.043274013963911}
          longitude={-69.74575802542702}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <FaMapPin size={20} color="#0945C6" />
        </Marker>
      </ReactMapGL>
    </div>
  )
}

export default MiniMap
