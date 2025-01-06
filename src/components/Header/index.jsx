import React from "react";
import './styles.css'
import {Link} from 'react-router-dom'
const Header = () => {
    return(
        <header>
            <Link to='/' className="logo">Prime Flix</Link>
            <Link to='/favoritos' className="favoritos">Meus filmes</Link>
        </header>
    )
}
export default Header