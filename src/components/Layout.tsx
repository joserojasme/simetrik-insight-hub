
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>© {new Date().getFullYear()} Simetrik Insight Hub</div>
          <div className="mt-2 md:mt-0 flex gap-4">
            <a href="#" className="hover:text-primary">Documentation</a>
            <a href="#" className="hover:text-primary">Support</a>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
