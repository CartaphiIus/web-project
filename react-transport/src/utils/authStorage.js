const USERS_KEY = 'lol_users'
const CURRENT_USER_KEY = 'lol_current'
const PROFILE_KEY_PREFIX = 'lol_profile_'
const STORAGE_EVENT = 'lol-storage-change'

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function emitStorageChange() {
  window.dispatchEvent(new Event(STORAGE_EVENT))
}

export function getUsers() {
  return readJson(USERS_KEY, [])
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  emitStorageChange()
}

export function getCurrentUser() {
  return readJson(CURRENT_USER_KEY, null)
}

export function setCurrentUser(user) {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({
      username: user.username,
      email: user.email,
    }),
  )
  emitStorageChange()
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
  emitStorageChange()
}

export function getStoredProfile(email) {
  if (!email) return {}
  return readJson(`${PROFILE_KEY_PREFIX}${email}`, {})
}

export function saveProfileForUser(previousUser, profileData) {
  const previousEmail = previousUser?.email || ''
  const nextUser = {
    username: profileData.username || previousUser?.username || '',
    email: profileData.email || previousEmail,
  }

  const profileKey = `${PROFILE_KEY_PREFIX}${nextUser.email}`
  localStorage.setItem(profileKey, JSON.stringify(profileData))

  if (previousEmail && previousEmail !== nextUser.email) {
    localStorage.removeItem(`${PROFILE_KEY_PREFIX}${previousEmail}`)
  }

  const users = getUsers()
  const updatedUsers = users.map((user) => (
    user.email === previousEmail
      ? {
          ...user,
          username: nextUser.username,
          email: nextUser.email,
        }
      : user
  ))
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
  setCurrentUser(nextUser)
  emitStorageChange()

  return nextUser
}

export function subscribeToStoredAuth(callback) {
  function handleStorage(event) {
    if (!event.key || [USERS_KEY, CURRENT_USER_KEY].includes(event.key) || event.key.startsWith(PROFILE_KEY_PREFIX)) {
      callback()
    }
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(STORAGE_EVENT, callback)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(STORAGE_EVENT, callback)
  }
}
