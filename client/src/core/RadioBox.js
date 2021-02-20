import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices.map((p, i) => (
        <div className="rad1" key={i}>
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2 ml-4 rad"
            />
            <label className="form-check-label hov`">{p.name}</label>
        </div>
    ));
};

export default RadioBox;
