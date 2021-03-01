import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom'
import ChatPage from './components/ChatPage/ChatPage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import firebase from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/actions/user_action'

function App() {

  let history = useHistory()
  let dispatch = useDispatch()
  const isLoading = useSelector(state => state.user.isLoading)
  useEffect(() => {
    //user 정보가 오게 되면 제대로 로그인이 되었다고 볼 수 있다.
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        history.push('/')
        dispatch(setUser(user))
      } else {
        history.push('/login')
      }
    })
  }, [])

  if (isLoading) {
    return (
      <div>
        ...loading
      </div>
    )
  } else {
    return (
      <Switch>
        <Route exact path='/' component={ChatPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
      </Switch>
    )
  }

}

export default App;
