import React from 'react';
import success from '../images/success.svg';
import failure from '../images/failure.svg';
function InfoTooltip({ isOpen, onClose, isRegistered }) {
  return (
    <div
      className={`popup popup_type_infoTooltip ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container">
        <img
          className="popup__sign"
          src={isRegistered ? success : failure}
          alt="Иконка с результатом регистрации"
        />
        <p className="popup__message">
          {isRegistered
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>

        <button
          onClick={onClose}
          className="popup__close-icon"
          type="button"
          aria-label="Закрыть форму."
        />
      </div>
    </div>
  );
}
export default InfoTooltip;
