import { memo } from 'react';
import Auth from '../components/Auth';
import Chat from '../components/Chat';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<Routes>
			<Route path={'/chatmore'} element={<Chat />} />
			<Route path={'*'} element={<Auth />} />
		</Routes>
	);
}

export default memo(App);
