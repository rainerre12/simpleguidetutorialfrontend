import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import DropDownTopic from '../DropDowns/DropDownTopic';
import usePost from "../../usePost";  // Assuming you have a custom hook for POST requests

const AddCategoryModal = ({ title, show, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);

    const [postCategory, { isPending, error }] = usePost('https://localhost:7113/api/Category');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !selectedTopic) {
            alert('Please fill in both name and select a topic.');
            return;
        }

        const newCategory = { name, topicId: selectedTopic.id, removed: false };

        postCategory(newCategory)
            .then(() => {
                onSave();    
                onClose();   
            })
            .catch((error) => {
                console.error("Error adding category:", error);
            });
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='categoryName'>
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='topicDropDown'>
                        <Form.Label>Select Topic</Form.Label>
                        <DropDownTopic onSelectTopic={setSelectedTopic} />
                    </Form.Group>
                </Form>
                {error && <div className='text-danger'>{error}</div>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={handleSubmit} disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddCategoryModal;
