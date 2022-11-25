import React, {useEffect} from 'react';
import TablePraktikum from 'components/praktikum/TablePraktikum';
import {GetListPraktikum} from 'stores/action/praktikumAction'
import {useDispatch} from 'react-redux'
import {useHistory} from "react-router-dom";
import {Button} from "@material-tailwind/react";
function Praktikum() {
  const dispatch = useDispatch();
  const history = useHistory()
  useEffect(() => {
    dispatch(GetListPraktikum());
  }, [dispatch]);
  return (
    <div className=' md:px-8 min-h-screen mt-10'>
      <div className='container mx-auto max-w-full'>
        <div className='flex justify-end px-4 mb-10 '>
          <Button  color="gray" className="mr-5" onClick={() => history.push('/soal-latihan/penilaian')}>
            Penilaian Praktikum
          </Button>
          <Button onClick={() => history.push('/praktikum/form')}>
            Buat Soal Praktikum
          </Button>
        </div>
        {/*<ModalFormPraktikum />*/}
        <div className='grid grid-cols-1 px-4 mb-16'>
          <TablePraktikum />
        </div>
      </div>
    </div>
  );
}

export default Praktikum;
