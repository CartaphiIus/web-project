import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import './Profile.css'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import {
  clearCurrentUser,
  getCurrentUser,
  getStoredProfile,
  saveProfileForUser,
  subscribeToStoredAuth,
} from '../utils/authStorage.js'
import { resolveChampionLane } from '../utils/championLane.js'

const ranks = [
  { icon: '🪵', name: 'Iron' },
  { icon: '🥉', name: 'Bronze' },
  { icon: '🥈', name: 'Silver' },
  { icon: '🥇', name: 'Gold' },
  { icon: '💠', name: 'Platinum' },
  { icon: '💎', name: 'Emerald' },
  { icon: '💙', name: 'Diamond' },
  { icon: '🔮', name: 'Master' },
  { icon: '🌟', name: 'Grand M.' },
  { icon: '👑', name: 'Chall.' },
  { icon: '❓', name: 'Unranked' },
]

const lanes = [
  { icon: '🗡', name: 'Top' },
  { icon: '🌲', name: 'Jungle' },
  { icon: '⚡', name: 'Middle' },
  { icon: '🏹', name: 'Bottom' },
  { icon: '🛡', name: 'Support' },
]

const avatars = [
  { emoji: '🦊', label: 'Ahri' },
  { emoji: '⚔️', label: 'Yasuo' },
  { emoji: '💥', label: 'Jinx' },
  { emoji: '🌸', label: 'Lux' },
  { emoji: '🐉', label: 'Shyvana' },
  { emoji: '🌑', label: 'Zed' },
  { emoji: '🌀', label: 'Akali' },
  { emoji: '🔥', label: 'Brand' },
]

const teamCompLanes = [
  { key: 'Top', label: 'TOP' },
  { key: 'Jungle', label: 'JUNGLE' },
  { key: 'Middle', label: 'MID' },
  { key: 'Bottom', label: 'ADC' },
  { key: 'Support', label: 'SUPPORT' },
]

const ddragonVersion = '16.8.1'

function buildDefaultForm(user) {
  return {
    username: user?.username || '',
    firstName: '',
    lastName: '',
    age: '',
    country: '',
    email: user?.email || '',
    bio: '',
    champion: '',
  }
}

function createAvatarDataUrl(emoji) {
  const canvas = document.createElement('canvas')
  canvas.width = 160
  canvas.height = 160
  const context = canvas.getContext('2d')
  context.fillStyle = '#1a2f3f'
  context.fillRect(0, 0, 160, 160)
  context.font = '90px serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(emoji, 80, 85)
  return canvas.toDataURL()
}

function Profile() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [currentUser, setCurrentUser] = useState(getCurrentUser)
  const [form, setForm] = useState(() => buildDefaultForm(currentUser))
  const [selectedRank, setSelectedRank] = useState('')
  const [selectedLane, setSelectedLane] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [currentAvatarSrc, setCurrentAvatarSrc] = useState('')
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0)
  const [favoriteTeamComp, setFavoriteTeamComp] = useState({
    Top: '',
    Jungle: '',
    Middle: '',
    Bottom: '',
    Support: '',
  })
  const [activeCompLane, setActiveCompLane] = useState('Top')
  const [championPool, setChampionPool] = useState([])
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return undefined
    const timeoutId = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  useEffect(() => {
    return subscribeToStoredAuth(() => {
      setCurrentUser(getCurrentUser())
    })
  }, [])

  useEffect(() => {
    if (!currentUser) return

    const profile = getStoredProfile(currentUser.email)
    const nextForm = {
      ...buildDefaultForm(currentUser),
      username: profile.username || currentUser.username || '',
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      age: profile.age || '',
      country: profile.country || '',
      email: profile.email || currentUser.email || '',
      bio: profile.bio || '',
      champion: profile.champion || '',
    }

    setForm(nextForm)
    setSelectedRank(profile.rank || '')
    setSelectedLane(profile.lane || '')
    setSelectedGender(profile.gender || '')
    setFavoriteTeamComp({
      Top: profile.teamComp?.Top || '',
      Jungle: profile.teamComp?.Jungle || '',
      Middle: profile.teamComp?.Middle || '',
      Bottom: profile.teamComp?.Bottom || '',
      Support: profile.teamComp?.Support || '',
    })

    if (profile.avatar) {
      setCurrentAvatarSrc(profile.avatar)
      setSelectedAvatarIndex(-1)
    } else {
      setCurrentAvatarSrc(createAvatarDataUrl(avatars[0].emoji))
      setSelectedAvatarIndex(0)
    }
  }, [currentUser])

  useEffect(() => {
    let isMounted = true

    async function loadChampionPool() {
      try {
        const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/championFull.json`)
        if (!response.ok) throw new Error(`Failed to fetch champion data: ${response.status}`)
        const data = await response.json()
        const champions = Object.values(data.data || {})
          .map((champion) => ({
            id: champion.id,
            name: champion.name,
            lane: resolveChampionLane(champion.id, champion),
            image: `https://ddragon.leagueoflegends.com/cdn/${data.version}/img/champion/${champion.image.full}`,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        if (isMounted) {
          setChampionPool(champions)
        }
      } catch (error) {
        console.warn('Champion data could not be loaded for profile builder.', error)
      }
    }

    loadChampionPool()
    return () => {
      isMounted = false
    }
  }, [])

  const laneChampions = useMemo(
    () => championPool.filter((champion) => champion.lane === activeCompLane),
    [activeCompLane, championPool],
  )

  const favoriteCompByLane = useMemo(
    () => Object.fromEntries(teamCompLanes.map(({ key }) => [key, championPool.find((champion) => champion.id === favoriteTeamComp[key]) || null])),
    [championPool, favoriteTeamComp],
  )

  if (!currentUser) {
    return <Navigate to="/auth" replace />
  }

  function updateFormField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function selectPresetAvatar(index) {
    setSelectedAvatarIndex(index)
    setCurrentAvatarSrc(createAvatarDataUrl(avatars[index].emoji))
  }

  function handleAvatarUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (loadEvent) => {
      setSelectedAvatarIndex(-1)
      setCurrentAvatarSrc(String(loadEvent.target?.result || ''))
    }
    reader.readAsDataURL(file)
  }

  function handleSaveProfile() {
    if (!form.email.trim()) {
      setToast('Email cannot be empty.')
      return
    }

    const nextProfile = {
      avatar: currentAvatarSrc,
      username: form.username.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age,
      country: form.country.trim(),
      email: form.email.trim(),
      bio: form.bio.trim(),
      champion: form.champion.trim(),
      teamComp: favoriteTeamComp,
      rank: selectedRank,
      lane: selectedLane,
      gender: selectedGender,
    }

    saveProfileForUser(currentUser, nextProfile)
    setToast('Profile saved successfully.')
  }

  function handleLogout() {
    clearCurrentUser()
    navigate('/')
  }

  return (
    <div className="profile-page-react">
      <SiteHeader compact />

      <main className="profile-main-react">
        <div className="profile-page-header-react">
          <div className="profile-page-diamond-react" />
          <div className="profile-page-title-react">PROFILE SETTINGS</div>
          <div className="profile-page-line-react" />
        </div>

        <div className="profile-grid-react">
          <div className="profile-left-stack-react">
            <section className="profile-panel-react profile-avatar-panel-react">
              <div className="profile-panel-title-react">SUMMONER AVATAR</div>

              <button type="button" className="profile-avatar-ring-react" onClick={() => fileInputRef.current?.click()} aria-label="Upload avatar image">
                <img className="profile-avatar-img-react" src={currentAvatarSrc} alt="Avatar" />
                <div className="profile-avatar-overlay-react">
                  <span>📷</span>
                  <small>CHANGE</small>
                </div>
              </button>
              <input ref={fileInputRef} type="file" className="profile-avatar-input-react" accept="image/*" onChange={handleAvatarUpload} />

              <div className="profile-avatar-picker-title-react">PRESET AVATARS</div>
              <div className="profile-avatar-grid-react">
                {avatars.map((avatar, index) => (
                  <button
                    type="button"
                    className={`profile-avatar-option-react ${selectedAvatarIndex === index ? 'selected' : ''}`}
                    key={avatar.label}
                    title={avatar.label}
                    onClick={() => selectPresetAvatar(index)}
                  >
                    {avatar.emoji}
                  </button>
                ))}
              </div>

              <button type="button" className="profile-upload-btn-react" onClick={() => fileInputRef.current?.click()}>
                📁 UPLOAD YOUR OWN IMAGE
              </button>
            </section>

            <section className="profile-panel-react">
              <div className="profile-panel-title-react">RANK</div>
              <div className="profile-rank-grid-react">
                {ranks.map((rank) => (
                  <button
                    type="button"
                    className={`profile-rank-option-react ${selectedRank === rank.name ? 'selected' : ''}`}
                    key={rank.name}
                    onClick={() => setSelectedRank(rank.name)}
                  >
                    <div className="profile-rank-icon-react">{rank.icon}</div>
                    <div className="profile-rank-name-react">{rank.name}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="profile-panel-react">
              <div className="profile-panel-title-react">PREFERRED LANE</div>
              <div className="profile-lane-grid-react">
                {lanes.map((lane) => (
                  <button
                    type="button"
                    className={`profile-lane-option-react ${selectedLane === lane.name ? 'selected' : ''}`}
                    key={lane.name}
                    onClick={() => setSelectedLane(lane.name)}
                  >
                    <div className="profile-lane-icon-react">{lane.icon}</div>
                    <div className="profile-lane-name-react">{lane.name}</div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section className="profile-panel-react">
            <div className="profile-panel-title-react">PERSONAL INFORMATION</div>

            <div className="profile-field-react">
              <label htmlFor="pUsername">SUMMONER NAME</label>
              <input id="pUsername" type="text" placeholder="LegendaryVayne" maxLength="20" value={form.username} onChange={(event) => updateFormField('username', event.target.value)} />
            </div>

            <div className="profile-field-row-react">
              <div className="profile-field-react">
                <label htmlFor="pFirstName">FIRST NAME</label>
                <input id="pFirstName" type="text" placeholder="Yasuo" value={form.firstName} onChange={(event) => updateFormField('firstName', event.target.value)} />
              </div>
              <div className="profile-field-react">
                <label htmlFor="pLastName">LAST NAME</label>
                <input id="pLastName" type="text" placeholder="Windchaser" value={form.lastName} onChange={(event) => updateFormField('lastName', event.target.value)} />
              </div>
            </div>

            <div className="profile-field-row-react">
              <div className="profile-field-react">
                <label htmlFor="pAge">AGE</label>
                <input id="pAge" type="number" placeholder="18" min="10" max="99" value={form.age} onChange={(event) => updateFormField('age', event.target.value)} />
              </div>
              <div className="profile-field-react">
                <label htmlFor="pCountry">COUNTRY</label>
                <input id="pCountry" type="text" placeholder="Turkey" value={form.country} onChange={(event) => updateFormField('country', event.target.value)} />
              </div>
            </div>

            <div className="profile-field-react">
              <label>GENDER</label>
              <div className="profile-gender-row-react">
                {['Male', 'Female', 'Prefer not to say'].map((gender) => (
                  <button
                    type="button"
                    className={`profile-gender-btn-react ${selectedGender === gender ? 'selected' : ''}`}
                    key={gender}
                    onClick={() => setSelectedGender(gender)}
                  >
                    {gender === 'Prefer not to say' ? 'Other' : gender}
                  </button>
                ))}
              </div>
            </div>

            <div className="profile-section-separator-react" />

            <div className="profile-field-react">
              <label htmlFor="pEmail">EMAIL</label>
              <input id="pEmail" type="email" placeholder="summoner@lol.com" value={form.email} onChange={(event) => updateFormField('email', event.target.value)} />
            </div>

            <div className="profile-field-react">
              <label htmlFor="pBio">BIO</label>
              <input id="pBio" type="text" placeholder="I main Zed and love outplays..." maxLength="80" value={form.bio} onChange={(event) => updateFormField('bio', event.target.value)} />
            </div>

            <div className="profile-field-react">
              <label htmlFor="pChampion">FAVORITE CHAMPION</label>
              <input id="pChampion" type="text" placeholder="Zed, Yasuo, Jinx..." value={form.champion} onChange={(event) => updateFormField('champion', event.target.value)} />
            </div>

            <div className="profile-field-react">
              <label>FAVORITE TEAM COMPOSITION</label>
              <div className="profile-comp-builder-react">
                <div className="profile-comp-slot-row-react">
                  {teamCompLanes.map(({ key, label }) => {
                    const champion = favoriteCompByLane[key]
                    return (
                      <button
                        type="button"
                        className={`profile-comp-slot-react ${activeCompLane === key ? 'active' : ''}`}
                        key={key}
                        onClick={() => setActiveCompLane(key)}
                      >
                        {champion ? (
                          <>
                            <img src={champion.image} alt={champion.name} />
                            <div className="profile-comp-slot-name-react">{champion.name}</div>
                            <div className="profile-comp-slot-lane-react">{label}</div>
                          </>
                        ) : (
                          <>
                            <div className="profile-comp-slot-empty-react">+</div>
                            <div className="profile-comp-slot-name-react">Empty</div>
                            <div className="profile-comp-slot-lane-react">{label}</div>
                          </>
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="profile-comp-picker-head-react">
                  <div className="profile-comp-active-lane-react">
                    {teamCompLanes.find((item) => item.key === activeCompLane)?.label || activeCompLane} champions
                  </div>
                  <button
                    type="button"
                    className="profile-comp-clear-btn-react"
                    onClick={() => setFavoriteTeamComp((current) => ({ ...current, [activeCompLane]: '' }))}
                  >
                    CLEAR SLOT
                  </button>
                </div>

                <div className="profile-comp-picker-grid-react">
                  {laneChampions.length ? laneChampions.map((champion) => (
                    <button
                      type="button"
                      className={`profile-comp-card-react ${favoriteTeamComp[activeCompLane] === champion.id ? 'selected' : ''}`}
                      key={champion.id}
                      onClick={() => setFavoriteTeamComp((current) => ({ ...current, [activeCompLane]: champion.id }))}
                    >
                      <img src={champion.image} alt={champion.name} loading="lazy" />
                      <div className="profile-comp-card-name-react">{champion.name}</div>
                    </button>
                  )) : (
                    <div className="profile-comp-empty-grid-react">Champion pool could not be loaded for this lane yet.</div>
                  )}
                </div>
              </div>
              <small className="profile-field-note-react">
                Each slot only shows champions for its lane. Select a slot, then pick the champion card you want.
              </small>
            </div>

            <button type="button" className="profile-save-btn-react" onClick={handleSaveProfile}>
              Save Profile
            </button>

            <div className="profile-danger-zone-react">
              <div className="profile-danger-title-react">DANGER ZONE</div>
              <button type="button" className="profile-logout-btn-react" onClick={handleLogout}>
                SIGN OUT
              </button>
            </div>
          </section>
        </div>

        <div className="profile-back-row-react">
          <Link to="/" className="profile-back-link-react">&larr; Back to Home</Link>
        </div>
      </main>

      <SiteFooter />
      <div className={`profile-toast-react ${toast ? 'show' : ''}`}>{toast}</div>
    </div>
  )
}

export default Profile
