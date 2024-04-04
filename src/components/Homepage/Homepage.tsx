import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MemeCard from '../MemeCard/MemeCard';

import './Homepage.scss';

function Homepage() {
  return (
    <div className="app">
      <Header />
      <MemeCard />
      <Footer />
    </div>
  );
}

export default Homepage;
