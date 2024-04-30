import { db } from '@src/firebase.config';
import { Product, RentalRequest, User } from '@src/types';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import LoadingSpinner from './Design/LoadingSpinner';
import Box from './Layout/Box';
import Row from './Layout/Row';
import Column from './Layout/Column';
import { getDateFromTimestamp } from './SideNavigation';
import { Button } from './UI/Buttons';
import { Icons } from '@src/constant/icons';

type RentalRequestCardProps = {
  request: RentalRequest;
};
const RentalRequestCardV2: React.FC<RentalRequestCardProps> = ({ request }) => {
  const { data, isLoading, error } = useQuery([request.id], async () => {
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
  const { requestedBy, requestedProduct: product } = data!;
  return (
    <Row className='border-2 mb-1 rounded h-32 overflow-hidden items-center'>
      <img src={product.imgUrls[0]} className='object-contain w-24 h-24 mr-2' />
      <Column className='h-full'>
        <h1>{product.title}</h1>
        <h2>
          {getDateFromTimestamp(product.timestamp.seconds).toLocaleDateString(
            'en-IN',
            {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }
          )}
        </h2>
        <Button icon={Icons.ArrowRight}></Button>
      </Column>
    </Row>
  );
};

export default RentalRequestCardV2;
