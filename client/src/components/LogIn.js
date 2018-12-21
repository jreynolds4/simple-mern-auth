import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

class LogIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirectTo: null,
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(){
        event.preventDefault();

        if(this.state.email === '' || this.state.password === ''){
            this.setState({message: 'Email and/or password is invalid!'});
            return;
        }
        axios.post('/api/login' , {
            email: this.state.email,
            password: this.state.password,
        })
        .then(response => {
            console.log(response.data);
            if(response.data.message === 'user not found'){
                this.setState({message: 'Email and/or password is invalid!'});
                return;
            }
            localStorage.setItem('JWT', response.data.token);
            this.props.history.push("/");
        })
        .catch(error => {
            console.log(error);
        });
    }
  
    render(){

        const authToken = localStorage.getItem('JWT');

        if(authToken !== null)
            return <Redirect to={{pathname: '/', state: {from: this.props.location}}} />
        

        const { classes } = this.props;

        return (

            <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                {this.state.message !== '' &&
                <Typography variant="overline" gutterBottom color="secondary">
                    {this.state.message}
                </Typography>
                }
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleSubmit}>
                        Log in
                    </Button>
                    <Typography variant="overline" gutterBottom>
                        Don't have an account? Register <Link to="/signup">here</Link>.
                    </Typography>
                </form>
            </Paper>
            </main>
        );
    }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogIn);