import { memo } from "react";
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Layout({ children }) {
	const cn = bem('Layout');

	return (
		<div className={cn(``)}>
			{children}
		</div>
	);
}

export default memo(Layout);

