import {
  faSmile,
  faLaughBeam,
  faMeh,
  faFrownOpen,
  faSadTear,
  faSadCry,
  faGlobeAsia,
} from "@fortawesome/free-solid-svg-icons";
import CATEGORIES from "./categories.constants";

const style = getComputedStyle(document.body);

const CATEGORIES_TYPE = {
  [CATEGORIES.GOOD]: {
    hex: style.getPropertyValue("--good-color"),
    dark: "#cce5ca",
    light: "#ddeedc",
    icon: faLaughBeam,
  },
  [CATEGORIES.SATISFACTORY]: {
    hex: style.getPropertyValue("--satisfactory-color"),
    dark: "#e3efcb",
    light: "#edf4dd",
    icon: faSmile,
  },
  [CATEGORIES.MODERATE]: {
    hex: style.getPropertyValue("--moderate-color"),
    dark: "#fef0c2",
    light: "#fef5d6",
    icon: faMeh,
  },
  [CATEGORIES.POOR]: {
    hex: style.getPropertyValue("--poor-color"),
    dark: "#fbe1c2",
    light: "#fcebd6",
    icon: faFrownOpen,
  },
  [CATEGORIES.VERY_POOR]: {
    hex: style.getPropertyValue("--very_poor-color"),
    dark: "#f8c5c2",
    light: "#fbd9d6",
    icon: faSadTear,
  },
  [CATEGORIES.SEVERE]: {
    hex: style.getPropertyValue("--severe-color"),
    dark: "#e7c0bd",
    light: "#efd5d3",
    icon: faSadCry,
  },
  [CATEGORIES.ALL]: {
    hex: style.getPropertyValue("--all-color"),
    dark: "#c9dcef",
    light: "#dbe7f5",
    icon: faGlobeAsia,
  },
};

export default CATEGORIES_TYPE;
