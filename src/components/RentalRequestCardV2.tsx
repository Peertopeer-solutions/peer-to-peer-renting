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
import { LinkButton } from './Design/Button';
import Icon from './Design/Icon';

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
    return <LoadingSpinner/>;
  }

  const { requestedBy:user, requestedProduct: product } = data!;
  return (
    <Row className='border-2 mb-1 rounded  overflow-hidden items-center justify-between p-3'>
      <Column className='justify-center items-start  h-full space-y-3'>
      <img src={product.imgUrls[0]} className='object-fit w-9 aspect-[4/3] mr-2' />
      <h1 className=''>
          {getDateFromTimestamp(product.timestamp.seconds).toLocaleDateString(
            'en-IN',
            {
              month: 'long',
              day: '2-digit',
            }
          ) }
        </h1>
        </Column>
      
      <Column className=' h-full space-y-3'>
        <h1 className='px-4'>{product.title}</h1>
        
        <LinkButton icon={Icons.ArrowRight} className='text-blue-700 text-md truncate py-0 '> Take action</LinkButton>
      </Column>
    </Row>
  );
};

export default RentalRequestCardV2;
