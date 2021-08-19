import React from "react";
import PropTypes from "prop-types";

/* ICONS */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* CONSTANTS */
import AQI_TREND from "./aqiTrends.constants";

/* STYLES */
import "./table.css";

const Table = ({ tableData }) => {
  return (
    <div className="table__container">
      <div className="table__title__container">
        <span>Live Air Quality Index by City</span>
        <div className="blob red" />
      </div>

      <div className="table">
        {tableData.map((cityObj) => (
          <tr className="table__row">
            <td className="table__data">{cityObj.city}</td>
            <td className="table__data">
              {cityObj.aqi}
              {cityObj.trend && (
                <FontAwesomeIcon
                  icon={AQI_TREND[cityObj.trend].icon}
                  style={{ color: AQI_TREND[cityObj.trend].color }}
                />
              )}
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
};

export default Table;

Table.propTypes = {
  tableData: PropTypes.instanceOf(Array).isRequired,
};
