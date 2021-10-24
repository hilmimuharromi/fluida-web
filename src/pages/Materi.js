import React, { useEffect } from 'react';
import TableMateri from 'components/materi/TableMateri';
import ModalFormMateri from 'components/materi/ModalFormMateri';
import { GetListMateri } from 'stores/action/materiAction';
import { useDispatch } from 'react-redux';
function Materi() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetListMateri());
  }, [dispatch]);
  return (
    <div className=' md:px-8 min-h-screen mt-10'>
      <div className='container mx-auto max-w-full'>
        <ModalFormMateri />

        <div className='grid grid-cols-1 px-4 mb-16'>
          <TableMateri />
        </div>
      </div>
    </div>
  );
}

export default Materi;
