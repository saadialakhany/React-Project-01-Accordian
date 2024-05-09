import React, { useState } from "react";
import data from "./data.js";
import "./style.css";

function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelection, setMultipleSelection] = useState([]);

  const handleSingleSelection = function (currentId) {
    setSelected(currentId === selected ? null : currentId);
  };

  function btnOnClick(e) {
    e.target.classList.toggle("btn--selected");
    setEnableMultiSelection(!enableMultiSelection);
  }
  function handleMultipleSelection(currentId) {
    let multipleSelectionCopy = [...multipleSelection];
    const findIndexOfCurrentId = multipleSelectionCopy.indexOf(currentId);

    if (findIndexOfCurrentId === -1) multipleSelectionCopy.push(currentId);
    else multipleSelectionCopy.splice(findIndexOfCurrentId, 1);

    setMultipleSelection(multipleSelectionCopy);
  }

  return (
    <div className="wrapper">
      <div className="accordian">
        <button className="btn" onClick={btnOnClick}>
          Enable Multiple Selection
        </button>
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                className="title"
                onClick={
                  enableMultiSelection
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                key={dataItem.id}
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {selected === dataItem.id ||
              multipleSelection.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div> No Data Found </div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
