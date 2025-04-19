const metricDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
};

export default metricDate;
