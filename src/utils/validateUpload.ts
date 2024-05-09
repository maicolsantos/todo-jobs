import { Jobs } from "../@types/jobs";

export function validateUpload(data: Partial<Jobs[]>) {
  // Check if the input is an array
  if (!Array.isArray(data)) {
    console.log();

    return false;
  }

  // Define the required properties and their types
  const requiredProperties = {
    link: "string",
    evidencies: "object", // we will check array specifically below
    info: "string",
    createdAt: "string",
    updatedAt: "string",
  };

  // Define a function to validate date strings in "dd/mm/yyyy" format
  function isValidDate(dateStr: string) {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateRegex.exec(dateStr);
    if (!match) {
      return false;
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  // Iterate through the array and check each object
  for (const item of data) {
    // Check if the item is an object
    if (typeof item !== "object" || item === null) {
      return false;
    }

    // Check each required property
    for (const [key, type] of Object.entries(requiredProperties)) {
      if (!(key in item)) {
        return false; // Missing required property
      }

      // Validate the type of the property
      if (type === "string" && typeof item[key as never] !== "string") {
        return false;
      }

      if (type === "object" && !Array.isArray(item[key as never])) {
        return false;
      }

      if (key === "createdAt" || key === "updatedAt") {
        if (!isValidDate(item[key])) {
          return false;
        }
      }
    }
  }

  // If all checks pass, the data format is valid
  return true;
}
