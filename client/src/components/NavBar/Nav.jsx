import { Link } from 'react-router-dom'
import style from './Nav.module.css'
import { useState } from 'react'
import { searchCountry } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { paginate } from '../../redux/actions'
import {FaSearch} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



const Nav = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const [name, setName] = useState('')

    const handleChange = (event) => {
        setName(event.target.value)
    }

    
    const handleSubmit = (event) => {
        if(location.pathname !== '/home'){
            navigate('/home')
            event.preventDefault();
            dispatch(searchCountry(name));
            dispatch(paginate(1));
            setName(''); 
        } else{
            event.preventDefault();
            dispatch(searchCountry(name));
            dispatch(paginate(1));
            setName(''); 
        }
    }
    


    return (
        <div className={style.container}>
            <Link to='/home'>
                <button className={style.button}>HOME</button>
            </Link>
            <div className={style.containerSearch} >
            <input className={style.search} type='search' value={name} onChange={handleChange} placeholder='Search country'/>
            <button className={style.submit} disabled={name===""} onClick={handleSubmit} ><FaSearch className="fa fa-search"></FaSearch></button>
            </div>
            <Link to='/form'>
                <button className={style.button}>CREATE ACTIVITY / DELETE ACTIVITY</button>
            </Link>
        </div>
    )
}

export default Nav