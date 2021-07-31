import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './style';
import CircularProgress from '@material-ui/core/CircularProgress';

import { USER } from 'utils/constants';
import { makePostRequest } from 'utils/api';
import toastify from 'utils/toast';
import { setItem, getItem } from 'utils/storage';

export default function FormDialog() {
	const classes = useStyles();
	const user = getItem(USER);
	const [open, setOpen] = useState(false);
	const [firstName, setFirstName] = useState(user?.firstName || '');
	const [lastName, setLastName] = useState(user?.lastName || '');
	const [loading, setLoading] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	console.log(user);

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		toastify('success', 'Successfully updated profile');
		setItem(USER, { ...user, firstName, lastName });
		setTimeout(() => {
			window.location.reload();
		}, 500);

		const { error } = await makePostRequest({
			path: `/staff/${user?.staffId}`,
			payload: { firstName, lastName },
		});

		if (error) {
			toastify('danger', 'Unable to update profile! Please, try again later');
		} else {
			toastify('success', 'Successfully updated profile');
			setItem(USER, { ...user, firstName, lastName });
			setTimeout(() => {
				window.location.reload();
			}, 500);
		}

		setLoading(false);
	};

	return (
		<div>
			<Button variant='outlined' color='primary' onClick={handleClickOpen}>
				Update Profile
			</Button>

			<Dialog open={open} maxWidth='sm' fullWidth onClose={handleClose} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Update Your Profile</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit}>
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
					</form>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button
						disabled={!firstName || !lastName}
						onClick={handleSubmit}
						variant='contained'
						color='primary'>
						{loading ? <CircularProgress color='inherit' className={classes.loader} size={20} /> : 'Update'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
