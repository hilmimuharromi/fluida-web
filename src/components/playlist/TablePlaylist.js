import TableCard from '../base/TableCard';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button,Image } from '@material-tailwind/react';
import moment from 'moment';
import ModalContents from './ModalContents';
import ModalConfirmation from 'components/base/ModalConfirmation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { GetListPlaylist, SetCurrentPlaylist } from 'stores/action/playlistAction';
import { useHistory } from 'react-router-dom';

function TablePlaylist() {
  const data = useSelector((state) => state.playlist.data);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const history = useHistory()


  const [visibleContents, setVisibleContents] = useState(false);
  const [currentContent, setCurrentContent] = useState([]);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: 'Cover',
      key: 'coverImage',
      render: (item) => (
        <Image width={100}  src={item.coverImage}/>
      ),
    },
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Contents',
      key: 'contents',
      render: (item) => (
        <Button
          onClick={() => {
            setCurrentContent(item.contents);
            setVisibleContents(true);
          }}
        >
          Lihat Contents
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
      ),
    },
    {
      title: 'Action',
      key: '_id',
      render: (item) => (
        <div className='flex space-x-5'>
          <Button onClick={() => {
            dispatch(SetCurrentPlaylist(item))

history.push('/playlist/form')
          }}>Edit</Button>
          <Button
            color='red'
            onClick={() => {
              setDeleteId(item._id);
              setVisibleConfirm(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const deletePlaylist = () => {
    setLoading(true);
    axios(`${process.env.REACT_APP_API_URL}/playlist/${deleteId}`, {
      method: 'delete',
      headers: {
        token: user.token,
      },
    })
      .then((res) => {
        setLoading(false);
        setDeleteId('');
        dispatch(GetListPlaylist());
        setVisibleConfirm(false);
      })
      .catch((e) => {
        console.log('error simpan playlist');
      })
      .finally((_) => {
        setLoading(false);
      });
  };
  return (
    <>
      <ModalContents
        data={currentContent}
        visible={visibleContents}
        setVisible={setVisibleContents}
      />
      <ModalConfirmation
        visible={visibleConfirm}
        setVisible={setVisibleConfirm}
        title={'Hapus Playlist'}
        description='Anda Yakin akan menghapus Playlist ini'
        titleButton='Hapus'
        onSave={deletePlaylist}
        loading={loading}
      />
      <TableCard
        title={'Tabel Playlist'}
        // actionTitle="Buat Soal Latihan"
        columns={columns}
        data={data}
        // searchValue={search}
        // onSearch={(data)=> onSearch(data)}
        visibleSearch={true}
      />
    </>
  );
}

export default TablePlaylist;
