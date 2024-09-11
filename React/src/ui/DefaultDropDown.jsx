/* eslint-disable react/prop-types */
import { useState } from 'react';
import AsyncSelect from 'react-select';
import { useDispatch } from 'react-redux';
import { handle_variables } from '../pages/login/Redux/authSlice'; 

const DefaultDropDown = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      borderRadius: 15,
      fontSize: 12,
      padding: "2px 12px",
      zIndex: 1000
    }),
    menu: (styles) => ({
      ...styles,
      zIndex: 1000, 
    }),
    option: (styles) => ({
      ...styles,
      zIndex: 1000, 
    }),
  };

  const handleSelectChange = (data) => {
    if (props.onChange) {
      props.onChange(data);
    } else {
      dispatch(
        handle_variables({
          [props.name]: data,
        })
      );
    }
  };

  return (
    <AsyncSelect
      className={"default-select-box"}
      isClearable
      isSearchable
      isDisabled={props.disabled === true}
      styles={colourStyles}
      value={props.value}
      name={props.name}
      defaultValue={props.defaultValue === undefined ? null : props.defaultValue}
      defaultInputValue={searchValue}
      cacheOptions
      placeholder={props.label}
      noOptionsMessage={(inputValueString) => `نتیجه ای برای ${inputValueString.inputValue} یافت نشد`}
      options={props.options}
      defaultOptions
      onChange={handleSelectChange}
      onInputChange={(newValue, e) => {
        setSearchValue(newValue);
        if (props.handleInputChange) props.handleInputChange(newValue, e);
      }}
      onMenuScrollToBottom={props.handleLoadMore ? props.handleLoadMore : null}
    />
  );
};

export { DefaultDropDown };
