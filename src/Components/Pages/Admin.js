import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TopicTable from '../Tables/TopicTable';
import CategoryTable from '../Tables/CategoryTable';
import AddTopicModal from '../Modal/AddTopicModal';
import AddCategoryModal from '../Modal/AddCategoryModal'; // Import the AddCategoryModal
import UpdateTopicModal from '../Modal/UpdateTopicModal';
import UpdateCategoryModal from '../Modal/UpdateCategoryModal';

const Admin = () => {
    // State for AddTopicModal
    const [showTopicModal, setShowTopicModal] = useState(false);
    const [refreshTopics, setRefreshTopics] = useState(false);

    // State for UpdateTopicModal
    const [showUpdateTopicModal, setShowUpdateTopicModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);


    // State for AddCategoryModal
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [refreshCategories, setRefreshCategories] = useState(false);

    //State for UpdateCategoryModal
    const [showUpdateCategoryModal,setShowUpdateCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Handlers for Topic Modal
    const handleShowTopicModal = () => setShowTopicModal(true);
    const handleCloseTopicModal = () => setShowTopicModal(false);
    const handleTopicSave = () => {
        console.log('Topic Save button clicked');
        setRefreshTopics(!refreshTopics);
        handleCloseTopicModal();
    }

    // Handlers for Update Topic Modal
    const handleShowUpdateTopicModal = (topic) => {
        setSelectedTopic(topic);
        setShowUpdateTopicModal(true);
    };
    const handleCloseUpdateTopicModal = () => setShowUpdateTopicModal(false);
    const handleTopicUpdate = () => {
        console.log('Topic Update button clicked');
        setRefreshTopics(!refreshTopics);
        handleCloseUpdateTopicModal();
    }


    // Handlers for Category Modal
    const handleShowCategoryModal = () => setShowCategoryModal(true);
    const handleCloseCategoryModal = () => setShowCategoryModal(false);
    const handleCategorySave = () => {
        console.log('Category Save button clicked');
        setRefreshCategories(!refreshCategories);
        handleCloseCategoryModal();
    }

    // Handlers for Update Category Modal
    const handleShowUpdateCategoryModal = (category) => {
        setSelectedCategory(category);
        setShowUpdateCategoryModal(true);
    };
    const handleCloseUpdateCategoryModal = () => setShowUpdateCategoryModal(false);
    const handleCategoryUpdate = () => {
        console.log('Category Update button clicked');
        setRefreshCategories(!refreshCategories);
        handleCloseUpdateCategoryModal();
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
                                <TopicTable refresh={refreshTopics} onUpdate={handleShowUpdateTopicModal}/>
                            </Card.Body>
                            <Card.Footer className='footer-right'>
                                <Button variant='primary' onClick={handleShowTopicModal}>Add Topic</Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col>
                        <Card border='primary'>
                            <Card.Header className='text-center' as="h5">Categories</Card.Header>
                            <Card.Body>
                                <CategoryTable refresh={refreshCategories} onUpdate={handleShowUpdateCategoryModal}/>
                            </Card.Body>
                            <Card.Footer className='footer-right'>
                                <Button variant='primary' onClick={handleShowCategoryModal}>Add Category</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <AddTopicModal
                title="Add New Topic"
                show={showTopicModal}
                onSave={handleTopicSave}
                onClose={handleCloseTopicModal}
            />

            <UpdateTopicModal
                title="Update Topic"
                show={showUpdateTopicModal}
                onSave={handleTopicUpdate}
                onClose={handleCloseUpdateTopicModal}
                topic={selectedTopic} 
            />

            <AddCategoryModal
                title="Add New Category"
                show={showCategoryModal}
                onSave={handleCategorySave}
                onClose={handleCloseCategoryModal}
            />

            <UpdateCategoryModal
                title="Update Category"
                show={showUpdateCategoryModal}
                onSave={handleCategoryUpdate}
                onClose={handleCloseUpdateCategoryModal}
                category={selectedCategory}
            />

        </>
    );
}

export default Admin;
