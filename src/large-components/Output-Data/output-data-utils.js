export default { getDisplayedData };
///////////////////////////////////////////////////////////////////////
/**
 * @name getDisplayedData
 * @description  Retrieve the displayed data and change it whenever the product data changes
 * @param { setFunction } setDisplayedData=> change the displayed data
 * @param { Array} allProducts => All products data
 * @param { Object} searchData => search data (text, search by name || category)
 */
function getDisplayedData(setDisplayedData, allProducts, searchData) {
  setDisplayedData(() =>
    searchData.text
      ? allProducts.filter((product) =>
          product[searchData.by].includes(searchData.text)
        )
      : allProducts
  );
}
