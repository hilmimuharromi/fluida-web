import React from 'react'
import PreviewHtml from '../editor/preview'
import ModalBase from 'components/base/Modal';
import CardOptions from './CardOptions'

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
                  <>
                  <PreviewHtml title={`Soal ke - ${item.key}`} content={item.question} />
                  <CardOptions options={item.options} disabled={true}/>
                 </>
             ))
          }
      </ModalBase>
    )
}

export default PreviewListQuestion
