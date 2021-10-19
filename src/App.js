import React, {useState} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/base/Sidebar';
import Dashboard from 'pages/Dashboard';
// import Settings from 'pages/Settings';
// import Tables from 'pages/Tables';
// import Maps from 'pages/Maps';
import Footer from 'components/base/Footer';
import Materi from 'pages/Materi'
import Praktikum from 'pages/Praktikum';
import SoalLatihan from 'pages/SoalLatihan';
import TugasProyek from 'pages/TugasProyek';
import Login from 'pages/Login';
import Register from 'pages/Register';
// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


function App() {
    const [isLogin, setIsLogin] = useState(true)
    return (
        
            isLogin ? <>
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    {/* <Route exact path="/settings" component={Settings} /> */}
                    {/* <Route exact path="/tables" component={Tables} /> */}
                    {/* <Route exact path="/maps" component={Maps} /> */}
                    <Route exact path ="/materi" component={Materi} />
                    <Route exact path ="/Praktikum" component={Praktikum} />
                    <Route exact path ="/tugas-proyek" component={TugasProyek} />
                    <Route exact path ="/soal-latihan" component={SoalLatihan} />
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </> : 
        <Switch>
        <Route exact path ="/login" component={Login} />
        <Route exact path ="/register" component={Register} />

        <Redirect from="*" to="/login" />

        </Switch>
    );
}

export default App;
