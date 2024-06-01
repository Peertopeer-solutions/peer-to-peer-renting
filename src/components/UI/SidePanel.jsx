import * as Dialog from '@radix-ui/react-dialog';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import useSideSheet from '@src/data/zustand/sidesheetStore';
import { Suspense, useCallback } from 'react';
import Alert from '../Design/Alert';
import getAsyncElement from '@src/hooks/useAsyncElement';
import Spinner from '../Spinner';
import Row from '@src/components/Layout/Row';
import Icon from '@src/components/Design/Icon';
import { Icons } from '@src/constant/icons';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '@src/components/Design/LoadingSpinner';
import useSidePanel from '@src/data/zustand/sidePanelStore';
import ScrollableArea from '@src/components/Layout/ScrollableArea';
import SidePanelSkeleton from '../Skeletons/SkeletonSidePanel';
import SkeletonSidePanel from '../Skeletons/SkeletonSidePanel';

export default function SidePanel() {
  const openSidePanel = useSidePanel((state) => state.actions.openSidePanel);
  const closeSidePanel = useSidePanel((state) => state.actions.closeSidePanel);
  const open = useSidePanel((state) => state.open);
  const sidePanelHandler = useCallback(
    (open) => (open ? openSidePanel() : closeSidePanel()),
    [openSidePanel, closeSidePanel, open]
  );
  console.log('open');
  return (
    <Dialog.Root open={open} onOpenChange={sidePanelHandler}>
      <Dialog.Trigger hidden />
      <SidePanelContent open={open} />
    </Dialog.Root>
  );
}

function SidePanelContent({ open }) {
  const element = useSideSheet((state) => state.element);
  const props = useSideSheet((state) => state.props);
  const AsyncElement = getAsyncElement(element);
  console.log(props);
  return (
    <AnimatePresence>
      {open && (
        <Dialog.Portal
          forceMount
          container={document.getElementById('side-panel-root')}
          key='sidePanelPortal'
        >
          <Dialog.Overlay className='bg-black/30 fixed inset-0 z-50' />
          <Dialog.Content
            className='bg-white fixed top-0 right-0 h-full z-50 py-2 px-4 rounded-l-md shadow-lg'
            style={{ width: 'min(95%, 22rem)' }}
            asChild
          >
            <motion.div
              initial={{ x: '15rem', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{
                x: '15rem',
                opacity: 0,
              }}
              key='sidePanelMotionDiv'
            >
              <Row>
                {/* <Dialog.Title>{'TITLE'}</Dialog.Title> */}
                <Dialog.Close className='absolute p-1 text-gray-400 hover:text-gray-900 text-lg right-3 top-3 hover:bg-gray-200 rounded'>
                  <Icon name={Icons.Cross1} />
                </Dialog.Close>
              </Row>
              
              <Suspense fallback={<SkeletonSidePanel />}>
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
