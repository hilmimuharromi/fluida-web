import TableCard from '../base/TableCard'
import React, {useState, useEffect} from 'react'
import Button from '@material-tailwind/react/Button';

import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import ModalConfirmation from 'components/base/ModalConfirmation';
import ModalPreview from '../editor/ModalPreview'
import {
  GetListTugasProyek,
  SetVisibleFormTugasProyek,
  SetCurrentTugasProyek,
} from 'stores/action/tugasProyekAction';
import {useHistory} from "react-router-dom";

function TableTugas() {
    const dispatch = useDispatch()
    const history = useHistory()
  const [dataConfirm, setdataConfirm] = useState('');
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalPreview, setModalPreview] = useState(false)

    const [filterData, setFilterData] = useState([]);
    const listTugasProyek = useSelector((state) => state.tugasProyek.data);
    const currentTugasProyek = useSelector((state) => state.tugasProyek.currentData)
    const user = useSelector((state) => state.user.data);
    const [search, onSearch] = useState('')

    useEffect(() => {
      if (search) {
        let searchFormat = search.toLowerCase();
        const filterData = listTugasProyek.filter((item) =>
          item.title.toLowerCase().includes(searchFormat)
        );
        setFilterData(filterData);
      }
    }, [search, listTugasProyek]);

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
                    color='blue'
                    buttonType='filled'
                    onClick={() => {
                        dispatch(SetCurrentTugasProyek(item));
                        // dispatch(SetVisibleFormTugasProyek(true));
                        history.push(`/tugas-proyek/penilaian/${item._id}`)
                    }}
                >
                    Penilaian
                </Button>
              <Button
                color='blueGray'
                buttonType='filled'
                onClick={() => {
                  dispatch(SetCurrentTugasProyek(item));
                  dispatch(SetVisibleFormTugasProyek(true));
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

      const deleteTugasProyek = () => {
        setLoadingDelete(true);
        axios(`${process.env.REACT_APP_API_URL}/tugas-proyek/${dataConfirm._id}`, {
          method: 'delete',
          headers: {
            token: user.token,
          },
        })
          .then((response) => {
            setVisibleConfirm(false);
            dispatch(GetListTugasProyek());
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
        dispatch(SetCurrentTugasProyek(''));
      }}
      data={currentTugasProyek}
      />
      <ModalConfirmation
        visible={visibleConfirm}
        setVisible={setVisibleConfirm}
        title={'Hapus Tugas Proyek'}
        description='Anda Yakin akan menghapus Tugas Proyek ini'
        titleButton='Hapus'
        onSave={deleteTugasProyek}
        loading={loadingDelete}
      />
        <TableCard
        title={"Tabel Tugas Proyek"}
        actionTitle="New Tugas Proyek"
        columns={columns}
        data={search ? filterData : listTugasProyek}
        searchValue={search}
        onSearch={(data)=> onSearch(data)}
        visibleSearch={true}
        />
        </>
    )
}

export default TableTugas
