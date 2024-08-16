import NavbarBS from "./Components/NavbarBS";
import Home from "./Components/Pages/Home";
import Admin from "./Components/Pages/Admin";
import { Route, Routes } from "react-router-dom";
import SideBarBs from "./Components/SideBarBS";
import SideBarBS2 from "./Components/SideBarBS2";

function App() {
  return(
    <>
      {/* <NavbarBS/>
      <div className="d-flex">
        <SideBarBs/>
        <div className="container-fluid p-4" style={{marginLeft: '200px'}}>
          <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/admin" element={<Admin/>}/>
          </Routes>
        </div>
      </div> */}

      {/* <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </div> */}

      <NavbarBS />
      <div style={{ display: 'flex' }}>
        <SideBarBS2 />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            {/* Add additional routes here */}
          </Routes>
        </div>
      </div>
    </>
    
    
    
  );
  
}

export default App;


