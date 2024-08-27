import { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import useFetch from "../../usefetch";

const DropDownTopic = ({ onSelectTopic }) => {

    const { data: topics, isPending, error } = useFetch('https://localhost:7113/api/Topic');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedTopicName, setSelectedTopicName] = useState('Select Topic');


    const handleSelect = (eventkey) => {
        const selected = topics.find(topic => topic.id.toString() === eventkey);
        setSelectedTopic(selected);
        setSelectedTopicName(selected.name);
        onSelectTopic(selected)
        console.log('Selected Category:', selected);
    }

    return ( 
        <div>
            <DropdownButton title={selectedTopicName} onSelect={handleSelect}>
            {topics && topics.map((topic) => (
                    <Dropdown.Item key={topic.id} eventKey={topic.id.toString()}>
                        {topic.name} (ID: {topic.id})
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
     );
}
 
export default DropDownTopic;