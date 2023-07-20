import { Link } from 'react-router-dom'
import style from './Card.module.css'

const Card = (props) => {
return(
    <Link to={`/details/${props.id}`} className={`${style.Link} ${style.linkStyle}`}>
    <div className={style.divCard}>
      <div className={style.divTop}>
        <div className={style.divImg}>
          <img className={style.imgCard} src={props.image} alt="Country" />
        </div>
        <div className={style.divTitles}>
          <h4 className={style.title}>{props.name}</h4>
          <h6 className={style.subtitle}>Continent: {props.continent}</h6>
        </div>
      </div>
    </div>
    </Link>
)
}

export default Card