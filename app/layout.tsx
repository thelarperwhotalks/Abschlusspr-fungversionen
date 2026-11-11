import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteShell } from '@/components/site-shell'
import './globals.css'

export const metadata:Metadata={title:{default:'Verdun 1916 · Entdeckerkarte & Geschichte',template:'%s'},description:'Die Schlacht um Verdun 1916 verstehen – mit historischer Recherche, Zeitleiste und einer interaktiven Entdeckerkarte.',metadataBase:new URL('https://niklasabschluss.vercel.app'),authors:[{name:'Niklas Schaub'}],creator:'Niklas Schaub',openGraph:{type:'website',locale:'de_DE',title:'Verdun 1916 · Entdeckerkarte & Geschichte',description:'Ein sachliches Lernprojekt zur Schlacht um Verdun 1916.',siteName:'Verdun 1916 · Entdeckerkarte & Geschichte',images:[{url:'/verdun-hero.png',alt:'Historische Landschaft bei Verdun'}]},twitter:{card:'summary_large_image',title:'Verdun 1916 · Entdeckerkarte & Geschichte',images:['/verdun-hero.png']},generator:'Vercel'}
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',colorScheme:'light dark',themeColor:[{media:'(prefers-color-scheme: light)',color:'#f4f1ec'},{media:'(prefers-color-scheme: dark)',color:'#16161a'}]}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de"><body className="antialiased"><SiteShell>{children}</SiteShell>{process.env.NODE_ENV==='production'&&<Analytics/>}</body></html>}
