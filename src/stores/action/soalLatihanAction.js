import axios from 'axios'
import {store} from "../index"
const GetListSoalLatihan =  () => {
    return async(dispatch) => {
        const {data, status} = await axios(`${process.env.REACT_APP_API_URL}/soal-latihan`)
        if(status) {
            dispatch(SetSoalLatihan(data.data))
        }
    }
}

const GetResultSoalLatihan =  (soalId) => {
    console.log("store ==>",  store.getState())
    const state = store.getState()
    return async(dispatch) => {
        const {data, status} = await axios({
            url: `${process.env.REACT_APP_API_URL}/penilaian/soal/${soalId}`,
            method: "GET",
            headers:  {
                token: state.user.data.token
            }
        })
    console.log("result==>",  data, status)

        if(status) {
            dispatch(SetResultSoalLatihan(data.data))
        }
    }
}

const SetSoalLatihan = (data) => {
    console.log('soal latihan ===>', data)
    return {
        type: 'SET_SOAL_LATIHAN', payload: data
    };
}

const SetResultSoalLatihan = (data) => {
    console.log('result soal latihan ===>', data)
    return {
        type: 'SET_RESULT_SOAL_LATIHAN', payload: data
    };
}
const SetLoading = (data) => {
    return { type: 'SET_LOADING_SOAL_LATIHAN', payload: data };
}

const SetCurrentSoalLatihan = (data) => {
    return {
        type: 'SET_CURRENT_SOAL_LATIHAN', payload: data
    };
}

const SetVisibleFormSoalLatihan = (data) => {
    return {
        type: 'SET_VISIBLE_FORM_SOAL_LATIHAN', payload: data
    };

}

const SetVisibleContentSoalLatihan = (data) => {
    return {
        type: 'SET_VISIBLE_CONTENT_SOAL_LATIHAN', payload: data
    };
}


const SetListQuestionForm = (data) =>  {
    return {
        type: 'SET_LIST_QUESTION_FORM', payload: data
    }
}

const SetCurrentQuestionForm = (data) =>  {
    return {
        type: 'SET_CURRENT_QUESTION_FORM', payload: data
    }
}




export {
    GetListSoalLatihan,
    GetResultSoalLatihan ,
    SetSoalLatihan,
    SetLoading,
    SetCurrentSoalLatihan,
    SetVisibleFormSoalLatihan,
    SetVisibleContentSoalLatihan,
    SetListQuestionForm,
    SetCurrentQuestionForm
}