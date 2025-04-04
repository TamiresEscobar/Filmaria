import React, { useEffect, useState } from "react";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";
import { BsFillInfoSquareFill } from "react-icons/bs";

import "./styles.css";

const DetailsTecFilm = ({ detailChildrenComponent }) => {
  const [openDetails, setOpenDetails] = useState(true);

  const [genresName, setGenresName] = useState([]);
  const [timerFilm, setTimeFilm] = useState([]);
  const [languageReprodution, setLanguageReprodutio] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([])
  const [productionContries, setProductionCountries] = useState([])

  const uniqDetailsTec = detailChildrenComponent;

  const totalDetails = {
    uniqDetailsTec,
    genresName,
    timerFilm,
    languageReprodution,
    productionCompanies,
    productionContries
  }
   

  const detailsReasolver = () => {
    const genres = detailChildrenComponent.genres.filter((item) => item.name);
    const language_RP = detailChildrenComponent.spoken_languages.filter(
      (item) => item.name
    );

    const production_Companies = detailChildrenComponent?.production_companies.filter((item) => item.name)
    const production_Countries = detailChildrenComponent?.production_countries.filter((item) => item.name)


    setGenresName(genres);
    setLanguageReprodutio(language_RP);
    setProductionCompanies(production_Companies)
    setProductionCountries(production_Countries)
  }

  useEffect(() => {
    detailsReasolver()
  }, []);

  const isOpenDetails = () => {
    openDetails === false ? setOpenDetails(true) : setOpenDetails(false);
  };

  return (
    <div className="container__details__tec__film">
      <article className="article__details_tec_film">
        <div onClick={isOpenDetails} className="content__open__details">
          <h3>{`Ficha Tácnica: ${uniqDetailsTec?.title}`} <BsFillInfoSquareFill /></h3>
          <span>
            {openDetails === true ? (
              <TbArrowBigUpLinesFilled />
             
            ) : (
              <TbArrowBigDownLinesFilled />
            )}
          </span>
        </div>
        {openDetails === true && (
          <div>
            <table border="1" className="table_details">
              <tbody>
                <tr>
                  <td className="name_datails">Genero</td>

                  <td className="value_details">
                    {totalDetails?.genresName.map(({ name }, indx) => (
                      <div className="value_genres td_right">
                        {name}
                        {indx < totalDetails?.genresName.length - 1 && "  "}
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className="name_datails">Data de lançamento</td>
                  <td className="value_details td_right">
                    {totalDetails?.uniqDetailsTec?.release_date &&
                      new Date(totalDetails?.uniqDetailsTec.release_date).toLocaleDateString(
                        "pt-BR"
                      )}
                  </td>
                </tr>
                <tr>
                  <td className="name_datails">Duração</td>
                  <td className="value_details td_right">{`${totalDetails?.timerFilm?.hours}hrs e ${totalDetails?.timerFilm?.minutes}m`}</td>
                </tr>

                <tr>
                  <td className="name_datails">{totalDetails?.languageReprodution.length > 1 ? "Linguagens" : 'Linguagem'}</td>

                  <td className="value_details">
                    {totalDetails?.languageReprodution.map(({ name }, indx) => (
                      <div className="value_genres td_right">
                        {name}
                        {indx < totalDetails?.languageReprodution.length - 1 && "  "}
                      </div>
                    ))}
                  </td>
                </tr>

                <tr>
                  <td className="name_datails">{totalDetails?.productionCompanies.length > 1 ? "Empresas de produções" : 'Empresa de produção'}</td>

                  <td className="value_details">
                    {totalDetails?.productionCompanies.map(({ name }, indx) => (
                      <div className="value_genres td_right">
                        {name}
                        {indx < totalDetails?.productionCompanies.length - 1 && "  "}
                      </div>
                    ))}
                  </td>
                </tr>

                <tr>
                  <td className="name_datails">{totalDetails?.productionContries.length > 1 ? "Cidades de produções" : 'Cidade de produção'}</td>

                  <td className="value_details">
                    {totalDetails?.productionContries.map(({ name }, indx) => (
                      <div className="value_genres td_right">
                        {name}
                        {indx < totalDetails?.productionContries.length - 1 && "  "}
                      </div>
                    ))}
                  </td>
                </tr>

                <tr>
                  <td className="name_datails">Receita</td>

                  <td className="value_details">
                    {uniqDetailsTec?.revenue}
                  </td>
                </tr>

                <tr>
                  <td className="name_datails">Idioma Original</td>

                  <td className="value_details">
                    {uniqDetailsTec?.original_language}
                  </td>
                </tr>

                <tr>
                  <td className="name_datails">Popularidade</td>

                  <td className="value_details">
                    {uniqDetailsTec?.popularity}
                  </td>
                </tr>

                <tr>
                  <td className="name_datails">Avaliação</td>

                  <td className="value_details">
                    {uniqDetailsTec?.vote_average} / 10
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </article>
    </div>
  );
};

export default DetailsTecFilm;
