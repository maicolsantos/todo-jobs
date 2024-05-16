export const generateUniqueId = () => {
  const min = 100;
  const max = 999;
  const uniqueId = Math.floor(Math.random() * (max - min + 1)) + min;

  return uniqueId
}
