import React, { useEffect } from 'react'
import tokenManager from 'commons/utils/token'
import UseTokenKeepLogin from 'commons/utils/tokenKeepLoginFunc'
import AuthLoginSocialService from 'commons/services/AuthLoginSocialService'
import AuthLoginPwdService from 'commons/services/AuthLoginPwdService'
import AuthRegisterPwdService from 'commons/services/AuthRegisterPwdService'

const AuthContext = React.createContext(null)

export const LOADING_STATUS = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
}

export const AuthProvider = ({ children }) => {
  const [googleMethod, setGoogleMethod] = React.useState(null)
  const [googleAuth, setGoogleAuth] = React.useState(null)
  const { setToken, getToken, clearToken, isTokenExist } = tokenManager()
  const {
    setTokenKeepLogin,
    clearTokenKeepLogin,
    isTokenKeepLoginExist,
    getTokenKeepLoginPayload,
  } = UseTokenKeepLogin()

  const isKeepLogin = () => {
    if (isTokenKeepLoginExist() && isTokenExist()) {
      const payload = getTokenKeepLoginPayload()
      if (payload.email) {
        return true
      }
    }
    return false
  }

  const getPermissions = () => {
    if (isTokenKeepLoginExist() && isTokenExist()) {
      const payload = getTokenKeepLoginPayload()
      if (payload.permissions) {
        return payload.permissions.split(',')
      }
    }
    return null
  }

  const [permissions, setPermissions] = React.useState(getPermissions)
  const [isAuth, setIsAuth] = React.useState(isKeepLogin)

  const checkPermission = permissionNeeded => {
    if (permissions && isAuth) {
      if (permissionNeeded instanceof Array) {
        return permissions.some(r => permissionNeeded.indexOf(r) >= 0)
      } else if (
        permissions.includes(permissionNeeded) ||
        permissions.includes('administrator')
      ) {
        return true
      }
    }
    return false
  }

  // for handling init google
  useEffect(() => {
    if (!isTokenExist() || !isTokenKeepLoginExist()) {
      loadGoogle()
    }
  }, [])

  useEffect(() => {}, [isAuth])

  useEffect(() => {}, [permissions])

  // GOOGLE Method

  const loadGoogle = () => {
    const googleLoadTimer = setInterval(() => {
      setAuthLoadingStatus(LOADING_STATUS.INITIAL)
      if (window.gapi) {
        setAuthLoadingStatus(LOADING_STATUS.LOADING)
        loadGoogleAPI(() => {
          clearInterval(googleLoadTimer)
          setAuthLoadingStatus(LOADING_STATUS.LOADED)
        })
      }
    }, 90)
  }

  const loadAuth2Success = async () => {
    const token = getToken()
    if (!token) {
      logout()
    } else {
      checkGoogle(token)
    }
  }

  const loadGoogleAPI = func => {
    window.gapi.load('auth2', () => {
      func()
    })
  }

  const initializeGoogle = () => {
    return window.gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_CLIENTID,
    })
  }

  const checkGoogle = async token => {
    const googleAuth = await initializeGoogle()
    if (googleAuth.isSignedIn.get()) {
      const googleUser = googleAuth.currentUser.get()
      const tokenId = googleUser.getAuthResponse().id_token
      if (token === tokenId) {
        login(tokenId, () => {
          setGoogleAuth(googleAuth)
        })
      } else {
        logout()
      }
    }
  }

  const loginGoogle = async () => {
    let googleAuthMethod = googleAuth
    if (googleMethod === LOADING_STATUS.LOADED) {
      googleAuthMethod = await initializeGoogle()
    }
    loginGoogleHelper(googleAuthMethod)
  }

  const loginGoogleHelper = async googleAuth => {
    googleAuth
      .signIn({
        scope: 'profile email',
      })
      .then(async googleUser => {
        let profile = googleUser.getBasicProfile()

        const tokenId = googleUser.getAuthResponse().id_token

        // send data to db
        const data = await AuthLoginSocialService.call({
          email: profile.getEmail(),
          name: profile.getName(),
          social_id: profile.getId(),
          social_token: tokenId,
        })

        var status = data['status']
        var allowedPermissions = data['data']['data']
          ? data['data']['data']['allowedPermissions']
          : []
        var tokenKeepLogin = data['data']['data']
          ? data['data']['data']['token_keep_login']
          : []
        if (status != 200) {
          return
        }
        login(tokenId, tokenKeepLogin)
        setPermissions(allowedPermissions)
      })
  }

  const logoutGoogle = async () => {
    let googleAuthMethod = googleAuth

    if (googleMethod === LOADING_STATUS.LOADED) {
      googleAuthMethod = await initializeGoogle()
    }
    if (googleAuthMethod) {
      googleAuthMethod.signOut()
    }
  }

  // [END] GOOGLE Method

  const loginPassword = async params => {
    const data = await AuthLoginPwdService.call({
      email: params.email,
      password: params.password,
    })
    var status = data['status']
    var tokenId = data['data']['data'] ? data['data']['data']['token'] : []
    var allowedPermissions = data['data']['data']
      ? data['data']['data']['allowedPermissions']
      : []
    var tokenKeepLogin = data['data']['data']
      ? data['data']['data']['token_keep_login']
      : []
    if (
      tokenId == [] ||
      !tokenId ||
      tokenKeepLogin == [] ||
      !tokenKeepLogin ||
      status != 200
    ) {
      return
    }
    login(tokenId, tokenKeepLogin)
    setPermissions(allowedPermissions)
  }

  const registerPassword = async params => {
    const data = await AuthRegisterPwdService.call({
      name: params.name,
      email: params.email,
      password: params.password,
    })
    var status = data['status']
    var tokenId = data['data']['data'] ? data['data']['data']['token'] : []
    var allowedPermissions = data['data']['data']
      ? data['data']['data']['allowedPermissions']
      : []
    var tokenKeepLogin = data['data']['data']
      ? data['data']['data']['token_keep_login']
      : []

    if (
      tokenId == [] ||
      !tokenId ||
      tokenKeepLogin == [] ||
      !tokenKeepLogin ||
      status != 200
    ) {
      return
    }

    login(tokenId, tokenKeepLogin)
    setPermissions(allowedPermissions)
  }

  const login = (token, tokenKeepLogin, callback) => {
    setToken(token)
    if (tokenKeepLogin) {
      setTokenKeepLogin(tokenKeepLogin)
    }
    setIsAuth(true)
    if (callback) {
      callback()
    }
  }

  const logout = () => {
    clearToken()
    clearTokenKeepLogin()
    // logout vendor
    logoutGoogle()
    loadGoogle()
    // end
    setIsAuth(false)
    setPermissions(null)
  }

  const setAuthLoadingStatus = (status, callback) => {
    setGoogleMethod(status)
    if (callback) {
      callback()
    }
  }

  const getAuthValue = () => {
    return isAuth
  }

  const value = {
    permissions,
    isAuth,
    login,
    loginGoogle,
    loginPassword,
    registerPassword,
    logout,
    getAuthValue,
    checkPermission,
    gapi: window.gapi,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export default useAuth
