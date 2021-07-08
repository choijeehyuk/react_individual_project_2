import React from 'react';

import Grid from '../elements/Grid';

const PostDetail = () => {

    return (
        <React.Fragment>
            <Grid center>
            </Grid>
            <Grid center padding='16px' bg='#eee' width='100%' margin='auto'>
            <h1>기사 제목</h1>
            <Grid is_flex><h4>기사 요약</h4>
            <div>사진 미리보기</div></Grid>
            </Grid>

        </React.Fragment>
        
    )
}

export default PostDetail;