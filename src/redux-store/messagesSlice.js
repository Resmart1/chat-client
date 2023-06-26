import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getMessages = createAsyncThunk('messages/getMessages', async () => {
	const response = await fetch("https://chat-server-2v7w.onrender.com/list", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	}).then((res) => res.json())
		.then((data) => data.data);
	return response
});

export const sendMessage = createAsyncThunk('messages/sendMessage', async (body) => {
	const { user, message } = body;
	const response = await fetch("https://chat-server-2v7w.onrender.com/send", {
		method: "Post",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			user,
			message,
			date: new Date()
		}),
	}).then((res) => res.json())
		.then((data) => data);
	return response
});

const messagesSlice = createSlice({
	name: 'messages',
	initialState: {
		data: [],
		loading: false,
	},
	reducers: {
		getNewMessage: (state, action) => {
			state.data = [...state.data, action.payload];
			state.loading = false;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getMessages.pending, state => {
				state.loading = true;
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(getMessages.rejected, (state) => {
				state.data = [];
				state.loading = false;
			})
			.addCase(sendMessage.pending, state => {
				state.loading = true;
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.data = [...state.data, action.payload];
				state.loading = false;
			})
			.addCase(sendMessage.rejected, (state) => {
				console.log('error');
				state.loading = false;
			})
	}
})

export const { getNewMessage } = messagesSlice.actions;
export default messagesSlice.reducer;