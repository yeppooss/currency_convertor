const API_DOMAIN = "https://v6.exchangerate-api.com/v6";
const API_KEY = "2429e9ab17b29dd3553ca39b";

export const endpointPath = (from) => `${API_DOMAIN}/${API_KEY}/latest/${from}`
