import Modal from 'react-bootstrap/Modal';
import { ReactNode } from 'react';

interface ModalProps {
    title: string;
    text: ReactNode;
}

function MessageModal(props: ModalProps) {
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial', color: "white", backgroundColor: "none"}}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{props.text}</p>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}

export default MessageModal;
