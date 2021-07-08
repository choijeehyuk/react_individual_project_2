import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Button from '../elements/Button';
import Grid from '../elements/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/ConfigureStore';
import { actionCreators } from '../redux/modules/post';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { realtime } from '../shared/firebase';



const Post = (props) => {
    const info = useSelector((state) => state)
    // console.log(props.likeTF)
    // console.log(props.like)
    // console.log(props.post_id)


    // const [like, setLike] = useState(0)
        // const heart = realtime.ref(`like/${user_id}`);
        // heart.on('value', (snapshot) => {
        //     console.log(snapshot.val().like)
        //     heart.update({like:like+1})
        //     console.log(like)
        // });





    if(info.user.user.uid===props.user_uid){
        
        return (
            <React.Fragment>
            <h1>{props.title}</h1>
            <img src={props.image_url}></img>
            <h2>{props.contents}</h2>
            <h6>{props.user_name}</h6>
            <h6>{props.insert_dt}</h6>
            <div>좋아요:{props.like}개</div>
            <button onClick={() => {history.push(`/write/${props.user_uid}`)}}>수정</button>
            {/* <button onClick={actionCreators.deleteFB(props.post_id)}>삭제</button> */}
        </React.Fragment>
        )
    


}
    return (
        <React.Fragment>
            <h1>{props.title}</h1>
            <img src={props.image_url}></img>
            <h2>{props.contents}</h2>
            <h6>{props.user_name}</h6>
            <h6>{props.insert_dt}</h6>
            {props.likeTF && <FavoriteIcon onClick={()=>{console.log('하트')}}></FavoriteIcon>}
            {!props.likeTF && <FavoriteBorderIcon onClick={()=>{console.log('하트')}}></FavoriteBorderIcon>}
            <div>좋아요:{props.like}개</div>
        </React.Fragment>
    )
}

export default Post;

