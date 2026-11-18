'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

type Person = { id: string; name: string; years: string; detail?: string }
type Family = {
  id: string
  tab: string
  title: string
  kicker: string
  summary: string
  note: string
  generations: { label: string; people: Person[] }[]
  relationships: [string, string][]
}

const families: Family[] = [
  {
    id: 'hohenzollern',
    tab: 'Wilhelm II.',
    kicker: 'Haus Hohenzollern',
    title: 'Wilhelm II. und seine Familie',
    summary: 'Verfolge die Linie von den Großeltern über Kaiser Friedrich III. bis zu Wilhelm II. und seinen sieben Kindern.',
    note: 'Wilhelm II. hatte mit Auguste Viktoria sieben Kinder. Seine zweite Ehe mit Hermine Reuss blieb kinderlos.',
    generations: [
      { label: 'Großeltern', people: [
        { id: 'wilhelm-i', name: 'Wilhelm I.', years: '1797–1888' },
        { id: 'augusta', name: 'Augusta von Sachsen-Weimar-Eisenach', years: '1811–1890' },
        { id: 'albert', name: 'Albert von Sachsen-Coburg und Gotha', years: '1819–1861' },
        { id: 'victoria', name: 'Königin Victoria', years: '1819–1901' },
      ] },
      { label: 'Eltern', people: [
        { id: 'friedrich', name: 'Friedrich III.', years: '1831–1888' },
        { id: 'victoria-royal', name: 'Victoria, Princess Royal', years: '1840–1901' },
      ] },
      { label: 'Kaiser & Ehefrau', people: [
        { id: 'wilhelm-ii', name: 'Wilhelm II.', years: '1859–1941', detail: 'Deutscher Kaiser 1888–1918' },
        { id: 'auguste', name: 'Auguste Viktoria', years: '1858–1921', detail: 'Ehe ab 1881' },
      ] },
      { label: 'Kinder', people: [
        { id: 'kronprinz', name: 'Kronprinz Wilhelm', years: '1882–1951' },
        { id: 'eitel', name: 'Eitel Friedrich', years: '1883–1942' },
        { id: 'adalbert', name: 'Adalbert', years: '1884–1948' },
        { id: 'august', name: 'August Wilhelm', years: '1887–1949' },
        { id: 'oskar', name: 'Oskar', years: '1888–1958' },
        { id: 'joachim', name: 'Joachim', years: '1890–1920' },
        { id: 'viktoria-luise', name: 'Viktoria Luise', years: '1892–1980' },
      ] },
    ],
    relationships: [
      ['wilhelm-i', 'friedrich'], ['augusta', 'friedrich'], ['albert', 'victoria-royal'], ['victoria', 'victoria-royal'],
      ['friedrich', 'wilhelm-ii'], ['victoria-royal', 'wilhelm-ii'],
      ...['kronprinz', 'eitel', 'adalbert', 'august', 'oskar', 'joachim', 'viktoria-luise'].flatMap((id) => [['wilhelm-ii', id], ['auguste', id]] as [string, string][]),
    ],
  },
  {
    id: 'bismarck',
    tab: 'Otto von Bismarck',
    kicker: 'Familie von Bismarck',
    title: 'Otto von Bismarck und seine Familie',
    summary: 'Entdecke Bismarcks Herkunft, seine Ehe mit Johanna von Puttkamer und die drei gemeinsamen Kinder.',
    note: 'Die Übersicht zeigt die engste Familie und erhebt keinen Anspruch auf einen vollständigen genealogischen Stammbaum.',
    generations: [
      { label: 'Eltern', people: [
        { id: 'karl', name: 'Karl Wilhelm Ferdinand von Bismarck', years: '1771–1845' },
        { id: 'wilhelmine', name: 'Wilhelmine Luise Mencken', years: '1789–1839' },
      ] },
      { label: 'Otto & Ehefrau', people: [
        { id: 'otto', name: 'Otto von Bismarck', years: '1815–1898', detail: 'Reichskanzler 1871–1890' },
        { id: 'johanna', name: 'Johanna von Puttkamer', years: '1824–1894', detail: 'Ehe ab 1847' },
      ] },
      { label: 'Kinder', people: [
        { id: 'marie', name: 'Marie von Bismarck', years: '1848–1926' },
        { id: 'herbert', name: 'Herbert von Bismarck', years: '1849–1904', detail: 'Politiker und Diplomat' },
        { id: 'wilhelm-b', name: 'Wilhelm von Bismarck', years: '1852–1901' },
      ] },
    ],
    relationships: [
      ['karl', 'otto'], ['wilhelmine', 'otto'],
      ...['marie', 'herbert', 'wilhelm-b'].flatMap((id) => [['otto', id], ['johanna', id]] as [string, string][]),
    ],
  },
]

type Line = { id: string; path: string }

function FamilyChart({ family }: { family: Family }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef(new Map<string, HTMLElement>())
  const [revealed, setRevealed] = useState(false)
  const [lines, setLines] = useState<Line[]>([])

  const updateLines = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const bounds = viewport.getBoundingClientRect()
    const nextLines = family.relationships.flatMap(([parentId, childId], index) => {
      const parent = cardRefs.current.get(parentId)
      const child = cardRefs.current.get(childId)
      if (!parent || !child) return []
      const parentRect = parent.getBoundingClientRect()
      const childRect = child.getBoundingClientRect()
      const startX = parentRect.right - bounds.left + viewport.scrollLeft
      const startY = parentRect.top + parentRect.height / 2 - bounds.top + viewport.scrollTop
      const endX = childRect.left - bounds.left + viewport.scrollLeft
      const endY = childRect.top + childRect.height / 2 - bounds.top + viewport.scrollTop
      const bend = Math.max(28, (endX - startX) * 0.48)
      return [{ id: `${parentId}-${childId}-${index}`, path: `M ${startX} ${startY} C ${startX + bend} ${startY}, ${endX - bend} ${endY}, ${endX} ${endY}` }]
    })
    setLines(nextLines)
  }, [family])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    setRevealed(false)
    const frame = requestAnimationFrame(updateLines)
    const resizeObserver = new ResizeObserver(updateLines)
    resizeObserver.observe(viewport)
    viewport.querySelectorAll('.family-person').forEach((node) => resizeObserver.observe(node))
    const onScroll = () => updateLines()
    viewport.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      viewport.removeEventListener('scroll', onScroll)
    }
  }, [family, updateLines])

  useEffect(() => {
    const root = viewportRef.current
    if (!root) return
    if (!('IntersectionObserver' in window)) {
      setRevealed(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(root)
    return () => observer.disconnect()
  }, [family])

  const chartHeight = useMemo(() => Math.max(270, ...family.generations.map((generation) => generation.people.length * 104 + 44)), [family])

  return (
    <div className="family-tree-scroll" ref={viewportRef}>
      <div className={`family-tree-canvas${revealed ? ' is-revealed' : ''}`} style={{ minHeight: chartHeight }}>
        <svg className="family-tree-lines" aria-hidden="true" focusable="false">
          {lines.map((line, index) => <path key={line.id} d={line.path} pathLength="1" style={{ animationDelay: `${Math.min(index * 55, 700)}ms` }} />)}
        </svg>
        <div className="family-generations" style={{ gridTemplateColumns: `repeat(${family.generations.length}, minmax(190px, 1fr))` }}>
          {family.generations.map((generation, columnIndex) => (
            <section className="family-generation" key={generation.label} aria-label={generation.label}>
              <h3 className="family-generation-label"><span>{String(columnIndex + 1).padStart(2, '0')}</span>{generation.label}</h3>
              <div className="family-nodes">
                {generation.people.map((person, personIndex) => (
                  <article
                    className={`family-person${person.detail ? ' featured' : ''}`}
                    key={person.id}
                    ref={(node) => { if (node) cardRefs.current.set(person.id, node); else cardRefs.current.delete(person.id) }}
                    style={{ '--reveal-delay': `${columnIndex * 170 + personIndex * 90}ms` } as CSSProperties}
                  >
                    <span className="family-person-mark" aria-hidden="true" />
                    <strong>{person.name}</strong>
                    <span className="family-person-years">{person.years}</span>
                    {person.detail && <small>{person.detail}</small>}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FamilyTreeExplorer() {
  const [activeId, setActiveId] = useState(families[0].id)
  const activeIndex = families.findIndex((family) => family.id === activeId)

  useEffect(() => {
    const syncFamilyFromHash = () => {
      const requestedId = decodeURIComponent(window.location.hash.slice(1))
      if (families.some((item) => item.id === requestedId)) setActiveId(requestedId)
    }
    syncFamilyFromHash()
    window.addEventListener('hashchange', syncFamilyFromHash)
    return () => window.removeEventListener('hashchange', syncFamilyFromHash)
  }, [])
  const family = families[activeIndex]

  const selectTab = (index: number) => setActiveId(families[(index + families.length) % families.length].id)

  return (
    <section className="content-section family-explorer" aria-label="Stammbäume">
      <div className="family-explorer-heading">
        <div><p className="section-kicker">STAMMBAUM ERKUNDEN</p><h2>Wähle eine Familie</h2></div>
        <p>Die Verbindungslinien führen von Eltern zu Kindern. Scrolle weiter, um die Generationen nacheinander aufklappen zu sehen.</p>
      </div>
      <div className="family-tabs" role="tablist" aria-label="Familienstammbaum auswählen" onKeyDown={(event) => {
        if (event.key === 'ArrowRight') { event.preventDefault(); selectTab(activeIndex + 1); document.getElementById(families[(activeIndex + 1) % families.length].id)?.focus() }
        if (event.key === 'ArrowLeft') { event.preventDefault(); selectTab(activeIndex - 1); document.getElementById(families[(activeIndex + families.length - 1) % families.length].id)?.focus() }
      }}>
        {families.map((item, index) => (
          <button id={item.id} data-section-id={item.id} key={item.id} type="button" role="tab" aria-selected={activeId === item.id} aria-controls="family-tab-panel" tabIndex={activeId === item.id ? 0 : -1} onClick={() => setActiveId(item.id)}>
            <span className="family-tab-number">0{index + 1}</span>{item.tab}<span className="family-tab-arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      <div id="family-tab-panel" role="tabpanel" aria-labelledby={family.id} className="family-tab-panel">
        <div className="family-panel-copy"><p className="section-kicker">{family.kicker}</p><h3>{family.title}</h3><p>{family.summary}</p></div>
        <FamilyChart key={family.id} family={family} />
        <p className="family-note">{family.note}</p>
        <p className="family-scroll-hint">Auf kleinen Bildschirmen horizontal wischen, um alle Generationen zu sehen.</p>
      </div>
    </section>
  )
}
