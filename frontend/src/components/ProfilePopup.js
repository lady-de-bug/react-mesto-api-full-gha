import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function ProfilePopup(props) {
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        type="text"
        name="name"
        placeholder="Имя"
        className="popup__input popup__input_type_name"
        aria-label="Введите имя."
        required
        minLength={2}
        maxLength={40}
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error popup__input-error_type_name" />
      <input
        type="text"
        name="occupation"
        placeholder="О себе"
        className="popup__input popup__input_type_occupation"
        aria-label="Введите профессию."
        required
        minLength={2}
        maxLength={200}
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error popup__input-error_type_occupation" />
    </PopupWithForm>
  );
}
export default ProfilePopup;
