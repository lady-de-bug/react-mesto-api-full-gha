import React from 'react';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__edit-form">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          name={`${props.name}-form`}
          className="popup__form popup__form_type_profile"
        >
          {props.children}
          <button
            className="popup__submit-btn"
            type="submit"
            aria-label="Отправка формы."
          >
            {props.isLoading
              ? 'Сохранение...'
              : props.buttonText || 'Сохранить'}
          </button>
        </form>

        <button
          onClick={props.onClose}
          className="popup__close-icon"
          type="button"
          aria-label="Закрыть форму."
        />
      </div>
    </div>
  );
}
export default PopupWithForm;
