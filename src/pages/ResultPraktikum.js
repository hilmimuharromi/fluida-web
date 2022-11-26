import React,  {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {GetResultPraktikum} from "../stores/action/praktikumAction"
import {useParams} from "react-router-dom"
import TableResultPraktikum from 'components/praktikum/TableResultPraktikum'
function ResultPraktikum() {
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        console.log(params)
        dispatch(GetResultPraktikum(params.praktikumId))
        //eslint-disable-next-line
    },[])
    return (
        <div className=' md:px-8 min-h-screen mt-10'>
            <div className='container mx-auto max-w-full'>
                <div className='flex justify-end px-4 mb-10 '>
                    <TableResultPraktikum />
                </div>
            </div>
        </div>
    )
}

export default ResultPraktikum
