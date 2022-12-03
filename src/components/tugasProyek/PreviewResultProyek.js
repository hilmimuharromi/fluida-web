import React from 'react'
import ModalBase from 'components/base/Modal';
import Button from "@material-tailwind/react/Button";
import {Input} from "@material-tailwind/react";

function PreviewResultProyek(props) {
    const {visible, setVisible, data, loadingScore, submitScore, score, isAddScore, setScore} = props
    return (
        <ModalBase
            className="w-full"
            visible={visible}
            setVisible={setVisible}
            title={data.user && `Jawaban dari ${data.user.email}`}
            hideFooter={true}
        >
            <div style={{width: "60vw", height:"70vh"}}>
                <iframe src={`${data.answer}#view=fitH`} title="testPdf" height="100%" width="100%" />
            </div>
            {
                isAddScore && <div className={'flex justify-center align-middle gap-2 mt-3'}>
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

export default PreviewResultProyek
