import { useState, useEffect } from "react";
import { Table, Dropdown, DropdownButton } from "react-bootstrap";
import usefetch from "../../usefetch";
import './Table.css';
import useDelete from "../../useDelete";
import ConfirmDeactivateModal from "../Modal/ConfirmDeactivateModal";

const TopicTable = ({ refresh, onUpdate }) => {
    const [filterRemoveStatus, setFilterRemoveStatus] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(0);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);

    const { data: topics, isPending, error } = usefetch(
        `https://localhost:7113/api/Topic?filterRemoveStatus=${filterRemoveStatus}&trigger=${fetchTrigger}`
    );

    const { deleteData, isPending: isDeleting, error: deleteError } = useDelete(
        'https://localhost:7113/api/Topic'
    );

    useEffect(() => {
        setFetchTrigger((prev) => prev + 1);
    }, [refresh, filterRemoveStatus]);

    const handleDropdownSelect = (eventKey) => {
        setFilterRemoveStatus(eventKey === 'inactive');
    };

    const handleUpdateClick = (topic) => {
        onUpdate(topic);
    };

    const handleDeactivateClick = (topic) => {
        setSelectedTopic(topic);
        setShowDeactivateModal(true);
    };

    const handleConfirmDeactivate = async () => {
        if (selectedTopic) {
            await deleteData(selectedTopic.id);
            setShowDeactivateModal(false);
            setFetchTrigger((prev) => prev + 1);  // Trigger a refresh after deactivation
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <DropdownButton
                    title="Filter"
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
                                        <Dropdown.Item onClick={() => handleUpdateClick(topic)}>
                                            Update
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleDeactivateClick(topic)}>
                                            Deactivate
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
                body={'Are you sure you want to deactivate this topic?'}
                onConfirm={handleConfirmDeactivate}
                disabled={isDeleting}
                deleteError={deleteError}
            />

        </div>
    );
};

export default TopicTable;
