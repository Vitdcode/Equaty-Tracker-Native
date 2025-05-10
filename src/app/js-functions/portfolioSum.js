const portfolioSum = (assets) => {
  return Object.values(assets[assets.length - 1]["generalAssets"]).reduce((acc, value) => {
    return (acc += parseFloat(value));
  }, 0);
};

export default portfolioSum;
