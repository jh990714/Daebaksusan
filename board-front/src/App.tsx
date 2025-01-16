import React, { useState } from 'react';
import './App.css';

import { Router } from 'views/Router';
import { Footer } from 'layouts/Footer';
import { NavigationBar } from 'layouts/NavigationBar';
import { QuickCart } from 'layouts/QuickCart';
import { SideBar } from 'layouts/SideBar';
import { CartProvider } from 'hook/CartProvider';
import { AuthProvider } from 'hook/AuthProvider';
import AdList from 'layouts/AdList';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="APP">
      <AuthProvider>
        <CartProvider>
          <NavigationBar />
          <div className="Router">
            <Router />
          </div>
          <SideBar />
          <div className="Footer">
            <Footer />
          </div>
          <QuickCart />

          {/* Modal */}
          <AdList />
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
