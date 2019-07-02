import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
}));

export default function SignUp(props) {
  const greencolor = teal[500]; // #009688
  const classes = useStyles();
  const { credencials, signupf, handleChange, signinLink } = props;
  let buttonOutput = (<div></div>)
  if(credencials.userlogin && credencials.userpassword === credencials.userpasswordRetypped
    && credencials.userpassword.length>5) {
    buttonOutput = (
      <Button
      /*type="submit"*/
        fullWidth
        variant="contained"
        color={greencolor}
        className={classes.submit}
        onClick={(e)=>{signupf(credencials.userlogin, credencials.userpassword)}}
      >
      Sign Up
      </Button>
    )
  } else {
    buttonOutput = (
    <Button
      fullWidth
      variant="contained"
      color={greencolor}
      className={classes.submit}
      onClick={(e)=>{signupf(credencials.userlogin, credencials.userpassword)}}
      disabled={true}
    >
      Sign Up
    </Button>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <br />
      <Typography component="h6" variant="h6">
          Nurse Assignment Tools
      </Typography>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete='off'
            /*autoFocus*/
            onChange={handleChange('userlogin')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password (min 6 symbols)"
            type="password"
            id="password"
            autoComplete='off'
            onChange={handleChange('userpassword')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Re-enter password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={handleChange('userpasswordRetypped')}
          />
        {buttonOutput}
        </form>
      </div>
      
      <Box mt={2}>
        <Link href={signinLink} variant="body2">
          {"Have an account? Sign In"}
        </Link>
      </Box>
    </Container>
  );
}