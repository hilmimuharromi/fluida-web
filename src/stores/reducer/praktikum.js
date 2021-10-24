const initialState = {
    data: [],
    currentData: '',
    visibleForm: false,
    visibleContent: false,
    loading: false,
  };
  
  const praktikumState = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRAKTIKUM':
        return {
          ...state,
          data: action.payload,
        };
  
      case 'SET_VISIBLE_FORM_PRAKTIKUM':
        return {
          ...state,
          visibleForm: action.payload,
        };
        case 'SET_VISIBLE_CONTENT_PRAKTIKUM':
          return {
            ...state,
            visibleContent: action.payload,
          };
  
        case 'SET_CURRENT_PRAKTIKUM':
          return {
            ...state,
            currentData: action.payload,
          };
      default:
        return state;
    }
  };
  export default praktikumState;
  