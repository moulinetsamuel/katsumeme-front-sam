import { useContext } from 'react';
import MemeEditor from '../CreateMemePage/MemeEditor';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MemePage from '../MemePage/MemePage';

import './Homepage.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <MemePage />
      <Footer />
    </div>
  );
}

export default App;
