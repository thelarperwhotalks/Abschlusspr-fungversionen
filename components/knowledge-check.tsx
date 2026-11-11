'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Trophy, X } from 'lucide-react'
import { quizQuestions } from '@/lib/trainer-data'

const knowledgeCheckQuestions = quizQuestions.slice(0, 12)
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function KnowledgeCheck() {
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [bestScore, setBestScore] = useState(0)
  const current = knowledgeCheckQuestions[index]

  useEffect(() => {
    try { setBestScore(Number(localStorage.getItem('verdun-quiz-best') ?? 0)) } catch { setBestScore(0) }
  }, [])

  useEffect(() => {
    if (!finished) return
    try {
      const best = Math.max(Number(localStorage.getItem('verdun-quiz-best') ?? 0), score)
      localStorage.setItem('verdun-quiz-best', String(best))
      setBestScore(best)
    } catch { /* Quiz results remain available for this session. */ }
  }, [finished, score])

  const select = useCallback((answer: number) => {
    if (choice !== null) return
    setChoice(answer)
    if (answer === current.answer) setScore((value) => value + 1)
    else {
      try {
        const old = JSON.parse(localStorage.getItem('verdun-wrong-pool') ?? '[]') as number[]
        localStorage.setItem('verdun-wrong-pool', JSON.stringify(Array.from(new Set([...old, index]))))
      } catch { /* The quiz still works without saved wrong answers. */ }
    }
  }, [choice, current, index])

  const advance = useCallback(() => {
    if (choice === null) return
    if (index === knowledgeCheckQuestions.length - 1) setFinished(true)
    else { setIndex((value) => value + 1); setChoice(null) }
  }, [choice, index])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.isComposing || event.keyCode === 229 || finished) return
      if (document.activeElement instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return
      if (/^[1-4]$/.test(event.key) && choice === null) select(Number(event.key) - 1)
      if (event.key === 'Enter' && choice !== null) advance()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance, choice, finished, select])

  const restart = () => {
    setIndex(0); setChoice(null); setScore(0); setFinished(false)
    document.querySelector('#fragen')?.scrollIntoView({ block: 'start' })
  }

  if (finished) return <Card className="result-card" role="status"><CardHeader className="result-card-header"><Trophy size={34}/><p className="section-kicker">WISSENS-CHECK ABGESCHLOSSEN</p><h2>{score} von {knowledgeCheckQuestions.length} richtig</h2></CardHeader><CardContent className="result-card-content"><p>Dein bester Durchgang: {bestScore} von {knowledgeCheckQuestions.length}. Du kannst erneut starten oder im Wissenstrainer gezielt üben.</p><Button className="button button-fill" onClick={restart} size="lg"><RotateCcw data-icon="inline-start"/>Erneut versuchen</Button></CardContent></Card>

  return <Card className="quiz-card" aria-labelledby="quiz-question">
    <CardHeader className="quiz-card-header"><div className="quiz-progress"><span aria-current="step">Frage {index + 1} von {knowledgeCheckQuestions.length}</span><span>{score} richtig</span></div>
    <div className="progress-bar" role="progressbar" aria-label="Quizfortschritt" aria-valuemin={0} aria-valuemax={knowledgeCheckQuestions.length} aria-valuenow={index + 1}><i style={{width:`${((index + 1) / knowledgeCheckQuestions.length) * 100}%`}}/></div>
    <p className="section-kicker">{current.topic.toLocaleUpperCase('de')}</p><h2 id="quiz-question" aria-live="polite">{current.question}</h2></CardHeader>
    <CardContent className="quiz-card-content"><div className="answer-list" role="group" aria-label="Antwortmöglichkeiten">{current.options.map((option, optionIndex) => <button key={option} className={choice === null ? 'answer-option' : optionIndex === current.answer ? 'answer-option is-correct' : choice === optionIndex ? 'answer-option is-wrong' : 'answer-option'} disabled={choice !== null} aria-pressed={choice === optionIndex} onClick={() => select(optionIndex)}><span className="answer-key">{optionIndex + 1}</span>{option}{choice !== null && optionIndex === current.answer && <Check size={18}/ >}{choice === optionIndex && choice !== current.answer && <X size={18}/>}</button>)}</div>
    {choice !== null && <div className={choice === current.answer ? 'feedback-box correct' : 'feedback-box wrong'} role="status"><b>{choice === current.answer ? 'Richtig.' : 'Noch nicht ganz.'}</b><p>{current.explanation}</p><Button className="button button-fill" onClick={advance} size="lg">{index === knowledgeCheckQuestions.length - 1 ? 'Ergebnis ansehen' : 'Nächste Frage'}<ArrowRight data-icon="inline-end"/></Button></div>}</CardContent>
  </Card>
}
