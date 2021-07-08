import React from 'react';

import Grid from '../elements/Grid';

const Alarm = (props) => {
    let noti = [
        {user_name: 'sungsu', post_id: 'post1', image_url: ''},
        {user_name: 'abcdf', post_id: 'post1', image_url: ''},
        {user_name: 'hello', post_id: 'post1', image_url: ''},
        {user_name: 'hihi', post_id: 'post1', image_url: ''},
    ]

    return (
        <React.Fragment>
            <Grid center>
               {noti.map((n, idx) => {
                   return(
                       <Grid key={idx} padding='16px'>
                           <Grid>{n.user_name}님이 {n.post_id}에 좋아요를 눌렀습니다.</Grid>
                       </Grid>
                   )
               })}
            </Grid>

        </React.Fragment>
    )
}

export default Alarm;