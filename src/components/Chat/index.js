import { useState, useEffect, memo, useRef } from "react";
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getMessages, sendMessage } from "../../redux-store/messagesSlice";
import { getNewMessage } from "../../redux-store/messagesSlice";
import Layout from "../Layout";
import Message from "../Message";
import io from 'socket.io-client';

function Chat() {
	const cn = bem('Chat');
	const dispatch = useDispatch();
	const ref = useRef();
	const parentRef = useRef(null);
	const socket = useRef(null);

	const select = useSelector(state => ({
		user: state.user.name,
		messages: state.messages.data,
		loading: state.messages.loading,
	}), shallowEqual);

	const [message, setMessage] = useState('');
	console.log('render');

	useEffect(() => {
		socket.current = io.connect("https://chat-server-2v7w.onrender.com/");
		dispatch(getMessages());
		return () => socket.current.disconnect();
	}, []);

	useEffect(() => {
		socket.current.on("recieve_message", (message) => {
			dispatch(getNewMessage(message));
			if (Math.abs(parentRef.current?.getBoundingClientRect().bottom - ref.current?.getBoundingClientRect().bottom) < 10) {
				setTimeout(() => load(), 0);
			}
		})
	}, [socket]);

	useEffect(() => {
		if (!select.loading) {
			load();
		}
	}, [select.loading]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (message.trim()) {
			dispatch(sendMessage({
				user: select.user,
				message: message.trim(),
			}));
			socket.current.emit("send_message", {
				user: select.user,
				message: message.trim(),
				date: new Date(),
			})
			setMessage('');
			load();
		}
	};

	const load = () => {
		ref.current?.scrollIntoView({ behavior: 'instant', block: "end" })
	}

	return (
		<Layout>
			<div className={cn(``)} >
				<div className={cn(`container`)}>
					<div ref={parentRef} className={cn(`messages`)}>
						<div ref={ref} className={cn(`list`)}>
							{select.messages.map((item, index) => {
								return <Message key={index} item={item}></Message>
							})}
						</div>
					</div>
					<form onSubmit={(e) => handleSubmit(e)} className={cn(`form`)}>
						<input value={message} className={cn(`input`)} name="user" type="text" onChange={(e) => setMessage(e.target.value)}></input>
						<button className={cn(`button`)} type="submit">Отправить</button>
					</form>
				</div>
			</div>
		</Layout>
	);
}

export default memo(Chat);