import Image from 'next/image'
import {useContext} from 'react'
import ethLogo from '../assets/eth-logo.png'
import { UberContext } from "../context/uberContext"
//styles
const style = {
    wrapper: `h-full flex flex-col`,
  title: `text-gray-500 text-center text-xs py-2 border-b`,
  carList: `flex flex-col flex-1 overflow-scroll`,
  car: `flex p-3 m-2 items-center border-2 border-white`,
  selectedCar: `border-2 border-black flex p-3 m-2 items-center`,
  carImage: `h-14`,
  carDetails: `ml-2 flex-1`,
  service: `font-medium`,
  time: `text-xs text-blue-500`,
  priceContainer: `flex items-center`,
  price: `mr-[-0.8rem]`,
  displayNone: `hidden`

}


const RideSelector = () => {
    const {carros, tipoCarro, setTipoCarro, DistanciaViaje, setPrecio, precio} = useContext(UberContext)
    let precioReal = 0
    const formatoPrecio = new Intl.NumberFormat('es-CO',{
        style:'currency',
        currency:'COP'
    })
    const BasePrice = 6000
    const DistanciaRecorridoBase = 6500
    const TiempoBase = 550
    
    
 

    if(DistanciaViaje !== '' && DistanciaViaje !== null && DistanciaViaje !== undefined ) {
        let Tiempo = (DistanciaViaje[0].duration_typical)
        let DistanciaRecorrido = (DistanciaViaje[0].distance)
        if(DistanciaRecorrido = DistanciaRecorridoBase) {
            let precioFinal = (DistanciaRecorrido * Tiempo * BasePrice)  / (DistanciaRecorridoBase * TiempoBase) 
         precioReal = precioFinal
        } else if (DistanciaRecorrido > DistanciaRecorridoBase){
            let precioFinal = (DistanciaRecorridoBase * Tiempo * BasePrice)  / (DistanciaRecorrido * TiempoBase) 
             precioReal = precioFinal
        }

    }
    const click = async (carro) => {
       await setTipoCarro(carro.carro)
       await setPrecio((precioReal * carro.preciomultiplicador).toFixed(3))
    }
  return (
    <div className={style.wrapper}>
        <div className={style.title}>
            Elige un viaje o desliza hacia arriba para mas
        </div>
        <div className={precioReal !== 0 ? style.carList : style.displayNone}>
            {
                carros.map((carro) => (
                    <div className={tipoCarro === carro.carro ? style.selectedCar :style.car} key={carro.id} onClick={() => click(carro)}>
                        <Image
                            src={carro.imagen[0].url}
                            className={style.carImage}
                            width={50}
                            height={50}
                        />
                        <div className={style.carDetails}>
                            <div className={style.service}>{carro.carro}</div>
                            <div className={style.time}> 5 minutos de distancia</div>
                        </div>
                        <div className={style.priceContainer}>
                            <div className={style.price}>
                                {formatoPrecio.format(precioReal * carro.preciomultiplicador)}
                            </div>
                            <Image
                                src={ethLogo}
                                width={40}
                                height={25}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RideSelector

