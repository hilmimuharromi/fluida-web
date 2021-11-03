import axios from 'axios'

const GetListPlaylist =  () => {
    return async(dispatch) => {
        const {data, status} = await axios(`${process.env.REACT_APP_API_URL}/playlist`)
        if(status) {
            dispatch(SetPlaylist(data.data))
        }
    }
}

const SetPlaylist = (data) => {
    console.log('playlist', data)
    return {
        type: 'SET_PLAYLIST', payload: data
    };
}


const SetCurrentPlaylist = (data) => {
    console.log('playlist', data)
    return {
        type: 'SET_CURRENT_PLAYLIST', payload: data
    };
}

export {
    GetListPlaylist, SetCurrentPlaylist
}