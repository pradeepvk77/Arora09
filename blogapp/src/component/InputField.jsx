import React, { useState, useId} from "react";

const InputField = React.forwardRef(function InputField({label,type,placeholder},ref){
    const [email,setEmail] = useState("");
    const id = useId();

    return (
      <div className="flex-col mb-5"> 
      <label htmlFor="email" className="block font-semibold mb-2">{label}</label>
      <input  
            type={type} 
            id={id} 
            name="email" 
            value={email} 
            placeholder={placeholder}
            onChange={(e)=>(setEmail(e.target.value))} 
            className="w-full px-3 py-2 border bg-white border-gray-300 bg-opacity-50 placeholder:text-black placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-blue-500"
            required
            ref={ref}
            />
      </div>
  )
}
)

export default InputField;
