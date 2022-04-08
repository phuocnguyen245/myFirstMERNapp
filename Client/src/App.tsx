import React from 'react';
import { IntlProvider } from 'react-intl';
import { Outlet } from 'react-router-dom';
import Banner from './components/partials/Banner';
import Footer from './components/partials/Footer';
import Header from './components/partials/Header';
import MobileModal from './components/partials/MobileModal';
function App() {
  return (
    <div className="App">
      <IntlProvider locale={'vi'} defaultLocale={'vi'}>
        <Header />
        <Outlet />
        <Banner />
        <Footer />
        <MobileModal />
      </IntlProvider>
    </div>
  );
}

export default App;
