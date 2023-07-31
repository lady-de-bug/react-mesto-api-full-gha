import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithSubmit(props) {
  return (
    <PopupWithForm
      name="submit"
      title="Вы уверены?"
      buttonText="Да"
      onClose={props.onClose}
    />
  );
}
export default PopupWithSubmit;
