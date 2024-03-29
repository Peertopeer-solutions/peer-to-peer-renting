import * as Sep from '@radix-ui/react-separator';

export default function Separator({ orientation = 'horizontal' }) {
	return (
		<Sep.Root
			decorative
			orientation={orientation}
			className='bg-slate-200 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[1px] data-[orientation=vertical]:mx-2 data-[orientation=horizontal]:h-[1px] data-[orientation=horizontal]:w-full data-[orientation=horizontal]:my-2'
		/>
	);
}
