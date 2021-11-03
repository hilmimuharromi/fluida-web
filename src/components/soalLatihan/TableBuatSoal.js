import TableCard from '../base/TableCard';
import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardBody } from '@material-tailwind/react';
import ModalFormSoal from './ModalFormSoal';
import PreviewSoal from './PreviewSoal';
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import {
  GetListSoalLatihan,
  SetListQuestionForm,
  SetVisibleFormSoalLatihan,
  SetCurrentQuestionForm,
  SetCurrentSoalLatihan
} from 'stores/action/soalLatihanAction';
import axios from 'axios'
function TableBuatSoal() {
  const dispatch = useDispatch()
  const history = useHistory()
  const soalLatihanState = useSelector((state) => state.soalLatihan);
  const listQuestionForm = soalLatihanState.listQuestionForm
  const currentSoalLatihan = soalLatihanState.currentData

  const user = useSelector(state => state.user.data)

  const [visibleSoal, setVisibleSoal] = useState('')
  const [currentSoal, setCurrentSoal] = useState('')
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(currentSoalLatihan) {
      console.log(currentSoalLatihan)
      setTitle(currentSoalLatihan.title)
      setCode(currentSoalLatihan.code)
      dispatch(
        SetListQuestionForm(currentSoalLatihan.questions)
      )
    }
  }, [currentSoalLatihan])


  const deleteSoal = (key) => {
    const newList = listQuestionForm.filter((item) => item.key !== key)
    newList.map((item, index) => {
      item.key = index+1
      return item
    })
    dispatch(SetListQuestionForm(newList))
  }

  const simpanSoal = () => {
    
    const payload = {
      title,
      code,
      questions: listQuestionForm
    }
    console.log('simpan soal', payload)
    
    setLoading(true)
    let url = '/soal-latihan'
    let method = 'post'

    if(currentSoalLatihan) {
      url = `/soal-latihan/${currentSoalLatihan._id}`
      method = 'put'

    }

    axios(`${process.env.REACT_APP_API_URL}${url}`, {
      method: method,
      data: payload,
      headers: {
          token: user.token
      }
  }).then((res) => {
      dispatch(GetListSoalLatihan())
      dispatch(SetListQuestionForm([]))
      dispatch(SetCurrentQuestionForm(''))
      dispatch(SetCurrentSoalLatihan(''))
      history.push('/soal-latihan')
  }).catch((e) => {
      console.log('error simpan soal latihan')
  }).finally(_ => {
    setLoading(false)

  })

  }

  const columns = [
    {
      title: 'No',
      key: 'key',
    },
    {
        title: 'Question',
        key: 'question',
        render: (item) => (
            <Button onClick={() => {
              setCurrentSoal(item)
              setVisibleSoal(item)
            }}>Lihat</Button>
        )
      },
      {
        title: 'Action',
        key: 'key',
        render: (item) => (
            <div className="flex space-x-1">
                <Button onClick={() => {
                   dispatch(SetCurrentQuestionForm(item))
                   dispatch(SetVisibleFormSoalLatihan(true));
                }}>Edit</Button>
                <Button 
                color='pink'
                buttonType='filled'
                onClick={() => deleteSoal(item.key)}>Delete</Button>
            </div>
        )
      },

  ];

  return (
    <div className='flex'>
      <div className='w-6/12'>
        <PreviewSoal visible={visibleSoal} setVisible={setVisibleSoal} data={currentSoal} />
        <ModalFormSoal />
        <TableCard
          title={'List Soal'}
          actionTitle='Buat Soal Latihan'
          columns={columns}
          data={listQuestionForm}
        />
      </div>
      <div className='w-6/12 px-10 flex items-center justify-center'>
          <Card>
          <CardBody className="space-y-10">
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
        <Button className="mt-10" onClick={simpanSoal}>
        {loading && <div className="animate-spin rounded-full  h-5 w-5 border-t-2 border-b-2 border-white-500"></div>}
          Simpan Soal Latihan</Button>
        </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default TableBuatSoal;
