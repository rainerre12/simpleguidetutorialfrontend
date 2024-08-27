import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeactivateModal = ({ show, onHide, onConfirm, body, disabled, deleteError }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deactivation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    No
                </Button>
                <Button variant="danger" onClick={onConfirm} disabled={disabled}>
                    {disabled ? 'Deactivating...' : 'Yes'}
                </Button>
            </Modal.Footer>
            {deleteError && <div className="text-danger p-2">{deleteError}</div>}
        </Modal>
    );
};

export default ConfirmDeactivateModal;
