import { useState } from 'react';
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
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './styles';
import { ROUTES } from 'utils/constants';
import { makePostRequest } from 'utils/api';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function SignIn() {
	const classes = useStyles();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

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
		console.log(data, error);
        setOpen(true)
		setLoading(false);
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
						<InputLabel>Age</InputLabel>
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
								Check In
							</Link>
						</Grid>
					</Grid>
				</form>

				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity='success'>
						This is a success message!
					</Alert>
				</Snackbar>
			</div>
		</Container>
	);
}
