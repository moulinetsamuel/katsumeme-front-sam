import CreateMemePage from '../CreateMemePage/CreateMemePage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MemePage from '../MemePage/MemePage';

import './Homepage.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <MemePage />
      <CreateMemePage />
      <Footer />
    </div>
  );
}

export default App;
