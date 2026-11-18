import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteShell } from '@/components/site-shell'
import './globals.css'
import './article.css'
import './source-register.css'

export const metadata:Metadata={title:{default:'Deutsches Kaiserreich · Geschichte 1871–1918',template:'%s'},description:'Ein kompakter Überblick über das Deutsche Kaiserreich: Gründung, Verfassung, Kaiser, Territorium und Ende 1918.',metadataBase:new URL('https://niklasabschluss.vercel.app'),authors:[{name:'Niklas Schaub'},{name:'Nils Schwemm'},{name:'Samuel Verstraeten'}],creator:'Deutsches Kaiserreich 1871–1918',openGraph:{type:'website',locale:'de_DE',title:'Deutsches Kaiserreich · 1871–1918',description:'Geschichte, Zeitleiste, Territorium und Familien im Deutschen Kaiserreich.',siteName:'Deutsches Kaiserreich 1871–1918',images:[{url:'/german-empire-hero.png',alt:'Künstlerische Rekonstruktion des Reichstagsgebäudes in Berlin'}]},twitter:{card:'summary_large_image',title:'Deutsches Kaiserreich · 1871–1918',images:['/german-empire-hero.png']},generator:'Vercel'}
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',colorScheme:'light dark',themeColor:[{media:'(prefers-color-scheme: light)',color:'#f2eee6'},{media:'(prefers-color-scheme: dark)',color:'#171816'}]}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de"><body className="antialiased"><SiteShell>{children}</SiteShell>{process.env.NODE_ENV==='production'&&<Analytics/>}</body></html>}
