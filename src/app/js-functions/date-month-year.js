function formatDateToGermanMonthYear(dateString) {
  const germanMonthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const parts = dateString.split(".");

  if (parts.length !== 3) {
    console.error(`Failed to parse date string: "${dateString}". Expected format "DD.MM.YYYY".`);
    return null;
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Validate the parsed numbers roughly (check if they are valid numbers and within reasonable ranges)
  if (isNaN(day) || isNaN(month) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31) {
    console.error(`Invalid date values parsed from string: "${dateString}".`);
    return null;
  }

  const germanMonthName = germanMonthNames[month - 1];
  return `${germanMonthName} ${year}`;
}

export default formatDateToGermanMonthYear;
