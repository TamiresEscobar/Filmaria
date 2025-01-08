import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import api from "../../api/index";

import DetailsTecFilm from "../../components/PdpComponents/DetailsTecFilm/index";
import ShelfRecomentationPDP from '../../components/PdpComponents/ShelfRecomentation/index'

import { FcRating } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";

const Pdp = () => {
  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate()

  const options = {
    api_key: "04753c800f01e7aa9455d47085cbaa51",
    language: "pt-BR",
  };

  useEffect(() => {
    async function loadPdp() {
      await api
        .get(`/movie/${id}`, {
          params: options,
        })
        .then((response) => {
          setFilm(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate('/')
        });
    }

    loadPdp();

    return (err) => {
      console.error(err);
    };
  }, []);

  if (loading) {
    return (
      <div className="pdp-container">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="page-pdp">
      <div className="pdp-container">
        <article className="pdp-block-one">
     
          <img
            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
            alt={film.title}
          />
        </article>

        <article className="pdp-block-two">
          <p className="tagp">
            &mdash;{film?.title} &mdash;
            <span>{film.tagline}</span>
          </p>

          <div className="texts_infos">
            <span>&mdash; Sinopse: &mdash;</span>
            <p>{film?.overview}</p>
          </div>

          <div className="stamps">

          {film.vote_average > 8 && (
            <div>
              <FcRating size={60}/>
            </div>
          )}
          {film.revenue > 200000 && (
            <div>
              <FcCurrencyExchange size={60} />
            </div>
          )}
          </div>
        </article>
      </div>
      <DetailsTecFilm detailChildrenComponent={film} />
      <ShelfRecomentationPDP recomendationChildrenComponent={film}/>
    </div>
  );
};

export default Pdp;
