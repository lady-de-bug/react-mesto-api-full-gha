import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  // console.log(props);

  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__place-like ${
    isLiked && 'element__place-like_active'
  }`;
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  return (
    <article className="element">
      {isOwn && 
        <button
          className="element__trash-icon"
          type="button"
          aria-label="Кнопка удаления карточки."
          onClick={handleDeleteClick}
        />
      }
      <img
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
        onClick={handleCardClick}
      />
      <div className="element__mask-group">
        <div className="element__choose-place">
          <h2 className="element__name-place">{props.card.name}</h2>
          <div className="element__likes">
            <button
              className={cardLikeButtonClassName}
              type="button"
              aria-label="Кнопка нравится."
              onClick={handleLikeClick}
            ></button>
            <p className="element__likes-counter">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
export default Card;
