import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage  from 'redux-persist/lib/storage'
import user from './user'
import materi from './materi'
import praktikum from './praktikum'
import tugasProyek from './tugasProyek'
import soalLatihan from './soalLatihan'
const persistConfig = {
    key: 'root',
    storage,
    timeout: 2000
}

const reducers = combineReducers({
    user, materi, praktikum, tugasProyek, soalLatihan
})

const persistedReducer = persistReducer(persistConfig, reducers)
export default persistedReducer;