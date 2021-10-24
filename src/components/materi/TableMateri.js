import TableCard from '../base/TableCard';
import React, { useState, useEffect } from 'react';
import Button from '@material-tailwind/react/Button';
import { useSelector, useDispatch } from 'react-redux';
import ModalConfirmation from 'components/base/ModalConfirmation';
import ModalPreview from '../editor/ModalPreview';
import axios from 'axios';
import moment from 'moment';
import {
  GetListMateri,
  SetVisibleFormMateri,
  SetVisibleContentMateri,
  SetCurrentMateri
} from 'stores/action/materiAction';

function TableMateri(props) {
  const [search, onSearch] = useState('');
  const [dataConfirm, setdataConfirm] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [modalPreview, setModalPreview] = useState(false)
  const [filterData, setFilterData] = useState([]);
  const listMateri = useSelector((state) => state.materi.data);
  const currentMateri = useSelector((state) => state.materi.currentData)
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search) {
      let searchFormat = search.toLowerCase();
      const filterData = listMateri.filter((item) =>
        item.title.toLowerCase().includes(searchFormat)
      );
      setFilterData(filterData);
    }
  }, [search, listMateri]);

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
            dispatch(SetCurrentMateri(item));
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
              dispatch(SetCurrentMateri(item));
              dispatch(SetVisibleFormMateri(true));
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

  const deleteMateri = () => {
    setLoadingDelete(true);
    axios(`${process.env.REACT_APP_API_URL}/materi/${dataConfirm._id}`, {
      method: 'delete',
      headers: {
        token: user.token,
      },
    })
      .then((response) => {
        setVisibleConfirm(false);
        dispatch(GetListMateri());
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
        dispatch(SetCurrentMateri(''));
      }}
      data={currentMateri}
      />
      <ModalConfirmation
        visible={visibleConfirm}
        setVisible={setVisibleConfirm}
        title={'Hapus Materi'}
        description='Anda Yakin akan menghapus materi ini'
        titleButton='Hapus'
        onSave={deleteMateri}
        loading={loadingDelete}
      />
      <TableCard
        title={'Tabel Materi'}
        actionTitle='New Materi'
        columns={columns}
        data={search ? filterData : listMateri}
        searchValue={search}
        onSearch={(data) => onSearch(data)}
        visibleSearch={true}

      />
    </>
  );
}

export default TableMateri;
