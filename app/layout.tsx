import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteShell } from '@/components/site-shell'
import './globals.css'
import './article.css'

export const metadata:Metadata={title:{default:'Schlacht um Verdun 1916 · Geschichte, Verlauf & Folgen',template:'%s'},description:'Ein fundierter Überblick zur Schlacht um Verdun 1916: Hintergründe, Zeitleiste, Verluste, chemische Waffen und zentrale Begriffe.',metadataBase:new URL('https://niklasabschluss.vercel.app'),authors:[{name:'Niklas Schaub'},{name:'Nils Schwemm'},{name:'Samuel Verstraeten'}],creator:'Verdun 1916',openGraph:{type:'website',locale:'de_DE',title:'Schlacht um Verdun 1916',description:'Hintergründe, Verlauf, Verluste und Erinnerung an die Schlacht um Verdun.',siteName:'Verdun 1916',images:[{url:'/verdun-hero.png',alt:'Historische Landschaft bei Verdun'}]},twitter:{card:'summary_large_image',title:'Schlacht um Verdun 1916',images:['/verdun-hero.png']},generator:'Vercel'}
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',colorScheme:'light dark',themeColor:[{media:'(prefers-color-scheme: light)',color:'#f4f1ec'},{media:'(prefers-color-scheme: dark)',color:'#16161a'}]}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de"><body className="antialiased"><SiteShell>{children}</SiteShell>{process.env.NODE_ENV==='production'&&<Analytics/>}</body></html>}
