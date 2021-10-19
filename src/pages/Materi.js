import React from 'react'
import TableMateri from 'components/materi/TableMateri'
import ModalFormMateri from 'components/materi/ModalFormMateri'
import { Button } from '@material-tailwind/react'
function Materi() {
    return (
        <div className=" md:px-8 min-h-screen mt-10">
                <div className="container mx-auto max-w-full">
            <ModalFormMateri />
                   
                    <div className="grid grid-cols-1 px-4 mb-16">
                    <TableMateri/>
        </div>
        </div>
        </div>
    )
}

export default Materi
