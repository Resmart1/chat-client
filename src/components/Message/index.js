import { memo } from "react";
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Message({ item }) {
	const cn = bem('Message');
	const date = new Date(item.date).toLocaleString("ru", { hour: '2-digit', minute: '2-digit' });

	return (
		<div className={cn('')}>
			<div className={cn('user')}>
				{item.user}:
			</div>
			<div className={cn('text')}>
				{item.message}
			</div>
			<div>
				{date}
			</div>
		</div>
	);
}

export default memo(Message);