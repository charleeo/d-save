import React, { Component } from "react";
// import Joi from "joi-browser";
import Input from "./input";
import SelectTag from "./selectTag";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    genres: []
  };

  // validate = () => {
  //   const result = Joi.validate(this.state.data, this.schema);
  //   if (!result.error) return null;
  //   const errors = {};
  //   for (let item of result.error.details) errors[item.path[0]] = item.message;
  //   return errors;
  // };

  // validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   const schema = { [name]: this.schema[name] };
  //   const { error } = Joi.validate(obj, schema);
  //   return error ? error.details[0].message : null;
  // };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderButton = label => {
    return (
      <div className="row justify-content-center">
        <div className="form-group">
          <button disable={this.validate()} className="btn btn-info">
            {label}
          </button>
        </div>
      </div>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        name={name}
        value={data[name]}
        type={type}
        onChange={this.handleChange}
        id={name}
        error={errors[name]}
      />
    );
  };
  renderSelectTag = (name, label, options) => {
    const { errors } = this.state;
    return (
      <SelectTag
        label={label}
        name={name}
        options={options}
        onChange={this.handleChange}
        id={name}
        error={errors[name]}
      />
    );
  };
}

export default Form;
