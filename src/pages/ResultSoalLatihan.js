import React,  {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {GetResultSoalLatihan} from "../stores/action/soalLatihanAction"
import {useParams} from "react-router-dom"
import TableResultSoal from 'components/soalLatihan/TableResultSoal'
function ResultSoalLatihan() {
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    console.log(params)
    dispatch(GetResultSoalLatihan(params.soalId))

  },[])
  return (
    <div className=' md:px-8 min-h-screen mt-10'>
      <div className='container mx-auto max-w-full'>
        <div className='flex justify-end px-4 mb-10 '>
            <TableResultSoal />
        </div>
    </div>
    </div>
  )
}

export default ResultSoalLatihan