import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import React from 'react';
import {styled} from '@stitches/react'

const StyledViewport = styled(RadixScrollArea.Viewport, {
  // Your existing styles
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',

  "> div[style]": {
    display: 'block !important',
  },
});
type ScrollAreaProps = {
  children: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
};

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
const ScrollableArea: React.FC<ScrollAreaProps> = ({
  children,
  orientation = 'vertical',
}) => {
  return (
    <RadixScrollArea.Root
      className={
        orientation === 'vertical'
          ? 'h-full '
          : 'h-fit' + ' w-full rounded-[inherit] '
      }
      type='scroll'
    >
      <StyledViewport className=' h-full w-full rounded-[inherit] '>
        {children}
      </StyledViewport>
      <RadixScrollArea.Scrollbar
        orientation={orientation}
        className='flex select-none p-0.5 bg-gray-100 touch-none data-[orientation=vertical]:w-[10px] data-[orientation=horizontal]:h-[10px] data-[orientation=horizontal]:flex-col'
      >
        <RadixScrollArea.Thumb className='bg-gray-400 rounded-[10px] flex-1 relative' />
      </RadixScrollArea.Scrollbar>
      {/* <RadixScrollArea.Corner class 2Name={styles.ScrollAreaCorner} /> */}
    </RadixScrollArea.Root>
  );
};
export default ScrollableArea;
