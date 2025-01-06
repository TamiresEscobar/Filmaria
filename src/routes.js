import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home';
import Pdp from './pages/PDP'
import Header from './components/Header';
import Favorites from './pages/Favorites';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/filme/:id"  element={<Pdp/>}/>
            <Route path='/favoritos' element={<Favorites/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp