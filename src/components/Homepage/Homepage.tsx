import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MemePage from '../MemePage/MemePage';
import PrivateRoute from '../Auth/PrivateRoute';

import './Homepage.scss';
import Signin from '../Modals/Signin/Signin';
import Signup from '../Modals/Signup/Signup';

function App() {
  return (
    <div className="app">
      <Header />
      <MemePage />
      <Footer />
      <BrowserRouter>
        <Routes>
          {/* Using "path" targets the route precisly. When the user will visit this URL or /Signin/example, the route will be activated and rendered on the screen thanks to "element={<Signin />"*/}
          <PrivateRoute exact path="/Signin" component={Signin} />
          {/* Same but for the path "Signup. The "exact" property doesn't work for Route but only for PrivateRoute */}
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
