export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-BA", {
    style: "currency",
    currency: "BAM",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  //set unique values
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
