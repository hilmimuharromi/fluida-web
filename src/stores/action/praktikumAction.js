import axios from 'axios'
import {store} from "../index";

const GetListPraktikum =  () => {
    return async(dispatch) => {
        const {data, status} = await axios(`${process.env.REACT_APP_API_URL}/praktikum`)
        if(status) {
            dispatch(SetPraktikum(data.data))
        }
    }
}

const SetPraktikum = (data) => {
    console.log('materiiii', data)
    return {
        type: 'SET_PRAKTIKUM', payload: data
    };
}
const SetLoading = (data) => {
    return { type: 'SET_LOADING_PRAKTIKUM', payload: data };
}

const SetCurrentPraktikum = (data) => {
    return {
        type: 'SET_CURRENT_PRAKTIKUM', payload: data
    };
}

const SetQuestionsFormPraktikum = (data) => {
    return {
        type: 'SET_LIST_QUESTION_FORM_PRAKTIKUM', payload: data
    };
}


const SetVisibleFormPraktikum = (data) => {
    return {
        type: 'SET_VISIBLE_FORM_PRAKTIKUM', payload: data
    };
}

const SetCurrentQuestionForm = (data) => {
    return {
        type: 'SET_CURRENT_QUESTION_FORM', payload: data
    };
}

const SetResultPraktikum = (data) => {
    return {
        type: 'SET_RESULT_PRAKTIKUM', payload: data
    };
}

const GetResultPraktikum =  (praktikumId) => {
    const state = store.getState()
    return async(dispatch) => {
        const {data, status} = await axios({
            url: `${process.env.REACT_APP_API_URL}/penilaian/praktikum/${praktikumId}`,
            method: "GET",
            headers:  {
                token: state.user.data.token
            }
        })
        console.log("result==>",  data, status)

        if(status) {
            dispatch(SetResultPraktikum(data.data))
        }
    }
}


export {
    GetListPraktikum,
    SetPraktikum,
    SetLoading,
    SetCurrentPraktikum,
    SetVisibleFormPraktikum,
    SetQuestionsFormPraktikum,
    SetCurrentQuestionForm,
    GetResultPraktikum
}
