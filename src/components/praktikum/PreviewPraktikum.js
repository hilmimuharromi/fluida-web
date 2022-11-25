import React from 'react'
import PreviewHtml from '../editor/preview'
import ModalBase from 'components/base/Modal';

function PreviewPraktikum(props) {
    const {visible, setVisible, data} = props
    return (
        <ModalBase
            className="min-w-3/4"
            visible={visible}
            setVisible={setVisible}
            hideFooter={true}
        >
            <PreviewHtml title={`Soal ke - ${data.key}`} content={data.question} />
        </ModalBase>
    )
}

export default PreviewPraktikum
