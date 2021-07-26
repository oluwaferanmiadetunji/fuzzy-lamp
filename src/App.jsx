import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'components/routes';
import Loader from 'components/loader';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<CssBaseline />
			<BrowserRouter>
				<ToastContainer />
				<Routes />
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
