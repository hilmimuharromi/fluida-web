import TableCard from '../base/TableCard';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';
import moment from 'moment';
import ModalContents from './ModalContents';
function TablePlaylist() {
  const data = useSelector((state) => state.playlist.data);
  const [visibleContents, setVisibleContents] = useState(false)
  const [currentContent, setCurrentContent] = useState([])

  const columns = [
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Contents',
      key: 'contents',
      render: (item) => (
        <Button onClick={() => {
            setCurrentContent(item.contents)
            setVisibleContents(true)}}>Lihat Contents</Button>
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
  ];
  return (
      <>
      <ModalContents data={currentContent} visible={visibleContents} setVisible={setVisibleContents} />
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
