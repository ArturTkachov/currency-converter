import React, { FC } from 'react';
import './PinkButton.scss';

interface Props {
  text: string;
  handleClick: () => void;
}

const PinkButton: FC<Props> = React.memo((props) => (
  <button className="pink-button" onClick={props.handleClick}>
    {props.text}
  </button>
));

export default PinkButton;
