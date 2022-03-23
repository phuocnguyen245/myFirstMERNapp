
import { Outlet } from 'react-router-dom';
import Banner from './components/partials/Banner';
import Footer from './components/partials/Footer';
import Header from './components/partials/Header';
import MobileModal from './components/partials/MobileModal';
function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Banner />
      <Footer />
      <MobileModal />
    </div>
  );
}

export default App;
