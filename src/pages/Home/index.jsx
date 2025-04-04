import React from "react";

import BannerHome from "../../components/HomeComponents/BannerHome";
import ShelfOne from "../../components/HomeComponents/ShelfOne";

import './styles.css'

const Home = () => {


  return (
    <div className="container_homePage">
    <BannerHome/>
    <ShelfOne/>
    </div>
  );
};
export default Home;
