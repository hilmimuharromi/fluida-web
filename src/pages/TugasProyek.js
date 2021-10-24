import React, {useEffect} from 'react'
import ModalFormTugasProyek from 'components/tugasProyek/ModalFormTugasProyek'
import TableTugasProyek from 'components/tugasProyek/TableTugas'
import {GetListTugasProyek} from 'stores/action/tugasProyekAction'
import {useDispatch} from 'react-redux'
function TugasProyek() {

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetListTugasProyek());
  }, [dispatch]);

    return (
        <div className=' md:px-8 min-h-screen mt-10'>
        <div className='container mx-auto max-w-full'>
          <ModalFormTugasProyek />
          <div className='grid grid-cols-1 px-4 mb-16'>
            <TableTugasProyek />
          </div>
        </div>
      </div>
    )
}

export default TugasProyek
