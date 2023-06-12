//  BOOTSTRAP FILE
import "bootstrap/dist/css/bootstrap.min.css";
//  STYLE FILE
import "./app.scss";
//  LARGE COMPONENTS
import {
  AddProductForm,
  Alert,
  FilterSection,
  Header,
  OutputData,
} from "./large-components";
//  LIBRARIES
import { useState, useEffect } from "react";

function App() {
  //////////////////////////////// STATES ////////////////////////////////
  const [searchData, set_SearchData] = useState({ text: "", by: "name" });
  const [allProducts, set_AllProducts] = useState(
    localStorage["products"] ? JSON.parse(localStorage["products"]) : []
  );
  const [updateData, set_UpdateData] = useState({ id: -1, data: {} });
  const [deleteData, set_DeleteData] = useState({ id: -1, all: false });
  //////////////////////////////// UseEFFECTS ////////////////////////////////
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(allProducts));
  }, [allProducts]);

  return (
    <div className="mother--container">
      {(deleteData.id > 0 || deleteData.all) && (
        <Alert
          deleteData={deleteData}
          set_DeleteData={set_DeleteData}
          set_AllProducts={set_AllProducts}
          allProducts={allProducts}
          searchData={searchData}
        />
      )}
      <Header />
      <AddProductForm
        set_AllProducts={set_AllProducts}
        updateData={updateData}
        set_UpdateData={set_UpdateData}
      />
      <FilterSection searchData={searchData} set_SearchData={set_SearchData} />
      <OutputData
        searchData={searchData}
        allProducts={allProducts}
        set_UpdateData={set_UpdateData}
        set_DeleteData={set_DeleteData}
      />
    </div>
  );
}

export default App;
