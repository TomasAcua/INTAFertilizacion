import { useState } from 'react'
const Button = ({ children, onClick, className }) => {
  {/*estilo button de dolar*/} 
    {/*className="flex-1 bg-white hover:bg-green-800 text-[#000000]  hover:text-[#EEEEEE] transition duration-200"*/}
    return (
    <button
      onClick={onClick}
      className={className}
    >
      {children}
    </button>


  );
};

export default Button;