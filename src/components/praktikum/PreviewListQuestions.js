import React from 'react'
import PreviewHtml from '../editor/preview'
import ModalBase from 'components/base/Modal';

function PreviewListQuestion(props) {
    const {visible, setVisible, data} = props
    return (
        <ModalBase
            className="min-w-6/12"
            visible={visible}
            setVisible={setVisible}
            hideFooter={true}
        >
            {
                data &&  data.questions.map((item) => (
                    <div className={'mt-7'}>
                        <PreviewHtml title={`Soal ke - ${item.key}`} content={item.question} />
                    </div>
                ))
            }
        </ModalBase>
    )
}

export default PreviewListQuestion
