import React from 'react'
import {Modal, Button} from "@material-tailwind/react";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
function ModalBase(props) {
    const {title, visible, setVisible, children} = props
    return (
        <Modal size="lg" active={visible} toggler={() =>setVisible(false)}>
        <ModalHeader toggler={() => setVisible(false)}>
            {title}
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
            <Button 
                color="red"
                buttonType="link"
                onClick={(e) =>setVisible(false)}
                ripple="dark"
            >
                Close
            </Button>

            <Button
                color="green"
                onClick={(e) =>setVisible(false)}
                ripple="light"
            >
                Save Changes
            </Button>
        </ModalFooter>
    </Modal>
    )
}

export default ModalBase
