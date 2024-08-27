import { useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import {  Dropdown , DropdownButton   } from 'react-bootstrap';
import useFetch from "../../usefetch";
import './Table.css';
import useDelete from "../../useDelete";
import ConfirmDeactivateModal from "../Modal/ConfirmDeactivateModal";



const CategoryTable = ({refresh, onUpdate}) => {
    const [filterRemoveStatus, setFilterRemoveStatus] = useState(false);
    const [fetchTrigger,setFetchTrigger] = useState(0);
    const [selectCategory,setSelectedCategory] = useState(null);
    const [showDeactivateModal,setShowDeactivateModal] = useState(false);


    const {data: category, isPending,error} = useFetch(
        `https://localhost:7113/api/Category?filterRemoveStatus=${filterRemoveStatus}&trigger=${fetchTrigger}`
    );
    const { deleteData, isPending: isDeleting, error: deleteError } = useDelete(
        'https://localhost:7113/api/Category'
    );

    useEffect(() => {
        setFetchTrigger((prev) => prev + 1);
    },[refresh,filterRemoveStatus]);

    const handleDropdownSelect = (eventkey) => {
        setFilterRemoveStatus(eventkey === 'inactive');
    }

    const handleUpdateClick = (category) => {
        onUpdate(category);
    }

    const handleDeactivateClick = (category) => {
        setSelectedCategory(category);
        setShowDeactivateModal(true);
    }

    const handleConfirmDeactivate = async () => {
        if(selectCategory){
            await deleteData(selectCategory.id);
            setShowDeactivateModal(false);
            setFetchTrigger((prev) => prev + 1); // Trigger a refresh after deactivation
        }
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
                                       <Dropdown.Item onClick={() => handleUpdateClick(categories)}>
                                            Update
                                       </Dropdown.Item>
                                       <Dropdown.Item onClick={() => handleDeactivateClick(categories)}>
                                            Deativate
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <ConfirmDeactivateModal
                show={showDeactivateModal}
                onHide={() => setShowDeactivateModal(false)}
                body={'Are you sure you want to deactivate this topic category?'}
                onConfirm={handleConfirmDeactivate}
                disabled={isDeleting}
                deleteError={deleteError}
            />

        </div>
     );
}
export default CategoryTable;