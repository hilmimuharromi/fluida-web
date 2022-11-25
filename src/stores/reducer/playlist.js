const initialState = {
    data: [],
    currentData: '',
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


        case 'SET_CURRENT_PLAYLIST':
          return {
            ...state,
            currentData: action.payload,
          };
      default:
        return state;
    }
  };
  export default PlaylistState;
