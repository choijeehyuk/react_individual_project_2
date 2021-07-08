import React from 'react';

import Grid from '../elements/Grid';
import Input from '../elements/Input';
import Button from '../elements/Button';

import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch } from 'react-redux';
import { emailCheck } from '../shared/function';

const Login = (props) => {
    const dispatch = useDispatch();
    const [id, setId] = React.useState('');
    const [pwd, setPwd] = React.useState('');

    const changeId = (e) => {
        setId(e.target.value);
    }
    const changePwd = (e) =>{
        setPwd(e.target.value);
    }

    const login = () => {

        if(id === '' || pwd === ''){
            window.alert('아이디 혹은 비밀번호를 입력해주세요!');
            return;
        }

        if(!emailCheck(id)){
            window.alert('이메일 형식이 맞지 않습니다!');
            return;
        }

        dispatch(userActions.loginFB(id, pwd));
        console.log(id)
    }

    return (
        <React.Fragment>
            <Grid center>
            <h1>로그인 화면입니다.</h1>
            <Input placeholder='아이디(이메일 형식)를 입력해주세요.' _onChange={changeId}></Input>
            <Input type='password' placeholder='비밀번호를 입력해주세요.' _onChange={changePwd}></Input>
            <Button width='40%' _onClick={() => {login();}} text='로그인 하기'></Button>
            </Grid>
        </React.Fragment>
    )
}
export default Login;