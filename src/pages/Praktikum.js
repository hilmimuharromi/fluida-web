import React, {useEffect} from 'react';
import TablePraktikum from 'components/praktikum/TablePraktikum';
import ModalFormPraktikum from 'components/praktikum/ModalFormPraktikum';
import {GetListPraktikum} from 'stores/action/praktikumAction'
import {useDispatch} from 'react-redux'
function Praktikum() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetListPraktikum());
  }, [dispatch]);
  return (
    <div className=' md:px-8 min-h-screen mt-10'>
      <div className='container mx-auto max-w-full'>
        <ModalFormPraktikum />
        <div className='grid grid-cols-1 px-4 mb-16'>
          <TablePraktikum />
        </div>
      </div>
    </div>
  );
}

export default Praktikum;
