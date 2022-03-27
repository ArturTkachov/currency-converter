import { Dispatch, FC, SetStateAction, useState } from 'react';
import chevronSrc from '../assets/chevron-right.svg';
import './Dropdown.scss';

interface SelectedProps {
  value: string;
  isOpen: boolean;
  handleClick: () => void;
}

const DropdownSelected: FC<SelectedProps> = (props) => (
  <div className="dropdown-selected" onClick={props.handleClick}>
    <span className="dropdown-selected-option">{props.value}</span>
    <img
      className={props.isOpen ? 'rotated' : ''}
      src={chevronSrc}
      alt={props.isOpen ? '>' : 'v'}
    />
  </div>
);

interface ListProps {
  options: string[];
  setOption: Dispatch<SetStateAction<any>>;
}

const DropdownList: FC<ListProps> = (props) => (
  <ul className="dropdown-list">
    {props.options.map((option) => (
      <li key={option} onClick={() => props.setOption(option)}>
        {option}
      </li>
    ))}
  </ul>
);

interface DropdownProps {
  labelText: string;
  options: string[];
  currentOptionIndex: number;
  setOption: Dispatch<SetStateAction<any>>;
}

const Dropdown: FC<DropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = props.options;
  const index = props.currentOptionIndex;

  return (
    <div className="dropdown">
      <span className="dropdown-label">{props.labelText}</span>
      <DropdownSelected
        value={options[index]}
        handleClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />
      {isOpen && <DropdownList options={options} setOption={props.setOption} />}
    </div>
  );
};

export default Dropdown;
