import React, {useEffect} from 'react';
// import TableResultPraktikum from "../components/praktikum/TableResultPraktikum";
import TableResultTugas from "../components/tugasProyek/TableResultTugas";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {GetResultTugasProyek} from "../stores/action/tugasProyekAction";
const ResultTugasProyek = () => {

    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(GetResultTugasProyek(params.proyekId))
        //eslint-disable-next-line
    },[params.proyekId])

    return(
        <div className=' md:px-8 min-h-screen mt-10'>
            <div className='container mx-auto max-w-full'>
                <div className='flex justify-end px-4 mb-10 '>
                    <TableResultTugas />
                </div>
            </div>
        </div>
    )
}

export default ResultTugasProyek;
