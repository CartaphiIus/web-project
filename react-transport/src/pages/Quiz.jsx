import { useCallback, useEffect, useMemo, useState } from 'react'
import './Quiz.css'
import SiteHeader from '../components/SiteHeader.jsx'

const DD_VERSION = '14.10.1'
const DDRAGON = `https://ddragon.leagueoflegends.com/cdn/${DD_VERSION}`

const CHAMPS = [
  { id: 'Ahri', name: 'Ahri', title: 'The Nine-Tailed Fox', region: 'Ionia', quote: "I think about him constantly, but I can't let feelings distract me from the hunt." },
  { id: 'Akali', name: 'Akali', title: 'The Rogue Assassin', region: 'Ionia', quote: 'To be a leader, sometimes you need to take the first step.' },
  { id: 'Alistar', name: 'Alistar', title: 'The Minotaur', region: 'Runeterra', quote: "You can't milk those." },
  { id: 'Amumu', name: 'Amumu', title: 'The Sad Mummy', region: 'Shurima', quote: "Why won't anyone play with me?" },
  { id: 'Annie', name: 'Annie', title: 'The Dark Child', region: 'Runeterra', quote: "Tibbers, sic 'em!" },
  { id: 'Ashe', name: 'Ashe', title: 'The Frost Archer', region: 'Freljord', quote: 'I am the arrow that fells the oppressor.' },
  { id: 'Blitzcrank', name: 'Blitzcrank', title: 'The Great Steam Golem', region: 'Zaun', quote: 'Everything can be quantified.' },
  { id: 'Caitlyn', name: 'Caitlyn', title: 'The Sheriff of Piltover', region: 'Piltover', quote: 'I never miss - it is physics.' },
  { id: 'Darius', name: 'Darius', title: 'The Hand of Noxus', region: 'Noxus', quote: 'Noxus does not suffer weakness.' },
  { id: 'Ekko', name: 'Ekko', title: 'The Boy Who Shattered Time', region: 'Zaun', quote: "I've done this a thousand times." },
  { id: 'Ezreal', name: 'Ezreal', title: 'The Prodigal Explorer', region: 'Piltover', quote: 'Looks like we made it.' },
  { id: 'Fiora', name: 'Fiora', title: 'The Grand Duelist', region: 'Demacia', quote: 'Victory is decided before the first strike.' },
  { id: 'Garen', name: 'Garen', title: 'The Might of Demacia', region: 'Demacia', quote: 'Demacia!' },
  { id: 'Jinx', name: 'Jinx', title: 'The Loose Cannon', region: 'Zaun', quote: 'Get excited!' },
  { id: 'Kayn', name: 'Kayn', title: 'The Shadow Reaper', region: 'Ionia', quote: 'This scythe... it wants something from me.' },
  { id: 'Katarina', name: 'Katarina', title: 'The Sinister Blade', region: 'Noxus', quote: 'Blade and shadow - tools of the trade.' },
  { id: 'LeeSin', name: 'Lee Sin', title: 'The Blind Monk', region: 'Ionia', quote: 'One must be the hammer, not the nail.' },
  { id: 'Leona', name: 'Leona', title: 'The Radiant Dawn', region: 'Targon', quote: 'The sun will rise.' },
  { id: 'Lucian', name: 'Lucian', title: 'The Purifier', region: 'Runeterra', quote: "Rest in peace - after I'm done with you." },
  { id: 'Lux', name: 'Lux', title: 'The Lady of Luminosity', region: 'Demacia', quote: 'Radiance is my gift to the world.' },
  { id: 'Malphite', name: 'Malphite', title: 'Shard of the Monolith', region: 'Ixtal', quote: 'Unstoppable.' },
  { id: 'MissFortune', name: 'Miss Fortune', title: 'The Bounty Hunter', region: 'Bilgewater', quote: 'They call me Miss Fortune for a reason.' },
  { id: 'Nautilus', name: 'Nautilus', title: 'The Titan of the Depths', region: 'Runeterra', quote: 'I am the weight of the ocean.' },
  { id: 'Orianna', name: 'Orianna', title: 'The Lady of Clockwork', region: 'Piltover', quote: 'Shall we play a game?' },
  { id: 'RekSai', name: "Rek'Sai", title: 'The Void Burrower', region: 'Void', quote: '[Shrieking from beneath the earth]' },
  { id: 'Riven', name: 'Riven', title: 'The Exile', region: 'Noxus', quote: 'I chose this exile.' },
  { id: 'Ryze', name: 'Ryze', title: 'The Rune Mage', region: 'Runeterra', quote: 'Magic is not a toy.' },
  { id: 'Shen', name: 'Shen', title: 'The Eye of Twilight', region: 'Ionia', quote: 'Balance is not something you find, it is something you create.' },
  { id: 'Sivir', name: 'Sivir', title: 'The Battle Mistress', region: 'Shurima', quote: 'Aim for the top - it is lonely there for a reason.' },
  { id: 'Syndra', name: 'Syndra', title: 'The Dark Sovereign', region: 'Ionia', quote: 'True power comes at a price.' },
  { id: 'Thresh', name: 'Thresh', title: 'The Chain Warden', region: 'Shadow Isles', quote: 'Your soul will be mine.' },
  { id: 'TwistedFate', name: 'Twisted Fate', title: 'The Card Master', region: 'Bilgewater', quote: 'Lady Luck is smiling on me today.' },
  { id: 'Vayne', name: 'Vayne', title: 'The Night Hunter', region: 'Demacia', quote: 'I hunt monsters.' },
  { id: 'Vi', name: 'Vi', title: 'The Piltover Enforcer', region: 'Piltover', quote: "Piltover's finest, at your service." },
  { id: 'Yasuo', name: 'Yasuo', title: 'The Unforgiven', region: 'Ionia', quote: 'Death is like the wind - always by my side.' },
  { id: 'Yone', name: 'Yone', title: 'The Unforgotten', region: 'Ionia', quote: 'I have slain a thousand of my own demons.' },
  { id: 'Zed', name: 'Zed', title: 'The Master of Shadows', region: 'Ionia', quote: 'Stand in the light, and cast a shadow.' },
  { id: 'Zeri', name: 'Zeri', title: 'The Spark of Zaun', region: 'Zaun', quote: 'Come on, come on - keep up!' },
  { id: 'Zilean', name: 'Zilean', title: 'The Chronokeeper', region: 'Runeterra', quote: 'Time flies whether you want it to or not.' },
]

const TRIVIA_QS = [
  { q: 'Which region is Thresh from?', answers: ['Shadow Isles', 'Void', 'Runeterra', 'Noxus'], correct: 0, fact: 'Thresh was once a warden who sought forbidden power on the Shadow Isles.' },
  { q: 'What currency is used in Bilgewater?', answers: ['Gold Crowns', 'Silver Coins', 'Ducats', 'Bits'], correct: 0, fact: 'Gold Crowns are the primary currency in Bilgewater.' },
  { q: 'How many Elemental Drakes exist in the base game?', answers: ['4', '5', '6', '3'], correct: 0, fact: 'Ocean, Infernal, Mountain, and Cloud are the four elemental drakes.' },
  { q: 'Which champion holds the title "The Chronokeeper"?', answers: ['Zilean', 'Ekko', 'Malzahar', 'Bard'], correct: 0, fact: 'Zilean lost his mind unraveling the secrets of time.' },
  { q: 'What is the base gold bounty for killing a champion?', answers: ['300', '250', '400', '200'], correct: 0, fact: 'Killing a champion always rewards at least 300 gold.' },
  { q: 'Which region does Ekko come from?', answers: ['Zaun', 'Piltover', 'Bilgewater', 'Ionia'], correct: 0, fact: 'Ekko grew up in the harsh undercity of Zaun.' },
  { q: "Rek'Sai originates from which region?", answers: ['Void', 'Shurima', 'Runeterra', 'Ixtal'], correct: 0, fact: "Rek'Sai is a Void creature that tunnels beneath Shurima's sands." },
  { q: 'Which item grants a spell shield on a 40s cooldown?', answers: ["Banshee's Veil", "Sterak's Gage", 'Maw of Malmortius', 'Guardian Angel'], correct: 0, fact: "Banshee's Veil blocks the first ability that hits you." },
  { q: 'How many total towers does one team have?', answers: ['11', '9', '13', '7'], correct: 0, fact: 'Each team has 11 towers: 3 lanes x 3 tiers + 2 base towers.' },
  { q: "Fiora's ultimate is called what?", answers: ['Grand Challenge', 'Blade Waltz', 'Riposte', "Duelist's Dance"], correct: 0, fact: 'Grand Challenge reveals all four Vitals.' },
  { q: 'Baron Nashor first spawns at what time?', answers: ['20 minutes', '15 minutes', '25 minutes', '18 minutes'], correct: 0, fact: 'Baron spawns at 20 minutes and grants a powerful buff.' },
  { q: 'Which champion has a skill called "Mystic Shot"?', answers: ['Ezreal', 'Lucian', 'Caitlyn', 'Jinx'], correct: 0, fact: "Mystic Shot is Ezreal's Q - a long-range skill shot." },
]

const ABILITY_QS = [
  { champId: 'Ahri', slot: 'Q', hint: 'A bolt of energy that deals magic damage and returns to the caster.' },
  { champId: 'Blitzcrank', slot: 'Q', hint: 'A rocket fist that grabs and pulls the first enemy hit.' },
  { champId: 'Ashe', slot: 'R', hint: 'A global enchanted arrow that stuns on impact.' },
  { champId: 'Lux', slot: 'E', hint: 'A luminous sphere that slows and damages enemies in its area.' },
  { champId: 'Yasuo', slot: 'W', hint: 'A wall of wind that blocks all incoming projectiles.' },
  { champId: 'Jinx', slot: 'R', hint: 'A rocket fired globally that gains damage the further it travels.' },
  { champId: 'Zed', slot: 'R', hint: 'A shadow mark placed on the target; lethal for isolated enemies.' },
  { champId: 'Thresh', slot: 'Q', hint: 'A scythe thrown in a line that hooks the first enemy.' },
  { champId: 'Ekko', slot: 'R', hint: 'Rewinds the champion to a past position, healing a portion of lost health.' },
  { champId: 'Leona', slot: 'R', hint: 'A blinding dawn that strikes from the sky, stunning enemies in the center.' },
  { champId: 'Vi', slot: 'R', hint: 'A charge that knocks aside enemies and pins the target.' },
  { champId: 'Orianna', slot: 'R', hint: 'A shockwave that pulls nearby enemies to the Ball, dealing damage.' },
]

const MODES = [
  { id: 'splash', icon: '🎨', name: 'Splash Art', desc: 'Identify the champion from their splash artwork.', diff: 'Easy', tone: 'easy' },
  { id: 'ability', icon: '⚡', name: 'Ability Icons', desc: 'Identify which champion has this ability based on the icon and hint.', diff: 'Medium', tone: 'med' },
  { id: 'trivia', icon: '📜', name: 'Trivia', desc: 'Deep LoL knowledge: lore, stats, mechanics, history, and more.', diff: 'Hard', tone: 'hard' },
  { id: 'quote', icon: '💬', name: 'Champion Quotes', desc: 'Read the iconic quote and name the champion who said it.', diff: 'Medium', tone: 'med' },
  { id: 'title', icon: '🏷️', name: 'Champion Titles', desc: 'Match the epithet to the champion.', diff: 'Easy', tone: 'easy' },
  { id: 'mixed', icon: '🎲', name: 'Mixed Mode', desc: 'All question types shuffled together.', diff: 'Hard', tone: 'hard' },
]

function shuffle(items) {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function rand(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function pick(items, count) {
  return shuffle(items).slice(0, count)
}

function championOptions(champ) {
  return shuffle([champ, ...pick(CHAMPS.filter((candidate) => candidate.id !== champ.id), 3)])
}

function buildQuestion(type) {
  if (type === 'trivia') {
    const source = rand(TRIVIA_QS)
    const order = shuffle([0, 1, 2, 3])
    return {
      type,
      question: source.q,
      answers: order.map((index) => source.answers[index]),
      correctIndex: order.indexOf(source.correct),
      fact: source.fact,
    }
  }

  if (type === 'ability') {
    const source = rand(ABILITY_QS)
    const champ = CHAMPS.find((candidate) => candidate.id === source.champId)
    return { type, champ, options: championOptions(champ), slot: source.slot, hint: source.hint }
  }

  const champ = rand(CHAMPS)
  return { type, champ, options: championOptions(champ) }
}

function buildQuestionSet(mode, count = 10) {
  const types = ['splash', 'ability', 'trivia', 'quote', 'title']
  return Array.from({ length: count }, () => buildQuestion(mode === 'mixed' ? rand(types) : mode))
}

function getTimeLimit(type) {
  if (type === 'splash') return 25
  if (type === 'trivia') return 20
  return 15
}

function getRank(percent) {
  if (percent >= 90) return { icon: '♛', name: 'Challenger', msg: 'Flawless. The Rift bows to your knowledge.' }
  if (percent >= 75) return { icon: '◆', name: 'Diamond', msg: 'Exceptional. You know this game deeply.' }
  if (percent >= 60) return { icon: '🏆', name: 'Platinum', msg: 'Solid performance. A true Summoner.' }
  if (percent >= 45) return { icon: '⚔', name: 'Gold', msg: 'Good showing. Keep studying the rift.' }
  return { icon: '🛡', name: 'Bronze', msg: "You'll get there. Keep playing and learning." }
}

function summarizeQuestion(question) {
  if (question.type === 'trivia') return question.question
  if (question.type === 'ability') return `Ability ${question.slot}: ${question.champ.name}`
  if (question.type === 'quote') return `Quote: ${question.champ.name}`
  if (question.type === 'title') return `Title: ${question.champ.title}`
  return `Splash: ${question.champ.name}`
}

function Quiz() {
  const [mode, setMode] = useState('')
  const [screen, setScreen] = useState('menu')
  const [questions, setQuestions] = useState([])
  const [qIndex, setQIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [timeLeft, setTimeLeft] = useState(20)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [lives, setLives] = useState(3)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [history, setHistory] = useState([])
  const [feedback, setFeedback] = useState(null)

  const currentQuestion = questions[qIndex]
  const totalTime = currentQuestion ? getTimeLimit(currentQuestion.type) : 20
  const answered = selectedAnswer !== null || Boolean(feedback?.timeout)
  const progressPct = questions.length ? (qIndex / questions.length) * 100 : 0
  const timePct = Math.max(0, (timeLeft / totalTime) * 100)
  const resultTotal = correct + wrong
  const accuracy = resultTotal ? Math.round((correct / resultTotal) * 100) : 0
  const rank = useMemo(() => getRank(accuracy), [accuracy])

  const handleTimeout = useCallback(() => {
    if (!currentQuestion || answered) return
    const answerLabel = currentQuestion.type === 'trivia' ? currentQuestion.answers[currentQuestion.correctIndex] : currentQuestion.champ.name
    const nextLives = Math.max(0, lives - 1)
    setWrong((value) => value + 1)
    setLives(nextLives)
    setStreak(0)
    setFeedback({ ok: false, timeout: true, title: "Time's up!", detail: `Correct: ${answerLabel}` })
    setHistory((items) => [...items, { ok: false, question: summarizeQuestion(currentQuestion), answer: 'Time Out', time: totalTime }])
    if (nextLives <= 0) {
      window.setTimeout(() => setScreen('results'), 1000)
    }
  }, [answered, currentQuestion, lives, totalTime])

  useEffect(() => {
    if (screen !== 'quiz' || !currentQuestion || answered) return undefined

    const id = window.setInterval(() => {
      setTimeLeft((current) => {
        const next = Math.max(0, current - 0.1)
        if (next <= 0) {
          window.clearInterval(id)
          handleTimeout()
        }
        return next
      })
    }, 100)

    return () => window.clearInterval(id)
  }, [screen, currentQuestion, answered, handleTimeout])

  function resetRound(question) {
    setSelectedAnswer(null)
    setFeedback(null)
    setTimeLeft(getTimeLimit(question.type))
  }

  function startQuiz(nextMode = mode) {
    const nextQuestions = buildQuestionSet(nextMode, 10)
    setMode(nextMode)
    setQuestions(nextQuestions)
    setQIndex(0)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setLives(3)
    setStreak(0)
    setBestStreak(0)
    setHistory([])
    setScreen('quiz')
    resetRound(nextQuestions[0])
  }

  function answerQuestion(value) {
    if (!currentQuestion || answered) return

    const isCorrect = currentQuestion.type === 'trivia'
      ? value === currentQuestion.correctIndex
      : value === currentQuestion.champ.id
    const answerLabel = currentQuestion.type === 'trivia' ? currentQuestion.answers[currentQuestion.correctIndex] : currentQuestion.champ.name
    const spent = Math.round(totalTime - timeLeft)

    setSelectedAnswer(value)
    setHistory((items) => [...items, { ok: isCorrect, question: summarizeQuestion(currentQuestion), answer: answerLabel, time: spent }])

    if (isCorrect) {
      const nextStreak = streak + 1
      const points = 100 + Math.round(timeLeft * 2) + streak * 10
      setScore((valueScore) => valueScore + points)
      setCorrect((valueCorrect) => valueCorrect + 1)
      setStreak(nextStreak)
      setBestStreak((valueBest) => Math.max(valueBest, nextStreak))
      setFeedback({ ok: true, title: `+${points} points${nextStreak > 1 ? ` · ${nextStreak}x streak` : ''}`, detail: currentQuestion.fact || '' })
    } else {
      const nextLives = Math.max(0, lives - 1)
      setWrong((valueWrong) => valueWrong + 1)
      setLives(nextLives)
      setStreak(0)
      setFeedback({ ok: false, title: `Correct answer: ${answerLabel}`, detail: currentQuestion.fact || '' })
      if (nextLives <= 0) {
        window.setTimeout(() => setScreen('results'), 1200)
      }
    }
  }

  function nextQuestion() {
    const nextIndex = qIndex + 1
    if (nextIndex >= questions.length) {
      setScreen('results')
      return
    }

    setQIndex(nextIndex)
    resetRound(questions[nextIndex])
  }

  function resetMenu() {
    setMode('')
    setScreen('menu')
    setSelectedAnswer(null)
    setFeedback(null)
  }

  function answerClass(value) {
    if (!currentQuestion || !answered) return ''
    const correctValue = currentQuestion.type === 'trivia' ? currentQuestion.correctIndex : currentQuestion.champ.id
    if (value === correctValue) return 'correct'
    if (value === selectedAnswer) return 'wrong'
    return ''
  }

  return (
    <div className="quiz-page-react">
      <SiteHeader />

      <main className="quiz-main-react">
        {screen === 'menu' && (
          <section className="quiz-mode-screen-react">
            <div className="quiz-mode-title-react">Champion Quiz</div>
            <div className="quiz-mode-sub-react">Test your League of Legends knowledge</div>

            <div className="quiz-mode-grid-react">
              {MODES.map((item) => (
                <button
                  type="button"
                  className={`quiz-mode-card-react ${mode === item.id ? 'selected' : ''}`}
                  onClick={() => setMode(item.id)}
                  aria-pressed={mode === item.id}
                  key={item.id}
                >
                  <div className="quiz-mode-icon-react">{item.icon}</div>
                  <div className="quiz-mode-name-react">{item.name}</div>
                  <div className="quiz-mode-desc-react">{item.desc}</div>
                  <span className={`quiz-mode-diff-react ${item.tone}`}>{item.diff}</span>
                </button>
              ))}
            </div>

            <button className="quiz-start-btn-react" type="button" onClick={() => startQuiz()} disabled={!mode}>
              {mode ? 'Begin Quiz →' : 'Select a Mode to Begin'}
            </button>
          </section>
        )}

        {screen === 'quiz' && currentQuestion && (
          <>
            <section className="quiz-score-bar-react">
              <div className="quiz-score-group-react"><span>Score</span><strong>{score}</strong></div>
              <div className="quiz-score-group-react"><span>Correct</span><strong className="green">{correct}</strong></div>
              <div className="quiz-progress-wrap-react">
                <div>Question {qIndex + 1} of {questions.length}</div>
                <div className="quiz-progress-track-react"><span style={{ width: `${progressPct}%` }} /></div>
              </div>
              <div className="quiz-score-group-react">
                <span>Lives</span>
                <div className="quiz-lives-react">{[0, 1, 2].map((life) => <b className={life >= lives ? 'lost' : ''} key={life}>♥</b>)}</div>
              </div>
              <div className={`quiz-streak-react ${streak >= 3 ? 'hot' : ''}`}>🔥 {streak} streak</div>
            </section>

            <section className="quiz-question-wrap-react">
              <header className="quiz-question-header-react">
                <span>Question {qIndex + 1} / {questions.length}</span>
                <b className={`quiz-badge-react ${currentQuestion.type}`}>{currentQuestion.type}</b>
              </header>
              <div className="quiz-timer-track-react"><span className={timePct < 30 ? 'danger' : ''} style={{ width: `${timePct}%` }} /></div>

              <QuestionCard question={currentQuestion} />

              {feedback && (
                <div className={`quiz-feedback-react ${feedback.ok ? 'correct' : 'wrong'}`}>
                  <span>{feedback.ok ? '✓' : feedback.timeout ? '⏰' : '✕'}</span>
                  <div>
                    <strong>{feedback.title}</strong>
                    {feedback.detail && <small>{feedback.detail}</small>}
                  </div>
                </div>
              )}

              <div className="quiz-answers-grid-react">
                {(currentQuestion.type === 'trivia' ? currentQuestion.answers : currentQuestion.options).map((option, index) => {
                  const value = currentQuestion.type === 'trivia' ? index : option.id
                  const label = currentQuestion.type === 'trivia' ? option : option.name
                  return (
                    <button
                      type="button"
                      className={`quiz-answer-btn-react ${answerClass(value)}`}
                      disabled={answered}
                      onClick={() => answerQuestion(value)}
                      key={label}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {label}
                    </button>
                  )
                })}
              </div>

              {answered && lives > 0 && (
                <button className="quiz-next-btn-react" type="button" onClick={nextQuestion}>
                  Next Question →
                </button>
              )}
            </section>
          </>
        )}

        {screen === 'results' && (
          <section className="quiz-results-react">
            <div className="quiz-rank-badge-react"><span>{rank.icon}</span>{rank.name}</div>
            <div className="quiz-results-ring-react" style={{ '--accuracy': accuracy }}>
              <div><strong>{accuracy}%</strong><span>Accuracy</span></div>
            </div>
            <h1>{rank.name} Summoner</h1>
            <p>{rank.msg}</p>
            <div className="quiz-results-stats-react">
              <div><strong>{score}</strong><span>Score</span></div>
              <div><strong>{correct}</strong><span>Correct</span></div>
              <div><strong>{wrong}</strong><span>Wrong</span></div>
              <div><strong>{bestStreak}</strong><span>Best Streak</span></div>
            </div>
            <div className="quiz-history-react">
              {history.slice(0, 8).map((item, index) => (
                <div className={item.ok ? 'ok' : 'bad'} key={`${item.question}-${index}`}>
                  <span>{item.ok ? '✓' : '✕'}</span>
                  <b>{item.question}</b>
                  <em>{item.answer}</em>
                  <small>{item.time}s</small>
                </div>
              ))}
            </div>
            <div className="quiz-results-actions-react">
              <button type="button" onClick={() => startQuiz(mode)}>Play Again</button>
              <button type="button" className="secondary" onClick={resetMenu}>Change Mode</button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function QuestionCard({ question }) {
  if (question.type === 'splash') {
    return (
      <div className="quiz-question-card-react splash">
        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${question.champ.id}_0.jpg`} alt="Champion splash art" />
        <div className="quiz-splash-hint-react">Which champion is shown above?</div>
      </div>
    )
  }

  if (question.type === 'ability') {
    return (
      <div className="quiz-question-card-react">
        <div className="quiz-ability-showcase-react">
          <img src={`${DDRAGON}/img/champion/${question.champ.id}.png`} alt="" />
          <b>{question.slot}</b>
          <p>{question.hint}</p>
        </div>
      </div>
    )
  }

  if (question.type === 'trivia') {
    return <div className="quiz-question-card-react"><h2>{question.question}</h2></div>
  }

  if (question.type === 'quote') {
    return <div className="quiz-question-card-react"><h2>“{question.champ.quote}”</h2><p>Which champion said this?</p></div>
  }

  return <div className="quiz-question-card-react"><h2>{question.champ.title}</h2><p>Which champion holds this title?</p></div>
}

export default Quiz
