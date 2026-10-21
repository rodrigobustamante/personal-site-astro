export const ui = {
  en: {
    // nav
    'nav.home': 'Home',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.writing': 'Writing',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',

    // hero
    'hero.pitch': 'I design and build frontend platforms and design systems, from airlines to copper mining.',
    'hero.stat.years': 'years engineering',
    'hero.stat.teams': 'teams on the design system',
    'hero.stat.millions': 'Millions',
    'hero.stat.millions.sub': 'of passengers reached',
    'hero.stat.countries': 'countries',
    'hero.location': 'Madrid, Spain',

    // work
    'nav.work': 'Work',
    'header.nav': 'Main',
    'header.menu': 'Menu',
    'header.theme': 'Dark theme',
    'header.style': 'Paper style',
    'tip.lang': 'Read in Spanish',
    'tip.toPaper': 'Switch to the Paper style',
    'tip.toCosmos': 'Switch to the Cosmos style',
    'tip.toDark': 'Switch to dark theme',
    'tip.toLight': 'Switch to light theme',
    'header.lang': ': leer en español',
    'a11y.skip': 'Skip to content',
    'work.index.title': 'Selected work',
    'work.index.intro':
      'Systems I have architected and shipped, for clients and on my own: the problem, the architecture, and what changed.',
    'work.back': '← Back to work',
    'work.meta.client': 'Client',
    'work.meta.role': 'Role',
    'work.meta.period': 'Period',
    'work.meta.scope': 'Scope',
    'work.meta.stack': 'Stack',
    'work.read': 'Read more',

    // <meta name="description"> of the home page
    'meta.home.description':
      'Rodrigo Bustamante — Senior Software Engineer, Design Engineer & Senior FrontEnd Engineer. 9 years building scalable frontend systems and design systems for global brands.',
    'hero.remote': 'Remote-friendly',
    'hero.cta.contact': 'Get in touch',
    'hero.cta.cv': 'Download CV',

    // experience section
    'exp.title': 'Experience',
    'exp.sub': 'A decade of building for scale — from payment rails to global platforms used by millions.',
    'exp.present': 'Present',
    'exp.before.title': 'Before 2020',
    'exp.before.early-orgs': 'Ormasoft, Análisis Ltda., Duoc UC',
    'exp.before.early-roles': 'Software Engineer, Teaching Assistant',

    'exp.vantaz.sector': 'Mining · Enterprise Software',
    'exp.vantaz.loc': 'Madrid, Spain · Remote',
    'exp.vantaz.highlight': 'Supplier management platform for a copper miner, built from the ground up',
    'exp.vantaz.bullets': [
      'Architected and built from scratch the supplier management platform of a Chilean copper mining company, bringing contract letters, new-supplier onboarding and supplier risk into a single system.',
      'Set up a monorepo with one Next.js app per module and shared TypeScript packages (UI kit, typed API client, auth) on top of a FastAPI and PostgreSQL backend.',
      "Integrated Entra ID with role-based permissions, DocuSign e-signature through signed webhooks, Microsoft Graph, Azure OpenAI, and master-data ingestion from the client's source systems.",
      'Built the Azure DevOps pipeline — lint, type checks, tests, Playwright and Trivy scans — with per-environment builds and production releases through a staging-slot swap on Azure App Service behind Front Door.',
      'Keep an audit wiki in sync with the code on every PR, covering access control, traceability and data handling.',
    ],

    'exp.hangar.sector': 'Design Systems · Architecture',
    'exp.hangar.loc': 'Madrid & Santiago · Remote',
    'exp.hangar.highlight': 'Boilerplate code shipped to 50+ teams across the company',
    'exp.hangar.bullets': [
      'Led design and development of cross-functional UI solutions for LATAM Airlines, creating boilerplate code for 50+ teams across different areas of the company, focusing on performance, accessibility, and best practices.',
      'Developed and maintained components for React and React Native projects, providing support across all business areas.',
      'Designed and built CI/CD pipelines, application deployment workflows, and created MCPs and Skills for use by teams and agents.',
      'Automated processes and built data collection and metrics tools to support decision-making.',
    ],
    'exp.vantaz.cs': 'Read about the project',
    'exp.hangar.cs': 'Read case study',
    'exp.dme.cs': 'Read case study',

    'exp.dme-latam.sector': 'Digital Marketing · Platforms',
    'exp.dme-latam.loc': 'Madrid & Santiago · Remote',
    'exp.dme-latam.highlight': 'Home page of the largest airline in Latin America',
    'exp.dme-latam.bullets': [
      'Developed new functionalities for the home page of the largest airline in Latin America.',
      'Implemented new features for the backoffice used to load promotions displayed on the home page and offer landings.',
      'Built microfrontends in React/Next.js and BFF APIs with Node.js and Express, using Redis as in-memory database and Jenkins for CI/CD.',
      'Worked in 2-week Scrum sprints managed via Jira.',
    ],

    'exp.dme-globant.sector': 'Digital Marketing · Consulting',
    'exp.dme-globant.loc': 'Santiago, Chile · Remote',
    'exp.dme-globant.highlight': 'Microfrontends and BFFs for global operations',
    'exp.dme-globant.bullets': [
      'Developed new functionalities for the home page and promotions backoffice of the largest airline in Latin America.',
      'Built microfrontends in React/Next.js and BFF APIs with Node.js and Express for real-time promotions management.',
      'Used Redis as in-memory database and Jenkins for integration and continuous delivery.',
      'Worked in 2-week Scrum sprints managed via Jira.',
    ],

    'exp.simple-sme.highlight': 'Subject Matter Expert during COVID-19 crisis',

    'exp.gateway.highlight': 'Payment gateway for Chile and Peru',

    'exp.simple-fs.highlight': "Core of online sales for one of Chile and Peru's largest retailers",

    'exp.innspiral.highlight': '30% faster time-to-market',

    'exp.earlier.highlight': 'Where the foundations were laid',

    // journey
    'journey.title': 'From Santiago to Madrid',
    'journey.sub': 'Ten years building software in Santiago, then a move across the Atlantic in September 2025.',
    'journey.santiago': 'Santiago, Chile',
    'journey.madrid': 'Madrid, Spain',

    // skills
    'skills.sub': 'The tools and disciplines I reach for.',
    'skills.architecture': 'Architecture',
    'skills.cloud': 'Cloud & Infrastructure',
    'skills.viz': 'Visualization & Tools',

    // education
    'edu.title': 'Education & beyond',
    'edu.sub': 'Foundations and the details recruiters ask about.',
    'edu.section': 'Education',
    'edu.degree': 'IT Engineering',
    'edu.notes': 'Graduated with Distinction. Winner of the CITT Annual Competition 2017.',
    'edu.details': 'Details',
    'edu.industries.k': 'Industries',
    'edu.industries.v': 'Retail, payments, healthcare, corporate innovation and aviation.',
    'edu.languages.k': 'Languages',
    'edu.languages.v': 'English (B2, professional working). Spanish (native).',
    'edu.work-auth.k': 'Work authorization',
    'edu.work-auth.v': "Chilean citizen. Exempt from Spain's Labour Market Test by bilateral treaty.",

    // projects
    'projects.title': 'Projects',
    'projects.sub': 'Side projects built to explore ideas I care about.',
    'projects.pace.title': 'PACE',
    'projects.pace.desc':
      'Running analytics app integrated with Strava. Computes fitness, fatigue and form from your full training history, and an AI coach — Gemini, GPT‑4o or Claude, your choice — turns them into weekly and daily guidance.',
    'projects.pace.status': 'In development',
    'projects.intervalo.title': 'Intervalo',
    'projects.intervalo.desc':
      'Sonic visualization of metro networks (Santiago & Madrid) using GTFS open data, MapLibre GL JS, and the Web Audio API. Each train arriving at a station becomes a note.',
    'projects.intervalo.status': 'In development',
    'projects.repo': 'Repo',
    'projects.demo': 'Demo',
    'projects.more': 'Read more',

    // writing
    'writing.title': 'Writing',
    'writing.sub': 'Notes on web performance, accessibility and building for scale.',
    'writing.more': 'Read all posts',

    // contact
    'contact.title': "Let's talk.",
    'contact.sub': 'Open to Senior Frontend Engineer roles. The fastest way to reach me is email.',

    // blog
    'blog.description': 'Articles on web performance, frontend engineering, and software craftsmanship.',
    'blog.readingTime': 'min read',
    'blog.updated': 'Updated',
    'blog.category': 'Category',

    // footer
    'footer.credit': 'Designed & built by Rodrigo Bustamante · Madrid',
    'footer.more': 'More',
    'footer.system': 'Design system',
    'footer.uses': 'How it’s built',

    // case study — Hangar Design System
  },

  es: {
    // nav
    'nav.home': 'Inicio',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Skills',
    'nav.writing': 'Blog',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',

    // hero
    'hero.pitch': 'Diseño y construyo plataformas frontend y design systems, de aerolíneas a minería del cobre.',
    'hero.stat.years': 'años de ingeniería',
    'hero.stat.teams': 'equipos en el design system',
    'hero.stat.millions': 'Millones',
    'hero.stat.millions.sub': 'de pasajeros',
    'hero.stat.countries': 'países',
    'hero.location': 'Madrid, España',

    // work
    'nav.work': 'Trabajos',
    'header.nav': 'Principal',
    'header.menu': 'Menú',
    'header.theme': 'Tema oscuro',
    'header.style': 'Estilo Paper',
    'tip.lang': 'Leer en inglés',
    'tip.toPaper': 'Cambiar al estilo Paper',
    'tip.toCosmos': 'Cambiar al estilo Cosmos',
    'tip.toDark': 'Cambiar a tema oscuro',
    'tip.toLight': 'Cambiar a tema claro',
    'header.lang': ': read in English',
    'a11y.skip': 'Saltar al contenido',
    'work.index.title': 'Trabajos seleccionados',
    'work.index.intro':
      'Sistemas que he diseñado y entregado, para clientes y por mi cuenta: el problema, la arquitectura y lo que cambió.',
    'work.back': '← Volver a trabajos',
    'work.meta.client': 'Cliente',
    'work.meta.role': 'Rol',
    'work.meta.period': 'Período',
    'work.meta.scope': 'Alcance',
    'work.meta.stack': 'Stack',
    'work.read': 'Leer más',

    // <meta name="description"> de la home
    'meta.home.description':
      'Rodrigo Bustamante — Senior Software Engineer, Design Engineer y Senior FrontEnd Engineer. 9 años construyendo sistemas frontend y design systems escalables para marcas globales.',
    'hero.remote': 'Disponible en remoto',
    'hero.cta.contact': 'Hablemos',
    'hero.cta.cv': 'Descargar CV',

    // experience section
    'exp.title': 'Experiencia',
    'exp.sub':
      'Una década construyendo a escala — desde pasarelas de pago hasta plataformas globales usadas por millones.',
    'exp.present': 'Presente',
    'exp.before.title': 'Antes de 2020',
    'exp.before.early-orgs': 'Ormasoft, Análisis Ltda., Duoc UC',
    'exp.before.early-roles': 'Software Engineer, ayudante',

    'exp.vantaz.sector': 'Minería · Software empresarial',
    'exp.vantaz.loc': 'Madrid, España · Remoto',
    'exp.vantaz.highlight': 'Plataforma de gestión de proveedores para una minera de cobre, construida desde cero',
    'exp.vantaz.bullets': [
      'Diseñé y construí desde cero la plataforma de gestión de proveedores de una minera de cobre chilena, que reúne en un solo sistema las cartas contractuales, el registro de proveedores nuevos y sus riesgos.',
      'Definí un monorepo con una app Next.js por módulo y paquetes TypeScript compartidos (UI, cliente de API tipado, autenticación) sobre un backend FastAPI con PostgreSQL.',
      'Integré Entra ID con permisos por rol, firma electrónica con DocuSign mediante webhooks firmados, Microsoft Graph, Azure OpenAI y la ingesta de datos maestros desde los sistemas del cliente.',
      'Construí el pipeline en Azure DevOps: lint, tipos, tests, Playwright y escaneo con Trivy, con builds por ambiente y despliegue a producción vía swap de slot en Azure App Service detrás de Front Door.',
      'Mantengo una documentación de auditoría sincronizada con el código en cada PR, que cubre control de acceso, trazabilidad y manejo de datos.',
    ],

    'exp.hangar.sector': 'Design Systems · Arquitectura',
    'exp.hangar.loc': 'Madrid y Santiago · Remoto',
    'exp.hangar.highlight': 'Boilerplate para 50+ equipos en toda la compañía',
    'exp.hangar.bullets': [
      'Lideré el diseño y desarrollo de soluciones UI transversales para LATAM Airlines, creando código boilerplate para más de 50 equipos en distintas áreas con foco en performance, accesibilidad y buenas prácticas.',
      'Desarrollé y mantuve componentes para proyectos en React y React Native, brindando soporte a equipos en todo el negocio.',
      'Diseñé y construí los distintos pipelines de CI/CD, el despliegue de aplicaciones y la creación de MCPs y Skills para uso de equipos y agentes.',
      'Automaticé procesos y construí herramientas de recopilación de datos y métricas para la toma de decisiones.',
    ],
    'exp.vantaz.cs': 'Ver el proyecto',
    'exp.hangar.cs': 'Ver caso de estudio',
    'exp.dme.cs': 'Ver caso de estudio',

    'exp.dme-latam.sector': 'Marketing Digital · Plataformas',
    'exp.dme-latam.loc': 'Madrid y Santiago · Remoto',
    'exp.dme-latam.highlight': 'Home de la aerolínea más grande de Latinoamérica',
    'exp.dme-latam.bullets': [
      'Desarrollé nuevas funcionalidades para la página principal de la aerolínea más grande de América Latina.',
      'Implementé nuevas funcionalidades en el backoffice donde se cargan las promociones mostradas en la home y en los distintos landings de ofertas.',
      'Trabajé con microfrontends en React/Next.js y APIs BFF con Node.js y Express, usando Redis como base de datos en memoria y Jenkins para CI/CD.',
      'Metodología: Scrum con sprints de 2 semanas gestionados en Jira.',
    ],

    'exp.dme-globant.sector': 'Marketing Digital · Consultoría',
    'exp.dme-globant.loc': 'Santiago, Chile · Remoto',
    'exp.dme-globant.highlight': 'Microfrontends y BFFs para operaciones globales',
    'exp.dme-globant.bullets': [
      'Desarrollé nuevas funcionalidades para la página principal y el backoffice de promociones de la aerolínea más grande de América Latina.',
      'Construí microfrontends con React/Next.js y APIs BFF con Node.js y Express para gestión de promociones en tiempo real.',
      'Usé Redis como base de datos en memoria y Jenkins para integración y entrega continua.',
      'Metodología: Scrum con sprints de 2 semanas gestionados en Jira.',
    ],

    'exp.simple-sme.highlight': 'SME durante la crisis COVID-19',

    'exp.gateway.highlight': 'Pasarela de pagos para Chile y Perú',

    'exp.simple-fs.highlight': 'Core de ventas online de uno de los mayores retail de Chile y Perú',

    'exp.innspiral.highlight': '30% menos time-to-market',

    'exp.earlier.highlight': 'Donde se sentaron las bases',

    // journey
    'journey.title': 'De Santiago a Madrid',
    'journey.sub':
      'Diez años construyendo software en Santiago y, en septiembre de 2025, el salto al otro lado del Atlántico.',
    'journey.santiago': 'Santiago, Chile',
    'journey.madrid': 'Madrid, España',

    // skills
    'skills.sub': 'Las herramientas y disciplinas a las que recurro.',
    'skills.architecture': 'Arquitectura',
    'skills.cloud': 'Cloud e Infraestructura',
    'skills.viz': 'Visualización y Tools',

    // education
    'edu.title': 'Formación y más',
    'edu.sub': 'Las bases y los detalles que preguntan los reclutadores.',
    'edu.section': 'Formación',
    'edu.degree': 'Ingeniería en Informática',
    'edu.notes': 'Graduado con Distinción. Ganador del Concurso Anual CITT 2017.',
    'edu.details': 'Detalles',
    'edu.industries.k': 'Industrias',
    'edu.industries.v': 'Retail, pagos, salud, innovación corporativa y aviación.',
    'edu.languages.k': 'Idiomas',
    'edu.languages.v': 'Inglés (B2, profesional). Español (nativo).',
    'edu.work-auth.k': 'Autorización de trabajo',
    'edu.work-auth.v': 'Ciudadano chileno. Exento del Test de Mercado Laboral de España por tratado bilateral.',

    // projects
    'projects.title': 'Proyectos',
    'projects.sub': 'Proyectos personales para explorar ideas que me importan.',
    'projects.pace.title': 'PACE',
    'projects.pace.desc':
      'App de analítica de running integrada con Strava. Calcula forma física, fatiga y estado de forma con todo tu historial, y un coach con IA — Gemini, GPT‑4o o Claude, a elección — los convierte en recomendaciones semanales y diarias.',
    'projects.pace.status': 'En desarrollo',
    'projects.intervalo.title': 'Intervalo',
    'projects.intervalo.desc':
      'Visualización sonora de redes de metro (Santiago y Madrid) usando datos abiertos GTFS, MapLibre GL JS y la Web Audio API. Cada tren que llega a una estación se convierte en una nota.',
    'projects.intervalo.status': 'En desarrollo',
    'projects.repo': 'Repo',
    'projects.demo': 'Demo',
    'projects.more': 'Leer más',

    // writing
    'writing.title': 'Blog',
    'writing.sub': 'Apuntes sobre performance web, accesibilidad y construir a escala.',
    'writing.more': 'Ver todos los posts',

    // contact
    'contact.title': 'Hablemos.',
    'contact.sub': 'Abierto a roles de Senior Frontend Engineer. La forma más rápida de contactarme es por email.',

    // blog
    'blog.description': 'Artículos sobre rendimiento web, ingeniería frontend y oficio de software.',
    'blog.readingTime': 'min de lectura',
    'blog.updated': 'Actualizado',
    'blog.category': 'Categoría',

    // footer
    'footer.credit': 'Diseñado y construido por Rodrigo Bustamante · Madrid',
    'footer.more': 'Más',
    'footer.system': 'Sistema de diseño',
    'footer.uses': 'Cómo está hecho',

    // case study — Hangar Design System
  },
} as const;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof typeof ui.en;

export function useTranslations(lang: Lang) {
  const dict = ui[lang] as Record<string, string | readonly string[]>;
  const fallback = ui.en as Record<string, string | readonly string[]>;
  return {
    t: (key: TranslationKey) => (dict[key] ?? fallback[key]) as string,
    tl: (key: TranslationKey) => (dict[key] ?? fallback[key]) as readonly string[],
  };
}
