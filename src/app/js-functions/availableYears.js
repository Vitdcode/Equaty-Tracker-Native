import { useAssetsStore } from "../zustand/store";

const getYears = () => {
  const assets = useAssetsStore((state) => state.allAssets);
  let years = new Set();
  assets.map((asset) => {
    years.add(asset.date.split(".")[2]);
  });
  return Array.from(years);
};

export default getYears;
