import style from './Form.module.css'
import React from "react";
import {createActivity, getCountries, getActivities, deleteActivities} from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import validation from './validation'

const reload = () => {
    window.location.reload(false);
    // realiza la recarga de la página actual del navegador web. El parámetro false que se pasa a window.location.reload indica
    // que la recarga se realice desde la caché del navegador, es decir, se utiliza la versión almacenada en la memoria 
    // del navegador en lugar de solicitar la página nuevamente al servidor.
}

const Form = () => {
    const dispatch = useDispatch();
    const countriesName = useSelector(state => state.countries);
    const countriesOrden = countriesName.sort((a,b) => a.name.localeCompare(b.name));
    //selecciona el estado countries declarado en el initialState y lo ordeno alfabeticamente
    const theActivities = useSelector(state => state.activities);
    const activitiesOrden = theActivities.sort((a, b)=> a.name.localeCompare(b.name))
    //selecciona el estado activities declarado en el initialState y lo ordeno alfabeticamente

    const [input, setInput] = useState({
        name: '', 
        difficulty: '', 
        duration: '', 
        season: '',
        countryId: []
    })

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]:event.target.value
        })
        setErrors(validation({
            ...input,
            [event.target.name]:event.target.value
        }))
    }
    //se ejecuta cuando se produce un cambio en el input o select, indica que se guarde dentro del estado input, en la propiedad con el mismo nombre que tiene event.target.name ( por ej: 'name'), el valor proporcionado en el input o select y llama a la función setErrors para realizar validaciones en el nuevo estado input.

    const handleSelectCountries = (event) => {
        setInput({
            ...input,
            countryId: [...input.countryId, event.target.value]
        })
        setErrors(validation({
            ...input,
            countryId: [...input.countryId, event.target.value]
        }))
    }
    //se ejecuta cuando se selecciona el pais o los paises donde se realiza la nueva actividad. Concatena el valor proporcionado en el select con los valores previos en la propiedad countryId, llama a la función setErrors para realizar validaciones en el nuevo estado input. 

    const handleSubmit = (event) => {
        event.preventDefault()
        const errorSave = validation(input)
        const existName = theActivities.find(activity => activity.name.toLowerCase() === input.name.toLowerCase()) ? 1 : 0
        //si hay alguna actividad con el mismo nombre que el valor ingresado en el campo input.name, existName se establece en 1, de lo contrario, se establece en 0.
        if(existName === 1)alert("Activity name already exists")
        else if(Object.values(errorSave).length !== 0)alert("You must fullfill all the required conditions")
        //Si el objeto errorSave tiene algún valor (Object.values() convierte el objeto en un array), se muestra una alerta al usuario indicando que deben cumplirse todas las condiciones requeridas. ¡¡¡YA NO ES NECESARIO PORQUE DESHABILITE EL BOTON!!!!
        else{
            dispatch(createActivity(input));
            alert('Activity created!');
            setInput({
                name: '', 
                difficulty: '', 
                duration: '', 
                season: '',
                countryId: []
            });
            reload(); //recargar la lista de actividades después de crear una nueva actividad.
        }
    };

    //----------------------------Delete Activity ------------------------------------------------

    const[del, setDel] = useState('');

    const handleSelectDelete = (event) => {
        setDel(event.target.value)
    }
    //se ejecuta cuando se selecciona una actividad para eliminar en el campo de selección correspondiente.
    
    const handleSubmitDelete = (event) => {
        event.preventDefault(); 
        if(del.length <= 0)alert('You must select an activity to delete')
        else{
            dispatch(deleteActivities(del))
            alert('Activity deleted!')
            setDel('');
            reload();
        }
    }

    //----------------------------useEffect---------------------------------------------------------------

    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])

    useEffect(() =>{
        dispatch(deleteActivities())
    }, [dispatch])


    return (
        <div className={style.formField}>

            {/* -----------------------Create activity sector----------------------- */}
            <div className={style.postActivity}>
              <h1 className={style.title}>Create your activity</h1>
                <form onSubmit={(event) => handleSubmit(event)}>
                        <div className={style.formField}>
                            <div className={style.unidos}>
                                <label className={style.label}>Name: </label>
                                <input className={style.formInputt} onChange={handleChange} type="text" value={input.name} name='name' placeholder="Activity name"/>
                            </div>
                            
                            
                                {errors.name && <p className={style.formError}>{errors.name}</p>}
                            
                        </div>

                        <div className={style.formField}>
                                <label className={style.label}>Difficulty: </label>
                                <select className={style.formInput} onChange={handleChange} name='difficulty'>
                                    <option value="" disabled selected>Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                           
                                {errors.difficulty && <p className={style.formError}>{errors.difficulty}</p>}
                           
                        </div>

                        <div className={style.formField}>
                            
                                <label className={style.label}>Duration: </label>
                                <select className={style.formInput} onChange={handleChange} name='duration'>
                                    <option value="" disabled selected>Select</option>
                                    <option value="1">1 hs</option>
                                    <option value="2">2 hs</option>
                                    <option value="3">3 hs</option>
                                    <option value="4">4 hs</option>
                                    <option value="5">5 hs</option>
                                    <option value="6">6 hs</option>
                                    <option value="7">7 hs</option>
                                    <option value="8">8 hs</option>
                                    <option value="9">9 hs</option>
                                    <option value="10">10 hs</option>
                                    <option value="11">11 hs</option>
                                    <option value="12">12 hs</option>
                                    <option value="13">13 hs</option>
                                    <option value="14">14 hs</option>
                                    <option value="15">15 hs</option>
                                    <option value="16">16 hs</option>
                                    <option value="17">17 hs</option>
                                    <option value="18">18 hs</option>
                                    <option value="19">19 hs</option>
                                    <option value="20">20 hs</option>
                                    <option value="21">21 hs</option>
                                    <option value="22">22 hs</option>
                                    <option value="23">23 hs</option>
                                    <option value="24">24 hs</option>
                                </select>
                        
                                {errors.duration && <p className={style.formError}>{errors.duration}</p>}
                           
                        </div>

                        <div className={style.formField}>
                            
                                <label className={style.label}>Season: </label>
                                <select className={style.formInput} onChange={handleChange} name='season'>
                                    <option value="" disabled selected>Select</option>
                                    <option key="Summer" value="Summer">Summer</option>
                                    <option key="Autumn" value="Autumn">Autumn</option>
                                    <option key="Winter" value="Winter">Winter</option>
                                    <option key="Spring" value="Spring">Spring</option>
                                </select>
                            
                                {errors.season && <p className={style.formError}>{errors.season}</p>}
                           
                        </div>

                        <div className={style.formField}>
                            
                                <label className={style.label}>Country: </label>
                                <select className={style.formInput} onChange={handleSelectCountries}>
                                    <option value="" disabled selected>Select country</option>  
                                    {/* Esta opción deshabilitada y seleccionada por defecto sirve como un texto de instrucción para que el usuario seleccione al menos un país. No se puede seleccionar y no tiene ningún valor asociado. */}
                                    {countriesOrden.map((country) => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                        // se generan opciones para el menú desplegable. Cada objeto country genera una opción con su id como valor y su name como texto visible para el usuario. 
                                    ))}
                                </select>
                           
                                {errors.countryId && <p className={style.formError}>{errors.countryId}</p>}
                        <div >
                            <ul className={style.elegidos}>
                                <p>{input.countryId.map(countrieId_input => countriesName.map(countrie_state => {
                                if (countrie_state.id === countrieId_input) { 
                                    return countrie_state.name + ', ';
                                }
                                }))}
                                </p>
                            </ul>
                        </div>
                            {/* Se mapea la propiedad countryId del objeto input, donde se guardaron los id de los paises seleccionados anteriormente. Luego se vuelve a hacer otro mapeo, esta vez de la constante countriesName, que contiene el valor del estado countries que es un array con todos los paises. En este segundo mapeo se compara si el Id de alguno de los paises dentro del estado countries coincide con el id de los paises seleccionados, que se renderice en una etiqueta <p> el nombre de ese pais + , */}
                        </div>

                        <div>
                        <button className={style.reload} type="submit" disabled={input.name === ''||input.difficulty==='' || input.duration===''||input.season===''||input.countryId.length<0||errors.name||errors.difficulty||errors.duration||errors.season||errors.countryId}>Create</button>
                        
                        </div>

                </form>
            </div>

                        {/* -----------------------Delete activity sector----------------------- */}

            <div className={style.deleteActivity}>
            <h1 className={style.title}>Delete Activity</h1>
            <form onSubmit={(event) => handleSubmitDelete(event)}>
            <div className={style.formField}>
                            <div>
                                <select className={style.formInputdel} onChange={handleSelectDelete}>
                                    <option value="" disabled selected>Activity</option>
                                    {activitiesOrden && activitiesOrden.map((activity) => {
                                        return (
                                            <option key={activity.id} value={activity.name}>{activity.name}</option>
                                        )
                                    })}
                                    {/* si la constante theActivities que tiene asignado el valor del estado activities, que es listado de actividades, existe osea si hay actividades dentro del estado, se hace un mapeo de esta constante en el que por cada actividad de renderiza una opcion con el valor del nombre de la actividad y que renderice tambien su nombre. De esta forma le asignamos el valor del nombre de la actividad al estado delAct, que luego se le pasa como argumento a la action deleteActivities, y de esta forma se elimina dicha actividad. */}
                                </select>
                            </div>
                        </div>
                         <p className={style.elegidos} >Activity to delete: {del}</p>

                    <div>
                        <button className={style.reload} type="submit" disabled={del===''}>Delete</button>
                    </div>

                    
            </form>
            </div>
                <div>
                    <button className={style.reloadd} onClick={reload}>Reset Form</button>
                </div>
        </div>        
    )
}

export default Form