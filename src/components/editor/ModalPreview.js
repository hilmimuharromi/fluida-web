import React from 'react'
import ModalBase from 'components/base/Modal';
import PreviewHtml from './preview'

function ModalPreview(props) {
    const {visible, setVisible, data} = props

    return (
        <ModalBase
        className="min-w-3/4"
        visible={visible}
        setVisible={setVisible}
        hideFooter={true}
      >
          <PreviewHtml title={data.title ? data.title : ""} content={data.content} />
      </ModalBase>
    )
}

export default ModalPreview
