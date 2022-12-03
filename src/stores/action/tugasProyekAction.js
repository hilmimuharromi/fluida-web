import axios from 'axios'
import {store} from "../index";

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

const SetResultProyek = (data) => {
    return {
        type: 'SET_RESULT_PROYEK', payload: data
    };
}

const GetResultTugasProyek =  (proyekId) => {
    const state = store.getState()
    return async(dispatch) => {
        const {data, status} = await axios({
            url: `${process.env.REACT_APP_API_URL}/penilaian/proyek/${proyekId}`,
            method: "GET",
            headers:  {
                token: state.user.data.token
            }
        })
        if(status) {
            dispatch(SetResultProyek(data.data))
        }
    }
}


export {
    GetListTugasProyek,
    SetTugasProyek,
    SetLoading,
    SetCurrentTugasProyek,
    SetVisibleFormTugasProyek,
    GetResultTugasProyek
}
