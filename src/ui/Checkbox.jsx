// Checkbox.js
import React from 'react';
import styled from 'styled-components';

const Checkbox = ({ checked, onChange, children }) => {
  return (
    <StyledWrapper>
      <label className="container ">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <div className="checkmark" />
        {children && <span className="label-text">{children}</span>}
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Hide the default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .container {
    display: flex;
    gap:2px
    align-items:center
    position: relative;
    cursor: pointer;
    font-size: 18px;
    user-select: none;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: relative;
    top: 0;
    left: 0;
    height: 2.3em;
    width: 2.3em;
    background-color: #ccc;
    border-radius: 50%;
    transition: 0.4s;
  }

  .checkmark:hover {
    box-shadow: inset 17px 17px 16px #b3b3b3,
      inset -17px -17px 16px #ffffff;
  }

  /* When the checkbox is checked, add a green background and rotation */
  .container input:checked ~ .checkmark {
    box-shadow: none;
    background-color: limegreen;
    transform: rotateX(360deg);
  }

  .container input:checked ~ .checkmark:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  }

  /* Removed the checkmark indicator (::after) */
  
  .label-text {
    margin-left: 20px;
    color: #374151;
  }
`;

export default Checkbox;
