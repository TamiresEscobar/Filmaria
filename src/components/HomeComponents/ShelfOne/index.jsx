import React, {useEffect, useState } from 'react';
import './styles.css'
import api from '../../../api/index';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Link} from 'react-router-dom'

const ShelfOne = () => {
    const [popularyFilm, setPopularyFilm] = useState([])
    

    const options = {
        api_key: "04753c800f01e7aa9455d47085cbaa51",
        language: "pt-BR",
        page: 1,
      };
    
      useEffect(() => {
        async function loadShelfOne() {
          const response = await api.get(`movie/top_rated`, {
            params: options,
          });
    
          const checkedFilms = response.data.results.slice(0, 15);
          setPopularyFilm(checkedFilms)
        }
        loadShelfOne();
      }, []);

    

      const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000, // Slide change speed in ms
      };

    return (
        <div className="container_shelf_one">
            <h2>Top avaliado</h2>
        {popularyFilm && (
          <Slider {...settings}>
            {popularyFilm.map((item) => (
              <div key={item.id} className="card_shelf_one" refId={item.id}>

                <img 
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} 
                alt={item.title} 
                className='image_shelf_one'
                />
                <h3>{item?.title}</h3>
                <p>{item.release_date}</p>
                 <Link to={`/filme/${item?.id}`} className='link_pdp'>+ informações</Link>

                <div>
                </div>

              </div>
            ))}
          </Slider>
        )}
      </div>
    );
};

export default ShelfOne;