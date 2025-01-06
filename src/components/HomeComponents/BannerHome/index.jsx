import React, { useEffect, useState } from "react";
import api from "../../../api/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.css'

const BannerHome = () => {
  const [listNewFilms, setListNewFilms] = useState([]);
  console.log("🚀 ~ BannerHome ~ listNewFilms:", listNewFilms);

  const options = {
    api_key: "04753c800f01e7aa9455d47085cbaa51",
    language: "pt-BR",
    page: 1,
  };

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get(`movie/now_playing`, {
        params: options,
      });
      console.log(response);

      const checkedFilms = response.data.results;
      setListNewFilms(checkedFilms);
    }
    loadFilmes();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000, // Slide change speed in ms
  };

  return (
    <div className="carousel-container">
      {listNewFilms && (
        <Slider {...settings}>
          {listNewFilms.map((item) => (
            <div key={item.id} className="content-list-film">
              <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} className="image_banner"/>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BannerHome;
