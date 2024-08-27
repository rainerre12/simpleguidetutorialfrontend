import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import DropDownTopic from '../DropDowns/DropDownTopic';
import useUpdate from '../../useUpdate';

const UpdateCategoryModal = ({ title, show, onClose, onSave, category }) => {
    const [name, setName] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);

    const { updateData, isPending, error } = useUpdate('https://localhost:7113/api/Category');

    // Ensure that category is defined before attempting to use its properties
    useEffect(() => {
        if (category) {
            setName(category.name || '');
            setSelectedTopic({ id: category.topicId, name: category.topicName } || null);
        }
    }, [category]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !selectedTopic) {
            alert('Please fill in both name and select a topic.');
            return;
        }

        const updatedCategory = { name, topicId: selectedTopic.id, removed: category.removed };

        updateData(category.id, updatedCategory)
            .then(() => {
                onSave();    
                onClose();   
            })
            .catch((error) => {
                console.error("Error updating category:", error);
            });
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {category ? (
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
                            <DropDownTopic 
                                onSelectTopic={setSelectedTopic} 
                                selectedTopic={selectedTopic} 
                            />
                        </Form.Group>
                    </Form>
                ) : (
                    <div>Loading...</div> // Handle case when category is undefined
                )}
                {error && <div className='text-danger'>{error}</div>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={handleSubmit} disabled={isPending || !category}>
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default UpdateCategoryModal;