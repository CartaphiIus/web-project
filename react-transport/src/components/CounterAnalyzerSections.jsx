import {
  getCounterClassesLabel,
  getThreatBadgeClass,
  getThreatScore,
} from '../utils/counterAnalysis.js'

const roleOptions = [
  ['all', 'All'],
  ['top', 'Top'],
  ['jungle', 'Jungle'],
  ['middle', 'Mid'],
  ['bottom', 'Bot'],
  ['support', 'Support'],
]

const typeOptions = [
  ['all', 'All'],
  ['melee', 'Melee'],
  ['ranged', 'Ranged'],
]

function CounterEmptyState({ children }) {
  return <div className="counter-empty-state">{children}</div>
}

export function CounterEnemyPicker({
  slotRoles,
  enemyTeam,
  championMap,
  activeSlot,
  onToggleSlot,
  onClearSlot,
  filterRole,
  onFilterRole,
  filterType,
  onFilterType,
  filterClass,
  onFilterClass,
  classOptions,
  searchTerm,
  onSearchTerm,
  loading,
  loadError,
  filteredChampions,
  onPickChampion,
}) {
  return (
    <section className="counter-left-panel">
      <div className="counter-enemy-zone">
        <div className="counter-enemy-zone-title">Enemy Team - Pick 5 Champions</div>

        <div className="counter-enemy-slots">
          {slotRoles.map((role, index) => {
            const champion = enemyTeam[index] ? championMap[enemyTeam[index]] : null
            const threat = champion ? getThreatScore(champion) : 0

            return (
              <button
                key={role}
                type="button"
                className={`counter-enemy-slot ${champion ? 'filled' : ''} ${activeSlot === index ? 'active' : ''}`}
                onClick={() => onToggleSlot(index)}
              >
                {champion ? (
                  <>
                    <img className="counter-slot-splash" src={champion.splash} alt={champion.name} />
                    <div className="counter-slot-overlay" />
                    <div className="counter-slot-class-badge">{champion.class}</div>
                    <div className={`counter-threat-badge ${getThreatBadgeClass(threat)}`}>{threat}</div>
                    <div className="counter-slot-name">{champion.name}</div>
                    <div className="counter-slot-role">{role}</div>
                    <button
                      type="button"
                      className="counter-slot-remove"
                      onClick={(event) => {
                        event.stopPropagation()
                        onClearSlot(index)
                      }}
                    >
                      X
                    </button>
                  </>
                ) : (
                  <>
                    <div className="counter-slot-empty-icon">☠</div>
                    <div className="counter-slot-role">{role}</div>
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="counter-picker-section">
        <div className="counter-filters-row">
          <span className="counter-filter-label">Role</span>
          {roleOptions.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`counter-filter-btn ${filterRole === value ? 'active' : ''}`}
              onClick={() => onFilterRole(value)}
            >
              {label}
            </button>
          ))}

          <span className="counter-filter-sep" />

          {typeOptions.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`counter-filter-btn ${filterType === value ? 'active' : ''}`}
              onClick={() => onFilterType(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="counter-filters-row">
          <span className="counter-filter-label">Class</span>
          <button
            type="button"
            className={`counter-filter-btn ${filterClass === 'all' ? 'active' : ''}`}
            onClick={() => onFilterClass('all')}
          >
            All
          </button>

          {classOptions.map((value) => (
            <button
              key={value}
              type="button"
              className={`counter-filter-btn ${filterClass === value ? 'active' : ''}`}
              onClick={() => onFilterClass(value)}
            >
              {getCounterClassesLabel(value)}
            </button>
          ))}
        </div>

        <div className="counter-search-wrap">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchTerm(event.target.value)}
            placeholder="Search champion..."
          />
        </div>

        {loading ? <CounterEmptyState>Loading champion roster...</CounterEmptyState> : null}
        {loadError ? <CounterEmptyState>{loadError}</CounterEmptyState> : null}

        {!loading && !loadError ? (
          <div className="counter-champ-grid">
            {filteredChampions.map((champion) => {
              const dotColor =
                champion.damage.magic > 50 ? '#4a9eff' : champion.damage.phys > 60 ? '#e05050' : '#c8aa6e'

              return (
                <button
                  key={champion.id}
                  type="button"
                  className="counter-champ-thumb"
                  onClick={() => onPickChampion(champion.id)}
                >
                  <img src={champion.image} alt={champion.name} loading="lazy" />
                  <div className="counter-thumb-name">{champion.name}</div>
                  <div className="counter-dmg-dot" style={{ background: dotColor }} />
                </button>
              )
            })}

            {!filteredChampions.length ? (
              <CounterEmptyState>No champions match these filters right now.</CounterEmptyState>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function CounterItemsTab({ analysis, selectedCount, dominantDamageLabel, renderDonutDash }) {
  return (
    <div className="counter-tab-pane active">
      <div className="counter-damage-section">
        <div className="counter-sec-label">Enemy Damage Profile</div>
        <div className="counter-damage-donut-wrap">
          <div className="counter-damage-donut">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" stroke="#c8aa6e" strokeDasharray={analysis ? renderDonutDash(analysis.damage.true) : '0 238.76'} strokeDashoffset={analysis ? `-${((analysis.damage.phys + analysis.damage.magic) / 100) * (2 * Math.PI * 38)}` : '0'} />
              <circle cx="50" cy="50" r="38" stroke="#4a9eff" strokeDasharray={analysis ? renderDonutDash(analysis.damage.magic) : '0 238.76'} strokeDashoffset={analysis ? `-${(analysis.damage.phys / 100) * (2 * Math.PI * 38)}` : '0'} />
              <circle cx="50" cy="50" r="38" stroke="#e05050" strokeDasharray={analysis ? renderDonutDash(analysis.damage.phys) : '0 238.76'} />
            </svg>
            <div className="counter-donut-label">{dominantDamageLabel}</div>
          </div>

          <div className="counter-damage-legend">
            {[
              ['Physical', analysis?.damage.phys ?? 0, '#e05050'],
              ['Magic', analysis?.damage.magic ?? 0, '#4a9eff'],
              ['True', analysis?.damage.true ?? 0, '#c8aa6e'],
            ].map(([label, value, color]) => (
              <div key={label} className="counter-damage-legend-block">
                <div className="counter-dmg-row">
                  <div className="counter-dmg-dot-label" style={{ background: color }} />
                  <span className="counter-dmg-label">{label}</span>
                  <span className="counter-dmg-pct" style={{ color }}>{selectedCount ? `${value}%` : '—%'}</span>
                </div>
                <div className="counter-dmg-bar-wrap">
                  <div className="counter-dmg-bar" style={{ width: `${selectedCount ? value : 0}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="counter-items-section">
        <div className="counter-sec-label">Recommended Counter Items</div>
        {analysis?.itemBuilds?.length ? (
          <div className="counter-role-builds">
            {analysis.itemBuilds.map(({ champion, items }) => (
              <div key={champion.id} className="counter-role-build-card">
                <div className="counter-role-build-header">
                  <div className="counter-role-champ-icon">
                    <img src={champion.image} alt={champion.name} />
                  </div>
                  <div>
                    <div className="counter-role-champ-name">Against {champion.name}</div>
                    <div className="counter-role-champ-role">{champion.class} · {champion.type}</div>
                  </div>
                </div>

                <div className="counter-items-grid">
                  {items.map((item) => (
                    <div key={`${champion.id}-${item.name}`} className={`counter-item-chip ${item.type}`}>
                      <span className="counter-item-icon">{item.icon}</span>
                      <span className="counter-item-name">{item.name}</span>
                      <div className="counter-item-reason">{item.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CounterEmptyState>Pick a champion to see item suggestions</CounterEmptyState>
        )}
      </div>
    </div>
  )
}

function CounterStrategyTab({ analysis }) {
  return (
    <div className="counter-tab-pane active">
      <div className="counter-strategy-section">
        <div className="counter-sec-label">Game Plan & Strategy</div>
        {analysis?.strategyCards?.length ? (
          <div className="counter-strategy-cards">
            {analysis.strategyCards.map((card) => (
              <div key={card.title} className={`counter-strategy-card ${card.cls}`}>
                <span className="counter-strategy-icon">{card.icon}</span>
                <div>
                  <div className="counter-strategy-title">{card.title}</div>
                  <div className="counter-strategy-desc">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CounterEmptyState>Pick a champion to see strategy advice</CounterEmptyState>
        )}
      </div>

      <div className="counter-ratings-section">
        <div className="counter-sec-label">Enemy Power Ratings</div>
        {analysis ? (
          <div className="counter-rating-rows">
            {Object.entries(analysis.ratings).map(([key, value]) => (
              <div key={key} className="counter-rating-row">
                <span className="counter-rating-key">{key}</span>
                <div className="counter-rating-bar-track">
                  <div className="counter-rating-bar-fill" style={{ width: `${(value / 10) * 100}%` }} />
                </div>
                <span className="counter-rating-val">{value.toFixed(1)}</span>
              </div>
            ))}
          </div>
        ) : (
          <CounterEmptyState>Pick a champion to see power ratings</CounterEmptyState>
        )}
      </div>
    </div>
  )
}

function CounterRunesTab({ analysis }) {
  return (
    <div className="counter-tab-pane active">
      <div className="counter-runes-section">
        <div className="counter-sec-label">Counter Rune Suggestions</div>
        {analysis?.runeGroups?.length ? (
          <div className="counter-rune-groups">
            {analysis.runeGroups.map((group) => (
              <div key={group.championName} className="counter-rune-group-card">
                <div className="counter-rune-champ-label">If you are playing into {group.championName}</div>
                <div className="counter-rune-row">
                  <span className="counter-rune-chip keystone">{group.runes.keystone}</span>
                  {group.runes.primary.map((rune) => (
                    <span key={`${group.championName}-${rune}`} className="counter-rune-chip">{rune}</span>
                  ))}
                  {group.runes.secondary.map((rune) => (
                    <span key={`${group.championName}-secondary-${rune}`} className="counter-rune-chip">{rune}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CounterEmptyState>Pick a champion to see rune suggestions</CounterEmptyState>
        )}
      </div>

      <div className="counter-cc-section">
        <div className="counter-sec-label">Enemy CC Coverage</div>
        {analysis ? (
          <div className="counter-cc-tags">
            {analysis.ccSummary.map((cc) => (
              <div key={cc.key} className={`counter-cc-tag ${cc.active ? 'has' : 'missing'}`}>{cc.label}</div>
            ))}
          </div>
        ) : (
          <CounterEmptyState>Pick a champion to see crowd control coverage</CounterEmptyState>
        )}
      </div>
    </div>
  )
}

function CounterThreatsTab({ analysis }) {
  return (
    <div className="counter-tab-pane active">
      <div className="counter-synergy-threats">
        <div className="counter-sec-label">Dangerous Synergy Combos</div>
        {analysis?.threatCombos?.length ? (
          <div className="counter-threat-combo-list">
            {analysis.threatCombos.map((combo) => (
              <div key={combo.pair} className="counter-threat-combo">
                <div className="counter-threat-combo-icons">
                  {combo.images.map((image, index) => (
                    <img key={`${combo.pair}-${index + 1}`} src={image} alt={combo.names[index]} />
                  ))}
                </div>
                <div className="counter-threat-combo-info">
                  <div className="counter-threat-combo-pair">{combo.names.join(' + ')}</div>
                  <div className="counter-threat-combo-reason">{combo.reason}</div>
                </div>
                <div className="counter-threat-combo-score">+{combo.score}</div>
              </div>
            ))}
          </div>
        ) : (
          <CounterEmptyState>No dangerous synergy combo detected</CounterEmptyState>
        )}
      </div>

      <div className="counter-warnings-section">
        <div className="counter-sec-label">Things to Watch Out For</div>
        {analysis?.strengths?.length ? (
          <div className="counter-warning-list">
            {analysis.strengths.map((warning) => (
              <div key={`${warning.title}-${warning.desc}`} className={`counter-warning-item ${warning.type}`}>
                <span className="counter-warning-icon">{warning.icon}</span>
                <div className="counter-warning-text">
                  <span className="counter-warning-title">{warning.title}</span>
                  <span className="counter-warning-desc">{warning.desc}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CounterEmptyState>Pick a champion to start analysis</CounterEmptyState>
        )}
      </div>
    </div>
  )
}

function CounterAnalysisTab({ analysis }) {
  return (
    <div className="counter-tab-pane active">
      <div className="counter-warnings-section counter-analysis-border">
        <div className="counter-sec-label">Enemy Weak Points</div>
        {analysis?.weaknesses?.length ? (
          <div className="counter-warning-list">
            {analysis.weaknesses.map((warning) => (
              <div key={`${warning.title}-${warning.desc}`} className={`counter-warning-item ${warning.type}`}>
                <span className="counter-warning-icon">{warning.icon}</span>
                <div className="counter-warning-text">
                  <span className="counter-warning-title">{warning.title}</span>
                  <span className="counter-warning-desc">{warning.desc}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CounterEmptyState>Pick a champion to see weakness analysis</CounterEmptyState>
        )}
      </div>

      <div className="counter-warnings-section">
        <div className="counter-sec-label">Enemy Strengths</div>
        {analysis?.strengths?.length ? (
          <div className="counter-warning-list">
            {analysis.strengths.map((warning) => (
              <div key={`strength-${warning.title}-${warning.desc}`} className={`counter-warning-item ${warning.type}`}>
                <span className="counter-warning-icon">{warning.icon}</span>
                <div className="counter-warning-text">
                  <span className="counter-warning-title">{warning.title}</span>
                  <span className="counter-warning-desc">{warning.desc}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CounterEmptyState>Pick a champion to see strength analysis</CounterEmptyState>
        )}
      </div>
    </div>
  )
}

export function CounterAnalysisSidebar({
  tabOptions,
  activeTab,
  onTabChange,
  selectedCount,
  threatScore,
  threatOffset,
  threatRingColor,
  analysis,
  dominantDamageLabel,
  renderDonutDash,
  onResetEnemyTeam,
}) {
  return (
    <aside className="counter-right-panel">
      <div className="counter-analysis-header">
        <span className="counter-analysis-title">Enemy Analysis</span>
        <span className="counter-champ-count-badge">{selectedCount} / 5 selected</span>
      </div>

      <div className="counter-threat-wrap">
        <div className="counter-threat-ring">
          <svg viewBox="0 0 120 120">
            <circle className="counter-ring-bg" cx="60" cy="60" r="54" />
            <circle
              className="counter-ring-fill"
              cx="60"
              cy="60"
              r="54"
              style={{
                strokeDashoffset: selectedCount ? threatOffset : 339.3,
                stroke: threatRingColor,
              }}
            />
          </svg>

          <div className="counter-score-num">
            <span className="counter-score-value">{selectedCount ? threatScore : '—'}</span>
            <span className="counter-score-label">Threat</span>
          </div>
        </div>

        <div className="counter-threat-grade">{analysis ? analysis.threatGrade.label : 'Select Enemies'}</div>
        <div className="counter-threat-sublabel">
          {analysis ? analysis.threatGrade.subtitle : 'Analyze the enemy team by selecting 5 champions'}
        </div>
      </div>

      <div className="counter-tab-nav">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`counter-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'items' ? (
        <CounterItemsTab
          analysis={analysis}
          selectedCount={selectedCount}
          dominantDamageLabel={dominantDamageLabel}
          renderDonutDash={renderDonutDash}
        />
      ) : null}

      {activeTab === 'strategy' ? <CounterStrategyTab analysis={analysis} /> : null}
      {activeTab === 'runes' ? <CounterRunesTab analysis={analysis} /> : null}
      {activeTab === 'threats' ? <CounterThreatsTab analysis={analysis} /> : null}
      {activeTab === 'analysis' ? <CounterAnalysisTab analysis={analysis} /> : null}

      <div className="counter-danger-level-bar">
        <div className="counter-danger-icon">!</div>
        <div>
          <div className="counter-danger-label">Enemy Pressure Summary</div>
          <div className="counter-danger-desc">
            {analysis
              ? `${analysis.threatGrade.label}: ${analysis.threatGrade.subtitle}`
              : 'Select enemies to unlock the full threat overview, item counters, and matchup plan.'}
          </div>
        </div>
      </div>

      <div className="counter-right-actions">
        <button type="button" className="counter-reset-button" onClick={onResetEnemyTeam}>Reset Enemy Team</button>
      </div>
    </aside>
  )
}
