import React from 'react'

type HeaderProps = {
    appTitle?: string;
};

const Header: React.FC<HeaderProps> = ({appTitle = "Article Filter Application"}) => {
  return (
    <header className="bg-blue-600 text-white px-6 py-4 shadow-md" role="banner">
      <h1 className="text-xl font-semibold" tabIndex={0}>{appTitle}</h1>
    </header>
  )
}

export default Header