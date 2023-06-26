import { useState, memo } from "react";
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux-store/userSlice";

function Auth() {
	const cn = bem('Auth');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userName, setUserName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (userName !== '') {
			dispatch(setUser(userName));
		}
		navigate(`/chatmore`);
	};

	return (
		<Layout>
			<div className={cn(``)} >
				<form onSubmit={(e) => handleSubmit(e)} className={cn(`form`)}>
					<label className={cn(`label`)} htmlFor="user">Введите ваше имя</label>
					<input className={cn(`input`)} name="user" type="text" onChange={(e) => setUserName(e.target.value)}></input>
					<button type="submit">Вход</button>
				</form>
			</div>
		</Layout>
	);
}

export default memo(Auth);