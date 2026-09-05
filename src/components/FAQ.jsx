import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FAQ({ items }) {
	const [openId, setOpenId] = useState(null)
	return <div className="divide-y divide-line border-y border-line">{items.map((item, index) => { const { question, answer } = item; const itemId = `${item.id || questionKey(question)}-${index}`; const isOpen = openId === itemId; return <div key={itemId} className="py-1"><h3><button id={itemId} type="button" className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2" aria-expanded={isOpen} aria-controls={`${itemId}-answer`} onClick={() => setOpenId(isOpen ? null : itemId)}>{question}<ChevronDown size={20} className={`shrink-0 text-copper transition duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" /></button></h3><div id={`${itemId}-answer`} role="region" aria-labelledby={itemId} className={`grid transition-[grid-template-rows,opacity] duration-200 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="min-h-0 overflow-hidden"><p className="max-w-3xl pb-5 text-sm leading-6 text-muted">{answer}</p></div></div></div> })}</div>
}

function questionKey(question) {
	return question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}