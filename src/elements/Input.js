import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';



const Input = (props) => {
    const {placeholder, _onChange, type} = props;
    return (
        <React.Fragment>
            <Grid>
                <EInput placeholder={placeholder} onChange={_onChange} type={type}/>
            </Grid>
        </React.Fragment>
    )
}

export default Input;

const EInput = styled.input`
    border : 3px solid #a22bcb;
    border-radius : 20px;
    width : 40%;
    padding : 12px 4px;
    box-sizing : border-box;
    placeholder : 'adsfasdfasdf',
    // ${(props) => (props.placeholder ? `placeholder : ${props.placeholder};` : '')}
`;

Input.defaultProps = {
    placeholder : 'Text',
    type : 'text',
    _onChange : () => {},
};
