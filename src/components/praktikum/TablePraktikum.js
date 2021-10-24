import TableCard from '../base/TableCard'
import React, {useState} from 'react'
import Button from '@material-tailwind/react/Button';

import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import ModalConfirmation from 'components/base/ModalConfirmation';
import ModalPreview from '../editor/ModalPreview'
import {
  GetListPraktikum,
  SetVisibleFormPraktikum,
  SetCurrentPraktikum,
  SetVisibleContentPraktikum,
} from 'stores/action/praktikumAction';


function TablePraktikum() {
    const dispatch = useDispatch()
  const [dataConfirm, setdataConfirm] = useState('');
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalPreview, setModalPreview] = useState(false)

    const [filterData, setFilterData] = useState([]);
    const listPraktikum = useSelector((state) => state.praktikum.data);
    const currentPraktikum = useSelector((state) => state.praktikum.currentData)
    const user = useSelector((state) => state.user.data);
    const [search, onSearch] = useState('')
  
    const columns = [
        {
          title: 'Title',
          key: 'title',
        },
        {
          title: 'Content',
          key: 'content',
          render: (item) => (
            <Button
              onClick={() => {
                dispatch(SetCurrentPraktikum(item));
            setModalPreview(true)
               
              }}
            >
              View Content
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
                  dispatch(SetCurrentPraktikum(item));
                  dispatch(SetVisibleFormPraktikum(true));
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

      const deletePraktikum = () => {
        setLoadingDelete(true);
        axios(`${process.env.REACT_APP_API_URL}/praktikum/${dataConfirm._id}`, {
          method: 'delete',
          headers: {
            token: user.token,
          },
        })
          .then((response) => {
            setVisibleConfirm(false);
            dispatch(GetListPraktikum());
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
        <ModalPreview visible={modalPreview} 
      setVisible={(data) => {
        setModalPreview(data)
        dispatch(SetCurrentPraktikum(''));
      }}
      data={currentPraktikum}
      />
      <ModalConfirmation
        visible={visibleConfirm}
        setVisible={setVisibleConfirm}
        title={'Hapus Praktikum'}
        description='Anda Yakin akan menghapus Praktikum ini'
        titleButton='Hapus'
        onSave={deletePraktikum}
        loading={loadingDelete}
      />
        <TableCard
        title={"Tabel Praktikum"} 
        actionTitle="New Praktikum"
        columns={columns} 
        data={listPraktikum}
        searchValue={search}
        onSearch={(data)=> onSearch(data)}
        visibleSearch={true}
        />
        </>
    )
}

export default TablePraktikum
