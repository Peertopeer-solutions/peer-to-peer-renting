import { db } from '@src/firebase.config';
import { Product, RentalRequest, User } from '@src/types';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import LoadingSpinner from './Design/LoadingSpinner';
import Box from './Layout/Box';
import Row from './Layout/Row';
import Column from './Layout/Column';

type RentalRequestCardProps = {
  request: RentalRequest;
};
const RentalRequestCardV2: React.FC<RentalRequestCardProps> = ({ request }) => {
  const { data, isLoading, error } = useQuery([request.id], async (ctx) => {
    const requestBySnapshot = await getDoc(doc(db, 'users', request.userId));
    const requestedBy = {
      id: requestBySnapshot.id,
      ...requestBySnapshot.data(),
    } as User;
    const productSnaphot = await getDoc(doc(db, 'listings', request.productId));
    const requestedProduct = {
      id: productSnaphot.id,
      ...productSnaphot.data(),
    } as Product;

    return { requestedBy, requestedProduct };
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const { requestedBy, requestedProduct } = data!;
  return <Box className='border-2 mb-1 rounded h-32'>Cards</Box>;
};

export default RentalRequestCardV2;
