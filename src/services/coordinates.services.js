import COORDINATED_URL from "../constants/coordinatesURL.constants";

async function getCoordinates(cityName) {
  const url = `${COORDINATED_URL}&location=${cityName}`;

  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }

  return null;
}

export default getCoordinates;
