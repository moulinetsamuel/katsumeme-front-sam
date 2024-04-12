import MemeCard from '../MemeCard/MemeCard';
import Sidebar from '../Sidebar/Sidebar';
import './MemePage.scss';
import ButtonShare from '../ButtonShare/ButtonShare';

function MemePage() {
  return (
    <div className="MemePageContainer">
      <div className="ButtonContainer">
        <ButtonShare />
      </div>
      <MemeCard />
      <Sidebar />
    </div>
  );
}

export default MemePage;
