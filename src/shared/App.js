import React from 'react';

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/ConfigureStore";
import Header from '../components/Header';
import Grid from '../elements/Grid';
// 페이지 가져오기
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostDetail from '../pages/PostDetail';
import PostWrite from '../pages/PostWrite';
import Mypage from '../pages/Mypage';
import Alarm from '../pages/Alarm';

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";


function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
  
    <React.Fragment>
      <Grid>
      <Header></Header>
      <ConnectedRouter history={history}>
      <Route path='/' exact component={Main}/>
      <Route path='/login' exact component={Login} />
      <Route path='/signup' exact component={Signup}/>
      <Route path='/post/:id' exact component={PostDetail}/>
      <Route path='/write' exact component={PostWrite}/>
      <Route path='/write/:id' exact component={PostWrite}/>
      <Route path='/alarm' exact component={Alarm}/>
      </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
