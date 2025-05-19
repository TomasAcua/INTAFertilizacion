import { useEffect } from "react";
const Header = () => {
  return (
    <header className="bg-gray-300 text-gray-500 px-6 py-4 flex justify-between items-center">
      <div className="text-3xl font-awesome">IRIA EL LOGO</div>
      <nav>
        <ul className="flex gap-6">
          <li className="text-3xl font-awesome">REDIRIJIRIA A HOME</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;