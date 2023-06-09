import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import styled from "./App.module.css";
import { Cards } from "./components/Cards/Cards.jsx";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import { About } from "./components/About/About.jsx";
import { Detail } from "./components/Detail/Detail.jsx";
import { Form } from "./components/Form/Form.jsx";
import Favorites from "./components/Favorites/Favorites";

function App() {
  const [characters, setCharacters] = useState([]);

  let navigate = useNavigate();

  const [access, setAccess] = useState(false);
  const username = "gallardimarcos98@gmail.com";
  const password = "Soyhenry1!";

  const login = (userData) => {
    if (userData.username === username && userData.password === password) {
      setAccess(true);
      navigate("/home");
    }
  };

  const logout = () => {
    setAccess(false);
    navigate("/");
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const onSearch = (character) => {
    fetch(`https://rickandmortyapi.com/api/character/${character}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          characters.find((element) => element.id === data.id) === undefined
            ? setCharacters((characters) => [...characters, data])
            : window.alert("No puede usar mas de una tarjeta igual");
        } else {
          window.alert("No hay personajes con ese ID");
        }
      });
  };

  const random = () => {
    let numeroRandom = Math.floor(Math.random() * 826);
    onSearch(numeroRandom);
  };

  const onClose = (id) => {
    setCharacters(characters.filter((element) => element.id !== id));
  };

  let location = useLocation();

  return (
    <div className={styled.background}>
      <div>
        {location.pathname !== "/" ? (
          <NavBar onSearch={onSearch} random={random} logout={logout} />
        ) : undefined}
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Form login={login} />} />

          <Route
            path="/Home"
            element={<Cards characters={characters} onClose={onClose} />}
          />
          <Route path="/About" element={<About />} />
          <Route path="/Favorites" element={<Favorites />} />

          <Route path="/detail/:detailId" element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
