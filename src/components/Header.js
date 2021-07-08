import React from "react";
import Grid from '../elements/Grid';
import Button from "../elements/Button";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as useActions } from "../redux/modules/user";

import {history} from '../redux/ConfigureStore'
import { apiKey } from "../shared/firebase";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key)? true : false;
    if (is_login && is_session) {
        return (
            <React.Fragment>
                <Grid>
            <Grid is_flex padding='4px 16px'>
            <h1>Header</h1>
            <Grid float=''>
            <Button width='40px' margin='5px' _onClick={() => {history.push('/')}}>메인</Button>
            <Button width='40px' margin='5px' _onClick={() => {history.push('/write')}}>글쓰기</Button>
            <Button width='40px' margin='5px' _onClick={() => {history.push('/alarm')}}>알람</Button>
            <Button width='50px' margin='5px' _onClick={() => {
                dispatch(useActions.logoutFB());
            }}>로그아웃</Button>
            </Grid>
            </Grid>
            </Grid>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <Grid is_flex padding='4px 16px'>
            <h1>Header</h1>
            <Grid>
            <Button width='50px' margin='5px'
            _onClick={() => {history.push('/signup')}}
            >회원가입</Button>
            <Button width='40px' margin='5px'
            _onClick={() => {history.push('/login')}}
            >로그인</Button>
            </Grid>
            </Grid>            
            
        </React.Fragment>
    )
}

Header.defaultProps = {};

export default Header;