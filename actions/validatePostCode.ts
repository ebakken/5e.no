export default async function validatePostCode(postCode: string) {
  const addresses = await fetch(
    "https://ws.geonorge.no/adresser/v1/sok?" +
      new URLSearchParams({
        postnummer: postCode,
        utkoordsys: "4258",
        treffPerSide: "1",
        side: "0",
        asciiKompatibel: "true",
        fuzzy: "false",
      }).toString()
  ).then((response) => response.json());

  return (
    (addresses?.adresser?.length > 0 &&
      addresses.adresser.at(0).postnummer === postCode &&
      addresses.adresser.at(0).poststed) ||
    undefined
  );
}
