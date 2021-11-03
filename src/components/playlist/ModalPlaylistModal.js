import React, { useState } from 'react';
import ModalBase from 'components/base/Modal';
import Tab from '@material-tailwind/react/Tab';
import TabList from '@material-tailwind/react/TabList';
import TabItem from '@material-tailwind/react/TabItem';
import TabContent from '@material-tailwind/react/TabContent';
import TabPane from '@material-tailwind/react/TabPane';
import Icon from '@material-tailwind/react/Icon';
import TableMateri from './PlaylistTableMateri';
import TablePraktikum from './PlaylistTablePraktikum';
import TableProyek from './PlaylistTableProyek';
import TableSoal from './PlaylistTableSoal';
function ModalPlaylistModal(props) {
  const { visible, setVisible } = props;
  const [openTab, setOpenTab] = useState(1);
  const {setItem} = props
  return (
    <ModalBase
      visible={visible}
      setVisible={setVisible}
      // onSave={editData ? editSave : onSave}
      // titleButton='Simpan Praktikum'
      // loading={loading}
      hideFooter={true}
    >
      <Tab>
        <TabList color='lightBlue'>
          <TabItem
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            ripple='light'
            active={openTab === 1 ? true : false}
            href='tabItem'
          >
            <Icon name='language' size='lg' />
            Materi
          </TabItem>
          <TabItem
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
            ripple='light'
            active={openTab === 2 ? true : false}
            href='tabItem'
          >
            <Icon name='account_circle' size='lg' />
            Praktikum
          </TabItem>
          <TabItem
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(3);
            }}
            ripple='light'
            active={openTab === 3 ? true : false}
            href='tabItem'
          >
            <Icon name='settings' size='lg' />
            Tugas Proyek
          </TabItem>
          <TabItem
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(4);
            }}
            ripple='light'
            active={openTab === 4 ? true : false}
            href='tabItem'
          >
            <Icon name='settings' size='lg' />
            Soal Latihan
          </TabItem>
        </TabList>

        <TabContent>
          <TabPane active={openTab === 1 ? true : false}>
            <TableMateri setItem={setItem} />
          </TabPane>
          <TabPane active={openTab === 2 ? true : false}>
            <TablePraktikum setItem={setItem} />
          </TabPane>
          <TabPane active={openTab === 3 ? true : false}>
            <TableProyek setItem={setItem} />
          </TabPane>
          <TabPane active={openTab === 4 ? true : false}>
            <TableSoal setItem={setItem} />
          </TabPane>
        </TabContent>
      </Tab>
    </ModalBase>
  );
}

export default ModalPlaylistModal;
