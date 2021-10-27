import React, {useEffect} from 'react'
import TablePlaylist from 'components/playlist/TablePlaylist'
import { Button } from '@material-tailwind/react';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { GetListPlaylist } from 'stores/action/playlistAction';

function Playlist() {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetListPlaylist())
        
    }, [dispatch])

    return (
        <div className=' md:px-8 min-h-screen mt-10'>
        <div className='container mx-auto max-w-full'>
          <div className='flex justify-end px-4 mb-10 '>
            <Button onClick={() => history.push('/playlist/form')}>
              Buat Playlist
            </Button>
          </div>
          <div className='grid grid-cols-1 px-4 mb-16'>
            <TablePlaylist />
          </div>
        </div>
      </div>
    )
}

export default Playlist
