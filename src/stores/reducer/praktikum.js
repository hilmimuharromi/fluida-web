const initialState = {
    data: [],
  result:[],
  listQuestionForm: [],
  currentQuestionForm: '',
  visibleForm: false,
  visibleContent: false,
    currentData: '',
    loading: false,
  };

  const praktikumState = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRAKTIKUM':
        return {
          ...state,
          data: action.payload,
        };
        case 'SET_CURRENT_PRAKTIKUM':
          return {
            ...state,
            currentData: action.payload,
          };
      case 'SET_LIST_QUESTION_FORM_PRAKTIKUM':
        return {
          ...state,
          listQuestionForm: action.payload,
        };

      case 'SET_CURRENT_QUESTION_FORM':
        return {
          ...state,
          currentQuestionForm: action.payload,
        };

      case 'SET_VISIBLE_FORM_PRAKTIKUM':
        return {
          ...state,
          visibleForm: action.payload,
        };

      case 'SET_RESULT_PRAKTIKUM':
        return {
          ...state,
          result: action.payload
        }
      default:
        return state;
    }
  };
  export default praktikumState;
