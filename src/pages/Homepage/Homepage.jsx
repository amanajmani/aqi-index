import React from "react";
import PropTypes from "prop-types";

/* COMPONENTS */
import CategoriesCard from "../../components/categoriesCard";
import Map from "../../components/map/Map";
import Table from "../../components/table";
import Header from "../../components/header";

/* CONSTANTS */
import CATEGORIES_TYPE from "../../constants/categoriesType.constants";

/* STYLES */
import "./homepage.css";
import "leaflet/dist/leaflet.css";

const Homepage = ({
  mapData,
  filterCategory,
  setFilterCategory,
  tableData,
  filterByCity,
  setFilterByCity,
  mapCenter,
  mapZoom,
}) => {
  return (
    <div className="root">
      <div className="left__container">
        <Header
          tableData={tableData}
          setFilterByCity={setFilterByCity}
          filterByCity={filterByCity}
          setFilterCategory={setFilterCategory}
        />

        <div className="categories__container">
          {Object.keys(CATEGORIES_TYPE).map((key) => (
            <CategoriesCard
              key={key}
              category={key}
              icon={CATEGORIES_TYPE[key].icon}
              color={CATEGORIES_TYPE[key].hex}
              backgroundColor={CATEGORIES_TYPE[key].light}
              hoverColor={CATEGORIES_TYPE[key].dark}
              mapData={mapData}
              setFilterCategory={setFilterCategory}
              filterCategory={filterCategory}
              setFilterByCity={setFilterByCity}
            />
          ))}
        </div>

        <Map
          center={mapCenter}
          zoom={mapZoom}
          mapData={mapData}
          filterCategory={filterCategory}
          filterByCity={filterByCity}
        />
      </div>

      <div className="right__container">
        <Table tableData={tableData} />
      </div>
    </div>
  );
};

export default Homepage;

Homepage.propTypes = {
  mapData: PropTypes.instanceOf(Array).isRequired,
  filterCategory: PropTypes.string,
  setFilterCategory: PropTypes.func.isRequired,
  tableData: PropTypes.instanceOf(Array).isRequired,
  filterByCity: PropTypes.string.isRequired,
  setFilterByCity: PropTypes.func.isRequired,
  mapCenter: PropTypes.instanceOf(Object).isRequired,
  mapZoom: PropTypes.number.isRequired,
};

Homepage.defaultProps = {
  filterCategory: null,
};
