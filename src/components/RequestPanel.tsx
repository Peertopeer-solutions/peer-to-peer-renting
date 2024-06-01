import LoadingSpinner from '@src/components/Design/LoadingSpinner';
import Box from '@src/components/Layout/Box';
import Row from '@src/components/Layout/Row';
import ScrollableArea from '@src/components/Layout/ScrollableArea';
import { auth, db } from '@src/firebase.config';
import { RentalRequest, RentalRequestDocument } from '@src/types';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useQuery } from 'react-query';
import RentalRequestCard from './RentalRequestCard';
import RentalRequestCardV2 from './RentalRequestCardV2';
import Column from './Layout/Column';
import SidePanelSkeleton from './Skeletons/SkeletonSidePanel';
import SkeletonRequestPanel from './Skeletons/SkeletonRequestPanel';
import SkeletonSidePanel from './Skeletons/SkeletonSidePanel';

const RequestPanel = () => {
  const header = <Row className='px-2 py-1 items-center'>Your requests</Row>;
  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: [auth.currentUser?.uid || 'user'],
    queryFn: async (ctx) => {
      try{
      const userId = ctx.queryKey[0];
      const ref = collection(db, 'rentalRequest');
      const q = query(ref, where("ownerId", "==", userId), orderBy('timestamp','desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc): RentalRequest => {
        const data = doc.data() as RentalRequestDocument;
        return { id: doc.id, ...data };
      });
      } catch(err){
        console.error(err)
        throw err
      }
     
    },
  });

  if (isLoading) {
    return <SkeletonSidePanel />;
  }

  console.log(auth.currentUser?.uid)

  const content =
    requests?.length === 0 ? (
      <div>Empty</div>
    ) : (
      <ScrollableArea>
        {requests?.map((request) => (
          <RentalRequestCardV2 request={request} />
        ))}
      </ScrollableArea>
    );

  return (
    <Column className='h-full '>
      {header}
      <div className='block overflow-hidden'>{content}</div>

    </Column>
  );
};

export default RequestPanel;
