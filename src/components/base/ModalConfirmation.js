import React from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

export default function ModalConfirmation(props) {
    const {visible, setVisible, title, description, onSave, titleButton, loading} = props
    return (
        <>
            <Modal size="sm" active={visible} toggler={() => setVisible(false)}>
                <ModalHeader toggler={() => setVisible(false)}>
                    {title}
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal">
                       {description}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="green"
                        ripple="light"
                        onClick={(e) => setVisible(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        
                        onClick={onSave}
                        color="red"
                        buttonType="link"
                        ripple="dark"
                    >
                          {loading && <div className="animate-spin rounded-full  h-5 w-5 border-t-2 border-b-2 border-white-500"></div>}
                       {titleButton}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}