import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {
  Route, Switch, withRouter,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import NavBar from './NavBar';
import SimpleTable from './SimpleTable';


const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.primary,
  },
  heroContent: {
    maxWidth: 800,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    backgroundColor: theme.palette.background.primary,
  },
  heroContentTwo: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#CC0000',
    },
    inherit: {
      main: '#000000'
    }
  },
});

class Home extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      games: [],
      teams: [],
      program: [],
      isLoading: true
    }
  }

  componentDidMount(){
    axios.get('/api/program/schedule', {
    }).then(res => {
      console.log(res.data);

      this.setState({
        games: res.data.schedule.games,
        teams: res.data.teams,
        program: res.data.program,
        isLoading: false
      })
    })
  }

  render() {

    const { classes } = this.props;
    const { games, isLoading, program } = this.state;

    console.log(this.state)
    
    if(isLoading)
      return (<div>Loading. . .</div>)

    return (
      <div className="Home">
        <CssBaseline />
        <NavBar />
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <MuiThemeProvider theme={theme}>
            
            <div className={classes.heroContent}>
             
             <SimpleTable games={this.state.games} program={this.state.program} />
            </div>
          </MuiThemeProvider>
        </div>

      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default hot(module)(withRouter(withStyles(styles)(Home)));

