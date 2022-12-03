const initialState = {
    data: [],
    currentData: '',
    visibleForm: false,
    visibleContent: false,
    loading: false,
  result: []
  };

  const tugasProyekState = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TUGAS_PROYEK':
        return {
          ...state,
          data: action.payload,
        };

      case 'SET_VISIBLE_FORM_TUGAS_PROYEK':
        return {
          ...state,
          visibleForm: action.payload,
        };
        case 'SET_VISIBLE_CONTENT_TUGAS_PROYEK':
          return {
            ...state,
            visibleContent: action.payload,
          };

        case 'SET_CURRENT_TUGAS_PROYEK':
          return {
            ...state,
            currentData: action.payload,
          };

      case 'SET_RESULT_PROYEK':
        return {
          ...state,
          result: action.payload
        }
      default:
        return state;
    }
  };
  export default tugasProyekState;
