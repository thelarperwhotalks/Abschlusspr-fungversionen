'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ArrowUp, BookOpen, BookMarked, ChevronDown, Compass, HelpCircle, Menu, Moon, Search, Sun, Trophy, X, Clock3, Home, FileText, type LucideIcon } from 'lucide-react'
import { glossary, quizQuestions, timeline } from '@/lib/trainer-data'

const pages: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Startseite', href: '/', icon: Home }, { label: 'Geschichte', href: '/geschichte', icon: BookOpen }, { label: 'Wissensspeicher', href: '/wissenstrainer', icon: BookMarked }, { label: 'Quellen', href: '/quellen', icon: FileText },
]
const sections: Record<string, { label: string; id: string; icon: LucideIcon }[]> = {
  '/': [{ label: 'Schnellzugriff', id: 'schnellzugriff', icon: Compass }, { label: 'Fakten', id: 'fakten', icon: Clock3 }],
  '/geschichte': [{ label: 'Fakten', id: 'fakten', icon: FileText }, { label: 'Zeitleiste', id: 'zeitleiste', icon: Clock3 }, { label: 'Verluste', id: 'verluste', icon: FileText }, { label: 'Chemische Waffen', id: 'gas', icon: Compass }, { label: 'Alltag', id: 'alltag', icon: Compass }, { label: 'Begriffe', id: 'begriffe', icon: BookMarked }, { label: 'Häufige Fragen', id: 'faq', icon: HelpCircle }],
  '/wissenstrainer': [{ label: 'Trainingsmodus', id: 'modi', icon: Trophy }],
  '/quellen': [{ label: 'Quellen', id: 'quellenliste', icon: BookMarked }, { label: 'Mitwirkende', id: 'credits', icon: FileText }],
  '/impressum': [{ label: 'Impressum', id: 'impressum', icon: FileText }],
}
const searchIndex = [
  ...pages.map(({ label, href }) => ({ title: label, detail: 'Seite öffnen', href })),
  ...timeline.map(([title, detail]) => ({ title, detail, href: `/geschichte#zeitleiste` })),
  ...glossary.map(([title, detail]) => ({ title, detail, href: `/geschichte#begriffe` })),
  ...quizQuestions.map(({ question, topic }) => ({ title: question, detail: `Wissenstrainer · ${topic}`, href: '/wissenstrainer#modi' })),
  ...['Granattrichter', 'Schützengraben', 'Ratten und Läuse', 'Artillerie', 'Mondlandschaft'].map((title) => ({ title, detail: 'Alltag in Verdun', href: '/geschichte#alltag' })),
  ...['Verluste und Opferzahlen', 'Tote, Verwundete und Vermisste', 'Französische Verluste', 'Deutsche Verluste'].map((title) => ({ title, detail: 'Verluste · Zahlen und Einordnung', href: '/geschichte#verluste' })),
  ...['Chemische Waffen bei Verdun', 'Giftgas', 'Phosgen', 'Grünkreuz', 'Blaukreuz', 'Senfgas'].map((title) => ({ title, detail: 'Chemische Waffen · Kampfstoffe und Einsatz', href: '/geschichte#gas' })),
  ...['Fort Douaumont', 'Fort Vaux', 'Voie Sacrée', 'Fleury-devant-Douaumont'].map((title) => ({ title, detail: 'Orte und Ereignisse', href: '/geschichte#zeitleiste' })),
  ...['Begriffe und Bedeutungen', 'Wissensspeicher'].map((title) => ({ title, detail: 'Wissensspeicher', href: '/wissenstrainer' })),
  ...['Was war die Voie Sacrée?', 'Wie lange dauerte die Schlacht?', 'Was geschah in Fort Douaumont?', 'Warum wurde Verdun angegriffen?', 'Wie war der Alltag im Schützengraben?'].map((title) => ({ title, detail: 'Häufige Fragen · Geschichte', href: '/geschichte#faq' })),
]
type Resume = { path: string; label: string; href: string; scrollY: number }

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [dark, setDark] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [topicsOpen, setTopicsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('')
  const [showTop, setShowTop] = useState(false)
  const pageSections = sections[pathname] ?? []
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('de')
    if (/^\d+$/.test(term)) return []
    return searchIndex.filter((item) => !term || `${item.title} ${item.detail}`.toLocaleLowerCase('de').includes(term)).slice(0, 24)
  }, [query])
  const resultGroups = useMemo(() => [...new Set(results.map((item) => item.href.split('#')[0]))].map((href) => ({ href, label: pages.find((page) => page.href === href)?.label ?? 'Geschichte', items: results.filter((item) => item.href.split('#')[0] === href).slice(0, 5) })).slice(0, 5), [results])

  useEffect(() => {
    let storedTheme: string | null = null
    try { storedTheme = localStorage.getItem('verdun-theme') } catch { /* Use the system preference when storage is unavailable. */ }
    const useDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDark(useDark)
    document.documentElement.dataset.theme = useDark ? 'dark' : 'light'
    const sectionNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-section-id], main section[id]'))
    const sectionObserver = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      const current = sectionNodes.filter((item) => item.getBoundingClientRect().top <= 170 && item.getBoundingClientRect().bottom > 150).at(-1)
      if (current) setActive(current.dataset.sectionId ?? current.id)
    }, { rootMargin: '-150px 0px -60% 0px', threshold: 0 })
    sectionNodes.forEach((node) => sectionObserver?.observe(node))
    let lastSavedAt = 0
    const updateScroll = () => {
      setShowTop(window.scrollY > 600)
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-section-id], main section[id]'))
      const current = nodes.filter((item) => item.getBoundingClientRect().top <= 170).at(-1)
      if (current) setActive(current.dataset.sectionId ?? current.id)
      if (pathname === '/') return
      const currentId = current?.dataset.sectionId ?? current?.id
      const currentLabel = pageSections.find((item) => item.id === currentId)?.label ?? pages.find((item) => item.href === pathname)?.label ?? 'Verdun 1916'
      const href = currentId ? `${pathname}#${currentId}` : pathname
      if (Date.now() - lastSavedAt < 500) return
      lastSavedAt = Date.now()
      const next: Resume = { path: pathname, label: currentLabel, href, scrollY: window.scrollY }
      try { localStorage.setItem('verdun-last-place', JSON.stringify(next)) } catch { /* Resume position is optional when storage is unavailable. */ }
    }
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
      if (event.key === 'Escape') { setSearchOpen(false); setMobileOpen(false); setTopicsOpen(false) }
    }
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    const restore = window.setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem('verdun-last-place') ?? 'null') as Resume | null
        if (saved?.path === pathname && saved.scrollY > 0) window.scrollTo(0, saved.scrollY)
      } catch { /* No prior position is fine. */ }
      updateScroll()
    }, 80)
    return () => { window.clearTimeout(restore); window.removeEventListener('scroll', updateScroll); window.removeEventListener('keydown', onKey); sectionObserver?.disconnect() }
  }, [pathname, pageSections])

  useEffect(() => { if (searchOpen) document.getElementById('site-search-input')?.focus() }, [searchOpen])
  useEffect(() => {
    let term = ''
    try { term = sessionStorage.getItem('verdun-search-term') ?? ''; sessionStorage.removeItem('verdun-search-term') } catch { return }
    if (!term || /^\d+$/.test(term)) return
    const timeout = window.setTimeout(() => {
      const walker = document.createTreeWalker(document.querySelector('main') ?? document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => node.parentElement?.closest('script,style,textarea,input,button,mark') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
      })
      const needle = term.toLocaleLowerCase('de')
      let node: Node | null
      while ((node = walker.nextNode())) {
        const value = node.textContent ?? ''
        const index = value.toLocaleLowerCase('de').indexOf(needle)
        if (node.nodeType !== Node.TEXT_NODE || index < 0 || !node.parentNode) continue
        const matched = (node as Text).splitText(index)
        matched.splitText(term.length)
        const mark = document.createElement('mark')
        mark.className = 'search-hit'
        mark.textContent = matched.textContent
        matched.parentNode?.replaceChild(mark, matched)
        mark.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' })
        break
      }
    }, 120)
    return () => window.clearTimeout(timeout)
  }, [pathname])
  const openSearchResult = () => {
    try { sessionStorage.setItem('verdun-search-term', query.trim()) } catch { /* Search navigation still works without highlighting. */ }
    setSearchOpen(false)
    setQuery('')
  }
  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try { localStorage.setItem('verdun-theme', next ? 'dark' : 'light') } catch { /* Theme preference is optional when storage is unavailable. */ }
  }
  const trapSearchFocus = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled])'))
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }

  return <div className="site-frame">
    <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Verdun 1916 – Startseite"><BookOpen size={20} strokeWidth={1.6} /><span>Verdun 1916</span><em>· Geschichte &amp; Erinnerung</em></Link>
      <nav className="desktop-nav" aria-label="Hauptnavigation">{pages.map(({ label, href }) => <Link key={href} href={href} className={pathname === href ? 'nav-active' : ''} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}</nav>
      <div className="topics-wrap"><button className="icon-button topics-toggle" aria-label="Seiten und Bereiche öffnen" aria-expanded={topicsOpen} onClick={() => { setTopicsOpen((value) => !value); setMobileOpen(false) }}><Compass size={17} /><span>Themen</span><ChevronDown size={13} /></button>{topicsOpen && <div className="topics-popover"><strong>Seiten</strong>{pages.map(({ label, href, icon: Icon }) => <Link href={href} key={href} onClick={() => setTopicsOpen(false)}><Icon size={16} />{label}</Link>)}<strong>Hier weiterlesen</strong>{Object.entries(sections).flatMap(([path, items]) => items.map(({ label, id, icon: Icon }) => <Link href={`${path}#${id}`} key={`${path}-${id}`} onClick={() => setTopicsOpen(false)}><Icon size={16} /><span>{label}<small>{pages.find((page) => page.href === path)?.label}</small></span></Link>))}</div>}</div>
      <button className="icon-button search-trigger" onClick={() => setSearchOpen(true)} aria-label="Website durchsuchen"><Search size={18} /><kbd>⌘K</kbd></button>
      <button className="icon-button" onClick={toggleTheme} aria-label={dark ? 'Helles Farbschema einschalten' : 'Dunkles Farbschema einschalten'}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
      <button className="icon-button mobile-menu-trigger" aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
    </header>
    <nav className={`mobile-nav${mobileOpen ? ' is-open' : ''}`} aria-label="Mobile Navigation" aria-hidden={!mobileOpen} inert={!mobileOpen ? true : undefined}>{pages.map(({ label, href, icon: Icon }) => <Link href={href} key={href} className={pathname === href ? 'nav-active' : ''} aria-current={pathname === href ? 'page' : undefined} onClick={() => setMobileOpen(false)}><Icon size={17} />{label}</Link>)}</nav>
    {pageSections.length > 0 && <nav className="section-rail" aria-label="Bereiche auf dieser Seite">{pageSections.map(({ label, id }) => <a href={`#${id}`} key={id} className={active === id ? 'current' : ''} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>}
    <motion.main key={pathname} id="main-content" className="site-main" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}>{children}</motion.main>
    <footer className="site-footer"><div className="footer-brand"><span>Verdun 1916 · Historischer Überblick</span><small>Ein sachliches Informationsangebot zur Schlacht um Verdun.</small><small>Redaktion und Gestaltung: Niklas Schaub, Nils Schwemm und Samuel Verstraeten</small></div><div className="footer-links"><Link href="/quellen">Quellen</Link><Link href="/impressum">Impressum und Mitwirkende</Link><Link href="/wissenstrainer">Wissensspeicher</Link></div><div className="footer-copy">© Niklas Schaub {new Date().getFullYear()}</div></footer>
    {showTop && <button className="back-top" aria-label="Nach oben" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} /></button>}
    {searchOpen && <div className="search-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false) }}><section className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title" onKeyDown={trapSearchFocus}><div className="search-heading"><h2 id="search-title">Website durchsuchen</h2><button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Suche schließen"><X size={18} /></button></div><label className="search-input-wrap"><Search size={17} /><input id="site-search-input" aria-label="Suche nach Begriffen, Ereignissen und Seiten" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Begriffe, Ereignisse, Seiten …" /><kbd>ESC</kbd></label><p className="sr-only" aria-live="polite">{query ? `${results.length} Suchergebnisse` : 'Suchbegriff eingeben'}</p><div className="search-results" aria-label="Suchergebnisse">{resultGroups.length ? resultGroups.map((group) => <div className="search-group" key={group.href} role="group" aria-label={group.label}><p className="search-group-title">{group.label}</p>{group.items.map((result, index) => <Link href={result.href} key={`${result.href}-${result.title}-${index}`} onClick={openSearchResult}><span><small>{result.detail}</small><b>{result.title}</b></span><span aria-hidden="true">→</span></Link>)}</div>) : <p className="empty-search">Keine Treffer. Versuche einen anderen Suchbegriff.</p>}</div><p className="search-hint">Mit Ctrl + K oder ⌘ + K jederzeit öffnen</p></section></div>}
  </div>
}
