import { useEffect, useContext } from "react"
import mapboxgl from "mapbox-gl"
import { UberContext } from "../context/uberContext"

// styles 
const style = {
    wrappers:`
    flex-1 h-full w-full`,

}
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCES_TOKEN

export const Map = () => {
    const {cordenadasUbicacion, cordenadasDestino , setDistanciaViaje} = useContext(UberContext)
   //console.log({'ubicacion':cordenadasUbicacion, 'destino':cordenadasDestino})
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/esqui97/cl1fyjg1y003v14pp3fr85x9n',
            center: [-75.596, 6.269],
            zoom: 12.03
        })
        if (cordenadasUbicacion) {
          addToMap(map, cordenadasUbicacion)
        }
    
        if (cordenadasDestino) {
          addToMap(map, cordenadasDestino)
        }
    
        if (cordenadasUbicacion && cordenadasDestino) {
          map.fitBounds([cordenadasDestino, cordenadasUbicacion], {
            padding: 100,
          })
        }
        if (cordenadasUbicacion !== undefined  && cordenadasDestino !== undefined ) {
          fetch(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${cordenadasUbicacion};${cordenadasDestino}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCES_TOKEN}`)
          .then (res => res.json())
          .then (res => setDistanciaViaje(res.routes))
        }
       
        
      }, [cordenadasUbicacion, cordenadasDestino])
      const addToMap = (map, coordinates) => {
        const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
      }
      

      
    return (
        <div className={style.wrappers} id='map' />
        
    )
}
    