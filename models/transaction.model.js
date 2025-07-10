export function createStartTransactionPayload(idTag = "VID-USER-01") {
  return {
    connectorId: 1,
    idTag,
    meterStart: 0,
    timestamp: new Date().toISOString()
  };
}