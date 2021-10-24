const initialState = {
    data: [],
    listQuestionForm: [],
    currentQuestionForm: '',
    visibleForm: false,
    visibleContent: false,
    loading: false,
  };
  
  const soalLatihanState = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SOAL_LATIHAN':
        return {
          ...state,
          data: action.payload,
        };
  
      case 'SET_VISIBLE_FORM_SOAL_LATIHAN':
        return {
          ...state,
          visibleForm: action.payload,
        };
        case 'SET_VISIBLE_CONTENT_SOAL_LATIHAN':
          return {
            ...state,
            visibleContent: action.payload,
          };
  
        case 'SET_CURRENT_SOAL_LATIHAN':
          return {
            ...state,
            currentData: action.payload,
          };

          case 'SET_LIST_QUESTION_FORM':
            return {
              ...state,
              listQuestionForm: action.payload,
            };

            case 'SET_CURRENT_QUESTION_FORM':
              return {
                ...state,
                currentQuestionForm: action.payload,
              };
      default:
        return state;
    }
  };
  export default soalLatihanState;
  