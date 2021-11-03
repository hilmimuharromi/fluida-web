import React, { useState, useEffect } from 'react';
import { Button, Input } from '@material-tailwind/react';
import TableCard from '../components/base/TableCard';
import ModalPlaylistModal from 'components/playlist/ModalPlaylistModal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetCurrentPlaylist } from 'stores/action/playlistAction';
function PlaylistForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);
  const dataStore = useSelector((state) => state.playlist.currentData);

  const [visibleModal, setVisibleModal] = useState(false);
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataStore) {
      setTitle(dataStore.title);
      let newItems = dataStore.contents.map((item) => {
        return {
          _id: item[item.flag]._id,
          title: item[item.flag].title,
          code: item[item.flag].code,
          flag: item.flag,
        };
      });
      setItems(newItems);
    }
  }, [dataStore]);

  const columns = [
    {
      title: 'Title',
      key: 'title',
      // render: (item) => <p>{item[item.flag].title}</p>,
    },
    {
      title: 'Code',
      key: 'code',
      // render: (item) => <p>{item[item.flag].code}</p>,
    },
    {
      title: 'Type',
      key: 'flag',
    },
    {
      title: 'Action',
      key: 'title',
      render: (item) => (
        <Button onClick={() => deleteItem(item)}>Delete</Button>
      ),
    },
  ];

  const deleteItem = (data) => {
    const newItems = items.filter((item) => item._id !== data._id);
    console.log('delete item', data);
    setItems(newItems);
  };

  const setItem = (item) => {
    setItems([...items, item]);
  };

  const saveData = () => {
    const contents = items.map((item, index) => {
      let newItem = {
        key: index + 1,
        flag: item.flag,
      };
      newItem[item.flag] = item._id;

      return newItem;
    });

    const payload = {
      title,
      contents,
    };

    console.log('simpan data', payload);
    console.log('data store', dataStore);

    let url = '/playlist';
    let method = 'post';

    if (dataStore) {
      url = `/playlist/${dataStore._id}`;
      method = 'put';
    }

    axios(`${process.env.REACT_APP_API_URL}${url}`, {
      method: method,
      data: payload,
      headers: {
        token: user.token,
      },
    })
      .then((res) => {
        setItems([]);
        setTitle('');
        dispatch(SetCurrentPlaylist(''));
        history.push('/playlist');
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
      <ModalPlaylistModal
        visible={visibleModal}
        setVisible={setVisibleModal}
        setItem={setItem}
      />
      <div className=' md:px-8 min-h-screen mt-10'>
        <div className='container mx-auto max-w-full'>
          <div className='grid grid-cols-1 px-4 mb-16'>
            {/* <TablePlaylist /> */}
            <TableCard
              title={`list Playlist ${title}`}
              // actionTitle="Buat Soal Latihan"
              columns={columns}
              data={items}
              // searchValue={search}
              // onSearch={(data)=> onSearch(data)}
              visibleSearch={false}
            />
          </div>
          {/* {JSON.stringify(items)} */}
          <div className='flex justify-end px-4 mb-10 '>
            <Input
              type='text'
              color='lightBlue'
              size='regular'
              outline={false}
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='flex space-x-5'>
            <Button onClick={() => setVisibleModal(true)}>Add Item</Button>
            <Button onClick={saveData}>
            {loading && <div className="animate-spin rounded-full  h-5 w-5 border-t-2 border-b-2 border-white-500"></div>}
              Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaylistForm;
