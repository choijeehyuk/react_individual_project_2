import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, children, margin, width, padding, } = props;



  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>{text? text: children}</ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "50%",
  padding: "12px 0px",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #f1bfff;
  color: #a22bcb;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;


export default Button;
