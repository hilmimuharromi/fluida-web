import React, {useState} from 'react'
import ModalBase from 'components/base/Modal'
import { Button, Input } from '@material-tailwind/react'
import Editor from '../editor'
function ModalFormMateri() {
    const [visible, setVisible] = useState(false)
    return (
        <div className="flex justify-end px-4">
        <Button className="mb-10" onClick={() => setVisible(true)}>New Materi</Button>
        <ModalBase visible={visible} setVisible={setVisible}>
            <div className="w-full space-x-1">
            <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={false}
                placeholder="Title"
            />
           <Editor />
        </div>
        </ModalBase>
    </div>
    )
}
// import ModalBase from 'components/base/Modal'
export default ModalFormMateri
