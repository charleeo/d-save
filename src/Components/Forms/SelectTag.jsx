import React from "react";
const SelectTag = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <select name={name} id={name} {...rest} className="form-control">
            <option value="">Please choose</option>
            {options.map(option => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default SelectTag;
