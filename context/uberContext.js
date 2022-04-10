import { createContext, useState,useEffect } from "react";
import { useRouter } from 'next/router'

export const UberContext = createContext()


export const UberProvider = ({children}) => {
    const router = useRouter()
    const [ubicacion, setUbicacion] = useState('')
    const [destino, setDestino] = useState('')
    const [cordenadasUbicacion, setCordenadasUbicacion] = useState()
    const [cordenadasDestino, setCordenadasDestino] = useState()
    const [carros , setCarros] = useState([])
    const [precio, setPrecio] = useState('')
    const [tipoCarro, setTipoCarro] = useState('')
    const [DistanciaViaje, setDistanciaViaje] = useState('')
    const [usuario , setUsuario] = useState('')
    const [isLogged, setIsLogged] = useState();
    const [token , setToken] = useState('')
    useEffect(() => {
        setIsLogged(!!document.cookie);
        router.push('/ride');
    }, [isLogged]);

    const createLocationPromise  = (locationName, locationType) => {
        return new Promise(async (resolve , reject) => {
            try {
            const response = await fetch('api/map/getLocationCoordinates',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    location:locationName
                })
            } )
            const data = await response.json()
            //console.log(data)

            if(data.message ==='success'){
                switch (locationType) {
                    case 'ubicacion':
                        setCordenadasUbicacion(data.data)
                    break
                    case 'destino':
                        setCordenadasDestino(data.data)
                    break
                }
                resolve()
            }else {
                reject()
            }
        }
        catch(error) {
            console.error(error)
            reject()

        }

        })
    }

    useEffect(() => {
        if (ubicacion && destino) {
          ;(async () => {
            await Promise.all([
                createLocationPromise(ubicacion, 'ubicacion'),
                createLocationPromise(destino, 'destino'),
            ])
          })()
        } else return
      }, [ubicacion, destino])
    

    return (
        <UberContext.Provider 
        value={{
            ubicacion,
            setUbicacion,
            destino,
            setDestino,
            cordenadasUbicacion,
            setCordenadasUbicacion,
            cordenadasDestino,
            setCordenadasDestino,
            setCarros,
            carros,
            precio, 
            setPrecio,
            tipoCarro, 
            setTipoCarro,
            DistanciaViaje,
            setDistanciaViaje,
            isLogged,
            usuario ,
            setUsuario,
            token, 
            setToken

        }}>
            {children}
        </UberContext.Provider>

    )
}