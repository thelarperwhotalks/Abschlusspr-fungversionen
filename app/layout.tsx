import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteShell } from '@/components/site-shell'
import './globals.css'

export const metadata:Metadata={title:{default:'Verdun 1916 · Entdeckerkarte & Geschichte',template:'%s'},description:'Die Schlacht um Verdun 1916 verstehen – mit historischer Recherche, Zeitleiste und einer interaktiven Entdeckerkarte.',authors:[{name:'Niklas Schaub'}],creator:'Niklas Schaub',openGraph:{type:'website',locale:'de_DE',title:'Verdun 1916 · Entdeckerkarte & Geschichte',description:'Ein sachliches Lernprojekt zur Schlacht um Verdun 1916.',siteName:'Verdun 1916 · Entdeckerkarte & Geschichte'},twitter:{card:'summary_large_image',title:'Verdun 1916 · Entdeckerkarte & Geschichte'},generator:'Vercel'}
export const viewport:Viewport={colorScheme:'light dark',themeColor:[{media:'(prefers-color-scheme: light)',color:'#f4f1ec'},{media:'(prefers-color-scheme: dark)',color:'#16161a'}]}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{const t=localStorage.getItem('verdun-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{document.documentElement.dataset.theme='light'}`}}/></head><body className="antialiased"><SiteShell>{children}</SiteShell>{process.env.NODE_ENV==='production'&&<Analytics/>}</body></html>}
