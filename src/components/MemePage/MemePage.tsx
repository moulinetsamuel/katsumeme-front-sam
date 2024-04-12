import MemeCard from '../MemeCard/MemeCard';
import Sidebar from '../Sidebar/Sidebar';
import ButtonShare from '../ButtonShare/ButtonShare';
import './MemePage.scss';
import ButtonCreate from '../ButtonCreate/ButtonCreate';

function MemePage() {
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
