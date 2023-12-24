export default function converterGMT(date, timeZone= "America/Bogota") {
  const formatDate = new Date(date).toLocaleString(
    "en-US",
    {
      timeZone: timeZone,
      hourCycle: 'h23',
    }
  );
	return formatDate;
}