import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './CreateMemePage.scss';
import MemeEditor from './MemeEditor';

function CreateMemePage() {
  //Add const for logged in user
  //const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="CreateMemePage">
      <Header />
      <MemeEditor />
      <Footer />
    </div>
  );
}

export default CreateMemePage;
