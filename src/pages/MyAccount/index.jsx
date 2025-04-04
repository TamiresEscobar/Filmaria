import React from 'react';
import { Link } from "react-router-dom";


const MyAccount = () => {
    return (
        <>
       
        <div>
            <div>aaaaa</div>
            <Link to="/minha-conta/favoritos" className="myAccount">Meus Favoritos </Link>
        </div>
        </>
    );
};

export default MyAccount;