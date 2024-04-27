import LoadingSpinner from '@src/components/Design/LoadingSpinner';
import Box from '@src/components/Layout/Box';
import Row from '@src/components/Layout/Row';
import ScrollableArea from '@src/components/Layout/ScrollableArea';
import { auth, db } from '@src/firebase.config';
import { RentalRequest, RentalRequestDocument } from '@src/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useQuery } from 'react-query';
import RentalRequestCard from './RentalRequestCard';
import RentalRequestCardV2 from './RentalRequestCardV2';

const RequestPanel = () => {
  const header = <Row className='px-2 py-1 items-center'>Your requests</Row>;
  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: [auth.currentUser?.uid || 'user'],
    queryFn: async (ctx) => {
      const userId = ctx.queryKey[0];
      const ref = collection(db, 'rentalRequest');
      const q = query(ref);
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc): RentalRequest => {
        const data = doc.data() as RentalRequestDocument;
        return { id: doc.id, ...data };
      });
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const content =
    requests?.length === 0 ? (
      <div>Empty</div>
    ) : (
      <div className='overflow-scroll'>
        {requests?.map((request) => (
          <RentalRequestCardV2 request={request} />
        ))}
      </div>
    );

  return (
    <Box className='w-full'>
      {header}
      {content}
    </Box>
  );
};

export default RequestPanel;
