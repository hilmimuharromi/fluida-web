import TableCard from '../base/TableCard'
import React, {useState, useEffect} from 'react'
import Button from '@material-tailwind/react/Button';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import ModalConfirmation from 'components/base/ModalConfirmation';
import {
    GetResultTugasProyek
} from 'stores/action/tugasProyekAction';
import {useParams} from "react-router-dom"
import PreviewResultProyek from "./PreviewResultProyek";


function TableResultProyek() {
    const dispatch = useDispatch()
    const params = useParams()
    const [dataConfirm, setdataConfirm] = useState('');
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingScore, setLoadingScore] = useState(false)
    const [modalPreview, setModalPreview] = useState(false)
    const [dataDelete, setDataDelete] = useState()
    const [score, setScore] = useState(dataConfirm.score)

    const [filterData, setFilterData] = useState([]);
    const listResultProyek = useSelector((state) => state.tugasProyek.result);
    const user = useSelector((state) => state.user.data);
    const [search, onSearch] = useState('')

    useEffect(() => {
        if (search) {
            let searchFormat = search.toLowerCase();
            const filterData = listResultProyek.filter((item) =>
                item.user.name.toLowerCase().includes(searchFormat)
            );
            setFilterData(filterData);
        }
    }, [search, listResultProyek]);

    const columns = [
        {
            title: 'Proyek',
            key: 'proyek.title',
        },
        {
            title: 'Nama Murid',
            key: 'user.name',
        },
        {
            title: 'Murid',
            key: 'user.email',
        },
        {
            title: 'Created Date',
            key: 'createdAt',
            render: (item) => (
                <div>{moment(item.createdAt).format('DD-MM-YYYY hh:mm')}</div>
            )
        },
        {
            title: 'Score',
            key: 'score',
        },
        {
            title: 'Action',
            key: 'content',
            render: (item) => (
                <div className='flex space-x-1'>
                    <Button
                        color='blueGray'
                        buttonType='filled'
                        onClick={() => {
                            setdataConfirm(item)

                            setModalPreview(true)

                            console.log('item =>', item)
                            // setUserAnswer(item.answer)
                        }}
                    >
                        Lihat Jawaban
                    </Button>
                    <Button
                        color='pink'
                        buttonType='filled'
                        onClick={() => {
                            setDataDelete(item);
                            setVisibleConfirm(true);
                        }}
                    >
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];

    const deleteResultProyek = () => {
        setLoadingDelete(true);
        axios(`${process.env.REACT_APP_API_URL}/penilaian/proyek/${dataDelete._id}`, {
            method: 'delete',
            headers: {
                token: user.token,
            },
        })
            .then(() => {
                setVisibleConfirm(false);

                dispatch(GetResultTugasProyek(params.proyekId));
            })
            .catch((e) => {
                console.log('error delete', e.message);
            })
            .finally(() => {
                setLoadingDelete(false);
            });
    };

    const submitScore = (score) => {
        setLoadingScore(true)
        axios(`${process.env.REACT_APP_API_URL}/penilaian/score/proyek/${dataConfirm._id}`, {
            method: 'put',
            headers: {
                token: user.token,
            },
            data: {
                score: score
            }
        })
            .then(() => {
                setVisibleConfirm(false);
                setModalPreview(false)
                dispatch(GetResultTugasProyek(params.proyekId));
            })
            .catch((e) => {
                console.log('error delete', e.message);
            })
            .finally(() => {
                setLoadingScore(false);
            });

    }


    return (
        <>

            <PreviewResultProyek
                visible={modalPreview}
                setVisible={setModalPreview}
                 data={dataConfirm}
                isAddScore
                setScore={setScore}
                score={score}
                submitScore={submitScore}
                loadingScore={loadingScore}
            />
            <ModalConfirmation
                visible={visibleConfirm}
                setVisible={setVisibleConfirm}
                title={'Hapus Jawaban Tugas Proyek'}
                description='Anda Yakin akan menghapus jawaban ini'
                titleButton='Hapus'
                onSave={deleteResultProyek}
                loading={loadingDelete}
            />
            <TableCard
                title={`Tabel Penilaian Tugas Proyek`}
                columns={columns}
                data={search ? filterData : listResultProyek}
                searchValue={search}
                onSearch={(data)=> onSearch(data)}
                visibleSearch={true}
            />
        </>
    )
}

export default TableResultProyek
