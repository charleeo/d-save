import React from "react";
import RenderTags from './Components/Forms/RenderTags';



const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = React.useState(initialValues || {});
  const [touchedValues, setTouchedValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleBlur = event => {
    const target = event.target;
    const name = target.name;
    setTouchedValues({
      ...touchedValues,
      [name]: true
    });
    const e = validate(values);
    setErrors({
      ...errors,
      ...e
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const e = validate(values);
    setErrors({
      ...errors,
      ...e
    });
    onSubmit({ values, e });
  };

  const renderTag=(name, value,placeholder='',handler,type='text')=>{
    return (
      <input 
       type={type}
       name = {name}
       id={name}
       value={value}
       placeholder={placeholder}
       onChange={handleChange}
      />
    )
   }

  return {
    values,
    touchedValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    renderTag
  };

};

const Test=({name,type='text',placeholder='',values})=>{
  const [val,setVal] = React.useState(values||{})
  const handleChange = (e)=>{
  setVal({ ...val, [e.target.name]:e.target.value})
  }
  console.log(name, type)
 return( 
 <input
  type={type}
  name={name}
  value={val[name]}
  placeholder={placeholder}
  onChange={handleChange}
/>
 )
}
function App() {
  const {
    values,
    touchedValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    renderTag
  } = useForm({
    initialValues: {
      name: "",
      email: "",
      meal: "",
      isGoing: false
    },
    onSubmit(values, errors) {
      alert(JSON.stringify({ values, errors }, null, 2));
    },
    validate(values) {
      const errors = {};

      if (values.name === "") {
        errors.name = "Please enter a name";
      }

      return errors;
    }
  });

  return (
    <div className='container'>
      <form className="shadow " onSubmit={handleSubmit}>
        <h4 className='text-center'>
          Add Guest
          <hr />
        </h4>
        <div className='form-group'>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className='form-group'>
          <label htmlFor="name">Test Here</label>
          <Test
           name="email"
           type='email'
           value={values.email}
           onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-inline">
          <div className="form-group">
            <label htmlFor="meal">Meal Preference</label>
            <select name="meal" value={values.meal} onChange={handleChange}>
              <option value="1">Jollof Rice</option>
              <option value="2">Fried Rice</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="meal">Is Going?</label>
            <input
              name="isGoing"
              type="checkbox"
              value={values.isGoing}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
export default App;