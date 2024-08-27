import axios from "axios";
import { useState,useEffect } from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import useUpdate from "../../useUpdate";





const UpdateTopicModal = ({show, onClose, onSave, topic}) => {
    const [name, setName] = useState('');
    const {updateData, isPending, error} = useUpdate('https://localhost:7113/api/Topic');
    
    useEffect(() => {
       if(topic)
            setName(topic.name)
    },[topic]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedTopic = { name, removed: topic.removed };
            await updateData(topic.id,updatedTopic);
            onSave();
            onClose();
        }catch(err){
            console.error('Failed to update topic:',err);
        }
    }

    if(!topic)
        return null;

    return ( 
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Topic</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="topicName">
                        <Form.Label>Topic Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {error && <div className="text-danger">{error}</div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </Modal.Footer>

        </Modal>
     );
}
 
export default UpdateTopicModal;