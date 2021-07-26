import { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { ROUTES } from 'utils/constants';

const Home = lazy(() => import('pages/home'));
const Login = lazy(() => import('pages/login'));
const Create = lazy(() => import('pages/create'));

function Routes() {
	return (
		<Switch>
			<Route exact path={ROUTES.LOGIN} component={Login} />
			<Route exact path={ROUTES.HOME} component={Home} />
			<Route exact path={ROUTES.CREATE_STAFF} component={Create} />
			<Route render={() => <Redirect to={ROUTES.HOME} />} />
		</Switch>
	);
}

export default Routes;
