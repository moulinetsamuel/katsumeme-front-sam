import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './CreateMemePage.scss';

function CreateMemePage() {
  //Add const for logged in user
  //const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="create-meme-page">
      <Header />
      <MemeEditor />
      <Footer />
    </div>
  );
}

export default CreateMemePage;
