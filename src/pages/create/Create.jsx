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
			setTimeout(() => {
				setItem(USER, data.data);
				history.push(ROUTES.LOGIN);
				toastify('success', 'Successfully became a staff');
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
				</form>
			</div>
		</Container>
	);
}
