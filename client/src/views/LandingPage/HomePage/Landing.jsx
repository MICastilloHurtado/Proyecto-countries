import { Link } from "react-router-dom"
import style from "./Landin.module.css"

const Landing = () => {


    return(
        
         <div className={style.landingContainer}>
            <div className={style.contenedor}>            
            <h1>
            Welcome to my informative website about countries!
            In this space, I will provide you with a valuable and comprehensive collection of data about different countries around the globe. Explore every corner of the world and discover fascinating details about the geography, population, and continent of each nation.
            </h1>
            <br/>
            <br/>
            <Link to="/home">
                <button>
                Log In
                </button>
            </Link>
            </div>
        </div>
    )
}

export default Landing