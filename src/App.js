import React from 'react';
import './App.css';
import { makeStyles } from "@material-ui/core/styles"

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";

import DirectionsRunSharpIcon from '@material-ui/icons/DirectionsRunSharp';
import FitnessCenterSharpIcon from '@material-ui/icons/FitnessCenterSharp';
import InsertInvitationSharpIcon from '@material-ui/icons/InsertInvitationSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import EqualizerSharpIcon from '@material-ui/icons/EqualizerSharp';

import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import CalendarPart from './components/CalendarPart';
import Page1 from './components/Page1';
import StatisticsList from './components/StatisticsList';

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit'},
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

function App() {
  const classes = useStyles();

  return (

<Router>
  <div style={{ display: 'flex' }}>
    <Drawer
          style={{ width: '215px'}}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}>

  <List>
  <Link to="/" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <HomeSharpIcon/>
        </ListItemIcon>
        <ListItemText primary={"Home"} />
      </ListItem>
    </Link>

    <Link to="/customers" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <DirectionsRunSharpIcon/>
        </ListItemIcon>
        <ListItemText primary={"Customers"} />
      </ListItem>
    </Link>

    <Link to="/trainings" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <FitnessCenterSharpIcon />
        </ListItemIcon>
        <ListItemText primary={"Trainings"} />
      </ListItem>
    </Link>

    <Link to="/calendar" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <InsertInvitationSharpIcon />
        </ListItemIcon>
        <ListItemText primary={"Calendar"} />
      </ListItem>
    </Link>

    <Link to="/statistics" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <EqualizerSharpIcon />
        </ListItemIcon>
        <ListItemText primary={"Charts"} />
      </ListItem>
    </Link>

  </List>
  </Drawer>

  <Switch>
  <Route exact path="/" component={Page1} >
      <Container>
          <Page1 />
      </Container>
    </Route>

    <Route path="/customers" component={CustomerList} >
      <Container>
          <CustomerList/>
      </Container>
    </Route>
        
    <Route path="/trainings" component={TrainingList} >
      <Container>
        <TrainingList/>
      </Container>
    </Route>

    <Route path="/calendar" component={CalendarPart} >
      <Container>
        <CalendarPart/>
      </Container>
    </Route>

    <Route path="/statistics" component={StatisticsList} >
      <Container>
        <StatisticsList/>
      </Container>
    </Route>

  </Switch>

  </div>
</Router>

  );
}

export default App;
