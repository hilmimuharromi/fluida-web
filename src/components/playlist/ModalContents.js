import React from 'react';
import ModalBase from 'components/base/Modal';
import TableCard from '../base/TableCard';

function ModalContents({ data, visible, setVisible }) {
  const columns = [
    {
      title: 'Title',
      key: 'key',
      render: (item) => <p>{item[item.flag].title}</p>,
    },
    {
      title: 'Code',
      key: 'code',
      render: (item) => <p>{item[item.flag].code}</p>,
    },
    {
      title: 'Type',
      key: 'flag',
    },
  ];
  return (
    <ModalBase
      visible={visible}
      setVisible={setVisible}
      // onSave={editData ? editSave : onSave}
      // titleButton='Simpan Praktikum'
      // loading={loading}
      hideFooter={true}
    >
      <div className='w-full space-x-1'>
        {/* {JSON.stringify(data)} */}
        <TableCard
          title={'Tabel Contents'}
          // actionTitle="Buat Soal Latihan"
          columns={columns}
          data={data}
          // searchValue={search}
          // onSearch={(data)=> onSearch(data)}
          visibleSearch={false}
        />
      </div>
    </ModalBase>
  );
}

export default ModalContents;
