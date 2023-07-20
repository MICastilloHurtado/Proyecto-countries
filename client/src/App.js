import './App.css';
import { Route, Routes } from 'react-router-dom';
import Details from './views/DetailsPage/Details';
import Form from './views/FormPage/Form';
import Home from './views/HomePage/Home';
import Landing from './views/LandingPage/HomePage/Landing';
import Nav from './components/NavBar/Nav';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation()

  return (
    <div className="App">
      <div className='contenedor'>
        {location.pathname !== '/' && <Nav />}
          <Routes>
            <Route path="/" element={<Landing/>}  />
            <Route path="/home" element={<Home/>} />
            <Route path='/form'element={<Form />} />
            <Route path='/details/:id' element={<Details/>} />            
          </Routes>
      </div>
    </div>
  );
}

export default App;
