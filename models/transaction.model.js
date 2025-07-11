export function createStartTransactionPayload(idTag = "VID-USER-01", connectorId = 1) {
  return {
    connectorId,
    idTag,
    meterStart: 0,
    timestamp: new Date().toISOString()
  };
}

export function createStopTransactionPayload(transactionId = "TX-VID-01", meterStop = 1000, idTag = "VID-USER-01") {
  return {
    transactionId,
    meterStop,
    timestamp: new Date().toISOString(),
    idTag
  };
}