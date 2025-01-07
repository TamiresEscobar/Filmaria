import React from "react";
import './styles.css'
import BannerHome from "../../components/HomeComponents/BannerHome";
import ShelfOne from "../../components/HomeComponents/ShelfOne";

const Home = () => {


  return (
    <div className="container_homePage">
    <BannerHome/>
    <ShelfOne/>
    </div>
  );
};
export default Home;
