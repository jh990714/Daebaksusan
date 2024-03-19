import React from 'react';
import './App.css';

import { Router } from 'views/Router';
import { Footer } from 'layouts/Footer';
import { NavigationBar } from 'layouts/NavigationBar';
import { QuickCart } from 'layouts/QuickCart';
import { SideBar } from 'layouts/SideBar';

  
const App: React.FC = () => {
  return (
    <div className="APP">
      <NavigationBar />
      <div className='Router'>
        <Router />
      </div>
      <SideBar />
      <div className='Footer'>
        <Footer />
      </div>
      <QuickCart />
    </div>
  );
}

export default App;
