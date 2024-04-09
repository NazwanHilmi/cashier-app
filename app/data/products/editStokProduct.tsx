import React, {SyntheticEvent, useState, useRef } from 'react';

const EditStokProduct = ({ value, onSubmit }) => {
 const [isEditing, setIsEditing] = useState(false);
 const [inputValue, setInputValue] = useState(value);
 const inputRef = useRef(null);

 const handleDoubleClick = () => {
    setIsEditing(true);
    inputRef.current.focus();
 };

 const handleBlur = () => {
    setIsEditing(false);
 };

 const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(inputValue);
      setIsEditing(false);
    }
 };

 const handleChange = (event) => {
    setInputValue(event.target.value);
 };

 return (
    <div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="number"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          className="input-field"
        />
      ) : (
        <span onClick={handleDoubleClick} className="display-value">
          {value}
        </span>
      )}
    </div>
 );
};

export default EditStokProduct;
