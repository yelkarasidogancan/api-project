import React, { useState, useEffect } from "react";
import { apiUrl } from "../util/api";
import SearchInput from "../Search/SearchInput";
import FilterCountry from "../FilterCountry/FilterCountry";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState("");

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiUrl}/all`);

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiUrl}/name/${countryName}`);

      if (!res.ok) throw new Error("Not found any country!");

      console.log(res.name);

      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiUrl}/region/${regionName}`);

      if (!res.ok) throw new Error("Failed.....");
      const data = await res.json();

      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="all__country__wrapper">
      <div className="country__top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
      </div>
      <div className="country__bottom">
        {isLoading && !error && <h4>Loading.........</h4>}
        {error && !isLoading && <h4>{error}</h4>}
        {countries?.map((country, i) => (
          <div key={i} className="country__card">
            <div className="country__img">
              <img src={country.flags.png} alt="" />
            </div>
            <div className="country__data">
              <h3>{country.name.common}</h3>
              <h6>Population: {country.population}</h6>
              <h6>Region: {country.region}</h6>
              <h6>Capital: {country.capital}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;
