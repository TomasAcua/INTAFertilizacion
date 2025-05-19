import { useState } from 'react'
const CustomButton = ({ children, onClick, type = "button" }) => {
  {/*estilo button de dolar*/} 
    {/*className="flex-1 bg-white hover:bg-green-800 text-[#000000]  hover:text-[#EEEEEE] transition duration-200"*/}
    return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#1B2830] hover:bg-[#0089A9] text-white flex items-center justify-center gap-1 cursor-pointer"
    >
      {children}
    </button>


  );
};

export default CustomButton;