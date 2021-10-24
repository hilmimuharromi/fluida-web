import React from 'react'
import {Modal, Button} from "@material-tailwind/react";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
function ModalBase(props) {
    const {title, visible, setVisible, children, onSave, titleButton, loading, hideFooter, className} = props
    return (
        <Modal className={className} size="lg" active={visible} toggler={() =>setVisible(false)}>
        <ModalHeader toggler={() => setVisible(false)}>
            {title}
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        {!hideFooter && 
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
                onClick={onSave}
                ripple="light"
            >
                {loading && <div className="animate-spin rounded-full  h-5 w-5 border-t-2 border-b-2 border-white-500"></div>}
                {titleButton}
            </Button>
        </ModalFooter>
        }
    </Modal>
    )
}

export default ModalBase
