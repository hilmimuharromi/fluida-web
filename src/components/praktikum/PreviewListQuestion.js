import React, {useState, useEffect} from 'react'
import PreviewHtml from '../editor/preview'
import ModalBase from 'components/base/Modal';
import Button from "@material-tailwind/react/Button";
import {
    CardFooter,
    Input,
    Textarea,
} from '@material-tailwind/react';
function PreviewListQuestion(props) {
    const {visible, setVisible, data, answer, isAddScore, submitScore, loadingScore} = props
    const [score, setScore] = useState(props.score)

    const getAnswer  = (item) => {
        const isFound = answer.find((a) => a.key === item.key)
        if (isFound) {
        return isFound.essay
        } else return ''
    }

    useEffect(() => {
        if(props.score) {
            setScore(props.score)
        }
    }, [props.score])

    return (
        <ModalBase
        className="min-w-6/12"
        visible={visible}
        setVisible={setVisible}
        hideFooter={true}
      >
          {
             data &&  data.praktikum.questions.map((item) => (
                  <>
                  <PreviewHtml title={`Soal ke - ${item.key}`} content={item.question} />
                      <CardFooter className={'my-5 h-100'}>
                          <Textarea
                              type='text'
                              color='lightBlue'
                              size='regular'
                              placeholder={`Jawaban Siswa`}
                              outline={true}
                              disabled={true}
                              value={getAnswer(item)}
                          />
                      </CardFooter>
                 </>
             ))
          }
            {
                isAddScore && <div className={'flex justify-center align-middle gap-2'}>
                <div>
                    <Input
                        className={'w-3/12'}
                        type='text'
                        color='lightBlue'
                        size='regular'
                        placeholder={`Nilai`}
                        outline={true}
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                    />
                </div>
                    <Button
                        disabled={loadingScore}
                        className={'w-3/12'}
                        color='blueGray'
                        buttonType='filled'
                        onClick={() => {
                            submitScore(score)
                        }}
                    >
                        {
                            loadingScore && <div className="animate-spin rounded-full  h-5 w-5 border-t-2 border-b-2 border-white-500"></div>
                        }
                        Simpan Nilai
                    </Button>
                </div>
            }
      </ModalBase>
    )
}

export default PreviewListQuestion
