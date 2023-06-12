// STYLE FILE
import "./filter-section.scss";
// SMALL COMPONENTS
import { InputGroup, ButtonComponent } from "../../small-components";

const FilterSection = ({ searchData, set_SearchData }) => {
  //////////////////////////////// EVENT HANDLER ////////////////////////////////
  //  CHANGE SEARCH MODE 
  function ChangeActiveBtn(event) {
    const mode = event.target.innerText.toLowerCase();
    set_SearchData((prevMode) => ({ ...prevMode, by: mode }));
  }

  // CHANGE SEARCH TEXT
  function ChangeSearchValue(event) {
    const { value } = event.target;
    set_SearchData((prevState) => ({ ...prevState, text: value.trimStart().toUpperCase() }));
  }

  return (
    <div className="output--filter-container">
      <InputGroup
        info={{
          type: "text",
          id: "search",
          label: `search by ${searchData.by} `,
          value: searchData.text,
        }}
        ChangeHandler={ChangeSearchValue}
      />
      <ButtonComponent
        activeSearchBtn={
          searchData.by === "name" && "button--component--active"
        }
        clickHandler={ChangeActiveBtn}
      >
        name
      </ButtonComponent>
      <ButtonComponent
        activeSearchBtn={
          searchData.by === "category" && "button--component--active"
        }
        clickHandler={ChangeActiveBtn}
      >
        category
      </ButtonComponent>
    </div>
  );
};
export default FilterSection;
