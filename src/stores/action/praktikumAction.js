import axios from 'axios'

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

const SetVisibleContentPraktikum = (data) => {
    return {
        type: 'SET_VISIBLE_CONTENT_PRAKTIKUM', payload: data
    };
}


export {
    GetListPraktikum,
    SetPraktikum,
    SetLoading,
    SetCurrentPraktikum,
    SetVisibleFormPraktikum,
    SetVisibleContentPraktikum,
    SetQuestionsFormPraktikum,
    SetCurrentQuestionForm
}
