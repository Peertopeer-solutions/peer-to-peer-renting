import * as Dialog from '@radix-ui/primitive';
import { RxCross1 } from 'react-icons/rx';

export default function RadixModal({ children, open, onOpenChange }) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			{children}
		</Dialog.Root>
	);
}

function RadixModalContent({ title, children }) {
	return (
		<Dialog.Portal>
			<Dialog.Overlay className='bg-black/40 fixed inset-0 z-50' />
			<Dialog.Content className='bg-white fixed top-1/2 left-1/2 w-[min(80vw,50rem)] -translate-x-1/2 -translate-y-1/2 z-50 py-2 px-4 rounded'>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Close className='p-1 text-gray-400 hover:text-gray-800 text-lg absolute top-1 right-1 '>
					<RxCross1 />
				</Dialog.Close>
				{children}
			</Dialog.Content>
		</Dialog.Portal>
	);
}

RadixModal.Button = Dialog.Trigger;
RadixModal.Content = RadixModalContent;
