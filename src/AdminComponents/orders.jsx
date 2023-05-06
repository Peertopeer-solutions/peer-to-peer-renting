import React from 'react';
import { Show, List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';

export const OrderList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

