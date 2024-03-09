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
      <div style={{marginTop: '180px'}}>
        <Router />
      </div>
      <div style={{marginBottom: '50px'}}>
        <Footer />
      </div>
      <QuickCart />
    </div>
  );
}

export default App;
