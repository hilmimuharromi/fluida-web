import TableCard from '../base/TableCard';
import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardBody } from '@material-tailwind/react';
import ModalFormPraktikum from './ModalFormPraktikum';
import PreviewPraktikum from './PreviewPraktikum';
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import {
    SetQuestionsFormPraktikum,
    SetCurrentQuestionForm,
    SetVisibleFormPraktikum,
    GetListPraktikum, SetCurrentPraktikum
} from 'stores/action/praktikumAction';
import axios from 'axios'
function TableBuatPraktikum() {
    const dispatch = useDispatch()
    const history = useHistory()
    const praktikumState = useSelector((state) => state.praktikum);
    const listQuestionForm = praktikumState.listQuestionForm
    const currentData = praktikumState.currentData

    const user = useSelector(state => state.user.data)

    const [visibleSoal, setVisibleSoal] = useState('')
    const [currentSoal, setCurrentSoal] = useState('')
    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(currentData) {
            setTitle(currentData.title)
            setCode(currentData.code)
            dispatch(
                SetQuestionsFormPraktikum(currentData.questions)
            )
        } else {
            dispatch(
                SetQuestionsFormPraktikum([])
            )
        }
        //eslint-disable-next-line
    }, [currentData])


    const deleteSoal = (key) => {
        const newList = listQuestionForm.filter((item) => item.key !== key)
        newList.map((item, index) => {
            item.key = index+1
            return item
        })
        dispatch(SetQuestionsFormPraktikum(newList))
    }

    const simpanSoal = () => {

        const payload = {
            title,
            code,
            questions: listQuestionForm
        }
        setLoading(true)
        let url = '/praktikum'
        let method = 'post'

        if(currentData) {
            url = `/praktikum/${currentData._id}`
            method = 'put'
        }
        axios(`${process.env.REACT_APP_API_URL}${url}`, {
            method: method,
            data: payload,
            headers: {
                token: user.token
            }
        }).then((res) => {
            dispatch(GetListPraktikum())
            dispatch(SetQuestionsFormPraktikum([]))
            dispatch(SetCurrentQuestionForm(''))
            dispatch(SetCurrentPraktikum(''))
            history.push('/praktikum')
        }).catch((e) => {
            console.log('error simpan praktikum')
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
                        dispatch(SetVisibleFormPraktikum(true));
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
                <PreviewPraktikum visible={visibleSoal} setVisible={setVisibleSoal} data={currentSoal} />
                <ModalFormPraktikum />
                <TableCard
                    title={'List Soal Praktikum'}
                    actionTitle='Buat Soal Praktikum'
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
                            Simpan Soal Praktikum</Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default TableBuatPraktikum;
