import React from "react";

const MsgText = ({ text, textColor }: Props) => {
  return (
    <>
      <small
        style={
          textColor === "danger"
            ? {
                fontSize: "12px",
                color: "#f01548",
                float: "left",
                margin: "-4px 0px 5px 0px",
              }
            : {
                fontSize: "12px",
                color: "green",
                float: "left",
                margin: "-4px 0px 5px 0px",
              }
        }>
        <i>{text}</i>
      </small>
    </>
  );
};

interface Props {
  text: string;
  textColor: string;
}

export default MsgText;
