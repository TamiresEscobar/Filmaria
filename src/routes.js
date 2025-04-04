import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home';
import Pdp from './pages/PDP'
import Header from './components/Header';
import MyAccount from './pages/MyAccount';
import Favorites from './pages/Favorites';
import PageNotfound from './pages/Notfound';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/filme/:id"  element={<Pdp/>}/>
            <Route path='/minha-conta' element={<MyAccount/>} />
            <Route path='/minha-conta/favoritos' element={<Favorites/>} />
            <Route path='/*' element={<PageNotfound/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp