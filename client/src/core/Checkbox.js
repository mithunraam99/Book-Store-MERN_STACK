import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setCheked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    setCheked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input type="checkbox" className="form-check-input 
      onClick={handleToggle(c._id)}
      value={checked.indexOf(c._id === -1)}checkbox-1x" id={i} />{" "}
      <label
        for={i}
        onClick={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        className="form-check-label hov "
      >
        {c.name}
      </label>
    </li>
  ));
};

export default Checkbox;
