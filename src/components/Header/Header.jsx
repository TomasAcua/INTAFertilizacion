import { useEffect } from "react";
import headerimg from "../../assets/logos/Logos_header.png"

const Header = () => {
  return (
    <header className="bg-gray-300 text-gray-500 px-6 py-4 flex justify-between items-center">
      <img src={headerimg} alt="Logo" className="flex items-center" />
      <nav>
        <ul className="flex gap-6">
          <li className="text-3xl font-awesome">REDIRIJIRIA A HOME</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;