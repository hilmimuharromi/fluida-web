import React, { useState, useEffect } from 'react';
import ModalBase from 'components/base/Modal';
import { Button, Input } from '@material-tailwind/react';
import Editor from '../editor';
import { useSelector, useDispatch } from 'react-redux';
import { GetListTugasProyek, SetVisibleFormTugasProyek } from 'stores/action/tugasProyekAction';
import axios from 'axios'
function ModalFormMateri() {
  const dispatch = useDispatch();
  const tugasProyekState = useSelector((state) => state.tugasProyek);
  const visible = tugasProyekState.visibleForm;
  const editData = tugasProyekState.currentData;
  const current_id = tugasProyekState.currentData._id;
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.user.data)

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setContent(editData.content);
      setCode(editData.code)
    }

    return () => {
      setTitle('');
      setContent('');
      setCode('')
    };
  }, [editData, current_id]);

  const onSave = () => {
    if(!title || !content) return
    const payload = {
        title,
        content,
        code
    }
    setLoading(true)
    axios(`${process.env.REACT_APP_API_URL}/tugas-proyek`, {
        method: 'post',
        data: payload,
        headers: {
            token: user.token
        }
    }).then((res) => {
        setContent('')
        setTitle('')
      setCode('')

        dispatch(GetListTugasProyek())
         dispatch(SetVisibleFormTugasProyek(false))
    }).catch((e) => {
        console.log('error simpan TugasProyek')
    }).finally(_ => {
      setLoading(false)

    })
};

const editSave = () => {
    console.log('edit save', editData)
    const payload = {
      title,
      content,
      code
  }
  setLoading(true)
  axios(`${process.env.REACT_APP_API_URL}/tugas-proyek/${editData._id}`, {
      method: 'put',
      data: payload,
      headers: {
          token: user.token
      }
  }).then((res) => {
      setContent('')
      setTitle('')
      setCode('')
      dispatch(GetListTugasProyek())
       dispatch(SetVisibleFormTugasProyek(false))
  }).catch((e) => {
      console.log('error simpan TugasProyek')
  }).finally(_ => {
    setLoading(false)

  })
}

  return (
    <div className='flex justify-end px-4'>
      <Button
        className='mb-10'
        onClick={() => {
            dispatch(SetVisibleFormTugasProyek(true))}}
       
      >
        New Tugas Proyek
      </Button>
      <ModalBase
        visible={visible}
        setVisible={(data) => dispatch(SetVisibleFormTugasProyek(data))}
        onSave={editData ? editSave : onSave}
        titleButton='Simpan Tugas Proyek'
        loading={loading}
      >
        <div className='w-full space-x-1'>
          <Input
            type='text'
            color='lightBlue'
            size='regular'
            outline={false}
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
           <Input
            type='text'
            color='lightBlue'
            size='regular'
            outline={false}
            placeholder='Code'
            value={code}

            onChange={(e) => setCode(e.target.value)}
          />
          <Editor data={editData.content} setData={setContent} />
        </div>
      </ModalBase>
    </div>
  );
}
// import ModalBase from 'components/base/Modal'
export default ModalFormMateri;
