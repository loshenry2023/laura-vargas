export default function converterGMT(date) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  const formatDate = new Date(date).toLocaleString(
    "en-US",
    {
      timeZone: timeZone,
      hourCycle: 'h23',
    }
  );
	return formatDate;
}