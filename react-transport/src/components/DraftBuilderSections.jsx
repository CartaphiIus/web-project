const roleOptions = [
  ['all', 'All'],
  ['top', 'Top'],
  ['jungle', 'Jungle'],
  ['middle', 'Mid'],
  ['bottom', 'Bot'],
  ['support', 'Support'],
]

const rangeOptions = [
  ['all', 'All'],
  ['melee', 'Melee'],
  ['ranged', 'Ranged'],
]

const classOptions = ['all', 'tank', 'fighter', 'mage', 'assassin', 'marksman', 'support']

export function DraftHero({ onReset }) {
  return (
    <section className="draft-hero">
      <div>
        <div className="draft-kicker shared-kicker">SYNERGY TOOL</div>
        <h1>Draft Builder</h1>
        <p>Build a 5-champion composition, check role balance, and save a clean summary for later.</p>
      </div>
      <button type="button" className="draft-reset-btn shared-button-ghost" onClick={onReset}>Reset Draft</button>
    </section>
  )
}

export function DraftCompositionPanel({ slotRoles, draft, championMap, activeSlot, onSelectSlot, onClearSlot }) {
  return (
    <div className="draft-zone-card shared-panel">
      <div className="draft-zone-title shared-panel-title">Your Composition</div>
      <div className="draft-slots-grid">
        {slotRoles.map((role, index) => {
          const champion = draft[index] ? championMap[draft[index]] : null
          return (
            <button
              key={role}
              type="button"
              className={`draft-slot-card ${champion ? 'filled' : ''} ${activeSlot === index ? 'active' : ''}`}
              onClick={() => onSelectSlot(index)}
            >
              {champion ? (
                <>
                  <img className="draft-slot-image" src={champion.splash} alt={champion.name} />
                  <div className="draft-slot-overlay" />
                  <div className="draft-slot-class">{champion.class}</div>
                  <div className="draft-slot-name">{champion.name}</div>
                  <div className="draft-slot-role">{role}</div>
                  <button
                    type="button"
                    className="draft-slot-remove"
                    onClick={(event) => {
                      event.stopPropagation()
                      onClearSlot(index)
                    }}
                  >
                    ×
                  </button>
                </>
              ) : (
                <>
                  <span className="draft-slot-empty">+</span>
                  <span className="draft-slot-role">{role}</span>
                </>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DraftFilterRow({ label, options, value, onChange }) {
  return (
    <div className="draft-filter-row">
      <span className="draft-filter-label">{label}</span>
      {options.map(([optionValue, optionLabel]) => (
        <button
          key={optionValue}
          type="button"
          className={`draft-filter-btn shared-button-ghost ${value === optionValue ? 'active' : ''}`}
          onClick={() => onChange(optionValue)}
        >
          {optionLabel}
        </button>
      ))}
    </div>
  )
}

export function DraftPickerPanel({
  filterRole,
  onFilterRole,
  filterType,
  onFilterType,
  filterClass,
  onFilterClass,
  searchTerm,
  onSearchTerm,
  loading,
  loadError,
  filteredChampions,
  onSelectChampion,
}) {
  return (
    <div className="draft-picker-card shared-panel">
      <DraftFilterRow label="Role" options={roleOptions} value={filterRole} onChange={onFilterRole} />
      <DraftFilterRow label="Range" options={rangeOptions} value={filterType} onChange={onFilterType} />
      <DraftFilterRow
        label="Class"
        options={classOptions.map((value) => [value, value])}
        value={filterClass}
        onChange={onFilterClass}
      />

      <div className="draft-search-wrap">
        <input
          type="text"
          placeholder="Search champion..."
          value={searchTerm}
          onChange={(event) => onSearchTerm(event.target.value)}
        />
      </div>

      {loading ? <div className="draft-empty-block">Loading champion roster...</div> : null}
      {loadError ? <div className="draft-empty-block">{loadError}</div> : null}

      {!loading && !loadError ? (
        <div className="draft-champion-grid">
          {filteredChampions.map((champion) => (
            <button key={champion.id} type="button" className="draft-champion-card" onClick={() => onSelectChampion(champion.id)}>
              <img src={champion.image} alt={champion.name} loading="lazy" />
              <div className="draft-champion-meta">
                <div className="draft-champion-name">{champion.name}</div>
                <div className="draft-champion-subline">
                  <span>{champion.lane}</span>
                  <span>{champion.class}</span>
                  <span>{champion.type}</span>
                </div>
              </div>
            </button>
          ))}
          {!filteredChampions.length ? (
            <div className="draft-empty-block">No champions match these filters right now.</div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function DraftAnalysisCard({ title, children }) {
  return (
    <div className="draft-analysis-card shared-panel">
      <div className="draft-section-title shared-panel-title">{title}</div>
      {children}
    </div>
  )
}

export function DraftAnalysisSidebar({
  selectedCount,
  analysis,
  valleyImage,
  runeterraMapImage,
  shareStatus,
  savedSnapshot,
  onSaveDraft,
  onShareDraft,
  onExportPdf,
}) {
  return (
    <aside className="draft-right-panel">
      <div className="draft-analysis-header shared-heading-split shared-panel-title">
        <span>Live Analysis</span>
        <span className="draft-count-badge shared-count-badge">{selectedCount} / 5 selected</span>
      </div>

      <div className="draft-score-card shared-panel">
        <div className="draft-score-backdrop">
          <img src={valleyImage} alt="" aria-hidden="true" />
        </div>
        <div className="draft-score-ring">
          <span className="draft-score-number">{analysis ? analysis.score : '-'}</span>
          <span className="draft-score-label">Synergy</span>
        </div>
        <div className="draft-score-grade">{analysis ? analysis.grade : 'Select Champions'}</div>
        <div className="draft-score-sub">{analysis ? analysis.summary : 'Pick champions to begin evaluating the composition.'}</div>
      </div>

      <div className="draft-side-visual-card shared-panel">
        <img src={runeterraMapImage} alt="Runeterra map" />
        <div className="draft-side-visual-overlay" />
        <div className="draft-side-visual-copy">
          <span>Macro View</span>
          <strong>Shape the Rift plan before the fight starts</strong>
        </div>
      </div>

      <DraftAnalysisCard title="Synergy Combos">
        {analysis?.combos?.length ? (
          <div className="draft-combo-list">
            {analysis.combos.map((combo) => (
              <div key={combo.pair} className="draft-combo-item">
                <div className="draft-combo-head">
                  <strong>{combo.names.join(' + ')}</strong>
                  <span>{combo.score}</span>
                </div>
                <p>{combo.reason}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="draft-empty-block">No specific combos yet. Add more champions to see links.</div>
        )}
      </DraftAnalysisCard>

      <DraftAnalysisCard title="Damage Distribution">
        {analysis ? (
          <div className="draft-damage-stack">
            <div className="draft-damage-bar">
              <span style={{ width: `${analysis.damage.phys}%` }} className="phys" />
              <span style={{ width: `${analysis.damage.magic}%` }} className="magic" />
              <span style={{ width: `${analysis.damage.true}%` }} className="true" />
            </div>
            <div className="draft-damage-legend">
              <div>Physical <strong>{analysis.damage.phys}%</strong></div>
              <div>Magic <strong>{analysis.damage.magic}%</strong></div>
              <div>True <strong>{analysis.damage.true}%</strong></div>
            </div>
          </div>
        ) : (
          <div className="draft-empty-block">Add champions to see the damage mix.</div>
        )}
      </DraftAnalysisCard>

      <DraftAnalysisCard title="Team Ratings">
        {analysis ? (
          <div className="draft-rating-list">
            {Object.entries(analysis.ratings).map(([key, value]) => (
              <div key={key} className="draft-rating-row">
                <span>{key}</span>
                <div className="draft-rating-bar">
                  <div style={{ width: `${value * 10}%` }} />
                </div>
                <strong>{value}/10</strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="draft-empty-block">Team ratings will appear once the draft starts taking shape.</div>
        )}
      </DraftAnalysisCard>

      <DraftAnalysisCard title="Strengths & Weaknesses">
        {analysis?.warnings?.length ? (
          <div className="draft-warning-list">
            {analysis.warnings.map((warning) => (
              <div key={warning.title} className={`draft-warning-item ${warning.type}`}>
                <div className="draft-warning-head">
                  <span>{warning.icon}</span>
                  <strong>{warning.title}</strong>
                </div>
                <p>{warning.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="draft-empty-block">Select champions to see draft strengths and risks.</div>
        )}
      </DraftAnalysisCard>

      <DraftAnalysisCard title="Save & Share Draft">
        <div className="draft-share-actions">
          <button type="button" className="draft-share-btn shared-button-ghost" onClick={onSaveDraft} disabled={!analysis}>Save Draft</button>
          <button type="button" className="draft-share-btn shared-button-ghost primary" onClick={onShareDraft} disabled={!analysis}>Copy Summary</button>
          <button type="button" className="draft-share-btn draft-share-btn-accent shared-button-ghost" onClick={onExportPdf} disabled={!analysis}>Export PDF</button>
        </div>
        <div className="draft-share-status">{shareStatus}</div>

        {savedSnapshot ? (
          <div className="draft-share-preview">
            <div className="draft-share-preview-title">Last Saved Draft</div>
            <div className="draft-share-preview-line">{savedSnapshot.grade} - {savedSnapshot.score} Synergy</div>
            <div className="draft-share-preview-line">{savedSnapshot.champions.map((champion) => champion.name).join(', ')}</div>
            <div className="draft-share-preview-line">{savedSnapshot.summary}</div>
          </div>
        ) : null}
      </DraftAnalysisCard>
    </aside>
  )
}
