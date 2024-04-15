import MemeCard from '../MemeCard/MemeCard';
import Sidebar from '../Sidebar/Sidebar';
import './MemePage.scss';
import ButtonShare from '../ButtonShare/ButtonShare';
import ButtonCreate from '../ButtonCreate/ButtonCreate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateMemePage from '../CreateMemePage/CreateMemePage';

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
