import  React,{useState} from 'react';

import Input from './Input.jsx';

export default function RenderTags(name, label, type = "text", ){
  const [ data, setData ] = useState();

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    // console.log(...data)
  }

  return (
    <Input
      label={label}
      name={name}
      value={data[name]}
      type={type}
      onChange={handleChange}
      id={name}
    />

  );
}
