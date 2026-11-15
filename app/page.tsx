import type { Metadata } from 'next'
import { HomeContent } from '@/components/home-content'
export const metadata: Metadata={title:'Schlacht um Verdun 1916 · Geschichte, Verlauf & Folgen',description:'Hintergründe, Zeitleiste, Verluste, chemische Waffen und zentrale Begriffe zur Schlacht um Verdun 1916.',authors:[{name:'Niklas Schaub'},{name:'Nils Schwemm'},{name:'Samuel Verstraeten'}],openGraph:{title:'Schlacht um Verdun 1916',description:'Ein fundierter Überblick über Verlauf, Verluste und Erinnerung an die Schlacht um Verdun.'}}
export default function HomePage(){return <HomeContent/>}
