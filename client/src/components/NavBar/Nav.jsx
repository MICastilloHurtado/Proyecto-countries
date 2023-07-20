import { Link } from 'react-router-dom'
import style from './Nav.module.css'
import { useState } from 'react'
import { searchCountry } from '../../redux/actions'
import { useDispatch } from 'react-redux'

const Nav = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleSubmit = (event) => {
        dispatch(searchCountry(name))
        event.preventDefault()
        setName('')
    }

    return (
        <div className={style.container}>
            <Link to='/home'>
                <button>HOME</button>
            </Link>
            <input className={style.search} type='search' value={name} onChange={handleChange} placeholder='Search country'/>
            <button className={style.submit} type='submit' disabled={name===""} onClick={handleSubmit} >Submit</button>
            <Link to='/form'>
                <button>CREATE ACTIVITY / DELETE ACTIVITY</button>
            </Link>
        </div>
    )
}

export default Nav