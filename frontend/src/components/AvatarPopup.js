import React from 'react';
import PopupWithForm from './PopupWithForm';

function AvatarPopup(props) {
  // console.log(props)
  const avatarRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      avatarRef.current.value = '';
    }
  }, [props.isOpen, avatarRef]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_type_avatar"
        aria-label="Укажите ссылку."
        required
        ref={avatarRef}
      />
      <span className="popup__input-error popup__input-error_type_avatar" />
    </PopupWithForm>
  );
}
export default AvatarPopup;
