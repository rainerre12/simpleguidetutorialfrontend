import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "./SideBarStyleBS.css";


const SideBarBs = () => {
    return (
        // <div  className="container-fluid">
        //   <div className="row">
        //     <div className="bg-dark col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column">
        //       <div>
        //         <a href="" className="text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter ms-3 mt-2">
        //           <i className="fs-4 bi bi-speedmeter"></i>
        //           <span className="ms-1 fs-4 d-none d-sm-inline">Brand</span>
        //         </a>
        //         <hr className='text-secondary d-none d-sm-block'/>
        //         <ul className="nav nav-pills flex-columns mt-3 mt-sm-0">

        //           <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
        //             <a href="#" className="nav-link text-white fs-5" aria-current="page">
        //               <i className="bi bi-speedometer2"></i>
        //               <span className="ms-3 d-none d-sm-inline"> Dashboard</span>
        //             </a>
        //           </li>

        //           <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
        //             <a href="#" className="nav-link text-white fs-5" aria-current="page">
        //               <i className="bi bi-table"></i>
        //               <span className="ms-3 d-none d-sm-inline"> Admin Dashboard</span>
        //             </a>
        //           </li>
        //         </ul>
        //       </div>

        //       <div className="dropdown open">
        //         <a className="text-decoration-none text-white dropdown-toggle p-3" type="button" id='triggerId'
        //            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //             <i className="bi bi-person-circle"></i> 
        //              <span className='ms-2 d-none d-sm-inline'>Rainerre</span>
        //           </a>
        //           <div className="dropdown-menu" aria-labelledby='triggerId'>
        //             <a href="#" className="dropdown-item">
        //               <span className='d-sm-inline'>1</span>
        //               <span className='d-none d-sm-block'>Action</span>
        //             </a>
        //             <a href="#" className="dropdown-item disabled"> Disabled Action</a>
        //           </div>
        //       </div>

        //     </div>
        //   </div>
        // </div>

        <div className="bg-dark d-flex flex-column p-3 text-white min-vh-100">
            <a href="#" className="text-decoration-none d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i className="fs-4 bi bi-speedmeter"></i>
                <span className="fs-4 ms-2">Simple Guide</span>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-white">
                        <i className="bi bi-speedometer2"></i>
                        <span className="ms-2">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin" className="nav-link text-white">
                        <i className="bi bi-table"></i>
                        <span className="ms-2">Admin Dashboard</span>
                    </Link>
                </li>
            </ul>
            <hr/>
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle"></i>
                    <strong className="ms-2">Rainerre</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>



      );
}
 
export default SideBarBs;