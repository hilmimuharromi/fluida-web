import React, { useState, useEffect } from 'react';
import ModalBase from 'components/base/Modal';
import {
  Button,
  Input,
  Card,
  CardBody,
  CardRow,
} from '@material-tailwind/react';
import H6 from '@material-tailwind/react/Heading6';

import { useSelector, useDispatch } from 'react-redux';
import {
  GetListSoalLatihan,
  SetListQuestionForm,
  SetVisibleFormSoalLatihan,
  SetCurrentQuestionForm,
} from 'stores/action/soalLatihanAction';
import axios from 'axios';
import CardOptions from './CardOptions';
import { useHistory } from 'react-router-dom';
import Editor from '../editor';

const optionsDefault = [
  {
    key: 1,
    option: '',
    isTrue: false,
  },
  {
    key: 2,
    option: '',
    isTrue: false,
  },
  {
    key: 3,
    option: '',
    isTrue: false,
  },
  {
    key: 4,
    option: '',
    isTrue: false,
  },
];

function ModalFormMateri() {
  const dispatch = useDispatch();
  const soalLatihanState = useSelector((state) => state.soalLatihan);
  const listQuestionForm = soalLatihanState.listQuestionForm;
  const currentQuestionForm = soalLatihanState.currentQuestionForm;

  const visible = soalLatihanState.visibleForm;
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.data);

  const [question, setQuestion] = useState('');
  const [key, setKey] = useState(listQuestionForm.length + 1);
  const [options, setOptions] = useState(optionsDefault);
  const [emptyEditor, setEmptyEditor] = useState(false);

  useEffect(() => {
    if (currentQuestionForm) {
      setQuestion(currentQuestionForm.question);
      setKey(currentQuestionForm.key);
      setOptions(currentQuestionForm.options);
    } else {
      setQuestion('<p></p>');
      setOptions(optionsDefault);
    }
  }, [currentQuestionForm]);

  useEffect(() => {
    if (!currentQuestionForm) {
      let key = listQuestionForm.length === 0 ? 1 : listQuestionForm.length + 1;
      setKey(key);
    }
  }, [currentQuestionForm]);

  const tambahSoal = () => {
    const payload = {
      key,
      question,
      options,
    };
    if (listQuestionForm.length === 0) {
      dispatch(SetListQuestionForm([payload]));
    } else if (currentQuestionForm) {
      const newData = listQuestionForm.map((item) => {
        if (item.key === key) {
          item = payload;
        }
        return item;
      });
      dispatch(SetListQuestionForm(newData));
    } else {
      const NewData = [...listQuestionForm, payload];
      dispatch(SetListQuestionForm(NewData));
    }
    dispatch(SetVisibleFormSoalLatihan(false));
    setQuestion('');
    setOptions(optionsDefault);
    setKey('');
  };

  return (
    <div className='flex justify-end px-4'>
      <Button
        className='mb-10'
        onClick={() => {
          setEmptyEditor(true);
          dispatch(SetCurrentQuestionForm(''));
          dispatch(SetVisibleFormSoalLatihan(true));
        }}
      >
        Tambah Soal
      </Button>
      <ModalBase
        visible={visible}
        setVisible={(data) => dispatch(SetVisibleFormSoalLatihan(data))}
        onSave={tambahSoal}
        titleButton='Tambah Soal'
        loading={loading}
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
            <CardOptions
              id={key}
              options={options}
              setOptions={(data) => setOptions(data)}
            />
          </Card>
        </div>
      </ModalBase>
    </div>
  );
}
export default ModalFormMateri;
