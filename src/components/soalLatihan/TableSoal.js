import TableCard from '../base/TableCard'
import React, {useState} from 'react'
import Button from '@material-tailwind/react/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import ModalConfirmation from 'components/base/ModalConfirmation';
import ModalPreview from '../editor/ModalPreview'
import PreviewListQuestion from './PreviewListQuestion';
import {
  GetListSoalLatihan,
  SetVisibleFormSoalLatihan,
  SetCurrentSoalLatihan,
  SetVisibleContentSoalLatihan,
} from 'stores/action/soalLatihanAction';


function TableSoalLatihan() {
  const history= useHistory()
  const dispatch = useDispatch()
  const [dataConfirm, setdataConfirm] = useState('');
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalPreview, setModalPreview] = useState(false)

    const [filterData, setFilterData] = useState([]);
    const listSoalLatihan = useSelector((state) => state.soalLatihan.data);
    const currentSoalLatihan = useSelector((state) => state.soalLatihan.currentData)
    const user = useSelector((state) => state.user.data);
    const [search, onSearch] = useState('')
  
    const columns = [
        {
          title: 'Title',
          key: 'title',
        },
        {
          title: 'Questions',
          key: 'questions',
          render: (item) => (
            <Button
              onClick={() => {
                setdataConfirm(item)
            setModalPreview(true)
               
              }}
            >
              View Questions
            </Button>
          ),
        },
        {
          title: 'Created By',
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
                  dispatch(SetCurrentSoalLatihan(item));
                  history.push('/soal-latihan/form')
                }}
              >
                Edit
              </Button>
              <Button
                color='pink'
                buttonType='filled'
                onClick={() => {
                  setdataConfirm(item);
                  setVisibleConfirm(true);
                }}
              >
                Delete
              </Button>
            </div>
          ),
        },
      ];

      const deleteSoalLatihan = () => {
        setLoadingDelete(true);
        axios(`${process.env.REACT_APP_API_URL}/soal-latihan/${dataConfirm._id}`, {
          method: 'delete',
          headers: {
            token: user.token,
          },
        })
          .then((response) => {
            setVisibleConfirm(false);
            dispatch(GetListSoalLatihan());
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
        
        />
      <ModalConfirmation
        visible={visibleConfirm}
        setVisible={setVisibleConfirm}
        title={'Hapus Soal Latihan'}
        description='Anda Yakin akan menghapus Soal Latihan ini'
        titleButton='Hapus'
        onSave={deleteSoalLatihan}
        loading={loadingDelete}
      />
        <TableCard
        title={"Tabel Soal Latihan"} 
        actionTitle="Buat Soal Latihan"
        columns={columns} 
        data={listSoalLatihan}
        searchValue={search}
        onSearch={(data)=> onSearch(data)}
        visibleSearch={true}

        />
        </>
    )
}

export default TableSoalLatihan
