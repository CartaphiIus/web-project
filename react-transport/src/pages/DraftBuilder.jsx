import { useEffect, useMemo, useState } from 'react'
import './DraftBuilder.css'
import {
  DraftAnalysisSidebar,
  DraftCompositionPanel,
  DraftHero,
  DraftPickerPanel,
} from '../components/DraftBuilderSections.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import {
  buildDraftShareText,
  buildDraftSnapshot,
  fetchChampionPool,
  formatDraftTimestamp,
  getDraftStorageKey,
} from '../utils/draftAnalysis.js'
import valleyImage from '../assets/images/vadi.jpg'
import runeterraMapImage from '../assets/images/Runeterra Map.png'

const slotRoles = ['Top', 'Jungle', 'Middle', 'Bottom', 'Support']

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

async function safeLoadImage(src) {
  try {
    return await loadImage(src)
  } catch (error) {
    console.warn(`Image could not be loaded for PDF export: ${src}`, error)
    return null
  }
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}

function fillRoundedRect(ctx, x, y, width, height, radius, fillStyle, strokeStyle = '') {
  roundedRect(ctx, x, y, width, height, radius)
  ctx.fillStyle = fillStyle
  ctx.fill()
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle
    ctx.stroke()
  }
}

function wrapText(ctx, text, maxWidth) {
  const words = String(text || '').split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word
    if (ctx.measureText(next).width <= maxWidth) {
      current = next
    } else {
      if (current) lines.push(current)
      current = word
    }
  })

  if (current) lines.push(current)
  return lines
}

function blobToUint8Array(blob) {
  return blob.arrayBuffer().then((buffer) => new Uint8Array(buffer))
}

function concatUint8Arrays(chunks) {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const combined = new Uint8Array(totalLength)
  let offset = 0

  chunks.forEach((chunk) => {
    combined.set(chunk, offset)
    offset += chunk.length
  })

  return combined
}

function getInitialSavedDraftState() {
  const fallback = {
    snapshot: null,
    status: 'Build a draft to generate a saved summary.',
  }

  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = localStorage.getItem(getDraftStorageKey())
    if (!raw) return fallback

    const snapshot = JSON.parse(raw)
    if (!snapshot?.champions?.length) return fallback

    return {
      snapshot,
      status: 'Loaded your last saved draft summary.',
    }
  } catch (error) {
    console.warn('Saved draft preview could not be restored.', error)
    return fallback
  }
}

function downloadBlob(blob, filename) {
  if (typeof window !== 'undefined' && typeof window.navigator?.msSaveOrOpenBlob === 'function') {
    window.navigator.msSaveOrOpenBlob(blob, filename)
    return
  }

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}

async function buildDraftReportCanvas(snapshot) {
  const canvas = document.createElement('canvas')
  canvas.width = 1100
  canvas.height = 1556
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas context is not available on this device.')
  }

  const [backgroundImage, mapImage, ...championImages] = await Promise.all([
    safeLoadImage(valleyImage),
    safeLoadImage(runeterraMapImage),
    ...snapshot.champions.map((champion) => safeLoadImage(champion.splash)),
  ])

  if (backgroundImage) {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
  } else {
    const baseGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    baseGradient.addColorStop(0, '#10233e')
    baseGradient.addColorStop(1, '#07101f')
    ctx.fillStyle = baseGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const overlayGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  overlayGradient.addColorStop(0, 'rgba(7,16,31,0.70)')
  overlayGradient.addColorStop(1, 'rgba(7,16,31,0.95)')
  ctx.fillStyle = overlayGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (mapImage) {
    ctx.save()
    ctx.globalAlpha = 0.08
    ctx.drawImage(mapImage, 590, 40, 460, 460)
    ctx.restore()
  }

  const gold = '#c8aa6e'
  const goldLight = '#f0d98b'
  const text = '#f0e6d2'
  const textDim = 'rgba(240,230,210,0.72)'
  const panelFill = 'rgba(12,26,51,0.82)'
  const panelStroke = 'rgba(200,170,110,0.18)'

  fillRoundedRect(ctx, 42, 42, canvas.width - 84, canvas.height - 84, 28, 'rgba(8,17,34,0.78)', 'rgba(200,170,110,0.28)')

  ctx.fillStyle = gold
  ctx.font = '700 20px Arial'
  ctx.fillText('DRAFT BUILDER REPORT', 88, 110)

  ctx.fillStyle = goldLight
  ctx.font = '700 44px Georgia'
  ctx.fillText(`${snapshot.grade} - ${snapshot.score} Synergy`, 88, 168)

  ctx.fillStyle = textDim
  ctx.font = '26px Arial'
  wrapText(ctx, snapshot.summary, 680).slice(0, 3).forEach((line, index) => {
    ctx.fillText(line, 88, 216 + index * 32)
  })

  ctx.textAlign = 'right'
  ctx.fillStyle = textDim
  ctx.font = '22px Arial'
  ctx.fillText(`Saved ${formatDraftTimestamp(snapshot.savedAt)}`, canvas.width - 88, 122)
  ctx.fillText(snapshot.champions.map((champion) => champion.name).join(', '), canvas.width - 88, 160)
  ctx.textAlign = 'left'

  fillRoundedRect(ctx, 72, 292, canvas.width - 144, 332, 26, panelFill, panelStroke)
  ctx.fillStyle = gold
  ctx.font = '700 22px Arial'
  ctx.fillText('YOUR COMPOSITION', 102, 334)

  const cardWidth = 178
  const cardGap = 14
  const cardY = 364
  const cardHeight = 220
  championImages.forEach((image, index) => {
    const cardX = 102 + index * (cardWidth + cardGap)
    if (image) {
      ctx.save()
      roundedRect(ctx, cardX, cardY, cardWidth, cardHeight, 18)
      ctx.clip()
      ctx.drawImage(image, cardX, cardY, cardWidth, cardHeight)
      const cardGradient = ctx.createLinearGradient(0, cardY, 0, cardY + cardHeight)
      cardGradient.addColorStop(0, 'rgba(7,16,31,0.05)')
      cardGradient.addColorStop(1, 'rgba(7,16,31,0.92)')
      ctx.fillStyle = cardGradient
      ctx.fillRect(cardX, cardY, cardWidth, cardHeight)
      ctx.restore()
    } else {
      const fallbackGradient = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardHeight)
      fallbackGradient.addColorStop(0, '#193454')
      fallbackGradient.addColorStop(1, '#0a1628')
      fillRoundedRect(ctx, cardX, cardY, cardWidth, cardHeight, 18, fallbackGradient)
    }

    roundedRect(ctx, cardX, cardY, cardWidth, cardHeight, 18)
    ctx.strokeStyle = 'rgba(200,170,110,0.32)'
    ctx.stroke()

    ctx.fillStyle = gold
    ctx.font = '700 14px Arial'
    ctx.fillText(snapshot.champions[index].lane.toUpperCase(), cardX + 14, cardY + 26)
    ctx.fillStyle = goldLight
    ctx.font = '700 22px Georgia'
    ctx.fillText(snapshot.champions[index].name, cardX + 14, cardY + 184)
    ctx.fillStyle = textDim
    ctx.font = '16px Arial'
    ctx.fillText(`${snapshot.champions[index].class} / ${snapshot.champions[index].type}`, cardX + 14, cardY + 206)
  })

  fillRoundedRect(ctx, 72, 654, 420, 238, 24, panelFill, panelStroke)
  ctx.fillStyle = gold
  ctx.font = '700 22px Arial'
  ctx.fillText('DAMAGE PROFILE', 102, 696)

  fillRoundedRect(ctx, 102, 730, 360, 26, 999, 'rgba(255,255,255,0.08)')
  const physWidth = 360 * (snapshot.damage.phys / 100)
  const magicWidth = 360 * (snapshot.damage.magic / 100)
  const trueWidth = Math.max(360 - physWidth - magicWidth, 0)
  ctx.fillStyle = '#e05050'
  fillRoundedRect(ctx, 102, 730, physWidth, 26, 999, '#e05050')
  ctx.fillStyle = '#4a9eff'
  fillRoundedRect(ctx, 102 + physWidth, 730, magicWidth, 26, 999, '#4a9eff')
  ctx.fillStyle = gold
  fillRoundedRect(ctx, 102 + physWidth + magicWidth, 730, trueWidth, 26, 999, gold)

  ctx.fillStyle = text
  ctx.font = '22px Arial'
  ctx.fillText(`Physical ${snapshot.damage.phys}%`, 102, 800)
  ctx.fillText(`Magic ${snapshot.damage.magic}%`, 102, 836)
  ctx.fillText(`True ${snapshot.damage.true}%`, 102, 872)

  fillRoundedRect(ctx, 520, 654, 508, 238, 24, panelFill, panelStroke)
  ctx.fillStyle = gold
  ctx.font = '700 22px Arial'
  ctx.fillText('TEAM RATINGS', 550, 696)

  Object.entries(snapshot.ratings).forEach(([key, value], index) => {
    const y = 744 + index * 28
    ctx.fillStyle = textDim
    ctx.font = '18px Arial'
    ctx.fillText(key, 550, y)
    fillRoundedRect(ctx, 690, y - 16, 220, 12, 999, 'rgba(255,255,255,0.08)')
    fillRoundedRect(ctx, 690, y - 16, 220 * (value / 10), 12, 999, `rgba(200,170,110,${0.4 + value / 20})`)
    ctx.fillStyle = goldLight
    ctx.font = '700 18px Arial'
    ctx.fillText(`${value}/10`, 926, y)
  })

  fillRoundedRect(ctx, 72, 924, 452, 560, 24, panelFill, panelStroke)
  ctx.fillStyle = gold
  ctx.font = '700 22px Arial'
  ctx.fillText('SYNERGY COMBOS', 102, 966)

  if (snapshot.combos.length) {
    snapshot.combos.forEach((combo, index) => {
      const blockY = 1002 + index * 100
      fillRoundedRect(ctx, 102, blockY, 392, 82, 18, 'rgba(7,16,31,0.58)', 'rgba(200,170,110,0.12)')
      ctx.fillStyle = goldLight
      ctx.font = '700 18px Georgia'
      ctx.fillText(`${combo.names.join(' + ')}  (+${combo.score})`, 122, blockY + 30)
      ctx.fillStyle = textDim
      ctx.font = '16px Arial'
      wrapText(ctx, combo.reason, 352).slice(0, 2).forEach((line, lineIndex) => {
        ctx.fillText(line, 122, blockY + 58 + lineIndex * 22)
      })
    })
  } else {
    ctx.fillStyle = textDim
    ctx.font = '20px Arial'
    ctx.fillText('No standout combos detected yet.', 102, 1014)
  }

  fillRoundedRect(ctx, 552, 924, 476, 560, 24, panelFill, panelStroke)
  ctx.fillStyle = gold
  ctx.font = '700 22px Arial'
  ctx.fillText('STRENGTHS AND WEAKNESSES', 582, 966)

  if (snapshot.warnings.length) {
    snapshot.warnings.forEach((warning, index) => {
      const blockY = 1002 + index * 110
      const accent = warning.type === 'crit' ? '#e05050' : warning.type === 'ok' ? '#3dba6a' : '#e88a2e'
      fillRoundedRect(ctx, 582, blockY, 396, 90, 18, 'rgba(7,16,31,0.58)', accent)
      ctx.fillStyle = goldLight
      ctx.font = '700 18px Georgia'
      ctx.fillText(`${warning.title} [${warning.type.toUpperCase()}]`, 602, blockY + 30)
      ctx.fillStyle = textDim
      ctx.font = '16px Arial'
      wrapText(ctx, warning.desc, 356).slice(0, 2).forEach((line, lineIndex) => {
        ctx.fillText(line, 602, blockY + 58 + lineIndex * 20)
      })
    })
  } else {
    ctx.fillStyle = textDim
    ctx.font = '20px Arial'
    ctx.fillText('No warnings generated yet.', 582, 1014)
  }

  ctx.fillStyle = 'rgba(240,230,210,0.48)'
  ctx.font = '14px Arial'
  buildDraftShareText(snapshot).split('\n').forEach((line, index) => {
    ctx.fillText(line, 88, 1490 + index * 18)
  })

  return canvas
}

async function canvasToJpegBlob(canvas) {
  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.9)
  })

  if (blob) {
    return blob
  }

  const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
  const response = await fetch(dataUrl)
  return response.blob()
}

async function buildDraftPdfBlob(snapshot) {
  const canvas = await buildDraftReportCanvas(snapshot)
  const jpegBlob = await canvasToJpegBlob(canvas)
  const jpegBytes = await blobToUint8Array(jpegBlob)

  const imageHeight = 842
  const imageWidth = 595
  const encoder = new TextEncoder()

  const objects = []
  const addObject = (prefixBytes, suffixBytes = new Uint8Array(0), rawBytes = new Uint8Array(0)) => {
    objects.push({ prefixBytes, rawBytes, suffixBytes })
    return objects.length
  }

  const catalogId = addObject(encoder.encode('<< /Type /Catalog /Pages 2 0 R >>\n'))
  const pagesId = addObject(encoder.encode('<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n'))
  const pageId = addObject(
    encoder.encode('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\n'),
  )
  const imagePrefix = encoder.encode(
    `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
  )
  const imageSuffix = encoder.encode('\nendstream\n')
  const imageId = addObject(imagePrefix, imageSuffix, jpegBytes)
  const contentStream = encoder.encode(`q\n${imageWidth} 0 0 ${imageHeight} 0 0 cm\n/Im0 Do\nQ\n`)
  const contentId = addObject(
    encoder.encode(`<< /Length ${contentStream.length} >>\nstream\n`),
    encoder.encode('endstream\n'),
    contentStream,
  )

  const refs = [catalogId, pagesId, pageId, imageId, contentId]
  void refs

  let offset = 0
  const parts = [encoder.encode('%PDF-1.4\n')]
  offset += parts[0].length
  const offsets = [0]

  objects.forEach((object, index) => {
    offsets.push(offset)
    const objectHeader = encoder.encode(`${index + 1} 0 obj\n`)
    const objectFooter = encoder.encode('endobj\n')
    parts.push(objectHeader, object.prefixBytes, object.rawBytes, object.suffixBytes, objectFooter)
    offset += objectHeader.length + object.prefixBytes.length + object.rawBytes.length + object.suffixBytes.length + objectFooter.length
  })

  const xrefOffset = offset
  const xrefHeader = encoder.encode(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`)
  parts.push(xrefHeader)
  offset += xrefHeader.length

  for (let index = 1; index < offsets.length; index += 1) {
    const row = encoder.encode(`${String(offsets[index]).padStart(10, '0')} 00000 n \n`)
    parts.push(row)
    offset += row.length
  }

  const trailer = encoder.encode(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`)
  parts.push(trailer)

  return new Blob([concatUint8Arrays(parts)], { type: 'application/pdf' })
}

function DraftBuilder() {
  const [championPool, setChampionPool] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [draft, setDraft] = useState([null, null, null, null, null])
  const [activeSlot, setActiveSlot] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterClass, setFilterClass] = useState('all')
  const [savedDraftState, setSavedDraftState] = useState(getInitialSavedDraftState)

  useEffect(() => {
    let isMounted = true

    async function loadChampions() {
      try {
        setLoading(true)
        const champions = await fetchChampionPool()
        if (!isMounted) return
        setChampionPool(champions)
      } catch (error) {
        if (!isMounted) return
        console.warn('Draft builder data could not be loaded.', error)
        setLoadError('Champion data could not be loaded right now.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadChampions()
    return () => {
      isMounted = false
    }
  }, [])

  const championMap = useMemo(
    () => Object.fromEntries(championPool.map((champion) => [champion.id, champion])),
    [championPool],
  )

  const selectedChampions = useMemo(
    () => draft.map((id) => (id ? championMap[id] : null)).filter(Boolean),
    [championMap, draft],
  )

  const analysis = useMemo(() => {
    if (!selectedChampions.length) return null
    return buildDraftSnapshot(selectedChampions, draft.filter(Boolean))
  }, [draft, selectedChampions])

  const filteredChampions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return championPool.filter((champion) => {
      const roleOk = filterRole === 'all' || champion.roles.includes(filterRole)
      const typeOk = filterType === 'all' || champion.type === filterType
      const classOk = filterClass === 'all' || champion.class === filterClass
      const searchOk = !normalizedSearch || champion.name.toLowerCase().includes(normalizedSearch)
      const notAlreadySelected = !draft.includes(champion.id)
      return roleOk && typeOk && classOk && searchOk && notAlreadySelected
    })
  }, [championPool, draft, filterClass, filterRole, filterType, searchTerm])

  function setChampionInDraft(championId) {
    setDraft((current) => {
      if (current.includes(championId)) return current
      const next = [...current]
      const slotIndex = activeSlot ?? next.findIndex((entry) => entry === null)
      if (slotIndex === -1) return current
      next[slotIndex] = championId
      return next
    })
    setActiveSlot(null)
  }

  function clearSlot(slotIndex) {
    setDraft((current) => current.map((entry, index) => (index === slotIndex ? null : entry)))
  }

  function resetDraft() {
    setDraft([null, null, null, null, null])
    setActiveSlot(null)
    setSavedDraftState((current) => ({
      ...current,
      status: 'Draft reset. Build a fresh composition to analyze.',
    }))
  }

  function saveDraft() {
    if (!analysis) return
    localStorage.setItem(getDraftStorageKey(), JSON.stringify(analysis))
    setSavedDraftState({
      snapshot: analysis,
      status: 'Draft saved locally. You can come back and continue later.',
    })
  }

  async function shareDraft() {
    if (!analysis) return

    const text = buildDraftShareText(analysis)

    try {
      await navigator.clipboard.writeText(text)
      setSavedDraftState({
        snapshot: analysis,
        status: 'Draft summary copied to clipboard.',
      })
    } catch (error) {
      console.warn('Draft summary could not be copied.', error)
      setSavedDraftState((current) => ({
        ...current,
        status: 'Clipboard copy failed on this device.',
      }))
    }
  }

  async function exportDraftPdf() {
    if (!analysis) return

    try {
      setSavedDraftState((current) => ({
        ...current,
        status: 'Preparing visual PDF export...',
      }))
      const pdfBlob = await buildDraftPdfBlob(analysis)
      const safeNames = analysis.champions
        .map((champion) => champion.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
        .join('_') || 'draft'

      downloadBlob(pdfBlob, `draft-report-${safeNames}.pdf`)
      setSavedDraftState((current) => ({
        ...current,
        status: 'PDF export started and download request was sent.',
      }))
    } catch (error) {
      console.warn('Visual PDF export failed.', error)
      setSavedDraftState((current) => ({
        ...current,
        status: 'PDF export failed on this device.',
      }))
    }
  }

  return (
    <div className="draft-builder-page">
      <SiteHeader compact />

      <main className="draft-main page-shell-wide">
        <DraftHero onReset={resetDraft} />

        <div className="draft-layout">
          <section className="draft-left-panel">
            <DraftCompositionPanel
              slotRoles={slotRoles}
              draft={draft}
              championMap={championMap}
              activeSlot={activeSlot}
              onSelectSlot={setActiveSlot}
              onClearSlot={clearSlot}
            />

            <DraftPickerPanel
              filterRole={filterRole}
              onFilterRole={setFilterRole}
              filterType={filterType}
              onFilterType={setFilterType}
              filterClass={filterClass}
              onFilterClass={setFilterClass}
              searchTerm={searchTerm}
              onSearchTerm={setSearchTerm}
              loading={loading}
              loadError={loadError}
              filteredChampions={filteredChampions}
              onSelectChampion={setChampionInDraft}
            />
          </section>

          <DraftAnalysisSidebar
            selectedCount={selectedChampions.length}
            analysis={analysis}
            valleyImage={valleyImage}
            runeterraMapImage={runeterraMapImage}
            shareStatus={savedDraftState.status}
            savedSnapshot={savedDraftState.snapshot}
            onSaveDraft={saveDraft}
            onShareDraft={shareDraft}
            onExportPdf={exportDraftPdf}
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default DraftBuilder
