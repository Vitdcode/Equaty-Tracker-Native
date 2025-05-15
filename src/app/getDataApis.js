import Constants from "expo-constants";

const getPortfolioData = {
  apiUrl: Constants.expoConfig.extra.EXPO_PUBLIC_API_URL,

  getAssets: async () => {
    try {
      const response = await fetch(`${getPortfolioData.apiUrl}/assets`, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  },
  getFixCosts: async () => {
    try {
      const response = await fetch(`${getPortfolioData.apiUrl}/fixed-costs`, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  },
  getSubs: async () => {
    try {
      const response = await fetch(`${getPortfolioData.apiUrl}/subscriptions`, {
        method: "GET",
      });
      const data = response.json();
      return data;
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  },
};

export default getPortfolioData;
