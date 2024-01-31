import logo from './logo.svg';
import './App.css';
import Mensage from './component/Mensage';
import TopBar from './component/Main/TopBar'
import ResponsiveAppBar from './component/Main/ResponsiveAppBar';

import Events from './component/event/Events';

function App() {
  return (
    <div className="App">
      
      <TopBar/>

      {/* <ResponsiveAppBar/> */}
      {/* <Events/> */}
      {/* <PaperColor/> */}
      
      {/* <Mensage mensaje='Hola'/> */}
    </div>
  );
}

export default App;
