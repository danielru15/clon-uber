import RideSelector from "./RideSelector"
import {useContext} from 'react'
import { UberContext } from "../context/uberContext"
import axios from 'axios';
import Swal from 'sweetalert2'
// styles
const style = {
    wrapper: `flex-1 h-full flex flex-col justify-between`,
    rideSelectorContainer:`h-full flex flex-col overflow-scroll`,
    confirmButtonContainer:`border-t-2 cursor-pointer z-10`,
    confirmButton:`bg-black text-white m-4 py-4 text-center text-xl` 
}
export const Confirm = () => {
    const {ubicacion , destino, tipoCarro, precio, usuario, token} = useContext(UberContext)
    console.log(tipoCarro)
    console.log(precio)
    const GuardarViaje =  async () => {
        if(ubicacion !== '' && destino !== '' && tipoCarro !== ''){
        await axios.post('https://clone-uber-esqui.herokuapp.com/viajes', {

                ubicacion:ubicacion,
                destino:destino,
                precio:precio,
                tipocarro:tipoCarro,
                user: usuario.id,
                dia:`${Date.now()}`
            }
            , {
                headers: {
                  'content-type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
              })
            .then(response => {
                console.log(response)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'viaje pedido',
                    showConfirmButton: false,
                    timer: 1500
                  })

            });
        }else {
            alert('no se puedo pedir un viaje')
        }
    }
  return (
    <div className={style.wrapper}>
        <div className={style.rideSelectorContainer}>
            {/* Ride selector */}
            <RideSelector
            />

        </div>
        <div className={style.confirmButtonContainer}>
            <div className={style.confirmButtonContainer}>
                <div 
                    className={tipoCarro !== '' ? style.confirmButton : null}
                    onClick={() => GuardarViaje()}
                > 
                {tipoCarro}
                </div>
            </div>
        </div>
    </div>
  )
}
