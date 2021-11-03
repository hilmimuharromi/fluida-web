import TableCard from '../base/TableCard'
import React, {useState, useEffect} from 'react'
import Button from '@material-tailwind/react/Button';

import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
// import ModalConfirmation from 'components/base/ModalConfirmation';
import ModalPreview from '../editor/ModalPreview'
import {
  GetListPraktikum,
  SetCurrentPraktikum,
} from 'stores/action/praktikumAction';


function TablePraktikum(props) {
    const {setItem} = props

    const dispatch = useDispatch()
  const [modalPreview, setModalPreview] = useState(false)

    const [filterData, setFilterData] = useState([]);
    const listPraktikum = useSelector((state) => state.praktikum.data);
    const currentPraktikum = useSelector((state) => state.praktikum.currentData)
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
                 console.log('item klik',item)
                 let data = item
                data.flag = 'praktikum'
                setItem(data)
                }}
              >
               Pilih
              </Button>
            
            </div>
          ),
        },
      ];


      useEffect(() => {
         dispatch(GetListPraktikum())
      }, [])

      


    return (
        <>
        <ModalPreview visible={modalPreview} 
      setVisible={(data) => {
        setModalPreview(data)
        dispatch(SetCurrentPraktikum(''));
      }}
      data={currentPraktikum}
      />
    
        <TableCard
        hideHeader={true}
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
