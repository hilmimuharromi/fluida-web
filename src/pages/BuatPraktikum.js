import React from 'react';
import TableBuatPraktikum from 'components/praktikum/TableBuatPraktikum';

function BuatPraktikum() {
    return (
        <div className=' md:px-8 min-h-screen mt-10'>
            <div className='container mx-auto max-w-full'>
                <div className='grid grid-cols-1 px-4 mb-16'>
                    <TableBuatPraktikum />
                </div>
            </div>
        </div>
    );
}

export default BuatPraktikum
