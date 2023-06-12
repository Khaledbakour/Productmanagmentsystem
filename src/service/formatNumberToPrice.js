// change the number format for the price
const formatNumberToPrice= (nr) => {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(nr);
  return price;
};

export default formatNumberToPrice;
