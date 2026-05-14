import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import { getUsers, setCurrentUser, saveUsers } from '../utils/authStorage.js'

const emptyLoginErrors = {
  loginEmail: '',
  loginPass: '',
}

const emptyRegisterErrors = {
  regUsername: '',
  regEmail: '',
  regPass: '',
  regPass2: '',
  agreeTerms: '',
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getPasswordStrengthScore(value) {
  let score = 0
  if (value.length >= 6) score += 1
  if (value.length >= 10) score += 1
  if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score += 1
  if (/[^A-Za-z0-9]/.test(value)) score += 1
  return score
}

function Auth() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('login')
  const [toast, setToast] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [visiblePasswords, setVisiblePasswords] = useState({
    loginPass: false,
    regPass: false,
    regPass2: false,
  })
  const [loginForm, setLoginForm] = useState({
    loginEmail: '',
    loginPass: '',
    rememberMe: false,
  })
  const [registerForm, setRegisterForm] = useState({
    regUsername: '',
    regEmail: '',
    regPass: '',
    regPass2: '',
    agreeTerms: false,
  })
  const [loginErrors, setLoginErrors] = useState(emptyLoginErrors)
  const [registerErrors, setRegisterErrors] = useState(emptyRegisterErrors)

  const runeParticles = useMemo(
    () => Array.from({ length: 18 }, (_, index) => ({
      id: index,
      symbol: ['᚛', '᚜', 'ᚐ', 'ᚓ', '⚔', '🗡', '⚡', '✦', '◆', '❋', '✸', '⬡'][index % 12],
      left: `${Math.random() * 100}%`,
      fontSize: `${16 + Math.random() * 24}px`,
      animationDuration: `${12 + Math.random() * 18}s`,
      animationDelay: `${Math.random() * 6}s`,
    })),
    [],
  )

  useEffect(() => {
    if (!toast) return undefined

    const timeoutId = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  function switchTab(nextTab) {
    setActiveTab(nextTab)
    setLoginErrors(emptyLoginErrors)
    setRegisterErrors(emptyRegisterErrors)
  }

  function togglePasswordVisibility(field) {
    setVisiblePasswords((current) => ({
      ...current,
      [field]: !current[field],
    }))
  }

  function updateLoginField(field, value) {
    setLoginForm((current) => ({ ...current, [field]: value }))
    if (loginErrors[field]) {
      setLoginErrors((current) => ({ ...current, [field]: '' }))
    }
  }

  function updateRegisterField(field, value) {
    setRegisterForm((current) => ({ ...current, [field]: value }))
    if (registerErrors[field]) {
      setRegisterErrors((current) => ({ ...current, [field]: '' }))
    }
  }

  function getInputState(value, error) {
    if (error) return 'error'
    if (value) return 'success'
    return ''
  }

  function handleLoginSubmit(event) {
    event.preventDefault()

    const nextErrors = { ...emptyLoginErrors }
    const identity = loginForm.loginEmail.trim()
    const password = loginForm.loginPass

    if (!identity) nextErrors.loginEmail = 'Username or email is required.'
    if (!password) nextErrors.loginPass = 'Password is required.'

    if (nextErrors.loginEmail || nextErrors.loginPass) {
      setLoginErrors(nextErrors)
      return
    }

    setLoginLoading(true)
    window.setTimeout(() => {
      const users = getUsers()
      const user = users.find((entry) => (
        (entry.email === identity || entry.username === identity) && entry.password === password
      ))

      setLoginLoading(false)

      if (!user) {
        setLoginErrors({
          loginEmail: 'Incorrect username, email, or password.',
          loginPass: 'Incorrect username, email, or password.',
        })
        return
      }

      setCurrentUser(user)
      setToast(`Welcome back, ${user.username}! The Rift awaits.`)
      window.setTimeout(() => navigate('/'), 900)
    }, 900)
  }

  function handleRegisterSubmit(event) {
    event.preventDefault()

    const nextErrors = { ...emptyRegisterErrors }
    const username = registerForm.regUsername.trim()
    const email = registerForm.regEmail.trim()
    const password = registerForm.regPass
    const confirmPassword = registerForm.regPass2

    if (username.length < 3) nextErrors.regUsername = 'Enter at least 3 characters.'
    if (!isValidEmail(email)) nextErrors.regEmail = 'Enter a valid email address.'
    if (password.length < 6 || !/\d/.test(password)) {
      nextErrors.regPass = 'Must be at least 6 characters and include 1 number.'
    }
    if (password !== confirmPassword) nextErrors.regPass2 = 'Passwords do not match.'
    if (!registerForm.agreeTerms) nextErrors.agreeTerms = 'You must accept to continue.'

    if (Object.values(nextErrors).some(Boolean)) {
      setRegisterErrors(nextErrors)
      return
    }

    const users = getUsers()
    if (users.some((user) => user.email === email)) {
      setRegisterErrors((current) => ({
        ...current,
        regEmail: 'This email is already registered.',
      }))
      return
    }
    if (users.some((user) => user.username === username)) {
      setRegisterErrors((current) => ({
        ...current,
        regUsername: 'This username is already taken.',
      }))
      return
    }

    setRegisterLoading(true)
    window.setTimeout(() => {
      const nextUsers = [...users, { username, email, password }]
      saveUsers(nextUsers)
      setCurrentUser({ username, email })
      setRegisterLoading(false)
      setRegisterSuccess(true)
    }, 900)
  }

  function handleSocialLogin(provider) {
    setToast(`${provider} sign-in will be available soon.`)
  }

  const strengthScore = getPasswordStrengthScore(registerForm.regPass)
  const strengthColors = ['#e55', '#e5a020', '#4a9', '#4c9a6c']

  return (
    <div className="auth-page-react">
      <div className="auth-bg-layer-react">
        <div className="auth-bg-lines-react" />
        {runeParticles.map((rune) => (
          <span
            className="auth-rune-react"
            key={rune.id}
            style={{
              left: rune.left,
              fontSize: rune.fontSize,
              animationDuration: rune.animationDuration,
              animationDelay: rune.animationDelay,
            }}
          >
            {rune.symbol}
          </span>
        ))}
      </div>

      <main className="auth-wrapper-react">
        <div className="auth-card-ornament-react">
          <div className="auth-orn-line-react" />
          <div className="auth-orn-diamond-react" />
          <div className="auth-orn-line-react auth-orn-line-right-react" />
        </div>

        <section className="auth-card-react">
          <div className="auth-logo-block-react">
            <div className="auth-logo-eyebrow-react">LEAGUE OF LEGENDS</div>
            <div className="auth-logo-main-react">CHAMPIONS</div>
            <div className="auth-logo-sub-react">HUB</div>
          </div>

          <div className="auth-tab-row-react">
            <button
              type="button"
              className={`auth-tab-btn-react ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => switchTab('login')}
            >
              SIGN IN
            </button>
            <button
              type="button"
              className={`auth-tab-btn-react ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => switchTab('register')}
            >
              REGISTER
            </button>
          </div>

          <div className={`auth-panel-react ${activeTab === 'login' ? 'active' : ''}`}>
            <form onSubmit={handleLoginSubmit}>
              <div className="auth-field-react">
                <label htmlFor="loginEmail">EMAIL / USERNAME</label>
                <div className="auth-field-wrap-react">
                  <span className="auth-icon-react">⚔</span>
                  <input
                    id="loginEmail"
                    type="text"
                    placeholder="summoner@lol.com"
                    className={getInputState(loginForm.loginEmail, loginErrors.loginEmail)}
                    value={loginForm.loginEmail}
                    onChange={(event) => updateLoginField('loginEmail', event.target.value)}
                  />
                </div>
                <div className={`auth-field-error-react ${loginErrors.loginEmail ? 'show' : ''}`}>{loginErrors.loginEmail}</div>
              </div>

              <div className="auth-field-react">
                <label htmlFor="loginPass">PASSWORD</label>
                <div className="auth-field-wrap-react">
                  <span className="auth-icon-react">🛡</span>
                  <input
                    id="loginPass"
                    type={visiblePasswords.loginPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={getInputState(loginForm.loginPass, loginErrors.loginPass)}
                    value={loginForm.loginPass}
                    onChange={(event) => updateLoginField('loginPass', event.target.value)}
                  />
                  <button type="button" className="auth-toggle-pass-react" onClick={() => togglePasswordVisibility('loginPass')}>
                    {visiblePasswords.loginPass ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className={`auth-field-error-react ${loginErrors.loginPass ? 'show' : ''}`}>{loginErrors.loginPass}</div>
              </div>

              <button type="button" className="auth-forgot-link-react" onClick={() => setToast('Password recovery will be available soon.')}>
                Forgot password?
              </button>

              <div className="auth-checkbox-row-react">
                <input
                  type="checkbox"
                  className="auth-custom-check-react"
                  id="rememberMe"
                  checked={loginForm.rememberMe}
                  onChange={(event) => updateLoginField('rememberMe', event.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>

              <button type="submit" className={`auth-submit-btn-react ${loginLoading ? 'loading' : ''}`}>
                {loginLoading ? 'SIGNING IN...' : 'ENTER THE RIFT'}
              </button>

              <div className="auth-divider-react">
                <div className="auth-divider-line-react" />
                <span>OR</span>
                <div className="auth-divider-line-react" />
              </div>

              <div className="auth-social-row-react">
                <button type="button" className="auth-social-btn-react" onClick={() => handleSocialLogin('Google')}>
                  <svg viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Google
                </button>
                <button type="button" className="auth-social-btn-react" onClick={() => handleSocialLogin('Riot')}>
                  <svg viewBox="0 0 24 24"><path d="M12 2L2 7l1.09 9.66L12 22l8.91-5.34L22 7z" /></svg>
                  Riot ID
                </button>
              </div>
            </form>

            <div className="auth-switch-text-react">
              Don't have an account?{' '}
              <button type="button" className="auth-inline-link-react" onClick={() => switchTab('register')}>
                Register
              </button>
            </div>
          </div>

          <div className={`auth-panel-react ${activeTab === 'register' ? 'active' : ''}`}>
            {registerSuccess ? (
              <div className="auth-success-screen-react show">
                <div className="auth-success-icon-react">⚔</div>
                <div className="auth-success-title-react">WELCOME, SUMMONER!</div>
                <div className="auth-success-sub-react">
                  Your account has been created successfully.
                  <br />
                  You are ready to begin your journey on the Rift.
                </div>
                <button type="button" className="auth-submit-btn-react" onClick={() => navigate('/')}>
                  RETURN HOME
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="auth-field-react">
                    <label htmlFor="regUsername">SUMMONER NAME</label>
                    <div className="auth-field-wrap-react">
                      <span className="auth-icon-react">⚡</span>
                      <input
                        id="regUsername"
                        type="text"
                        placeholder="LegendaryVayne"
                        maxLength="20"
                        className={getInputState(registerForm.regUsername, registerErrors.regUsername)}
                        value={registerForm.regUsername}
                        onChange={(event) => updateRegisterField('regUsername', event.target.value)}
                      />
                    </div>
                    <div className={`auth-field-error-react ${registerErrors.regUsername ? 'show' : ''}`}>{registerErrors.regUsername}</div>
                  </div>

                  <div className="auth-field-react">
                    <label htmlFor="regEmail">EMAIL</label>
                    <div className="auth-field-wrap-react">
                      <span className="auth-icon-react">✉</span>
                      <input
                        id="regEmail"
                        type="email"
                        placeholder="summoner@lol.com"
                        className={getInputState(registerForm.regEmail, registerErrors.regEmail)}
                        value={registerForm.regEmail}
                        onChange={(event) => updateRegisterField('regEmail', event.target.value)}
                      />
                    </div>
                    <div className={`auth-field-error-react ${registerErrors.regEmail ? 'show' : ''}`}>{registerErrors.regEmail}</div>
                  </div>

                  <div className="auth-field-react">
                    <label htmlFor="regPass">PASSWORD</label>
                    <div className="auth-field-wrap-react">
                      <span className="auth-icon-react">🛡</span>
                      <input
                        id="regPass"
                        type={visiblePasswords.regPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        className={getInputState(registerForm.regPass, registerErrors.regPass)}
                        value={registerForm.regPass}
                        onChange={(event) => updateRegisterField('regPass', event.target.value)}
                      />
                      <button type="button" className="auth-toggle-pass-react" onClick={() => togglePasswordVisibility('regPass')}>
                        {visiblePasswords.regPass ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="auth-strength-bar-react">
                      {[0, 1, 2, 3].map((index) => (
                        <div
                          className="auth-strength-seg-react"
                          key={index}
                          style={{
                            background: index < strengthScore ? strengthColors[Math.max(strengthScore - 1, 0)] : 'rgba(255,255,255,.08)',
                          }}
                        />
                      ))}
                    </div>
                    <div className={`auth-field-error-react ${registerErrors.regPass ? 'show' : ''}`}>{registerErrors.regPass}</div>
                  </div>

                  <div className="auth-field-react">
                    <label htmlFor="regPass2">CONFIRM PASSWORD</label>
                    <div className="auth-field-wrap-react">
                      <span className="auth-icon-react">🔑</span>
                      <input
                        id="regPass2"
                        type={visiblePasswords.regPass2 ? 'text' : 'password'}
                        placeholder="••••••••"
                        className={getInputState(registerForm.regPass2, registerErrors.regPass2)}
                        value={registerForm.regPass2}
                        onChange={(event) => updateRegisterField('regPass2', event.target.value)}
                      />
                      <button type="button" className="auth-toggle-pass-react" onClick={() => togglePasswordVisibility('regPass2')}>
                        {visiblePasswords.regPass2 ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className={`auth-field-error-react ${registerErrors.regPass2 ? 'show' : ''}`}>{registerErrors.regPass2}</div>
                  </div>

                  <div className="auth-checkbox-row-react">
                    <input
                      type="checkbox"
                      className="auth-custom-check-react"
                      id="agreeTerms"
                      checked={registerForm.agreeTerms}
                      onChange={(event) => updateRegisterField('agreeTerms', event.target.checked)}
                    />
                    <label htmlFor="agreeTerms">
                      I agree to the{' '}
                      <button type="button" className="auth-inline-link-react" onClick={() => setToast('Terms page will be added soon.')}>
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button type="button" className="auth-inline-link-react" onClick={() => setToast('Privacy policy page will be added soon.')}>
                        Privacy Policy
                      </button>.
                    </label>
                  </div>
                  <div className={`auth-field-error-react auth-agree-error-react ${registerErrors.agreeTerms ? 'show' : ''}`}>{registerErrors.agreeTerms}</div>

                  <button type="submit" className={`auth-submit-btn-react ${registerLoading ? 'loading' : ''}`}>
                    {registerLoading ? 'CREATING ACCOUNT...' : 'START THE JOURNEY'}
                  </button>

                  <div className="auth-divider-react">
                    <div className="auth-divider-line-react" />
                    <span>OR</span>
                    <div className="auth-divider-line-react" />
                  </div>

                  <div className="auth-social-row-react">
                    <button type="button" className="auth-social-btn-react" onClick={() => handleSocialLogin('Google')}>
                      <svg viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                      Google
                    </button>
                    <button type="button" className="auth-social-btn-react" onClick={() => handleSocialLogin('Riot')}>
                      <svg viewBox="0 0 24 24"><path d="M12 2L2 7l1.09 9.66L12 22l8.91-5.34L22 7z" /></svg>
                      Riot ID
                    </button>
                  </div>
                </form>

                <div className="auth-switch-text-react">
                  Already have an account?{' '}
                  <button type="button" className="auth-inline-link-react" onClick={() => switchTab('login')}>
                    Sign in
                  </button>
                </div>
              </>
            )}
          </div>

          <Link to="/" className="auth-back-link-react">&larr; Back to home</Link>
        </section>
      </main>

      <div className={`auth-toast-react ${toast ? 'show' : ''}`}>{toast}</div>
    </div>
  )
}

export default Auth
