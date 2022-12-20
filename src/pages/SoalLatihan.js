import React, {useEffect} from 'react';
import TableSoal from 'components/soalLatihan/TableSoal';
import { Button } from '@material-tailwind/react';
import { useHistory } from 'react-router-dom';
import {GetListSoalLatihan, SetListQuestionForm,SetCurrentQuestionForm, SetCurrentSoalLatihan} from 'stores/action/soalLatihanAction'
import {useDispatch} from 'react-redux'

function SoalLatihan() {
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetListSoalLatihan());
  }, [dispatch]);

  return (
    <div className=' md:px-8 min-h-screen mt-10'>
      <div className='container mx-auto max-w-full'>
        <div className='flex justify-end px-4 mb-10 '>
          <Button onClick={() => {
             dispatch(SetListQuestionForm([]))
             dispatch(SetCurrentQuestionForm(''))
             dispatch(SetCurrentSoalLatihan(''))
            history.push('/soal-latihan/form')}}>
            Buat Soal Latihan
          </Button>
        </div>
        <div className='grid grid-cols-1 px-4 mb-16'>
          <TableSoal />
        </div>
      </div>
    </div>
  );
}

export default SoalLatihan;
