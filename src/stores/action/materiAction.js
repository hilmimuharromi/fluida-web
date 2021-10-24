import axios from 'axios'

const GetListMateri =  () => {
    return async(dispatch) => {
        const {data, status} = await axios(`${process.env.REACT_APP_API_URL}/materi`)
        if(status) {
            dispatch(SetMateri(data.data))
        }
    }
}

const SetMateri = (data) => {
    console.log('materiiii', data)
    return {
        type: 'SET_MATERI', payload: data
    };
}
const SetLoading = (data) => {
    return { type: 'SET_LOADING_MATERI', payload: data };
}

const SetCurrentMateri = (data) => {
    return {
        type: 'SET_CURRENT_MATERI', payload: data
    };
}

const SetVisibleFormMateri = (data) => {
    return {
        type: 'SET_VISIBLE_FORM_MATERI', payload: data
    };

}

const SetVisibleContentMateri = (data) => {
    return {
        type: 'SET_VISIBLE_CONTENT_MATERI', payload: data
    };

}


export {
    GetListMateri,
    SetMateri,
    SetLoading,
    SetCurrentMateri,
    SetVisibleFormMateri,
    SetVisibleContentMateri
}