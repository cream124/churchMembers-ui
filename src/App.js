import logo from './logo.svg';
import './App.css';
import { Button } from "@mui/material";
import Mensage from './component/Mensage';
// import Header from './component/Main/Header';
import TopBar from './component/Main/TopBar'
import Service from './component/event/Service';
import ResponsiveAppBar from './component/Main/ResponsiveAppBar';

import Events from './component/event/Events';
import PaperColor from './component/Examples/PaperColor';
import From1 from './component/Login/From1';

function App() {
  return (
    <div className="App">
      
      <TopBar/>

      {/* <ResponsiveAppBar/> */}
      {/* <Button variant='outlined' color='primary'>AAA</Button> */}
      {/* <Events/> */}
      {/* <PaperColor/> */}
      
      {/* <Mensage mensaje='Hola'/> */}
    </div>
  );
}

export default App;
