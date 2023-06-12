//  STYLE FILE
import "./output-data.scss";
// BOOTSTRAP COMPONENTS
import { Table } from "react-bootstrap";
// BOOTSTRAP ICONS
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
// LIBRARIES
import { useEffect, useState } from "react";
//  SMALL COMPONENTS
import { ButtonComponent, Message } from "../../small-components";
// UTILITIES
import Utilities from "./output-data-utils";
// SERVICES
import formatNumberToPrice from "../../service/formatNumberToPrice";
const OutputData = ({
  searchData,
  allProducts,
  set_UpdateData,
  set_DeleteData,
}) => {
  ////////////////////////////////// STATES //////////////////////////////////////////////
  const [displayedData, set_DisplayedData] = useState(allProducts || []);
  ////////////////////////////////// UseEFFECT //////////////////////////////////////////////
  useEffect(() => {
    Utilities.getDisplayedData(set_DisplayedData, allProducts, searchData);
  }, [searchData, allProducts]);
  ////////////////////////////////// EVENTS HANDLER //////////////////////////////////////////////
  // EDIT ONE PRODUCT
  function editHandle(id) {
    set_UpdateData({
      updateMode: true,
      id: id,
      data: allProducts.filter((product) => product.id === id)[0],
    });
  }
  ////////////////////////////////// JSX ELEMENTS//////////////////////////////////////////////
  // SHOW PRODUCTS DATA IN TBODY
  const proData = displayedData.map((product, i) => {
    const { id, name, price, quantity, total, category } = product;
    return (
      <tr key={i}>
        <td> {id} </td>
        <td> {name} </td>
        <td> {formatNumberToPrice(price)} </td>
        <td> {quantity} </td>
        <td> {formatNumberToPrice(total)} </td>
        <td> {category} </td>
        <td className="icons--col">
          <MdDeleteOutline
            onClick={() =>
              set_DeleteData((prevState) => ({ ...prevState, id: id }))
            }
            className="table--icon delete--icon"
          />
          <FiEdit
            onClick={() => editHandle(id)}
            className="table--icon edit--icon"
          />
        </td>
      </tr>
    );
  });
  // DELETE ALL BUTTON TEXT
  const deleteAllBtnText = `delete all products
 ${
   searchData.text &&
   "has include " + searchData.by + " " + '"' + searchData.text + '"'
 }  (${displayedData.length})`;

  return (
    <div className="output--data--container">
      {displayedData.length > 0 && (
        <>
          <ButtonComponent
            type="error"
            clickHandler={() =>
              set_DeleteData((prevState) => ({ ...prevState, all: true }))
            }
          >
            {deleteAllBtnText}
          </ButtonComponent>
          <div className="table--box">
            <Table className="product--table" striped variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>product</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                  <th>category</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{proData}</tbody>
            </Table>
          </div>
        </>
      )}
      {displayedData.length === 0 && searchData.text && (
        <Message type={"error"}>
          <h4>{` the product ${searchData.by} "${searchData.text}" was not found  `}</h4>
        </Message>
        //
      )}
    </div>
  );
};

export default OutputData;
