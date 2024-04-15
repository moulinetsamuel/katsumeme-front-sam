import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MemePage from '../MemePage/MemePage';
import './Homepage.scss';
import { useEffect } from 'react';
import useUserStore from '../UserStore/UserState';
import CreateMemePage from '../CreateMemePage/CreateMemePage';


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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-meme" element={<CreateMemePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
