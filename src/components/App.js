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
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([res, arr]) => {
        setCurrentUser(res);
        setCards(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

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

  function handleUpdateAvatar({avatar}) {
    api
      .changeAvatarApi(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.getProfile(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate('/mesto');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [])

  function handleRegister(email,password) {
    auth.register(email,password)
      .then(() => {
        setIsSuccess(true); 
      })
      .catch((err) => {
        console.log(err);
        setIsNotSuccess(true);
      })
  }

  function handleLogin(userData) {
    auth.login(userData.email, userData.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true)
          setUserEmail(userData.email);
          navigate('/mesto', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
        setIsNotSuccess(true);
      })
  }

  function closeMessagePopup() {
    if (isSuccess) {
      setIsSuccess(false);
      navigate('/sign-in', { replace: true });
    } else {
      setIsNotSuccess(false);
    }
  }
  function LoggedOut(){
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header loggedIn={loggedIn} userEmail={userEmail} LoggedOut={LoggedOut}/>
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
            path='/sign-up'
            element={<Register handleRegister={handleRegister} />}
          /> 
          <Route
            path='/sign-in'
            element={<Login handleLogin={handleLogin} />}
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
        <InfoTooltip isSuccess={isSuccess} isNotSuccess={isNotSuccess} onClose={closeMessagePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}
