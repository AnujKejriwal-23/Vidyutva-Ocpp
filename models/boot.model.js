export function createBootPayload(config) {
  return {
    chargingStation: {
      serialNumber: config.cpSerial,
      model: config.cpModel,
      vendorName: config.cpVendor,
      firmwareVersion: config.cpVersion,
      modem: {
        iccid: config.iccid,
        imsi: config.imsi,
      },
    },
    reason: config.reason,
  };
}