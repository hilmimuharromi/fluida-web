import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/base/Sidebar';
import Dashboard from 'pages/Dashboard';
// import Footer from 'components/base/Footer';
import Materi from 'pages/Materi';
import Praktikum from 'pages/Praktikum';
import BuatPraktikum from "pages/BuatPraktikum";
import SoalLatihan from 'pages/SoalLatihan';
import TugasProyek from 'pages/TugasProyek';
import Login from 'pages/Login';
import Register from 'pages/Register';
import BuatSoal from 'pages/BuatSoal';
import Playlist from 'pages/Playlist';
import PlaylistForm from 'pages/PlaylistForm';
import ResultSoalLatihan from 'pages/ResultSoalLatihan';
import ResultPraktikum from "pages/ResultPraktikum";
import ResultTugasProyek from "pages/ResultTugasProyek";
// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { store, persistor } from './stores/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from 'react-redux';

const Loading = () => {
  return <p>Loading ....</p>;
};

const Routes = () => {
  const user = useSelector((state) => state.user);

  return user.data ? (
    <>
      <Sidebar />
      <div className='md:ml-64'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          {/* <Route exact path="/settings" component={Settings} /> */}
          {/* <Route exact path="/tables" component={Tables} /> */}
          {/* <Route exact path="/maps" component={Maps} /> */}
          <Route exact path='/materi' component={Materi} />
          <Route exact path='/praktikum' component={Praktikum} />
            <Route exact path='/praktikum/form' component={BuatPraktikum} />
            <Route exact path='/praktikum/penilaian/:praktikumId' component={ResultPraktikum} />
          <Route exact path='/playlist' component={Playlist} />
          <Route exact path='/playlist/form' component={PlaylistForm} />
          <Route exact path='/tugas-proyek' component={TugasProyek} />
            <Route exact path={'/tugas-proyek/penilaian/:proyekId'} component={ResultTugasProyek} />
          <Route exact path='/soal-latihan' component={SoalLatihan} />
          <Route exact path='/soal-latihan/form' component={BuatSoal} />
          <Route exact path='/soal-latihan/penilaian/:soalId' component={ResultSoalLatihan} />

          <Redirect from='*' to='/' />
        </Switch>
        {/* <Footer /> */}
      </div>
    </>
  ) : (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />

      <Redirect from='*' to='/login' />
    </Switch>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
