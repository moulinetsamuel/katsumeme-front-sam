import { BrowserRouter } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MemePage from '../MemePage/MemePage';

import './Homepage.scss';

import { useEffect } from 'react';
import useUserStore from '../UserStore/UserState';

function App() {
  const setAppState = useUserStore((state) => state.setAppState);

  useEffect(() => {
    setAppState();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <MemePage />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
