import React from 'react';
import PopupWithForm from './PopupWithForm';

function PlacePopup(props) {
  const [name, setName] = React.useState('');
  const [place, setPlace] = React.useState('');

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: name,
      link: place,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setPlace('');
    }
  }, [props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        name="name"
        type="text"
        placeholder="Название"
        className="popup__input popup__input_type_place"
        aria-label="Введите название места."
        required
        minLength={2}
        maxLength={30}
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error popup__input-error_type_name" />
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_link"
        aria-label="Укажите ссылку."
        required
        value={place || ''}
        onChange={handleChangePlace}
      />
      <span className="popup__input-error popup__input-error_type_link" />
    </PopupWithForm>
  );
}
export default PlacePopup;
