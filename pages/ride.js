import { useContext } from "react"
import { Navbar, Map, LocationSelector , Confirm } from "../components/exportComponents"
import { UberContext } from "../context/uberContext"

const style = {
  wrapper: `h-screen w-screen flex flex-col`,
  main:`h-full w-screen flex-1 z-10`,
  mapContainer: `flex-1 w-full h-full`,
  rideRequestContainer: `h-full w-[400px] ml-[1rem] py-[3rem] absolute top-0 left-0 flex flex-col justify-end z-20`,
  rideRequest:`h-full mx-h-[700px] bg-white rounded-lg flex flex-col overflow-scroll`,
}
export default function Ride({Carros}) {
  const {setCarros} = useContext(UberContext)
  setCarros(Carros)
  
  return (
    <div className={style.wrapper}>
      {/* Navbar*/}
          <Navbar/>
      <div className={style.main}>
        {/* map */}
          <Map/>
      </div>
      <div className={style.rideRequestContainer}>
        <div className={style.rideRequest}>
        {/*Location selector*/}
          <LocationSelector
            
          />
        {/*confirm */}
        <Confirm
        />
        </div>  
      </div>
    </div>
  )
}
export const getStaticProps = async (ctx) => {
  const carros = await fetch('https://clone-uber-esqui.herokuapp.com/carros')
  const respuesta = await carros.json()
  return {
      props: {
        Carros:respuesta
      }
  }
}
