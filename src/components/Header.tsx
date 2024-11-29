import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white p-4 rounded-md shadow-md flex flex-row justify-between items-center">
      <a
        href="https://ntamadakis.gr/projects/project/website-pintabs-organizer-by-ntamas"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="logo/Logo128.png"
          alt="Logo"
          className="w-[40px] aspect-square"
        />
      </a>
      <h1 className="text-xl text-gray-800 font-bold">
        Website Pintabs Organizer <span className="text-sm">by Ntamas</span>
      </h1>
    </header>
  );
};

export default Header;
