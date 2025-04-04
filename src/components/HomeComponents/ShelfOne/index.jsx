import React, { useEffect, useState } from "react";
import "./styles.css";
import api from "../../../api/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ButtonFavorites from "../../GlobalComponents/ButtonFavorites";

import { Link } from "react-router-dom";

const ShelfOne = () => {
  const [popularyFilm, setPopularyFilm] = useState([]);

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
      setPopularyFilm(checkedFilms);
    }
    loadShelfOne();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4.5,
    autoplay: false,
    autoplaySpeed: 2000, // Slide change speed in ms
    responsive: [
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 2, // Show 2 items
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // For screens smaller than 600px
        settings: {
          slidesToShow: 1, // Show 1 item
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container_shelf_one">
      <h2>Top avaliado</h2>
      {popularyFilm && (
        <Slider {...settings}>
          {popularyFilm.map((item) => (
            <div key={item.id} className="card_shelf_one" refId={item.id}>
              <ButtonFavorites dataShelf={item} className='testea'/> 
              <div className="content_image-shelf">
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={item.title}
                  className="image_shelf_one"
                />
              </div>

              <h3>{item?.title}</h3>
              <p>
                {" Lançamento "}
                {item?.release_date &&
                  new Date(item?.release_date).toLocaleDateString("pt-BR")}
              </p>

              <Link to={`/filme/${item?.id}`} className="link_pdp">
                Saiba Mais
              </Link>

              <div></div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ShelfOne;
