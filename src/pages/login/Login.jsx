import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';
import { ROUTES, USER } from 'utils/constants';
import { makePostRequest, makeGetRequest } from 'utils/api';
import toastify from 'utils/toast';
import { setItem } from 'utils/storage';

export default function SignIn() {
	const classes = useStyles();
	const history = useHistory();

	const [message, setMessage] = useState('Getting Details');
	const [loading, setLoading] = useState('');
	const [id, setID] = useState('');
	const [isActive, setIsActive] = useState(false);
	const [userData, setUserData] = useState({});
	const [buttonText, setButtonText] = useState('Get Details');

	const getStaffDetails = async (event) => {
		event.preventDefault();
		setLoading(true);
		setMessage('Getting Details');
		const { data, error } = await makeGetRequest(`/staff/${id}`);

		if (error) {
			toastify('danger', 'Invalid Staff ID!');
		} else {
			setIsActive(true);
			setUserData(data.data);
			setButtonText('Clock In');
		}

		setLoading(false);
	};

	const checkIn = async (event) => {
		event.preventDefault();
		setLoading(true);
		setMessage('Clocking In');

		const { error, data } = await makePostRequest({
			path: `/log/check-in/${id}`,
		});

		if (error) {
			toastify('danger', data.message);
		} else {
			setTimeout(() => {
				setItem(USER, userData);
				history.push(ROUTES.HOME);
				toastify('success', 'Successfully Clocked In');
			}, 500);
		}

		setLoading(false);
	};

	return (
		<Container component='main' maxWidth='sm' className={classes.root}>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component='h1' variant='h5'>
					Clock In
				</Typography>

				<form className={classes.form} onSubmit={isActive ? checkIn : getStaffDetails}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='text'
						label='Staff ID'
						name='staffID'
						autoComplete='text'
						autoFocus
						value={id}
						onChange={(event) => setID(event.target.value)}
					/>

					{isActive && (
						<>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='text'
								label='First Name'
								name='firstName'
								value={userData?.firstName}
								disabled
							/>

							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='text'
								label='Last Name'
								name='lastName'
								value={userData?.lastName}
								disabled
							/>
						</>
					)}

					<Button
						type='submit'
						size='large'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{loading ? (
							<>
								{message}
								<CircularProgress size={20} className={classes.loader} />
							</>
						) : (
							buttonText
						)}
					</Button>

					<Grid container>
						<Grid item>
							Not yet a staff?
							<Link href={ROUTES.CREATE_STAFF} className={classes.link} variant='body2'>
								Become one now
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
