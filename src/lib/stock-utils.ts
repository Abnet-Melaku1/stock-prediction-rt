export const getStockName = (symbol: string): string => {
  const stockNames: Record<string, string> = {
    AAPL: "Apple Inc.",
    GOOGL: "Alphabet Inc.",
    MSFT: "Microsoft Corporation",
    AMZN: "Amazon.com Inc.",
    TSLA: "Tesla Inc.",
    META: "Meta Platforms Inc.",
    NVDA: "NVIDIA Corporation",
    CRM: "Salesforce Inc.",
    NFLX: "Netflix Inc.",
    ADBE: "Adobe Inc.",
    PYPL: "PayPal Holdings Inc.",
    INTC: "Intel Corporation",
    AMD: "Advanced Micro Devices Inc.",
    ORCL: "Oracle Corporation",
    CSCO: "Cisco Systems Inc.",
    IBM: "International Business Machines Corp.",
    UBER: "Uber Technologies Inc.",
    LYFT: "Lyft Inc.",
    SNAP: "Snap Inc.",
    ZOOM: "Zoom Video Communications Inc.",
    SHOP: "Shopify Inc.",
    SQ: "Block Inc.",
    ROKU: "Roku Inc.",
    PINS: "Pinterest Inc.",
    DOCU: "DocuSign Inc.",
    ZM: "Zoom Video Communications Inc.",
    PLTR: "Palantir Technologies Inc.",
    SNOW: "Snowflake Inc.",
  };

  return stockNames[symbol] || `${symbol} Inc.`;
};

export const isValidStockSymbol = (symbol: string): boolean =>
  /^[A-Z]{1,5}$/.test(symbol);

export const isValidDateRange = (from: Date, to: Date): boolean => {
  const diffTime = Math.abs(to.getTime() - from.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 3;
};
