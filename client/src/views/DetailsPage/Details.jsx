import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getCountryDetails } from "../../redux/actions"
import style from './Details.module.css'

const Details = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getCountryDetails(id))
    }, [dispatch])
    
    const detail = useSelector(state => state.countryDetails)    
    

    return(
        <div className={style.container}>
          <div className={style.semiContainer}>

            <img src={detail.image}/>
            <h1>{detail?.name}</h1>
            <h3>Capital: {detail.capital}</h3>
            <h3>Continent: {detail.continent}</h3>
            <h3>Area: {detail.area}km²</h3>
            <h3>Population: {detail.population}</h3>
            <h3>Activities: </h3>
            <ul >
        {detail.Activities && detail.Activities.length > 0 ? (
          detail.Activities.map((activity, index) => (
            <li key={index} className={style.activity}>
              <strong>Name:</strong> {activity.name} <br />
              <strong>Difficulty:</strong> {activity.difficulty} <br />
              <strong>Duration:</strong> {activity.duration} hours <br />
              <strong>Season:</strong> {activity.season}
            </li>
          ))
          ) : (
            <h3>No activities</h3>
            )}
      </ul>

            
            </div>
        </div>
    )
}

export default Details