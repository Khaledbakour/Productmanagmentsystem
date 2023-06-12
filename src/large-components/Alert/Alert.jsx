//  STYLE FILE
import "./alert.scss";
//  SMALL COMPONENTS
import ButtonComponent from "../../small-components/Button-Component/ButtonComponent";

const Alert = ({
  deleteData,
  set_DeleteData,
  set_AllProducts,
  searchData,
  allProducts,
}) => {
  const alertText = ` Are you sure you want to delete ${
    deleteData.all
      ? "ALL PRODUCT"
      : "product named  " +
        allProducts.filter((pro) => pro.id === deleteData.id)[0].name
  } ?`;
  // CLEAR DELETE DATA && CLOSE ALERT
  function closeAlert() {
    set_DeleteData({ id: -1, all: false });
  }
  //////////////////////////////// FUNCTIONS ////////////////////////////////
  // DELETE HANDLER

  function deleteHandler() {
    if (deleteData.all) {
      deleteAllProducts();
    } else if (deleteData.id > 0) {
      deleteOneData(deleteData.id);
    } else {
      console.log("No data to delete somethings is wrong");
    }
    closeAlert();
  }

  // DELETE ALL PRODUCTS
  function deleteAllProducts() {
    set_AllProducts((prevState) =>
      searchData.text
        ? prevState.filter(
            (product) => !product[searchData.by].includes(searchData.text)
          )
        : []
    );
  }
  // DELETE ONE PRODUCT
  function deleteOneData(id) {
    set_AllProducts((prevState) =>
      prevState.filter((product) => product.id !== id)
    );
  }

  return (
    <>
      <div onClick={closeAlert} className="alert--blur"></div>
      <div className="alert--container">
        <h4 className="alert--title">Delete All product</h4>
        <p className="alert--info--text">{alertText}</p>
        <div className="alert--buttons">
          <ButtonComponent clickHandler={deleteHandler} type="error">
            yes
          </ButtonComponent>
          <ButtonComponent clickHandler={closeAlert}>Cancel</ButtonComponent>
        </div>
      </div>
    </>
  );
};
export default Alert;
