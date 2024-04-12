import MemeCard from '../MemeCard/MemeCard';
import Sidebar from '../Sidebar/Sidebar';
import ButtonShare from '../ButtonShare/ButtonShare';
import './MemePage.scss';
import ButtonCreate from '../ButtonCreate/ButtonCreate';

function MemePage() {
  const handleButton = async () => {
    await axios
      .get('https://katsumeme-8c128449f9bf.herokuapp.com/api/test')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="ButtonContainer">
        <ButtonShare />
        <ButtonCreate />
      </div>
      <MemeCard />
      <Sidebar />
    </div>
  );
}

export default MemePage;
