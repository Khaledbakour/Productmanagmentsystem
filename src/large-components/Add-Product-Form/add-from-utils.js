// EXPORT ALL FUNCTION DEFINED HERE
export default {
  addProduct,
  updateProduct,
  checkProductData,
  getTotalPrice,
  removeFormMessage,
  clearData,
};
///////////////////////////////////////////////////////////////////////
/**
 * @name addProduct
 * @description Add a new product
 * @param { setFunction } setAllProducts=> Adding the product to the array (the state) of all products
 * @param { Object} proData => the data of the current product
 */
function addProduct(setAllProducts, proData) {
  setAllProducts((prevProducts) => [
    ...prevProducts,
    {
      id: prevProducts.length + 1,
      ...proData,
      name: proData.name.trim(),
    },
  ]);
}
///////////////////////////////////////////////////////////////////////
/**
 * @name updateProduct
 * @description change the data of the
 * @param { setFunction } setCallback
 * @param { Number }  proId => The id of the product that should be updated
 * @param { Object}   proData=> The updated product data
 */
function updateProduct(setAllProducts, proId, proData) {
  setAllProducts((prevProducts) =>
    prevProducts.map((product) => (product.id === proId ? proData : product))
  );
}
///////////////////////////////////////////////////////////////////////
/**
 * @name checkProductData
 * @description it CHECK the data of the product data ( the inputs form )
 * @param   { setFunction } setCallback
 * @param   { Number }  proId   => The id of the product that should be updated
 * @param   { Object}   proData => The updated product data
 * @returns { Boolean } =>  TRUE if  the data (the inputs) are not empty else FALSE
 */
function checkProductData(proData) {
  const proDataValues = Object.values(proData);
  return proDataValues.every((value) => value);
}
///////////////////////////////////////////////////////////////////////
/**
 * @name getTotalPrice
 * @description it multiply the number of products by the price
 * @param   {setFunction} setProData =>  change the data (the state) of the current product
 * @param   {Number} price  => Product price
 * @param   {Number} number => Number of products
 * @returns {Number}=> Total price -> sum of the multiplication
 */
function getTotalPrice(setProData, price, number) {
  setProData((prevState) => ({
    ...prevState,
    total: price > 0 && number > 0 ? price * number : 0,
  }));
}
///////////////////////////////////////////////////////////////////////
/**
 * @name removeFormMessage
 * @description -> Remove the form message after it has been displayed to the user
 * @param {setFunction } setFormMessage =>  Change the data (the state) of the form message
 */
function removeFormMessage(setFormMessage) {
  setTimeout(() => {
    setFormMessage({ text: "", type: "success" });
  }, 3000);
}
///////////////////////////////////////////////////////////////////////
/**
 * @name clearProductData
 * @description -> Clear all inputs form after every update || create data
 *              -> Rest the update data object
 * @param {setFunction } setProData      =>  change the data (the state) of the current product
 * @param {setFunction } setUpdateProduct=>  change the data (the state) of the product wish should be updated
 */
function clearData(setProData, setUpdateProduct) {
  // Clear all inputs form after update || create data
  setProData((prevProduct) => {
    let objEmptyValues = {};
    const ProDataKeys = Object.keys(prevProduct);
    ProDataKeys.forEach((key) => {
      if (key !== "id") objEmptyValues[key] = "";
    });
    return objEmptyValues;
  });
  //   Rest the update data object
  setUpdateProduct({ updateMode: false, id: -1, data: {} });
}
