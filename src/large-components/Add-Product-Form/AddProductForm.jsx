//  STYLE FILE
import "./add-product-form.scss";
//  SMALL COMPONENTS
import { InputGroup, ButtonComponent, Message } from "../../small-components";
//  LIBRARIES
import { useEffect, useState } from "react";
//  UTILS
import Utils from "./add-from-utils.js";
//  SERVICES
import formatNumberToPrice from "../../service/formatNumberToPrice";
const AddProductForm = ({ set_AllProducts, updateData, set_UpdateData }) => {
  ////////////////////////////////// STATES //////////////////////////////////////////////
  const [productData, set_ProductData] = useState({
    name: "",
    price: "",
    quantity: "",
    total: 0,
    category: "",
  });
  const [formMessage, set_formMessage] = useState({
    text: "",
    type: "success",
  });
  ////////////////////////////////// USE_EFFECTS //////////////////////////////////////////////
  // GET THE TOTAL PRICE WHETHER YOU WRITE SOMETHING IN PRICE OR QUANTITY
  useEffect(() => {
    Utils.getTotalPrice(
      set_ProductData,
      productData.price,
      productData.quantity
    );
  }, [productData.price, productData.quantity]);
  //  GET THE PRODUCT DATA WISH SHOULD UPDATE
  useEffect(() => {
    set_ProductData((prevState) =>
      Object.values(updateData.data).length > 0
        ? updateData.data
        : { ...prevState }
    );
  }, [updateData.id]);
  //////////////////////////////// EVENT HANDLERS ////////////////////////////////
  // SUBMIT HANDLER
  function submitHandle(event) {
    event.preventDefault();
    set_formMessage({ text: "please fill all fields", type: "error" }); // error message inputs are not valid
    if (Utils.checkProductData(productData)) {
      if (updateData.id > 0) {
        Utils.updateProduct(set_AllProducts, updateData.id, productData);
        set_formMessage({ text: "successfully updated", type: "success" }); // success message for update
      } else {
        Utils.addProduct(set_AllProducts, productData);
        set_formMessage({ text: "successfully created", type: "success" }); // success message for created product
      }
      Utils.clearData(set_ProductData, set_UpdateData);
    }
    Utils.removeFormMessage(set_formMessage);
  }
  // CHANGE PRODUCT DATA
  function productDataChange(event) {
    const { name: key, value } = event.target;
    set_ProductData((prevState) => ({
      ...prevState,
      [key]: typeof value === "string" ? value.toUpperCase() : value,
    }));
  }

  return (
    <form className="create--product--form" onSubmit={submitHandle}>
      <InputGroup
        info={{
          type: "text",
          id: "article",
          label: "article",
          value: productData.name,
          name: "name",
        }}
        ChangeHandler={productDataChange}
      />
      <div className="total--price-container ">
        <InputGroup
          info={{
            type: "text",
            id: "price",
            label: "price",
            value: productData.price,
            name: "price",
          }}
          ChangeHandler={productDataChange}
        />
        <InputGroup
          info={{
            type: "number",
            id: "quantity",
            label: "quantity",
            value: productData.quantity,
            name: "quantity",
          }}
          ChangeHandler={productDataChange}
        />

        {/* TOTAL PRICE */}
        {productData.total > 0 && (
          <span className="total">
            {formatNumberToPrice(productData.total)}
          </span>
        )}
      </div>
      <InputGroup
        info={{
          type: "text",
          id: "category",
          label: "category",
          value: productData.category,
          name: "category",
        }}
        ChangeHandler={productDataChange}
      />

      <ButtonComponent type={"primary"}>
        {updateData.id > 0 ? "update data" : "create a new product"}
      </ButtonComponent>
      {formMessage.text && (
        <Message type={formMessage.type}>{formMessage.text}</Message>
      )}
    </form>
  );
};
export default AddProductForm;
