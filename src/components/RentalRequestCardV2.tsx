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
import { useEffect, useRef, useState } from 'react';
import Center from './Layout/Center';
import SkeletonRequestPanel from './Skeletons/SkeletonRequestPanel';
import useRequestPanel from '@src/hooks/useRequestPanel';
import { routes } from './Routing/Routes';

type RentalRequestCardProps = {
  request: RentalRequest;
};





const RentalRequestCardV2: React.FC<RentalRequestCardProps> = ({ request }) => {

  const {closeRequestPanel} = useRequestPanel()

  function actionHandler (){
  closeRequestPanel()

}

  const requestDate = getDateFromTimestamp(request.timestamp?.seconds*1000)
  const deadline = new Date(requestDate.getTime()+ 24 * 60 * 60 * 1000)

  const calculateProgress = () => {
    const now = new Date();
    const totalDuration = deadline - requestDate;
    const elapsed = now - requestDate;
    const percentage = (elapsed / totalDuration) * 100;
    const timeLeft = Math.max(0, deadline - now);
    return {
      percentage: Math.min(percentage, 100),
      timeLeft: new Date(timeLeft).toISOString().substr(11, 8), // Convert milliseconds to HH:mm:ss format
    };
  };
  const [progress, setProgress] = useState(calculateProgress());
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(calculateProgress());
    }, 1000); // Update every second
    if (containerRef.current) {
      console.log(containerRef.current);
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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
    return <SkeletonRequestPanel/>;
  }

  const { requestedBy:user, requestedProduct: product } = data!;

  return (
    <div className=" mx-auto bg-white shadow-md rounded-lg overflow-hidden border my-2">
      <div className="p-4 min-w-0">
        <Center className="justify-start">
          <div className="flex-shrink-0  p-2 rounded-full">
           <img src={product.imgUrls[0]} className='object-fit w-9 h-9 mr-2 rounded-full' />

          </div>
          <div className="ml-4 min-w-0">
            <h2 className="text-xs border max-w-max p-0.5 rounded-lg truncate font-semibold text-gray-500 ">{request.status}</h2>
            <h2 className="text-md truncate font-semibold text-gray-800 ">its a very good camera you should get this camera</h2>
          </div>
          
        </Center>
      
        <div className="mt-4">
          <div className="relative pt-1">
            <Center className="mb-2 justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-700 ">
                {requestDate.toLocaleDateString(
            'en-IN',
            {
              month: 'long',
              day: '2-digit',
            }
          ) }
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-700">
                  Time Left: {progress.timeLeft}
                </span>
              </div>
              
            </Center>
            <div className="overflow-hidden h-2 mb-4  flex rounded bg-blue-100">
              <div style={{ width: `${progress.percentage}%` }} className=" bg-blue-700"></div>
            </div>
            
            <div className='flex justify-end'>
            <LinkButton to={routes.RentalRequests} onClick={actionHandler} icon={Icons.ArrowRight} className='bg-white text-blue-700 rounded-full' >Take action</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default RentalRequestCardV2;
