const initialState = {
    data: [],
    // currentData: '',
    // visibleForm: false,
    // visibleContent: false,
    // loading: false,
  };

  const PlaylistState = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PLAYLIST':
        return {
          ...state,
          data: action.payload,
        };
  
    //   case 'SET_VISIBLE_FORM_MATERI':
    //     return {
    //       ...state,
    //       visibleForm: action.payload,
    //     };
    //     case 'SET_VISIBLE_CONTENT_MATERI':
    //       return {
    //         ...state,
    //         visibleContent: action.payload,
    //       };
  
    //     case 'SET_CURRENT_MATERI':
    //       return {
    //         ...state,
    //         currentData: action.payload,
    //       };
      default:
        return state;
    }
  };
  export default PlaylistState;
  