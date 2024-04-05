import PrivateRoute from '../Auth/PrivateRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MemePage from '../MemePage/MemePage';

import './Homepage.scss';
import Signin from '../Modals/Signin/Signin';
import Signup from '../Modals/Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <MemePage />
        <Footer />

        <Routes>
          {/* Using "path" targets the route precisly. */}
          <Route
            path="/Signin"
            element={<PrivateRoute element={<Signin history={history} />} />}
          />
          <Route path="/Signup" element={<Signup history={history} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
