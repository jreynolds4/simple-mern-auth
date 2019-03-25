import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0F094E',
    },
    secondary: {
      main: '#CC0000',
    },
    default: {
      main: '#000000'
    }
  },
});

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    
  }

  componentDidMount(){

    
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} className={classes.appBar}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NavBar));