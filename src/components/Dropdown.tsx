import { FC, useEffect, useRef, useState } from 'react';
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
  handleOptionClick: (arg: string) => void;
}

const DropdownList: FC<ListProps> = (props) => (
  <ul className="dropdown-list">
    {props.options.map((option) => (
      <li key={option} onClick={() => props.handleOptionClick(option)}>
        {option}
      </li>
    ))}
  </ul>
);

interface DropdownProps {
  labelText: string;
  options: string[];
  currentOptionIndex: number;
  handleOptionClick: (arg: string) => void;
}

const Dropdown: FC<DropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { options, currentOptionIndex: index, handleOptionClick } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const dropdown = dropdownRef.current;
      if (dropdown && !dropdown.contains(e.target as Node)) setIsOpen(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  });

  return (
    <div ref={dropdownRef} className="dropdown">
      <span className="dropdown-label">{props.labelText}</span>
      <DropdownSelected
        value={options[index]}
        handleClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />
      {isOpen && (
        <DropdownList options={options} handleOptionClick={handleOptionClick} />
      )}
    </div>
  );
};

export default Dropdown;
