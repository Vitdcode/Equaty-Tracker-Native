const portfolioSumFirstEntry = (assets) => {
  return Object.values(assets[0]["generalAssets"]).reduce((acc, value) => {
    return (acc += parseFloat(value));
  }, 0);
};

export default portfolioSumFirstEntry;
