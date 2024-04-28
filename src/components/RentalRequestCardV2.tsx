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
  const { requestedBy, requestedProduct } = data!;
  const str = JSON.stringify(request.id)
  const uniqueRequestId = str.slice(-5,-1);
  const options = { dateStyle: 'long' };
  const date = new Date(request.timestamp?.seconds * 1000).toLocaleString('en-US', options);
  const starDate =  new Date(request.startDate?.seconds * 1000).toLocaleString('en-US', options);
  const endDate =  request.endDate.toDate();
  console.log(endDate)
  console.log(starDate)
  return <Box className=' mb-1 rounded h-32'>
     <Column className=' items-center'>
      <div className='w-full rounded-lg border-2  bg-white '>
        <div className='grid grid-cols-3 place-items-center'>
        <img
                className="object-contain aspect-[4/3] w-16 md:w-[100px] ml-1"
                src={requestedProduct && requestedProduct.imgUrls[0]}
                alt= {`${requestedProduct?.title}`}    
            />
          <div>
            <p className='text-[20px] font-medium md:text-lg uppercase p-2'><span className='font-bold'>ID</span>: {uniqueRequestId}</p>
            <p className='text-[15px] md:text-sm p-2'>{date}</p>
          </div>
          <div className='flex flex-col items-end'>
          <p
            className={`uppercase font-medium p-2 text-[20px] md:text-lg ${
             request.status ==='pending'?'text-amber-400': request.status === 'approved' ? 'text-green-500' : 'text-red-500'
            } `}
          >
            {request.status}
          </p>
          
          </div>
        </div>
      </div>
      
        </Column>
       

        
    </Box>;
};

export default RentalRequestCardV2;
