export function createAuthorizePayload(idTag) {
  return {
    idToken: {
      idToken: idTag,
      type: "Central"
    },
    certificate: null,
    iso15118CertificateHashData: []
  };
}