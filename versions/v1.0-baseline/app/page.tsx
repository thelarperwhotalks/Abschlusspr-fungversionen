import type { Metadata } from 'next'
import { HomeContent } from '@/components/home-content'
export const metadata: Metadata={title:'Die Schlacht um Verdun 1916 · Entdeckerkarte & Geschichte',description:'Ein sachliches Lernprojekt zur Schlacht um Verdun 1916 mit Geschichte, interaktivem Modell und Bauanleitung.',authors:[{name:'Niklas Schaub'}],openGraph:{title:'Verdun 1916 – Entdeckerkarte & Geschichte',description:'Geschichte entdecken und eine Lernkarte aus Karton und LED bauen.'}}
export default function HomePage(){return <HomeContent/>}
