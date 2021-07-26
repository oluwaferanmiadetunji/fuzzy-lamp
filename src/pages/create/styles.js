import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: {
		marginLeft: 10,
	},
	formControl: {
		minWidth: '100%',
		marginTop: 20,
	},
	loader: {
		color: 'white',
	},
	profileButton: {
		marginRight: 10,
	},
	copy: {
		marginRight: 10,
		color: '#ff9800',
	},
}));

export default useStyles;
