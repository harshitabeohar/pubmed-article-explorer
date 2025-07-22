import React from "react";

type HeaderProps = {
  appTitle?: string;
  onResetSearch: () => void;
};

const Header: React.FC<HeaderProps> = ({
  appTitle = "PubMed Article Explorer App",
  onResetSearch,
}) => {
  return (
    <header
      className="bg-primary text-white px-6 py-4 shadow-md flex items-center justify-between w-full"
      role="banner"
      aria-label="Header with app title and login button"
    >
      <h1
        className="text-xl font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        tabIndex={0}
      >
        {appTitle}
      </h1>
      <div className="flex items-center flex justify-end gap-3">
        <button
          onClick={onResetSearch}
          className="p-2 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          aria-label="Reset Search"
          title="Reset Search"
        >
          Reset Search
        </button>
        <button
          className="bg-background text-primary font-semibold px-4 py-2 rounded hover:bg-blue-100 transition ocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
          aria-label="Login to your account"
          onClick={() => alert("Login functionality not implemented yet")}
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
