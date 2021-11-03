import TableCard from '../base/TableCard'
import React, {useState} from 'react'
import Button from '@material-tailwind/react/Button';
import moment from 'moment';
import { useSelector } from 'react-redux';
import PreviewListQuestion from '../soalLatihan/PreviewListQuestion';


function TableSoalLatihan(props) {
    const {setItem} = props
  const [dataConfirm, setdataConfirm] = useState('');
  const [modalPreview, setModalPreview] = useState(false)
    const listSoalLatihan = useSelector((state) => state.soalLatihan.data);
  
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
                //   console.log('pilih soal', item)
                let data = item
                data.flag = 'soalLatihan'
                setItem(data)
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
        <PreviewListQuestion 
        visible={modalPreview}
        setVisible={setModalPreview}
        data={dataConfirm}
        
        />
      {/* <ModalConfirmation
        visible={visibleConfirm}
        setVisible={setVisibleConfirm}
        title={'Hapus Soal Latihan'}
        description='Anda Yakin akan menghapus Soal Latihan ini'
        titleButton='Hapus'
        onSave={deleteSoalLatihan}
        loading={loadingDelete}
      /> */}
        <TableCard
        hideHeader={true}
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
