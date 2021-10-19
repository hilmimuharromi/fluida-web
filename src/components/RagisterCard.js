import React from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import { Link } from 'react-router-dom';

export default function RegisterCard() {
    return (
        <div className="container mx-auto max-w-full min-h-screen flex justify-center items-center">
             <div className="w-6/12">
        <Card>
            <CardHeader color="lightBlue" size="lg">
                <H5 color="white">Register Fluida</H5>
            </CardHeader>

            <CardBody>
                <div className="mt-4 mb-8 px-4">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Name"
                        iconName="account_circle"
                    />
                </div>
                <div className="mb-8 px-4">
                    <InputIcon
                        type="email"
                        color="lightBlue"
                        placeholder="Email Address"
                        iconName="email"
                    />
                </div>
                <div className="mb-4 px-4">
                    <InputIcon
                        type="password"
                        color="lightBlue"
                        placeholder="password"
                        iconName="lock"
                    />
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex justify-center">
                    <Button
                        color="lightBlue"
                        size="lg"
                        ripple="dark"
                    >
                        Get Started
                    </Button>
                </div>
                <div className="flex justify-start mt-10">
                <Link to="/login">
                sudah punya akun? login disini
                </Link>
                </div>
            </CardFooter>
        </Card>
        </div>
        </div>
    );
}