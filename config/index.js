export const config = {
  cpVendor: process.env.CP_VENDOR || "Vidyutva",
  cpModel: process.env.CP_MODEL || "AC001",
  cpSerial: process.env.CP_SERIAL || "CH-VID-01",
  cpVersion: process.env.CP_VERSION || "0.0.2.7",
  iccid: process.env.CP_ICCID || "1234567890",
  imsi: process.env.CP_IMSI || "9876543210",
  reason: process.env.CP_REASON || "PowerUp",
};