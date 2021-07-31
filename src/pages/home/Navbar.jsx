import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './style';
import { getItem, deleteItem } from 'utils/storage';
import { ROUTES, USER } from 'utils/constants';
import { makePostRequest } from 'utils/api';
import toastify from 'utils/toast';

export default function ButtonAppBar() {
	const history = useHistory();
	const classes = useStyles();
	const staffID = getItem(USER).staffId;
	const [loading, setLoading] = useState(false);

	const clockOut = async () => {
		setLoading(true);

		const { error } = await makePostRequest({
			path: `/log/check-out/${staffID}`,
			payload: {},
		});

		if (error) {
			toastify('danger', 'Error clocking out! Please, try again');
		} else {
			setTimeout(() => {
				deleteItem(USER);
				history.push(ROUTES.LOGIN);
				toastify('success', 'Successfully clocked out');
			}, 500);
		}
		setLoading(false);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						Staff
					</Typography>
					<Button color='inherit' onClick={clockOut}>
						{loading ? (
							<CircularProgress size={20} color='inherit' className={classes.loader} />
						) : (
							'Clock Out'
						)}
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
