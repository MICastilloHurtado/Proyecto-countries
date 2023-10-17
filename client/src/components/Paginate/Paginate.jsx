import style from './Paginate.module.css'
import { useDispatch } from 'react-redux'
import { paginate } from '../../redux/actions'

const Paginate = ({currentPage, totalPages, onChangePage, countriesLength, elementPerPage}) => {

    const dispatch = useDispatch()
    
    const allPagesCountries = []

    for(let i = 0; i < Math.ceil(countriesLength / elementPerPage); i++){
        allPagesCountries.push(i + 1);
    }

    const clickHandler = (numero) => {
        dispatch(paginate(numero))
    }

    
    const handlePreviousPage = () =>{
        if(currentPage > 1){
            dispatch(paginate(currentPage - 1))
        }
    };

    const handleNextPage = () => {
        if(currentPage < totalPages){
            dispatch(paginate(currentPage + 1))
        }
    };

   


    return (
        <div className={style.text}>
            <button className={style.select} onClick={handlePreviousPage} disabled={currentPage === 1}>{'<<'}</button>
            {/* <span>Page {currentPage} of {totalPages}</span> */}
            {allPagesCountries.map(page => 
                <button
                key={page}
                onClick={() => clickHandler(page)}>
                    {page}
                </button>)}
            <button className={style.select} onClick={handleNextPage} disabled={currentPage === totalPages}>{'>>'}</button>
        </div>
    )
}

export default Paginate