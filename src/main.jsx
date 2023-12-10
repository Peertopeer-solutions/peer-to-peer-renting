import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAuthProvider } from './FirebaseAuthContext.jsx';

const queryClient = new QueryClient();


	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
				<QueryClientProvider client={queryClient}>
					<Suspense fallback={'..loading'}>
					<App />
					</Suspense>
					</QueryClientProvider>
		</React.StrictMode>
	)


;
