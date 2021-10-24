import React, { useState, useEffect } from 'react';
import ModalBase from 'components/base/Modal';
import { Button, Input } from '@material-tailwind/react';
import Editor from '../editor';
import { useSelector, useDispatch } from 'react-redux';
import { GetListPraktikum, SetVisibleFormPraktikum } from 'stores/action/praktikumAction';
import axios from 'axios'
function ModalFormMateri() {
  const dispatch = useDispatch();
  const praktikumState = useSelector((state) => state.praktikum);
  const visible = praktikumState.visibleForm;
  const editData = praktikumState.currentData;
  const current_id = praktikumState.currentData._id;
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.user.data)

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setContent(editData.content);
    }

    return () => {
      setTitle('');
      setContent('');
    };
  }, [editData, current_id]);

  const onSave = () => {
    if(!title || !content) return
    const payload = {
        title,
        content
    }
    setLoading(true)
    axios(`${process.env.REACT_APP_API_URL}/praktikum`, {
        method: 'post',
        data: payload,
        headers: {
            token: user.token
        }
    }).then((res) => {
        setContent('')
        setTitle('')
        dispatch(GetListPraktikum())
         dispatch(SetVisibleFormPraktikum(false))
    }).catch((e) => {
        console.log('error simpan praktikum')
    }).finally(_ => {
      setLoading(false)

    })
};

const editSave = () => {
    console.log('edit save', editData)
    const payload = {
      title,
      content
  }
  setLoading(true)
  axios(`${process.env.REACT_APP_API_URL}/praktikum/${editData._id}`, {
      method: 'put',
      data: payload,
      headers: {
          token: user.token
      }
  }).then((res) => {
      setContent('')
      setTitle('')
      dispatch(GetListPraktikum())
       dispatch(SetVisibleFormPraktikum(false))
  }).catch((e) => {
      console.log('error simpan praktikum')
  }).finally(_ => {
    setLoading(false)

  })
}

  return (
    <div className='flex justify-end px-4'>
      <Button
        className='mb-10'
        onClick={() => dispatch(SetVisibleFormPraktikum(true))}
       
      >
        New Praktikum
      </Button>
      <ModalBase
        visible={visible}
        setVisible={(data) => dispatch(SetVisibleFormPraktikum(data))}
        onSave={editData ? editSave : onSave}
        titleButton='Simpan Praktikum'
        loading={loading}
      >
        <div className='w-full space-x-1'>
          <Input
            type='text'
            color='lightBlue'
            size='regular'
            outline={false}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor data={editData.content} setData={setContent} />
        </div>
      </ModalBase>
    </div>
  );
}
// import ModalBase from 'components/base/Modal'
export default ModalFormMateri;
