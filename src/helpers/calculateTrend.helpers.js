const calculateTrend = (updated, mapData) => {
  if (mapData.length !== 0) {
    const currentAqi = mapData.filter((map) => map.city === updated.city);

    if (updated.aqi > currentAqi[0]?.aqi) {
      return "up";
    }
    if (updated.aqi < currentAqi[0]?.aqi) {
      return "down";
    }
  }

  return null;
};

export default calculateTrend;
