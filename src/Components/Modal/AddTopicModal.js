import { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import usePost from "../../usePost";


const AddTopicModal = ({title, show, onClose, onSave}) => {
    const[name,setName] = useState('');
    const[postTopic,{isPending,error}] = usePost('https://localhost:7113/api/Topic');


    const handleSave = () => {
        if(name.trim()){
            postTopic({name,removed:false})
                .then(() => {
                    onSave();
                    onClose();
                });
        }else {
            alert('Please enter a topic name.');
        }
    };

    return ( 
       <Modal show={show} onHide={ onClose }>

            <Modal.Header closeButton>
                <Modal.Title>{ title }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='ControlInputTopicName'>
                        <Form.Label>Topic Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='TopicName'
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                </Form>
                {error && <div className='text-danger'>{error}</div>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Close 
                </Button>
                <Button variant='primary' onClick={handleSave} disabled={ isPending } >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </Modal.Footer>
       </Modal>
     );
}
 
export default AddTopicModal;