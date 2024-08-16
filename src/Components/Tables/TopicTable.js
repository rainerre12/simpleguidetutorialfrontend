import { useState,useEffect } from "react";
import { Table } from "react-bootstrap";
import {  Dropdown , DropdownButton   } from 'react-bootstrap';
import usefetch from "../../usefetch";
import './Table.css';

const TopicTable = ({refresh}) => {
    const [filterRemoveStatus, setFilterRemoveStatus] = useState(false);
    const [fetchTrigger,setFetchTrigger] = useState(0);

    const {data: topics, isPending, error } = usefetch(
        `https://localhost:7113/api/Topic?filterRemoveStatus=${filterRemoveStatus}&trigger=${fetchTrigger}`
    );

    useEffect(() => {
        setFetchTrigger((prev) => prev + 1);
    },[refresh,filterRemoveStatus]);

    const handleDropdownSelect = (eventKey) => {
        // Update filterRemoveStatus based on the selected option
        setFilterRemoveStatus(eventKey === 'inactive');
    };


    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
               
                <DropdownButton
                    title= "Filter"
                    onSelect={handleDropdownSelect}
                >
                    <Dropdown.Item eventKey="all">Show All Topics</Dropdown.Item>
                    <Dropdown.Item eventKey="inactive">Show Inactive Topics Only</Dropdown.Item>
                </DropdownButton>

            </div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {topics && (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th className='tableheader'>Topic Name</th>
                            <th className='tableheader'>Status</th>
                            <th className='tableheader'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((topic) => (
                            <tr key={topic.id}>
                                <td className='text-center'>{topic.name}</td>
                                <td className='text-center'>
                                    {topic.removed ? 'Inactive' : 'Active'}
                                </td>
                                <td className='text-center'>
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
     );
}
 
export default TopicTable;