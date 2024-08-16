import { useState } from "react";
import { Table } from "react-bootstrap";
import {  Dropdown , DropdownButton   } from 'react-bootstrap';
import useFetch from "../../usefetch";
import './Table.css';


const CategoryTable = () => {
    const [filterRemoveStatus, setFilterRemoveStatus] = useState(false);
    const {data: category, isPending,error} = useFetch(
        'https://localhost:7113/api/Category',filterRemoveStatus
    );

    const handleDropdownSelect = (eventkey) => {
        setFilterRemoveStatus(eventkey === 'inactive');
    }

    return ( 
        <div>
            <div className="d-flex justify-content-end mb-3">
                <DropdownButton
                    title="Filter"
                    onSelect={handleDropdownSelect}
                >
                    <Dropdown.Item eventKey="all">Show All Categories</Dropdown.Item>
                    <Dropdown.Item eventKey="inactive">Show Inactive Categories Only</Dropdown.Item>
                </DropdownButton>
            </div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {category && (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th className="tableheader">Category Name</th>
                            <th className="tableheader">Belongs To</th>
                            <th className="tableheader">Status</th>
                            <th className="tableheader">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((categories) =>(
                            <tr key={categories.id}>
                                <td className="text-center">{categories.name}</td>
                                <td className="text-center">{categories.topicName}</td>
                                <td className="text-center">
                                    {categories.removed ? 'Inactive' : 'Active'}
                                </td>
                                <td className="text-center">
                                    <DropdownButton id="dropdown-basic-button" title="Action">
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

        </div>

        // <Table striped bordered hover variant="dark">
        //     <thead>            
        //         <tr>
        //             <th className='tableheader'>Topic Name</th>
        //             <th className='tableheader'>Status</th>
        //             <th className='tableheader'>Action</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr>
        //             <td className='text-center'>Test topic</td>
        //             <td className='text-center'>Active</td>
        //             <td className='text-center'>
        //                 <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        //                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        //                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        //                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        //                 </DropdownButton>
        //             </td>
        //         </tr>
        //     </tbody>
        // </Table>
     );
}
 
export default CategoryTable;