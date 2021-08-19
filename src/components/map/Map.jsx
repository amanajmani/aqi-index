import React from "react";
import PropTypes from "prop-types";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon } from "leaflet";

/* ICONS */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* CONSTANTS */
import CATEGORIES_TYPE from "../../constants/categoriesType.constants";
import MAP_ATTRIBUTION_URL from "./constants/mapAttributionURL.constants";
import MAP_TILE_LAYER_URL from "./constants/mapTileLayerURL.constants";

/* STYLES */
import "./map.css";

const showDataOnMap = (data, filterCategory, filterByCity) => {
  const filteredData =
    data.length !== 0 && data.filter((e) => e.category && e.coordinates);

  const iconMarkup = (icon, category) =>
    renderToStaticMarkup(
      <FontAwesomeIcon
        icon={icon}
        size={filterByCity !== "all" ? "4x" : "lg"}
        className={`${category}__icon`}
      />
    );

  const customMarkerIcon = (icon, category) =>
    divIcon({
      html: iconMarkup(icon, category),
    });

  const filterCitiesData = (tempData) => {
    if (filterCategory !== "all" && filterCategory !== null) {
      return tempData.filter((temp) => temp.category === filterCategory);
    }
    if (filterByCity !== "all") {
      return tempData.filter((temp) => temp.city === filterByCity);
    }
    return tempData;
  };

  return (
    filteredData &&
    filteredData.length !== 0 &&
    filterCitiesData(filteredData).map((e) => (
      <Marker
        data="customdata"
        position={[
          e.coordinates && e.coordinates.lat,
          e.coordinates && e.coordinates.lng,
        ]}
        icon={customMarkerIcon(CATEGORIES_TYPE[e.category].icon, e.category)}
      >
        <Popup>
          <div className="info__container">
            <div className="city__name">{e.city}</div>
            <div className="city__aqi">AQI Index: {e.aqi}</div>
          </div>
        </Popup>
      </Marker>
    ))
  );
};

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ center, zoom, mapData, filterCategory, filterByCity }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} doubleClickZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer url={MAP_TILE_LAYER_URL} attribution={MAP_ATTRIBUTION_URL} />
        {showDataOnMap(mapData, filterCategory, filterByCity)}
      </MapContainer>
    </div>
  );
}

export default Map;

Map.propTypes = {
  mapData: PropTypes.instanceOf(Array).isRequired,
  filterCategory: PropTypes.string.isRequired,
  filterByCity: PropTypes.string.isRequired,
  center: PropTypes.instanceOf(Object).isRequired,
  zoom: PropTypes.number.isRequired,
};
