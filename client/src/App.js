import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router} from "react-router-dom";
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          setMovieList(response.data)
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = id => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <Router>
    <div>
      <KaydedilenlerListesi list={[movieList]} />
      {movieList.map((movie) => (
        <div key={movie.id}>
          <Link to ={"/filmler/${movie.id}"}>{movie.title}</Link>
        </div>
      ))}

    </div>
    </Router>
  );
}
