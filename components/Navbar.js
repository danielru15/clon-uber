import Image from "next/image"
import avatar from '../temp/avatar.jpeg'
import { BsPerson } from "react-icons/bs";
import { UberContext } from "../context/uberContext"
import { useContext } from "react";
// styles
const style = {
    wrapper:` h-16 w-full bg-black text-white flex
    md:justify-around items-center px-60`,
    leftMenu:`flex gap-3`,
    logo:`text-3l text-white flex cursor-pointer mr-16`,
    menuItem:`text-lg text-white ont-medium flex items-center mx-4 cursor-pointer`,
    rightMenu:`flex gap-3 items-center`,
    userImageContainer:`mr-2`,
    userImage: `h-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
    logingButton:`flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1`,
    loginText:`m1-2`
}



export const Navbar = () => {
    const {usuario , isLogged} = useContext(UberContext)

  return (
    <div className={style.wrapper}>
        <div className={style.leftMenu}>
            <div className={style.logo}>Uber Clone</div>
            <div className={style.menuItem}>Ride</div>
            <div className={style.menuItem}>Drive</div>
            <div className={style.menuItem}>More</div>
        </div>
        <div className={style.rightMenu}>
            <div className={style.menuItem}>Help</div>
            <div className={style.menuItem}>{usuario.username}</div>
            <div className={style.ImageContainer}>
                <Image className={style.userImage}
                    src={avatar}
                    width={40}
                    height={40}
                />
            </div>
            {
                isLogged ? (
                    <div>Cerrar sesion</div>
                ): (
                    <div className={style.logingButton}>
                        <BsPerson/>
                        <div className={style.loginText}>
                            Login
                        </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}
