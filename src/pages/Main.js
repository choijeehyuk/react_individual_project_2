import React from "react";
import Post from '../components/Post';
import Grid from '../elements/Grid';

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

// import {history} from '../redux/ConfigureStore'
import { apiKey } from "../shared/firebase";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {realtime} from "../shared/firebase";


const Main = () => {
    const dispatch = useDispatch();
    const user_info = useSelector((state) => state)
    const post = useSelector((state) => state.post);
    const is_login = useSelector((state) => state.user.is_login);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key)? true : false;
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging);

    React.useEffect(() => {
        if(post.list.length === 0){
            dispatch(postActions.getPostFB());
        }
    }, [])

    if (is_login && is_session) {
        return(
            <React.Fragment>
            <Grid center>
            {post.list.map((p, idx) => {
                
                return <div key={idx}>
                    <Post  {...p}/>
                {console.log(p.likeTF)}
                    {p.likeTF && <FavoriteIcon onClick={()=>{console.log('하트')}}></FavoriteIcon>}
            {!p.likeTF && <FavoriteBorderIcon onClick={()=>{console.log('하트')}}></FavoriteBorderIcon>}
                {/* {p.user_uid===user_info.user.user.uid &&<button onClick={postActions.deleteFB(p.post_id)}>추가로드</button>} */}
                    </div>
                        
                    

            })}
            </Grid>
            </React.Fragment>
        ); }
    return (
        <React.Fragment>
            <Grid center><h1>로그인 시 이용가능 합니다!</h1></Grid>
        </React.Fragment>
    )
}

export default Main;