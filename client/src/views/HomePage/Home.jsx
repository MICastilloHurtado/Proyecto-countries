import Paginate from "../../components/Paginate/Paginate"
import Card from '../../components/Card/Card'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getCountries, getActivities, countryFilter, orderByName } from "../../redux/actions"
import { paginate } from "../../redux/actions"
import reloader from "../../images/reload-icon-16912.png"
import style from './Home.module.css'

const reload = () => {
    window.location.reload(false);
    // realiza la recarga de la página actual del navegador web. El parámetro false que se pasa a window.location.reload indica
    // que la recarga se realice desde la caché del navegador, es decir, se utiliza la versión almacenada en la memoria 
    // del navegador en lugar de solicitar la página nuevamente al servidor.
}

const Home = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries)
    const allActivities = useSelector(state => state.activities)
    const page = useSelector(state => state.page)


//----------------------------Paginado------------------------------------------------------------------------------

const elementPerPage = 10; // esta es la cantidad de items que vamos a presentar por pagina

const indexOfLastElement = page * elementPerPage // obtenemos el indice del primer elemento y el ultimo de cada pagina.
const indexOfFirstElement = indexOfLastElement - elementPerPage
const currentElements = countries?.slice(indexOfFirstElement, indexOfLastElement)
const countriesLength = countries.length

const totalPages = Math.ceil(countries?.length / elementPerPage) //dividimos el total de paises por la cantidad que vamos a colocar en cada pagina para obtener el total de paginas.
    
    const handlePageChange = (pageNumber) => { 
        dispatch(Paginate(pageNumber))
    };//handler que maneja la pagina en la cual estamos. 

//----------------------------Filtros y ordenamientos------------------------------------------------------------------------------
const [continentFilter, setContinentFilter] = useState("All")
const [activityFilter, setActivityFilter] = useState("All")
const [orderBy, setOrderBy] = useState("")

const handleFilterContinent = (event) => {
    event.preventDefault();
    setContinentFilter(event.target.value)
}

const handleFilterActivity = (event) => {
    event.preventDefault();
    setActivityFilter(event.target.value)
}

const handleFilter = () => {
    dispatch(paginate(1))
    let filters = {
        continent: continentFilter,
        activity: activityFilter
    };
    dispatch(countryFilter(filters));
    setOrderBy("")// setea el select de ordenamiento, para que cada vez que hago un filtro, vuelva a la option Order by...
};

const handleOrderByName = (event) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setOrderBy(selectedValue); //indico que el estado OrderBy tenga el valor de la option seleccionada
    dispatch(orderByName(selectedValue))
};



//----------------------------useEffect-----------------------------------------------------------------------------
useEffect(()=>{
    dispatch(getCountries())
      
    }, [dispatch]);

useEffect(()=>{
    dispatch(getActivities())
          
    }, [dispatch]);

//------------------------------------------------------------------------------------------------------------------

return (
        <div className={style.containerMax}>

            {/* ------------------Filtros-------------------- */}
            <div className={style.subContainer}>
                
            <div className={style.filtersContainer}>
                <img className={style.reload} src={reloader} onClick={reload}/>
                <h1 className={style.title}>Filters</h1>
                
                    <h3 className={style.subtitle}>By Continent</h3>
                  <select className={style.select} onChange={handleFilterContinent}>
                    <option value='All'>All Continents</option>
                    <option value='Africa'>Africa</option>
                    <option value='Antarctica'>Antartica</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='South America'>South America</option>
                  </select>
                

                <div>
                    <h3 className={style.subtitle}>By Activity</h3>
                   <select className={style.select} onChange={handleFilterActivity}>
                     <option value="All">All Activities</option>
                     {allActivities && allActivities.map((activity) => {
                         return (
                             <option value={activity.name}
                                    key={activity.id}>{activity.name}</option>
                             )
                            })}
                  </select>
                </div>
                
                <button className={style.button} type="submit" onClick={handleFilter}>Apply</button>

                <div className={style.orderContainer}>
                    <h1 className={style.title}>Order By</h1>
                    <h3 className={style.subtitle}>Name/Population</h3>
                    <select className={style.select} onChange={handleOrderByName} value={orderBy}>
                      <option value="" disabled>Order by...</option>
                      <option value='ascName'>Names A - Z</option>
                      <option value='descName'>Names Z - A</option>
                       <option value='ascPopulation'>Population Low-High</option>
                       <option value='descPopulation'>Population High-Low</option>
                    </select>
                </div>
            </div>

            </div>

            {/* ------------------CardsContainer-------------------- */}
            <div className={style.cardsContainer}>
                {currentElements.length !== 0 ?
                currentElements.map(({id, name, image, continent}) => {
                    return(
                        <Card
                    key={id}
                    id={id}
                    name={name}
                    image={image}
                    continent={continent}
                    />
                    )
                })
                :(<p className={style.mensaje}>Country not Found</p>)}
            </div>
            


            {/* ------------------Paginado-------------------- */}
             <div className={style.paginado}>
                <Paginate
                currentPage={page}
                totalPages={totalPages}
                onChangePage={handlePageChange}
                countriesLength={countriesLength}
                elementPerPage={elementPerPage}
                />
             </div>
            
        </div>
    )
}

export default Home