import Icon from '@src/components/Design/Icon';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const LinkButton = ({ to, children, variant, className = '' , icon, onClick}) => {
	let btnStyle = 'bg-white text-black hover:bg-blue-600 hover:text-white';
	if (variant === 'text') btnStyle = 'text-gray-300 hover:text-lime-300';
	return (
		<Link to={to} onClick={onClick}>
			<span
				className={`${btnStyle} ${className} w-fit flex items-center px-4 py-2 transition rounded-full font-semibold text-center hover:cursor-pointer `}
			>
				<Icon name={icon} className='text-lg mr-2'/>
				{children}
			</span>
		</Link>
	);
};

const ButtonOld = ({
	children,
	variant,
	className,
	onClick,
	outline,
	options,
}) => {
	let btnStyle = 'bg-white text-black hover:bg-lime-300';
	if (outline) btnStyle = twMerge(btnStyle, 'border-2 border-lime-300');
	if (variant === 'text') btnStyle = 'text-gray-400 hover:text-lime-300';
	if (variant === 'primary') {
		btnStyle = 'text-white bg-blue-500 hover:bg-blue-600 ';
	}
	return (
		<button
			className={twMerge(
				'w-fit px-8 py-3 rounded-full text-lg font-semibold text-center tracking-wide hover:cursor-pointer items-center flex justify-center',
				btnStyle,
				className
			)}
			onClick={onClick}
			{...options}
		>
			{children}
		</button>
	);
};
// const RouteButton = ({ children }) => {
// 	const router = useRouter();

// 	return (
// 		<button
// 			className='bg-black text-white px-2 py-2 rounded-full font-bold hover:cursor-pointer mt-4 '
// 			onClick={() => {
// 				router.replace('/');
// 			}}
// 		>
// 			{children}
// 		</button>
// 	);
// };
const IconButton = ({ children, onClick, className }) => {
	return (
		<button className={`text-md ${className}`} onClick={onClick}>
			{children}
		</button>
	);
};

export { LinkButton, ButtonOld as Button, IconButton };
