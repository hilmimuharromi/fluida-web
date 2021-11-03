import TableCard from '../base/TableCard'
import React, {useState, useEffect} from 'react'
import Button from '@material-tailwind/react/Button';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import ModalPreview from '../editor/ModalPreview'
import {
  GetListTugasProyek,
  SetCurrentTugasProyek,
} from 'stores/action/tugasProyekAction';


function TableTugas(props) {
    const {setItem} = props

    const dispatch = useDispatch()
 
  const [modalPreview, setModalPreview] = useState(false)

    const listTugasProyek = useSelector((state) => state.tugasProyek.data);
    const currentTugasProyek = useSelector((state) => state.tugasProyek.currentData)
    const [search, onSearch] = useState('')
  
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
                dispatch(SetCurrentTugasProyek(item));
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
                    console.log('pilih', item)
                    let data = item
                    data.flag = 'tugasProyek'
                    setItem(data)
                //   dispatch(SetCurrentTugasProyek(item));
                //   dispatch(SetVisibleFormTugasProyek(true));
                }}
              >
                Pilih
              </Button>
            </div>
          ),
        },
      ];


      useEffect(() => {
         dispatch(GetListTugasProyek())
         //eslint-disable-next-line
      }, [])

    return (
        <>
        <ModalPreview visible={modalPreview} 
      setVisible={(data) => {
        setModalPreview(data)
        dispatch(SetCurrentTugasProyek(''));
      }}
      data={currentTugasProyek}
      />
      {/* <ModalConfirmation
        visible={visibleConfirm}
        setVisible={setVisibleConfirm}
        title={'Hapus Tugas Proyek'}
        description='Anda Yakin akan menghapus Tugas Proyek ini'
        titleButton='Hapus'
        onSave={deleteTugasProyek}
        loading={loadingDelete}
      /> */}
        <TableCard
        hideHeader={true}
        title={"Tabel Tugas Proyek"} 
        actionTitle="New Tugas Proyek"
        columns={columns} 
        data={listTugasProyek}
        searchValue={search}
        onSearch={(data)=> onSearch(data)}
        visibleSearch={true}

        />
        </>
    )
}

export default TableTugas
