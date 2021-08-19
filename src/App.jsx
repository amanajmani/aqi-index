import React, { useEffect, useState } from "react";

/* API WEBSOCKET */
import { initiateSocket, subscribe } from "./services/socket.services";

/* COMPONENTS */
import Homepage from "./pages/Homepage";

/* CONSTANTS */
import DEFAULT_COORDINATES from "./constants/defaultCoordinates.constants";
import DEFAULT_ZOOM from "./constants/defaultZoom.constants";

/* UTILS */
import roundToTwo from "./utils/rountToTwo.utils";

/* HELPERS */
import getCategory from "./helpers/getCategory.helpers";
import calculateTrend from "./helpers/calculateTrend.helpers";

/* SERVICES */
import getCoordinates from "./services/coordinates.services";

/* STYLES */
import "leaflet/dist/leaflet.css";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterByCity, setFilterByCity] = useState("all");
  const [mapCenter, setMapCenter] = useState(DEFAULT_COORDINATES);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [coordinatesObj, setCoordinatesObj] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("coordinates");
    const initialValue = JSON.parse(saved);
    return initialValue || {};
  });

  useEffect(() => {
    if (filterByCity !== "all") {
      const cityCoordinates = mapData.filter(
        (map) => map.city === filterByCity
      )[0].coordinates;
      setMapCenter(cityCoordinates);
      setMapZoom(7);
    } else {
      setMapCenter(DEFAULT_COORDINATES);
      setMapZoom(DEFAULT_ZOOM);
    }
  }, [filterByCity]);

  async function renderCoordinates(cityName) {
    const cities = await getCoordinates(cityName);
    if (typeof cities !== "undefined") {
      return cities.results[0].locations[0].displayLatLng;
    }

    return null;
  }

  const storeCoordinates = (cityName) => {
    renderCoordinates(cityName).then((value) => {
      setCoordinatesObj((prevState) => ({
        ...prevState,
        [cityName]: value,
      }));
    });
  };

  useEffect(() => {
    // persisting coordinates
    localStorage.setItem("coordinates", JSON.stringify(coordinatesObj));
  }, [coordinatesObj]);

  function updateCitiesData(index, currentCities, newCityObj) {
    if (index >= 0) {
      const currCityObj = currentCities[index];
      const newCityKeys = Object.keys(newCityObj);

      newCityKeys.forEach((key) => {
        currCityObj[key] = newCityObj[key];
      });
    } else {
      currentCities.push(newCityObj);
      if (!(newCityObj.city in coordinatesObj)) {
        storeCoordinates(newCityObj.city);
      }
    }
  }

  useEffect(() => {
    initiateSocket();
  }, []);

  useEffect(() => {
    subscribe((updatedData) => {
      const tempData = mapData;

      updatedData.forEach((updated) => {
        const updatedCityObj = updated;
        updatedCityObj.category = getCategory(
          updatedCityObj.aqi,
          filterCategory
        );
        updatedCityObj.trend = calculateTrend(updatedCityObj, mapData);
        updatedCityObj.aqi = roundToTwo(updatedCityObj.aqi);

        // Append Coordinates
        if (Object.keys(coordinatesObj).length !== 0) {
          if (updatedCityObj.city in coordinatesObj) {
            updatedCityObj.coordinates = coordinatesObj[updatedCityObj.city];
          }
        }

        // Check if city already exists
        function cityExists(city) {
          return city.city === updatedCityObj.city;
        }
        const index = tempData.findIndex(cityExists);

        // If city exists update aqi else add the new city
        updateCitiesData(index, tempData, updatedCityObj);
      });

      setData(updatedData);
      setMapData(tempData);
      setTableData(tempData);
    });
  });

  return (
    <Homepage
      tableData={tableData}
      mapData={mapData}
      setMapData={setMapData}
      setFilterCategory={setFilterCategory}
      filterCategory={filterCategory}
      setFilterByCity={setFilterByCity}
      filterByCity={filterByCity}
      mapCenter={mapCenter}
      mapZoom={mapZoom}
    />
  );
};

export default App;
