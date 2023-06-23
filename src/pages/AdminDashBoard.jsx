import React from 'react'
import { Admin, Resource } from 'react-admin';
import {
  FirebaseAuthProvider,
  FirebaseDataProvider
} from 'react-admin-firebase';
import { firebaseConfig} from '../firebase.config';
import { UserList} from '../AdminComponents/users';
import { OrderList } from '../AdminComponents/orders';

const AdminDashBoard = () => {

  const options = {
    
   
  }
  
  const dataProvider = FirebaseDataProvider(firebaseConfig, options);
  const authProvider = FirebaseAuthProvider(firebaseConfig, options);
  return (
    
      <Admin
    title="Admin Dashboard"
    dataProvider={dataProvider}
    authProvider={authProvider}
    basename="/adminpanel"
    >
    <Resource name="users" list={UserList} />
    <Resource name="orders" list={OrderList}/>
  </Admin>
  )
}

export default AdminDashBoard
