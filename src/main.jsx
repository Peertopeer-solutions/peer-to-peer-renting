import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BrowserRouter } from 'react-router-dom';
import { FirebaseAuthProvider } from './FirebaseAuthContext.jsx';

const queryClient = new QueryClient();

setTimeout(() =>{
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<BrowserRouter>
				<FirebaseAuthProvider>
				<QueryClientProvider client={queryClient}>
					<App />
					</QueryClientProvider>,
	
				</FirebaseAuthProvider>
			</BrowserRouter>
		</React.StrictMode>
	)
},1000)


;
