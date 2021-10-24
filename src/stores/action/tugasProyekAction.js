import axios from 'axios'

const GetListTugasProyek =  () => {
    return async(dispatch) => {
        const {data, status} = await axios(`${process.env.REACT_APP_API_URL}/tugas-proyek`)
        if(status) {
            dispatch(SetTugasProyek(data.data))
        }
    }
}

const SetTugasProyek = (data) => {
    console.log('tugas proyek ===>', data)
    return {
        type: 'SET_TUGAS_PROYEK', payload: data
    };
}
const SetLoading = (data) => {
    return { type: 'SET_LOADING_TUGAS_PROYEK', payload: data };
}

const SetCurrentTugasProyek = (data) => {
    return {
        type: 'SET_CURRENT_TUGAS_PROYEK', payload: data
    };
}

const SetVisibleFormTugasProyek = (data) => {
    return {
        type: 'SET_VISIBLE_FORM_TUGAS_PROYEK', payload: data
    };

}

const SetVisibleContentTugasProyek = (data) => {
    return {
        type: 'SET_VISIBLE_CONTENT_TUGAS_PROYEK', payload: data
    };

}


export {
    GetListTugasProyek,
    SetTugasProyek,
    SetLoading,
    SetCurrentTugasProyek,
    SetVisibleFormTugasProyek,
    SetVisibleContentTugasProyek
}