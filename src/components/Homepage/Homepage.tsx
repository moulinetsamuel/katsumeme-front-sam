import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import MemePage from '../MemePage/MemePage';
import './Homepage.scss';
import { useEffect } from 'react';
import useUserStore from '../UserStore/UserState';
import CreateMemePage from '../CreateMemePage/CreateMemePage';
import Footer from '../Footer/Footer';

function App() {
  const { setAppState } = useUserStore();

  useEffect(() => {
    setAppState();
  }, []);

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<MemePage />} />
        <Route path="/create-meme" element={<CreateMemePage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
