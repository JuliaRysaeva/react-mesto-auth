import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import Login from './Login.js';
import Register from './Register.js';
import auth from '../utils/apiAuth.js';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js'

export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isNotSuccess, setIsNotSuccess] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([res, arr]) => {
        setCurrentUser(res);
        setCards(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setCurrentUser, setCards]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }
  function handleAddPlaceSubmit(newCard) {
    api
      .addCardApi(newCard.name, newCard.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    if (card.owner._id === currentUser._id) {
      api
        .deleteCardApi(card._id)
        .then(() => {
          setCards((state) => state.filter((el) => el._id !== card._id));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleUpdateUser(user) {
    api
      .setUserInfoApi(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatarApi(avatar.link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getProfile(jwt).then((res) => {
        if (res) {
          const userData = {
            username: res.username,
            email: res.email,
          };
          setLoggedIn(true);
          setUserData(userData);
          navigate('/mesto', { replace: true });
        }
      });
    }
  }, []);

  function handleRegister(email, password) {
    auth
      .signup(email, password)
      .then(() => {
        setIsSuccess(true)
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(`${err} что-то пошло не так`);
      });
  }
  function handleLogin(userData) {
    auth
      .profile(userData.email, userData.password)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
          setLoggedIn(true);
          setUserData({ email: '', password: '' });

          navigate('/users/me');
        }
      })
      .catch((err) => {
        console.log(`${err} что-то пошло не так`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              loggedIn ? (
                <Navigate to='/mesto' replace />
              ) : (
                <Navigate to='/sign-up' replace />
              )
            }
          />
          <Route
            path='/sign-in'
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path='/sign-up'
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path='/mesto'
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
                <Footer />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <PopupWithForm
                  name='delete-card'
                  title='Вы уверены?'
                  submit='Да'
                />
                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                ></ImagePopup>
              </>
            }
          />
        </Routes>
        <InfoTooltip isSuccess={isSuccess} isNotSuccess={isNotSuccess} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
