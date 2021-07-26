import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useStyles from './style';
import Navbar from './Navbar';
import { USER } from 'utils/constants';
import { getItem } from 'utils/storage';
import Update from './Update';

export default function Checkout() {
	const classes = useStyles();
	const userData = getItem(USER) || {};

	return (
		<>
			<Navbar />

			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant='h6' gutterBottom>
						Profile
					</Typography>

					<Grid container spacing={3} className={classes.details}>
						<Grid item xs={12}>
							<TextField
								required
								variant='outlined'
								id='firstName'
								name='firstName'
								label='First name'
								fullWidth
								autoComplete='given-name'
								value={userData?.firstName}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								required
								variant='outlined'
								id='lastName'
								name='lastName'
								label='Last name'
								fullWidth
								autoComplete='family-name'
								value={userData?.lastName}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								required
								variant='outlined'
								id='lastName'
								name='lastName'
								label='Last name'
								fullWidth
								autoComplete='family-name'
								value={userData?.gender}
							/>
						</Grid>
					</Grid>

					<Update />
				</Paper>
			</main>
		</>
	);
}
