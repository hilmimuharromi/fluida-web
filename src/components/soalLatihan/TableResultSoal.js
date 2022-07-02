import TableCard from '../base/TableCard'
import React, {useState, useEffect} from 'react'
import Button from '@material-tailwind/react/Button';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import ModalConfirmation from 'components/base/ModalConfirmation';
// import ModalPreview from '../editor/ModalPreview'
import PreviewListQuestion from './PreviewListQuestion';
import {
  GetResultSoalLatihan
} from 'stores/action/soalLatihanAction';
import {useParams} from "react-router-dom"



function TableResultSoal() {
  const dispatch = useDispatch()
  const params = useParams()
  const [dataConfirm, setdataConfirm] = useState('');
  const [userAnswer, setUserAnswer] = useState([])
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalPreview, setModalPreview] = useState(false)
  const [dataDelete, setDataDelete] = useState()

    const [filterData, setFilterData] = useState([]);
    const listResultSoal = useSelector((state) => state.soalLatihan.result);
    const user = useSelector((state) => state.user.data);
    const [search, onSearch] = useState('')

    useEffect(() => {
      if (search) {
        let searchFormat = search.toLowerCase();
        const filterData = listResultSoal.filter((item) =>
          item.user.name.toLowerCase().includes(searchFormat)
        );
        setFilterData(filterData);
      }
    }, [search, listResultSoal]);
  
    const columns = [
        {
          title: 'Nama Murid',
          key: 'user.name',
        },
        {
            title: 'Email',
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
          title: 'Action',
          key: 'content',
          render: (item) => (
            <div className='flex space-x-1'>
              <Button
                color='blueGray'
                buttonType='filled'
                onClick={() => {
                console.log('item =>', item)
                setUserAnswer(item.answer)
                    setdataConfirm(item.soal)
                        setModalPreview(true)
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

      const deleteSoalLatihan = () => {
        setLoadingDelete(true);
        axios(`${process.env.REACT_APP_API_URL}/penilaian/soal/${dataDelete._id}`, {
          method: 'delete',
          headers: {
            token: user.token,
          },
        })
          .then((response) => {
            setVisibleConfirm(false);
            dispatch(GetResultSoalLatihan(params.soalId));
          })
          .catch((e) => {
            console.log('error delete', e.message);
          })
          .finally(() => {
            setLoadingDelete(false);
          });
      };


    return (
        <>
        <PreviewListQuestion 
        visible={modalPreview}
        setVisible={setModalPreview}
        data={dataConfirm}
        answer={userAnswer}
        
        />
      <ModalConfirmation
        visible={visibleConfirm}
        setVisible={setVisibleConfirm}
        title={'Hapus Jawaban Soal Latihan'}
        description='Anda Yakin akan menghapus jawaban user Soal Latihan ini'
        titleButton='Hapus'
        onSave={deleteSoalLatihan}
        loading={loadingDelete}
      />
        <TableCard
        title={"Tabel Penilaian Soal Latihan"} 
        // actionTitle="Buat Soal Latihan"
        columns={columns} 
        data={search ? filterData : listResultSoal}
        searchValue={search}
        onSearch={(data)=> onSearch(data)}
        visibleSearch={true}

        />
        </>
    )
}

export default TableResultSoal
