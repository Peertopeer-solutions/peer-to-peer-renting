import * as Dialog from '@radix-ui/react-dialog';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import useSideSheet from '@src/data/zustand/sidesheetStore';
import { Suspense } from 'react';
import Alert from '../Design/Alert';
import getAsyncElement from '@src/hooks/useAsyncElement';
import Spinner from '../Spinner';
import Row from '@src/components/Layout/Row';
import Icon from '@src/components/Design/Icon';
import { Icons } from '@src/constant/icons';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '@src/components/Design/LoadingSpinner';

export default function SidePanel({ children, open, onOpenChange }) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<SidePanelContent open={open} />
		</Dialog.Root>
	);
}

function SidePanelContent({ open }) {
	const element = useSideSheet((state) => state.element);
	const props = useSideSheet((state) => state.props);
	const AsyncElement = getAsyncElement(element);

	return (
		<AnimatePresence mode='sync'>
			{!open ? null : (
				<Dialog.Portal forceMount={open}>
					<Dialog.Overlay className='bg-black/30 fixed inset-0 z-50' />
					<Dialog.Content asChild>
						<motion.div
							className='bg-white fixed top-0 right-0 h-full z-50 py-2 px-4 rounded-l-md shadow-lg'
							style={{ width: 'min(95%, 22rem)' }}
							initial={{ x: '15rem', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.2 }}
							exit={{
								x: '15rem',
								opacity: 0,
							}}
						>
							<Row>
								{/* <Dialog.Title>{'TITLE'}</Dialog.Title> */}
								<Dialog.Close className='absolute p-1 text-gray-400 hover:text-gray-900 text-lg right-3 top-3 hover:bg-gray-200 rounded'>
									<Icon name={Icons.Cross1} />
								</Dialog.Close>
							</Row>
							<Suspense fallback={<LoadingSpinner />}>
								<AsyncElement {...props} />
							</Suspense>
						</motion.div>
					</Dialog.Content>
				</Dialog.Portal>
			)}
		</AnimatePresence>
	);
}

SidePanel.Button = Dialog.Trigger;
SidePanel.Content = SidePanelContent;
