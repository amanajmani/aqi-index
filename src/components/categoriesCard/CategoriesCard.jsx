import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./categoriesCard.css";

const CategoriesCard = ({
  mapData,
  category,
  icon,
  color,
  setFilterCategory,
  backgroundColor,
  hoverColor,
  filterCategory,
  setFilterByCity,
}) => {
  const [hover, setHover] = React.useState(false);

  const handleBackground = () => {
    if (filterCategory === category) {
      if (hover) {
        return hoverColor;
      }
      return backgroundColor;
    }

    return "#fff";
  };

  const style = {
    background: handleBackground(),
  };

  const toggleHover = () => {
    setHover((prevState) => !prevState);
  };

  const handleClick = () => {
    setFilterByCity("all");
    setFilterCategory(category);
  };

  const getCitiesCountByCategory = () => {
    if (category === "all") {
      return mapData.length;
    }
    return mapData.filter((map) => map.category === category).length;
  };

  return (
    <div
      className="categories__card"
      onClick={handleClick}
      style={style}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      aria-hidden="true"
    >
      <FontAwesomeIcon icon={icon} size="2x" className={`${category}__icon`} />
      <span style={{ color }}>{category.replace(/_/g, " ")}</span>
      <span style={{ color }} className="cities__count">
        #{getCitiesCountByCategory()}
      </span>
    </div>
  );
};

export default CategoriesCard;

CategoriesCard.propTypes = {
  mapData: PropTypes.instanceOf(Array).isRequired,
  setFilterCategory: PropTypes.func.isRequired,
  filterCategory: PropTypes.string,
  setFilterByCity: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  icon: PropTypes.instanceOf(Object).isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
};

CategoriesCard.defaultProps = {
  filterCategory: null,
};
