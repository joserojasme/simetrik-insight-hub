
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">
            <Link to="/">Simetrik Insight Hub</Link>
          </h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-600 hover:text-primary">Dashboard</Link></li>
            <li><Link to="/churn" className="text-gray-600 hover:text-primary">Churn Risk</Link></li>
            <li><Link to="/upsell" className="text-gray-600 hover:text-primary">Up-sell Potential</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
