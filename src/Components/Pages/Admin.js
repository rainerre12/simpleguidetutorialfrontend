import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TopicTable from '../Tables/TopicTable';
import CategoryTable from '../Tables/CategoryTable';
import AddTopicModal from '../Modal/AddTopicModal';



const Admin = () => {
    const [showModal,setShowModal] = useState(false);
    const [refreshTopics,setRefreshTopics] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleTopicSave = () => {
        console.log('Save button clicked');
        setRefreshTopics(!refreshTopics);
        handleCloseModal();
    }

    return ( 
        <>
            <h1 className='text-center'>Admin Page</h1>
            <Container>
                <Row>
                <Col>
                    <Card border='primary'>
                        <Card.Header className='text-center' as="h5">Topic</Card.Header>
                        <Card.Body>
                            <TopicTable refresh={refreshTopics}/>
                        </Card.Body>
                        <Card.Footer className='footer-right'>
                            <Button variant='primary' onClick={handleShowModal} >Add Topic</Button>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col>
                    <Card border='primary'>
                        <Card.Header className='text-center' as="h5">Categories</Card.Header>
                        <Card.Body>
                            <CategoryTable/>
                        </Card.Body>
                        <Card.Footer className='footer-right'>
                            <Button variant='primary'>Add Category</Button>
                        </Card.Footer>
                    </Card>
                </Col>
                </Row>
            </Container>

            <AddTopicModal 
                title="Add New Topic"
                show={showModal}
                onSave={handleTopicSave}
                onClose={handleCloseModal}
            />
        </>
     );
}
 
export default Admin;