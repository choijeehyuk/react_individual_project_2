import React, { useState } from 'react';

import Grid from '../elements/Grid';
import Button from '../elements/Button'
import Input from '../elements/Input';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { storage } from '../shared/firebase';
import moment from 'moment';

const PostWrite = () => {
    const dispatch = useDispatch();
    const [contents, setContents] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    const in_login = useSelector((state) => state).user.is_login
    const changeContents = (e) => {
        setContents(e.target.value)
    }
    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const fileInput = React.useRef();
    
    const selectFile = (e) => {
        console.log(e.target.files[0]);
        console.log(fileInput.current.files[0]);
    }

    const uploadFB = () => {
        let image = fileInput.current.files[0];
        if(image===undefined){
            window.alert('이미지를 선택해주세요!')
            return;
        }
        const _upload = storage.ref(`images/${image.name}${new Date().getTime()}`).put(image);
        _upload.then((snapshot) => {
            console.log(snapshot);

            snapshot.ref.getDownloadURL().then((url) => {
                setUrl(url);
            })
        })
    };
    if(!in_login){
        return(
        <React.Fragment>
        <Grid center><h1>로그인 시 이용가능 합니다!</h1></Grid>
        </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <Grid center>
            </Grid>
            <Grid center padding='16px' bg='#eee' width='100%' margin='auto'>
            <Input placeholder='기사 제목을 입력해주세요.' _onChange={changeTitle}>ㅇㅇ</Input>
            <Grid is_flex><h4>기사 작성 하는 곳</h4>
            <div>사진 입력 하는 곳</div></Grid>
            <img src={url}></img>
            <input type='file' onChange={selectFile} ref={fileInput}/>
            <Button _onClick={uploadFB}>미리보기</Button>
            <textarea placeholder='기사 내용을 작성해주세요.' onChange={changeContents}/>

            </Grid>
            <Grid width='10%' float='right'>
            <Button float='right' margin='10px' _onClick={() => {dispatch(postActions.addPostFB(title, contents, url))}}>기사 작성</Button>
            </Grid>


        </React.Fragment>
        
    )
}

// display: flex;
//   justify-content: space-between;

export default PostWrite;