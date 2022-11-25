import React, { useState, useEffect } from 'react';
import ModalBase from 'components/base/Modal';
import {
    Button,
    Card,
    CardBody,
    CardRow,
} from '@material-tailwind/react';
import H6 from '@material-tailwind/react/Heading6';

import { useSelector, useDispatch } from 'react-redux';
import {
    SetVisibleFormPraktikum,
    SetCurrentQuestionForm,
    SetQuestionsFormPraktikum
} from 'stores/action/praktikumAction';
import Editor from '../editor';


function ModalFormPraktikum() {
    const dispatch = useDispatch();
    const praktikumState = useSelector((state) => state.praktikum);
    const listQuestionForm = praktikumState.listQuestionForm;
    const currentQuestionForm = praktikumState.currentQuestionForm;
    const visible = praktikumState.visibleForm;
    const [question, setQuestion] = useState('');
    const [key, setKey] = useState(listQuestionForm.length + 1);
    const [emptyEditor, setEmptyEditor] = useState(false);

    useEffect(() => {
        if (currentQuestionForm) {
            setQuestion(currentQuestionForm.question);
            setKey(currentQuestionForm.key);
        } else {
            setQuestion('<p></p>');
        }
        //eslint-disable-next-line
    }, [currentQuestionForm]);

    useEffect(() => {
        if (!currentQuestionForm) {
            let key = listQuestionForm.length === 0 ? 1 : listQuestionForm.length + 1;
            setKey(key);
        }
        //eslint-disable-next-line
    }, [currentQuestionForm]);

    const tambahSoal = () => {
        const payload = {
            key: listQuestionForm.length === 0 ? 1 : listQuestionForm.length + 1,
            question,
        };
        console.log('payload', payload)
        if (listQuestionForm.length === 0) {
            dispatch(SetQuestionsFormPraktikum([payload]));
        } else if (currentQuestionForm) {
            const newData = listQuestionForm.map((item) => {
                if (item.key === key) {
                    payload.key = key
                    item = payload;
                }
                return item;
            });
            dispatch(SetQuestionsFormPraktikum(newData));
        } else {
            const NewData = [...listQuestionForm, payload];
            dispatch(SetQuestionsFormPraktikum(NewData));
        }
        dispatch(SetVisibleFormPraktikum(false));
        setQuestion('');
        setKey('');
    };

    return (
        <div className='flex justify-end px-4'>
            <Button
                className='mb-10'
                onClick={() => {
                    setEmptyEditor(true);
                    dispatch(SetCurrentQuestionForm(''));
                    dispatch(SetVisibleFormPraktikum(true));
                }}
            >
                Tambah Soal
            </Button>
            <ModalBase
                visible={visible}
                setVisible={(data) => dispatch(SetVisibleFormPraktikum(data))}
                onSave={tambahSoal}
                titleButton='Tambah Soal'
            >
                <div className='w-full space-x-1'>
                    <Card className='mt-10'>
                        <CardBody>
                            <CardRow className='flex justify-between mb-5'>
                                <H6 color='gray'>Soal ke - {key}</H6>
                            </CardRow>
                            <Editor
                                editorStyle={{
                                    height: '200px' || '500px',
                                    overflow: 'auto',
                                }}
                                isReset={emptyEditor}
                                resetEditor={setEmptyEditor}
                                data={currentQuestionForm.question}
                                setData={setQuestion}
                            />
                        </CardBody>
                    </Card>
                </div>
            </ModalBase>
        </div>
    );
}
export default ModalFormPraktikum;
