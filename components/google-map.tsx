export default function GoogleMap({ address }: { address: string }) {
  return (
    <iframe
      title="Google Map"
      width="100%"
      height="200"
      className="border rounded-lg"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps?q=${address}&hl=en&output=embed`}
    />
  );
}
