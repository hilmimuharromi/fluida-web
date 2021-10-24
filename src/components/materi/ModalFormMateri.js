import React, { useState, useEffect } from 'react';
import ModalBase from 'components/base/Modal';
import { Button, Input } from '@material-tailwind/react';
import Editor from '../editor';
import {useSelector, useDispatch} from 'react-redux'
import {GetListMateri, SetVisibleFormMateri, SetCurrentMateri} from 'stores/action/materiAction'

import axios from 'axios'

function ModalFormMateri(props) {
  // const {visible, setVisible} = props
    const materiState = useSelector((state) => state.materi)
    const visible = materiState.visibleForm
    const editData = materiState.currentData
    const current_id = materiState.currentData._id
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.user.data)
  const dispatch = useDispatch()

  useEffect(() => {
      if(editData) {
        console.log('masukkkk dong', editData)
          setTitle(editData.title)
          setContent(editData.content)
      }

       return(() => {
         setTitle('')
         setContent('')
       })
  }, [editData, current_id])


  const onSave = () => {
      if(!title || !content) return
      const payload = {
          title,
          content
      }
      setLoading(true)
      axios(`${process.env.REACT_APP_API_URL}/materi`, {
          method: 'post',
          data: payload,
          headers: {
              token: user.token
          }
      }).then((res) => {
          setContent('')
          setTitle('')
          dispatch(GetListMateri())
           dispatch(SetVisibleFormMateri(false))
      }).catch((e) => {
          console.log('error materi')
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
    axios(`${process.env.REACT_APP_API_URL}/materi/${editData._id}`, {
        method: 'put',
        data: payload,
        headers: {
            token: user.token
        }
    }).then((res) => {
        setContent('')
        setTitle('')
        dispatch(GetListMateri())
         dispatch(SetVisibleFormMateri(false))
    }).catch((e) => {
        console.log('error materi')
    }).finally(_ => {
      setLoading(false)

    })
  }

  return (
    <div className='flex justify-end px-4'>
      <Button className='mb-10' onClick={() =>  
            dispatch(SetVisibleFormMateri(true)) 
          }>
        New Materi
      </Button>
      <ModalBase
        visible={visible}
        setVisible={(data) => {
            dispatch(SetCurrentMateri(''))
            dispatch(SetVisibleFormMateri(data)) 
          }}
        onSave={editData ? editSave : onSave}
        titleButton='Simpan Materi'
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
          <Editor data={editData.content} setData={setContent} />
        </div>
        {JSON.stringify(editData)}
      </ModalBase>
    </div>
  );
}
export default ModalFormMateri;
