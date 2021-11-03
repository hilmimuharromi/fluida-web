import TableCard from '../base/TableCard';
import React, { useState, useEffect } from 'react';
import Button from '@material-tailwind/react/Button';
import { useSelector, useDispatch } from 'react-redux';
import ModalPreview from '../editor/ModalPreview';
import moment from 'moment';
import {
  GetListMateri,
  SetCurrentMateri
} from 'stores/action/materiAction';

function TableMateri(props) {
  const {setItem} = props

  const [search, onSearch] = useState('');
  const [modalPreview, setModalPreview] = useState(false)
  const [filterData, setFilterData] = useState([]);
  const listMateri = useSelector((state) => state.materi.data);
  const currentMateri = useSelector((state) => state.materi.currentData)
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

  useEffect(() => {
  dispatch(GetListMateri())
  }, [])

  const columns = [
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Code',
      key: 'code',
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
                console.log('dipilih', item)
                let data = item
                data.flag = 'materi'
                setItem(data)
            //   dispatch(SetCurrentMateri(item));
            //   dispatch(SetVisibleFormMateri(true));
            }}
          >
            Pilih
          </Button>
        </div>
      ),
    },
  ];

 
  return (
    <>
    <ModalPreview visible={modalPreview} 
      setVisible={(data) => {
        setModalPreview(data)
        dispatch(SetCurrentMateri(''));
      }}
      data={currentMateri}
      />
      <TableCard
      hideHeader={true}
        title={'Tabel Materi'}
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
