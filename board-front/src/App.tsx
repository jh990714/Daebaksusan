import React from 'react';
import './App.css';

import { TopNavigationBar } from 'layouts/topNavigationBar';
import { Router } from 'views/Router';
import { Footer } from 'layouts/Footer';
import { NavigationBar } from 'layouts/NavigationBar';

  
const App: React.FC = () => {
  return (
    <div className="APP">
      {/* <TopNavigationBar /> */}
      <NavigationBar />
      <div style={{marginTop: '180px'}}>
        <Router />
      </div>
      <Footer />
    </div>
  );
}

export default App;
