import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles';
import { ROUTES } from 'utils/constants';

export default function SignIn() {
	const classes = useStyles();

	return (
		<Container component='main' maxWidth='sm' className={classes.root}>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component='h1' variant='h5'>
					Check In
				</Typography>

				<form className={classes.form}>
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
					/>

					<FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />

					<Button
						type='submit'
						size='large'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Check In
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
