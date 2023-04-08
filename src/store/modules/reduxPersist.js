import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// eslint-disable-next-line import/no-anonymous-default-export
export default reducers => {
  const persistReducers = persistReducer({
    key: 'REACT-BASE',
    storage,
    whitelist: ['example'],

  },
  reducers
  );

  return persistReducers;
};

