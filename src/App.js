import './App.css';
import { useEffect } from 'react';
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import { connect } from 'react-redux';
import { getUserAuth } from './actions';

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserAuth: () => dispatch(getUserAuth()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
