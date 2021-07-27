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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './styles';
import { ROUTES, USER } from 'utils/constants';
import { makePostRequest } from 'utils/api';
import toastify from 'utils/toast';
import { setItem } from 'utils/storage';

export default function SignIn() {
	const classes = useStyles();
	const history = useHistory();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [staffID, setStaffID] = useState('');

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const { data, error } = await makePostRequest({
			path: '/staff/create',
			payload: { firstName, lastName, gender },
		});

		if (error) {
			toastify('danger', 'Unable to become a staff! Please, try again later');
		} else {
			setOpen(true);
			setStaffID(data.data.staffId);
			setMessage(`Your Staff ID is: ${data.data.staffId}`);
			setFirstName('');
			setLastName('');
			setGender('');
			setTimeout(() => {
				setItem(USER, data.data);
				toastify('success', 'Successfully became a staff');
			}, 500);
		}

		setLoading(false);
	};

	const copyToClipboard = () => {
		const el = document.createElement('textarea');
		el.value = staffID;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		toastify('info', 'Successfully copied Staff ID to clipboard');
	};

	return (
		<Container component='main' maxWidth='sm' className={classes.root}>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component='h1' variant='h5'>
					Become A Staff
				</Typography>

				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='text'
						label='First Name'
						name='firstName'
						autoComplete='text'
						autoFocus
						value={firstName}
						onChange={(event) => setFirstName(event.target.value)}
					/>

					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='text'
						label='Last Name'
						name='lastName'
						autoComplete='text'
						value={lastName}
						onChange={(event) => setLastName(event.target.value)}
					/>

					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel>Gender</InputLabel>
						<Select
							value={gender}
							onChange={(event) => setGender(event.target.value)}
							required
							label='Gender'>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value={'MALE'}>Male</MenuItem>
							<MenuItem value={'FEMALE'}>Female</MenuItem>
						</Select>
					</FormControl>

					<Button
						type='submit'
						size='large'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{loading ? <CircularProgress className={classes.loader} /> : 'Become a Staff'}
					</Button>

					<Grid container>
						<Grid item>
							Already a staff?
							<Link href={ROUTES.LOGIN} className={classes.link} variant='body2'>
								Clock In
							</Link>
						</Grid>
					</Grid>

					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						open={open}
						onClose={handleClose}
						message={message}
						action={
							<>
								<Button
									color='success.main'
									size='small'
									className={classes.copy}
									onClick={copyToClipboard}>
									Copy Staff ID
								</Button>

								<Button
									color='secondary'
									size='small'
									className={classes.profileButton}
									onClick={() => history.push(ROUTES.LOGIN)}>
									Check Profile
								</Button>

								<IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
									<CloseIcon fontSize='small' />
								</IconButton>
							</>
						}
					/>
				</form>
			</div>
		</Container>
	);
}
