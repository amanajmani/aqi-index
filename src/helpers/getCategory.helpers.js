/* CONSTANTS */
import CATEGORIES from "../constants/categories.constants";

const getCategory = (aqi) => {
  if (aqi >= 0 && aqi < 51) {
    return CATEGORIES.GOOD;
  }
  if (aqi >= 51 && aqi < 101) {
    return CATEGORIES.SATISFACTORY;
  }
  if (aqi >= 101 && aqi < 201) {
    return CATEGORIES.MODERATE;
  }
  if (aqi >= 201 && aqi < 301) {
    return CATEGORIES.POOR;
  }
  if (aqi >= 301 && aqi < 401) {
    return CATEGORIES.VERY_POOR;
  }
  if (aqi >= 401) {
    return CATEGORIES.SEVERE;
  }

  return null;
};

export default getCategory;
