import { useState } from "react";
import axios from "axios";

const CountrySearch = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState("");

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const urlCountry = "https://restcountries.com/v3.1/name"
  const urlWeather = "https://api.openweathermap.org/data/2.5/weather?"
  const urlWeatherImg = "https://openweathermap.org/img/wn"

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 0) {
      try {
        const response = await axios.get(
          `${urlCountry}/${searchQuery}`
        );
        const data = response.data;
        if (data.length > 10) {
          setMessage("Demasiados resultados, por favor se más especifico.");
          setCountries([]);
        } else if (data.length > 1) {
          setMessage("");
          setCountries(data);
          setSelectedCountry(null);
          setWeather(null);
        } else if (data.length === 1) {
          setMessage("");
          setCountries(data);
          setSelectedCountry(data[0]);
          fetchWeather(data[0].capital[0]);
        } else {
          setMessage("No se encontraron países.");
          setCountries([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Error al buscar países.");
        setCountries([]);
      }
    } else {
      setCountries([]);
      setMessage("");
    }
  };

  const fetchWeather = async (capital) => {
    try {
      const response = await axios.get(
        `${urlWeather}q=${capital}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    }
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital[0]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Escribe el nombre de un país"
      />
      {message && <p>{message}</p>}
      <div className="container">
        {selectedCountry ? (
          <div className="container" key={selectedCountry.cca3}>
            <div className="subContainer">
              <h3>{selectedCountry.name.common}</h3>
              <p>Capital: {selectedCountry.capital}</p>
              <p>Área: {selectedCountry.area} km²</p>
              <p>
                Idiomas: {Object.values(selectedCountry.languages).join(", ")}
              </p>
              <img
                src={selectedCountry.flags.png}
                alt={`Bandera de ${selectedCountry.name.common}`}
                width="100"
              />
            </div>
            {weather && (
              <div className="subContainer">
                <h4>Clima en {selectedCountry.capital}</h4>
                <p>Temperatura: {weather.main.temp} °C</p>
                <p>Clima: {weather.weather[0].description}</p>
                <p>Viento: {weather.wind.speed} m/s</p>
                <img
                  src={`${urlWeatherImg}/${weather.weather[0].icon}@2x.png`}
                  alt="Icono del clima"
                />
              </div>
            )}
          </div>
        ) : (
          countries.map((country) => (
            <div key={country.cca3}>
              <h3>{country.name.common}</h3>
              <button onClick={() => handleShowDetails(country)}>
                Mostrar detalles
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CountrySearch;
