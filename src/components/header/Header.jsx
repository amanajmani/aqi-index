import React from "react";
import PropTypes from "prop-types";

/* STYLES */
import "./header.css";

const Header = ({
  tableData,
  filterByCity,
  setFilterByCity,
  setFilterCategory,
}) => {
  const handleFilterCity = (event) => {
    const { value } = event.target;
    setFilterByCity(value);
    setFilterCategory(null);
  };

  return (
    <div className="header">
      <span>AQI Tracker</span>
      <select
        className="dropdown"
        onChange={handleFilterCity}
        value={filterByCity}
      >
        <option defaultValue="all">Select your city</option>
        {tableData.map((table) => (
          <option key={table.city} value={table.city}>
            {table.city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;

Header.propTypes = {
  setFilterCategory: PropTypes.func.isRequired,
  tableData: PropTypes.instanceOf(Array).isRequired,
  filterByCity: PropTypes.string.isRequired,
  setFilterByCity: PropTypes.func.isRequired,
};
