import React, {useState} from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import ClosingAlert from "@material-tailwind/react/ClosingAlert";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {SetUser} from 'stores/action/userAction'
import axios from 'axios'


export default function LoginCard() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")



    const onSubmit = async () => {
        setError('')
        setLoading(true)
        axios(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'post',
            data: {email, password}
        }).then(({data}) => {
            dispatch(SetUser(data.data))
        }).catch((error) => {
            console.log('response error ===>', JSON.stringify(error))
            setError('Gagal Login, Harap cek email dan password')
        }).finally(_ => {
        setLoading(false)
        })

    }

    return (
        <div className="container mx-auto max-w-full min-h-screen flex justify-center items-center">
             <div className="w-6/12">
                 
        <Card>
            <CardHeader color="lightBlue" size="lg">
                <H5 color="white">Login Fluida</H5>
            </CardHeader>

            <CardBody>
                <div className="mb-8 px-4">
                    <InputIcon
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        color="lightBlue"
                        placeholder="Email Address"
                        iconName="email"
                    />
                </div>
                <div className="mb-4 px-4">
                    <InputIcon
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        color="lightBlue"
                        placeholder="password"
                        iconName="lock"
                    />
                </div>
            </CardBody>
            <CardFooter>
            {error && <ClosingAlert color="red">{error}</ClosingAlert>}

                <div className="flex justify-center">
                    <Button
                    disabled={loading}
                        color="lightBlue"
                        size="lg"
                        ripple="dark"
                        onClick={onSubmit}
                    >
                   {loading && <div className="animate-spin rounded-full  h-5 w-5 border-t-2 border-b-2 border-white-500"></div>}
                        Login
                    </Button>
                </div>
                <div className="flex justify-start mt-10">
                <Link to="/register">
                Belum punya akun? register disini ...
                </Link>
                </div>
                
            </CardFooter>
        </Card>

       
        
        </div>
        </div>
    );
}