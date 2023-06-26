import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		name: 'Неизвестный',
	},
	reducers: {
		setUser: (state, action) => {
			state.name = action.payload
		}
	}
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;