import Constants from "expo-constants";

const updateData = {
  apiUrl: Constants.expoConfig.extra.EXPO_PUBLIC_API_URL,

  updateAssets: async (data) => {
    try {
      await fetch(`${updateData.apiUrl}/assets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  },
  updateFixCosts: async (data) => {
    try {
      await fetch(`${updateData.apiUrl}/fixed-costs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  },
  updateSubs: async (data) => {
    try {
      await fetch(`${updateData.apiUrl}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  },
};

export default updateData;
