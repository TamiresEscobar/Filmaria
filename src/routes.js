import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home';
import Pdp from './pages/PDP'

function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/filme/:id"  element={<Pdp/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp