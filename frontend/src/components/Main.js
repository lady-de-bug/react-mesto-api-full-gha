import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardsElements = props.cards.map((card) => {
    return (
      <Card
        card={card}
        key={card._id}
        onCardClick={props.onCardClick}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    );
  });

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-button" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} alt="#" className="profile__avatar" />
          </div>
          <div className="profile__info-section">
            <div className="profile__profile-info">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <p className="profile__user-occupation">{currentUser.about}</p>
            </div>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              type="button"
              aria-label="Кнопка редактирования профиля."
            />
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Кнопка добавить данные."
        />
      </section>
      <section className="elements" aria-label="Фотографии мест России.">
        {cardsElements}
      </section>
    </main>
  );
}
export default Main;
