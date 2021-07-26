import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'components/routes';
import Loader from 'components/loader';

import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<CssBaseline />
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
