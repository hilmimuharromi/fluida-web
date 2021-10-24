import React from 'react';
import TableBuatSoal from 'components/soalLatihan/TableBuatSoal';

function BuatSoal() {
  return (
    <div className=' md:px-8 min-h-screen mt-10'>
      <div className='container mx-auto max-w-full'>
        <div className='grid grid-cols-1 px-4 mb-16'>
          <TableBuatSoal />
        </div>
      </div>
    </div>
  );
}

export default BuatSoal;
