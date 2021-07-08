import React from 'react';

import Grid from '../elements/Grid';
import Input from '../elements/Input';
import Button from '../elements/Button';

import {useDispatch} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from '../shared/function';

const Signup = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [pwd_check, setPwdCheck] = React.useState('');
    const [user_name, setUserName] = React.useState('');

    const signup = () => {
        if(id ==='' || pwd ==='' || user_name==='') {
            window.alert('아이디, 패스워드, 닉네임을 모두 입력해주세요!')
            return;
        }

        if(!emailCheck(id)){
            window.alert('이메일 형식이 맞지 않습니다!')
        }

        if(pwd !== pwd_check) {
            window.alert('비밀번호가 서로 일치하지 않습니다!')
        }

        dispatch(userActions.signUpFB(id, pwd, user_name));

    };


    return (
        <React.Fragment>
            <Grid center>
            <h1>회원가입 화면입니다.</h1>
            <Input placeholder='아이디를 입력해주세요.' _onChange={(e) => {setId(e.target.value);}}></Input>
            <Input placeholder='닉네임를 입력해주세요.' _onChange={(e)=>{setUserName(e.target.value)}}></Input>
            <Input type='password' placeholder='비밀번호를 입력해주세요.' _onChange={(e)=>{setPwd(e.target.value)}}></Input>
            <Input type='password' placeholder='비밀번호를 재입력해주세요.' _onChange={(e)=>{setPwdCheck(e.target.value)}}></Input>
            <Button text='회원가입 하기' _onClick={signup}></Button>
            </Grid>
        </React.Fragment>
    );
};

Signup.defaultProps = {};

export default Signup;