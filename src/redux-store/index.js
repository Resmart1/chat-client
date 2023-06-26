import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messagesReducer from './messagesSlice';


const store = configureStore({
	reducer: {
		user: userReducer,
		messages: messagesReducer,
	}
})

// store.subscribe(() => console.log(store.getState()))

export default store;