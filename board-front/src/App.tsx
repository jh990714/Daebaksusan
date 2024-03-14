import React from 'react';
import './App.css';

import { TopNavigationBar } from 'layouts/topNavigationBar';
import { Router } from 'views/Router';
import { Footer } from 'layouts/Footer';
import { NavigationBar } from 'layouts/NavigationBar';
import { QuickCart } from 'layouts/QuickCart';

  
const App: React.FC = () => {
  return (
    <div className="APP">
      {/* <TopNavigationBar /> */}
      <NavigationBar />
      <div className='Router'>
        <Router />
      </div>
      <div className='Footer'>
        <Footer />
      </div>
      <QuickCart />
    </div>
  );
}

export default App;
