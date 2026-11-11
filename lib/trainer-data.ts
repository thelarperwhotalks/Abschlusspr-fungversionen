export type QuizQuestion = { question: string; options: [string, string, string, string]; answer: number; explanation: string; topic: 'Zeitleiste' | 'Begriffe' | 'Alltagsrealität' | 'Forts' }
export const quizQuestions: QuizQuestion[] = [
  { question: 'Wie lange dauerte die Schlacht um Verdun?', options: ['302 Tage', '42 Tage', 'Ein Jahr genau', 'Zwei Monate'], answer: 0, explanation: 'Vom 21. Februar bis zum 18. Dezember 1916 dauerte die Schlacht 302 Tage.', topic: 'Zeitleiste' },
  { question: 'Was war die Voie Sacrée?', options: ['Ein Fort', 'Eine Versorgungsstraße', 'Ein Waffenstillstand', 'Ein Artillerietyp'], answer: 1, explanation: 'Die Straße von Bar-le-Duc nach Verdun war eine zentrale französische Nachschubroute.', topic: 'Begriffe' },
  { question: 'Welche Waffe verursachte einen großen Teil der Verluste?', options: ['Artillerie', 'Pfeil und Bogen', 'Segelschiffe', 'Kavallerie'], answer: 0, explanation: 'Der anhaltende Artilleriebeschuss forderte die meisten Opfer und veränderte das Gelände.', topic: 'Alltagsrealität' },
  { question: 'Wann begann die deutsche Offensive?', options: ['21. Februar 1916', '7. Juni 1916', '24. Oktober 1916', '11. November 1918'], answer: 0, explanation: 'Am 21. Februar 1916 eröffnete ein massives Bombardement die Operation „Gericht“.', topic: 'Zeitleiste' },
  { question: 'Wann fiel Fort Douaumont erstmals?', options: ['25. Februar 1916', '7. Juni 1916', '24. Oktober 1916', '18. Dezember 1916'], answer: 0, explanation: 'Eine kleine deutsche Einheit besetzte das Fort am 25. Februar 1916.', topic: 'Forts' },
  { question: 'Wann kapitulierte die Besatzung von Fort Vaux?', options: ['7. Juni 1916', '21. Februar 1916', '29. August 1916', '15. Dezember 1916'], answer: 0, explanation: 'Nach tagelangem Widerstand und Wassermangel kapitulierte Fort Vaux am 7. Juni.', topic: 'Forts' },
  { question: 'Was bezeichnet der Begriff Stellungskrieg?', options: ['Kämpfe aus befestigten Stellungen mit wenig Frontbewegung', 'Einen Seekrieg', 'Ein Friedensabkommen', 'Eine einzelne Patrouille'], answer: 0, explanation: 'Bei Verdun lagen die Fronten lange in Schützengräben und befestigten Positionen.', topic: 'Begriffe' },
  { question: 'Wofür steht der Ausdruck Materialschlacht?', options: ['Für den entscheidenden Einsatz von Waffen, Munition und Nachschub', 'Für einen Wettkampf in Fabriken', 'Für einen Waffenstillstand', 'Für eine einzelne Pionierarbeit'], answer: 0, explanation: 'Produktion, Versorgung und enorme Munitionsmengen beeinflussten den Kampf entscheidend.', topic: 'Begriffe' },
  { question: 'Was war das Ziel von Falkenhayns Abnutzungsstrategie?', options: ['Frankreich durch hohe Verluste zermürben', 'Verdun evakuieren', 'Die Front verkürzen', 'Einen schnellen Frieden schließen'], answer: 0, explanation: 'Falkenhayn wollte Frankreich an einem symbolisch wichtigen Ort zu hohen Verlusten zwingen.', topic: 'Zeitleiste' },
  { question: 'Welche Aufgabe hatte die Voie Sacrée?', options: ['Französische Truppen und Material nach Verdun bringen', 'Die Maas überqueren', 'Forts sprengen', 'Gefangene austauschen'], answer: 0, explanation: 'Über die Straße rollten Nachschub und Verstärkung beinahe ununterbrochen zur Front.', topic: 'Alltagsrealität' },
  { question: 'Was geschah im Juni und Juli 1916 bei Fleury?', options: ['Das Dorf wechselte mehrfach den Besitzer und wurde zerstört', 'Ein Friedensvertrag wurde unterzeichnet', 'Die Front wurde vollständig geräumt', 'Fort Vaux wurde zurückerobert'], answer: 0, explanation: 'Fleury-devant-Douaumont wurde in heftigen Kämpfen mehrfach genommen und weitgehend zerstört.', topic: 'Zeitleiste' },
  { question: 'Wer löste Falkenhayn Ende August 1916 als Chef der Obersten Heeresleitung ab?', options: ['Hindenburg und Ludendorff', 'Joffre und Pétain', 'Foch und Nivelle', 'Haig und Rawlinson'], answer: 0, explanation: 'Paul von Hindenburg übernahm am 29. August 1916 mit Erich Ludendorff die Führung.', topic: 'Zeitleiste' },
  { question: 'Wann eroberten französische Truppen Fort Douaumont zurück?', options: ['24. Oktober 1916', '25. Februar 1916', '7. Juni 1916', '18. Dezember 1916'], answer: 0, explanation: 'Die französische Offensive nahm Fort Douaumont am 24. Oktober zurück.', topic: 'Forts' },
  { question: 'Wann begann die letzte große französische Offensive bei Verdun?', options: ['15. Dezember 1916', '21. Februar 1916', '7. Juni 1916', '29. August 1916'], answer: 0, explanation: 'Vom 15. bis 18. Dezember gewann Frankreich weiteres Gelände zurück.', topic: 'Zeitleiste' },
  { question: 'Was ist das Ossuaire de Douaumont?', options: ['Ein Beinhaus und Gedenkort', 'Ein Nachschubdepot', 'Ein Fort', 'Ein Lazarettzug'], answer: 0, explanation: 'Das Beinhaus bewahrt die sterblichen Überreste nicht identifizierter Gefallener und erinnert an die Toten.', topic: 'Begriffe' },
  { question: 'Wie sah das Gelände nach dem Beschuss oft aus?', options: ['Wie eine Landschaft aus dicht überlappenden Granattrichtern', 'Wie unberührter Wald', 'Wie eine gepflasterte Stadt', 'Wie ein trockenes Flussbett'], answer: 0, explanation: 'Der Beschuss formte eine Mondlandschaft aus Kratern, Schlamm und zerstörten Wäldern.', topic: 'Alltagsrealität' },
  { question: 'Was erschwerte den Alltag in den Schützengräben zusätzlich?', options: ['Nässe, Ratten und Läuse', 'Klimaanlagen', 'Mangel an Kartenpapier', 'Schneemobile'], answer: 0, explanation: 'Schlamm, überflutete Gräben, Ratten und Läuse gehörten für viele Soldaten zum Alltag.', topic: 'Alltagsrealität' },
  { question: 'Was bedeutet „village détruit“?', options: ['Zerstörtes Dorf', 'Versorgungsstraße', 'Artilleriefeuer', 'Waffenstillstand'], answer: 0, explanation: 'Mehrere zerstörte Dörfer wurden nach dem Krieg als Gedenkorte erhalten.', topic: 'Begriffe' },
  { question: 'Welche französische Führungspersönlichkeit wurde mit der Verteidigung Verduns bekannt?', options: ['Philippe Pétain', 'Erich Ludendorff', 'Alfred von Schlieffen', 'Paul von Hindenburg'], answer: 0, explanation: 'Pétain organisierte in der frühen Phase die Verteidigung und Versorgung über die Voie Sacrée.', topic: 'Forts' },
  { question: 'Wie endete die Schlacht im Dezember 1916?', options: ['Ohne entscheidenden Durchbruch; die Front stabilisierte sich', 'Mit der Einnahme von Paris', 'Mit einem Waffenstillstand', 'Mit dem Ende des Weltkriegs'], answer: 0, explanation: 'Die Front stabilisierte sich nach den französischen Rückeroberungen; ein klarer Sieg blieb aus.', topic: 'Zeitleiste' },
  { question: 'Wie hieß die wichtigste französische Versorgungsstraße nach Verdun?', options: ['Voie Sacrée', 'Chemin des Dames', 'Kaiserstraße', 'Route de Paris'], answer: 0, explanation: 'Die Voie Sacrée verband Bar-le-Duc mit Verdun und ermöglichte einen wichtigen Teil des französischen Nachschubs.', topic: 'Alltagsrealität' },
  { question: 'Warum musste die Besatzung von Fort Vaux im Juni 1916 aufgeben?', options: ['Wassermangel und Erschöpfung', 'Ein Waffenstillstand war beschlossen', 'Das Fort wurde evakuiert, bevor es angegriffen wurde', 'Die Maas trat über die Ufer'], answer: 0, explanation: 'Die Verteidiger hielten lange aus, doch Wasserknappheit und die schwierige Lage machten die Fortsetzung unmöglich.', topic: 'Forts' },
  { question: 'Was kennzeichnete die Kämpfe um Fleury-devant-Douaumont?', options: ['Das Dorf wechselte mehrfach den Besitzer und wurde zerstört', 'Es blieb während der Schlacht unberührt', 'Es war der Hauptsitz der französischen Regierung', 'Es wurde durch einen Waffenstillstand geräumt'], answer: 0, explanation: 'Fleury wechselte im Juni und Juli 1916 mehrfach den Besitzer und wurde weitgehend zerstört.', topic: 'Zeitleiste' },
  { question: 'Was ist das Ossuaire de Douaumont?', options: ['Ein Beinhaus und Gedenkort für Gefallene', 'Ein französischer Nachschubweg', 'Ein erhaltenes Artilleriewerk', 'Ein Versorgungsdepot'], answer: 0, explanation: 'Das Beinhaus erinnert an die Toten der Schlacht und bewahrt Überreste nicht identifizierter Gefallener.', topic: 'Begriffe' },
]

export const knowledgeCheckQuestionIds = [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23] as const
export const knowledgeCheckQuestions = knowledgeCheckQuestionIds.map((index) => quizQuestions[index])

export const glossary = [
  ['Materialschlacht', 'Ein Kampf, in dem Waffen, Munition, industrielle Produktion und Nachschub eine zentrale Rolle spielen.'],
  ['Abnutzungsstrategie', 'Der Versuch, den Gegner durch fortgesetzte Verluste und Erschöpfung zum Nachgeben zu zwingen.'],
  ['Voie Sacrée', 'Die wichtige Straße zwischen Bar-le-Duc und Verdun, über die französischer Nachschub an die Front kam.'],
  ['Weihnachtsmemorandum', 'Eine Denkschrift Falkenhayns aus dem Dezember 1915, die Verdun als Ort zur Zermürbung Frankreichs beschrieb.'],
  ['Village détruit', 'Französisch für „zerstörtes Dorf“; mehrere vollständig verwüstete Orte blieben als Gedenkstätten erhalten.'],
  ['Ossuaire de Douaumont', 'Ein Beinhaus und Gedenkort für nicht identifizierte Gefallene der Kämpfe um Verdun.'],
  ['Tranchée des Baïonnettes', 'Ein Erinnerungsort, der an französische Soldaten und die Kämpfe in den Schützengräben erinnert.'],
  ['Toter Mann / Mort-Homme', 'Eine strategisch wichtige Anhöhe westlich der Maas, um die 1916 heftig gekämpft wurde.'],
  ['Trommelfeuer', 'Dichter, anhaltender Artilleriebeschuss, der die Verteidigung zermürben und zerstören sollte.'],
  ['Stellungskrieg', 'Kampf aus befestigten Stellungen, bei dem sich die Frontlinie über längere Zeit kaum verschiebt.'],
  ['Fort Douaumont', 'Das größte Fort im Festungsring von Verdun; es wechselte 1916 den Besitzer.'],
  ['Fort Vaux', 'Ein französisches Fort, dessen Besatzung sich im Juni 1916 nach einer langen Belagerung ergab.'],
  ['Fleury-devant-Douaumont', 'Ein Dorf, das 1916 mehrfach den Besitzer wechselte und vollständig zerstört wurde.'],
  ['Mondlandschaft', 'Die stark zerfurchte Landschaft aus Granattrichtern, zerstörten Bäumen und Schlamm.'],
] as const

export const timeline = [
  ['21. Februar 1916', 'Beginn der deutschen Operation „Gericht“ mit massivem Artilleriebeschuss.'],
  ['25. Februar 1916', 'Fort Douaumont wird von einer kleinen deutschen Einheit eingenommen.'],
  ['März 1916', 'Die Kämpfe weiten sich auf beide Ufer der Maas aus; der Nachschub über die Voie Sacrée wird entscheidend.'],
  ['9. April 1916', 'Ein deutscher Angriff am linken Maasufer scheitert; die Kämpfe dauern an.'],
  ['1. Mai 1916', 'Philippe Pétain wird von Robert Nivelle als Befehlshaber der französischen 2. Armee abgelöst.'],
  ['7. Juni 1916', 'Fort Vaux kapituliert nach tagelangem Widerstand und Wassermangel.'],
  ['23. Juni 1916', 'Deutsche Truppen erreichen Fleury und den Bereich vor Fort Souville.'],
  ['Juni–Juli 1916', 'Fleury-devant-Douaumont wechselt mehrfach den Besitzer und wird zerstört.'],
  ['12. Juli 1916', 'Der deutsche Vormarsch wird vor Fort Souville aufgehalten.'],
  ['29. August 1916', 'Hindenburg und Ludendorff lösen Falkenhayn an der Spitze der deutschen Heeresleitung ab.'],
  ['24. Oktober 1916', 'Französische Truppen erobern Fort Douaumont zurück.'],
  ['2. November 1916', 'Fort Vaux wird von deutschen Truppen geräumt und kurz darauf von Frankreich zurückgewonnen.'],
  ['15. Dezember 1916', 'Die letzte große französische Offensive nimmt mehrere Stellungen zurück.'],
  ['18. Dezember 1916', 'Die Kampfhandlungen bei Verdun kommen weitgehend zum Stillstand.'],
] as const
