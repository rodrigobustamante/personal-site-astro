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
    'hero.pitch':
      'I architect scalable frontend systems and <em>design systems</em> for global brands — with <em>9 years</em> of engineering behind me, building platforms used by millions.',
    'hero.stat.years': 'years engineering',
    'hero.stat.teams': 'teams on the design system',
    'hero.stat.millions': 'Millions',
    'hero.stat.millions.sub': 'of passengers reached',
    'hero.stat.countries': 'countries',
    'hero.location': 'Madrid, Spain',
    'hero.remote': 'Remote-friendly',
    'hero.cta.contact': 'Get in touch',
    'hero.cta.cv': 'Download CV',

    // experience section
    'exp.title': 'Experience',
    'exp.sub': 'A decade of building for scale — from payment rails to global platforms used by millions.',

    'exp.hangar.sector': 'Design Systems · Architecture',
    'exp.hangar.loc': 'Madrid & Santiago · Remote',
    'exp.hangar.highlight': 'Boilerplate code shipped to 50+ teams across the company',
    'exp.hangar.bullets': [
      'Led design and development of cross-functional UI solutions for LATAM Airlines, creating boilerplate code for 50+ teams across different areas of the company, focusing on performance, accessibility, and best practices.',
      'Developed and maintained components for React and React Native projects, providing support across all business areas.',
      'Designed and built CI/CD pipelines, application deployment workflows, and created MCPs and Skills for use by teams and agents.',
      'Automated processes and built data collection and metrics tools to support decision-making.',
    ],
    'exp.hangar.cs': 'Read case study →',

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

    'exp.simple-sme.sector': 'Retail · eCommerce',
    'exp.simple-sme.highlight': 'Subject Matter Expert during COVID-19 crisis',
    'exp.simple-sme.bullets': [
      'Took the role of Subject Matter Expert, helping new team members design, develop, implement, and deploy new features during the COVID-19 crisis context.',
      'Led technical decisions and maintained system stability under increased e-commerce demand during the pandemic.',
      'Stack: React microfrontends, Node.js/Express APIs, Redis, imgix as image CDN, Heroku deployment, and GitLab CI/CD.',
    ],

    'exp.gateway.sector': 'Digital Payments · eCommerce',
    'exp.gateway.highlight': 'Payment gateway for Chile and Peru',
    'exp.gateway.bullets': [
      'Developed a Node.js/Express payment gateway for CocaCola Embonor covering Chile and Peru, using MySQL to persist transaction records.',
      'Deployed on AWS EKS using Kubernetes as container orchestration, with GitLab CI/CD for continuous integration and delivery.',
      'Integrated Kiphu as SaaS for digital payments.',
    ],

    'exp.simple-fs.sector': 'Retail · eCommerce',
    'exp.simple-fs.highlight': "Core of online sales for one of Chile and Peru's largest retailers",
    'exp.simple-fs.bullets': [
      'Developed the main page, product catalogs, product tabs, and campaign administration panel (for analysts to create campaigns), among other modules.',
      'Worked side by side with the marketing and technology departments, integrating vendor technologies and performing requirements analysis.',
      'Stack: React microfrontends, Node.js/Express APIs, Redis, imgix as image CDN, Heroku deployment, and GitLab CI/CD.',
    ],

    'exp.innspiral.sector': 'Corporate Innovation',
    'exp.innspiral.highlight': '30% faster time-to-market',
    'exp.innspiral.bullets': [
      'Developed and deployed end-to-end innovation platforms for corporate clients, owning the full lifecycle from database modeling to cloud deployment.',
      'Reduced time-to-market for internal pilot projects by 30%.',
    ],

    'exp.earlier.sector': 'Healthcare · Finance · Teaching',
    'exp.earlier.title': 'Earlier roles',
    'exp.earlier.highlight': 'Where the foundations were laid',
    'exp.earlier.ta-title': 'Teaching Assistant — Duoc UC',
    'exp.earlier.ormasoft.bullets': [
      'Architected a unified medical-records system for the Chilean healthcare sector using Aurelia, D3.js for clinical visualization and HTML5 Canvas for high-performance rendering.',
    ],
    'exp.earlier.analisis.bullets': [
      'Built specialized accounting software for CasaIdeas with Angular and Node.js/Express, implementing complex PL/SQL queries for accurate financial reporting.',
    ],
    'exp.earlier.duoc.bullets': [
      'Mentored undergraduates in Programming Fundamentals and Database Design through workshops and hands-on guidance.',
    ],

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
      'Running analytics app integrated with Strava. AI coaching powered by Gemini 2.5 Flash surfaces insights from your training history and helps you plan smarter weeks.',
    'projects.pace.status': 'In development',
    'projects.intervalo.title': 'Intervalo',
    'projects.intervalo.desc':
      'Sonic visualization of metro networks (Santiago & Madrid) using GTFS open data, MapLibre GL JS, and the Web Audio API. Each station, line, and transfer becomes sound.',
    'projects.intervalo.status': 'In development',
    'projects.repo': 'Repo',
    'projects.demo': 'Demo',

    // writing
    'writing.title': 'Writing',
    'writing.sub': 'Notes on web performance, accessibility and building for scale.',
    'writing.more': 'Read all posts',

    // contact
    'contact.title': "Let's talk.",
    'contact.sub':
      'Open to Staff Frontend Engineer and Design System Lead roles. The fastest way to reach me is email.',

    // footer
    'footer.credit': 'Designed & built by Rodrigo Bustamante · Madrid · 2026',

    // case study — Hangar Design System
    'hangar.cs.back': '← Back',
    'hangar.cs.tag': 'Case Study',
    'hangar.cs.title': 'Hangar Design System',
    'hangar.cs.subtitle': 'Building the design system backbone for the largest airline in Latin America',
    'hangar.cs.meta.role': 'Role',
    'hangar.cs.meta.role.v': 'Software Architect',
    'hangar.cs.meta.period': 'Period',
    'hangar.cs.meta.period.v': 'Sep 2024 — Mar 2026',
    'hangar.cs.meta.scope': 'Scope',
    'hangar.cs.meta.scope.v': '50+ teams · React & React Native · Millions of passengers',
    'hangar.cs.meta.stack': 'Stack',
    'hangar.cs.meta.stack.v': 'React, React Native, Next.js, TypeScript, Storybook, GCP, Terraform, GitLab CI, Docker',
    'hangar.cs.s1.label': '01 — Problem & Context',
    'hangar.cs.s1.title': 'Scaling UI consistency across 50+ teams',
    'hangar.cs.s1.p1':
      'LATAM Airlines operates at a scale few frontend organizations face: dozens of independent product teams, two primary platforms (web and mobile), and a passenger base in the millions across Latin America and Europe. Before Hangar, each team maintained its own component library, leading to inconsistent UX, duplicated engineering effort, and slow iteration cycles.',
    'hangar.cs.s1.p2':
      'The mandate was clear but technically complex: design and build a unified design system that 50+ teams could adopt without sacrificing their autonomy, while ensuring accessibility, performance, and brand consistency at every touchpoint.',
    'hangar.cs.s2.label': '02 — Architecture',
    'hangar.cs.s2.title': 'Tokens, components, and pipelines',
    'hangar.cs.s2.tokens.h': 'Design tokens',
    'hangar.cs.s2.tokens.p':
      'A structured token layer — covering color, typography, spacing, motion, and elevation — served as the single source of truth shared between design (Figma) and engineering. Tokens were versioned and distributed as NPM packages, enabling teams to upgrade incrementally.',
    'hangar.cs.s2.components.h': 'Component library',
    'hangar.cs.s2.components.p':
      'Cross-platform components built for React (web) and React Native (mobile) covered the full UI spectrum: forms, navigation, data display, feedback, and layout primitives. Each component was documented in Storybook with accessibility annotations and usage guidelines.',
    'hangar.cs.s2.cicd.h': 'CI/CD and distribution',
    'hangar.cs.s2.cicd.p':
      'GitLab CI pipelines handled automated testing, visual regression checks, semantic versioning, and NPM publishing on every merge to main. Terraform Cloud managed the GCP infrastructure backing internal tooling and the Storybook instance.',
    'hangar.cs.s3.label': '03 — Differentiator',
    'hangar.cs.s3.title': 'MCPs and Skills: making the DS agent-native',
    'hangar.cs.s3.p1':
      'Beyond the component library itself, I designed and built Model Context Protocol (MCP) servers and Claude Skills that allowed product teams — and AI coding agents — to consume Hangar directly from their development environment. Engineers could query component APIs, get usage examples, and scaffold compliant UIs without leaving their editor.',
    'hangar.cs.s3.p2':
      'This made Hangar one of the first design systems in the region explicitly architected for AI-assisted development workflows, reducing onboarding friction for new teams and accelerating adoption.',
    'hangar.cs.s4.label': '04 — Impact',
    'hangar.cs.s4.title': 'Metrics and outcomes',
    'hangar.cs.s4.adoption.h': 'Adoption',
    'hangar.cs.s4.adoption.v': '50+ product teams consuming Hangar',
    'hangar.cs.s4.velocity.h': 'Delivery velocity',
    'hangar.cs.s4.velocity.v': '~40% faster UI delivery via shared components + Storybook',
    'hangar.cs.s4.a11y.h': 'Accessibility',
    'hangar.cs.s4.a11y.v': '100% of core components WCAG AA',
    'hangar.cs.s4.reach.h': 'Reach',
    'hangar.cs.s4.reach.v': 'Components shipped to products touching millions of passengers across 10+ countries.',
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
    'hero.pitch':
      'Arquitecto sistemas frontend y <em>design systems</em> escalables para marcas globales — con <em>9 años</em> de ingeniería a mis espaldas, construyendo plataformas usadas por millones.',
    'hero.stat.years': 'años de ingeniería',
    'hero.stat.teams': 'equipos en el design system',
    'hero.stat.millions': 'Millones',
    'hero.stat.millions.sub': 'de pasajeros',
    'hero.stat.countries': 'países',
    'hero.location': 'Madrid, España',
    'hero.remote': 'Disponible en remoto',
    'hero.cta.contact': 'Hablemos',
    'hero.cta.cv': 'Descargar CV',

    // experience section
    'exp.title': 'Experiencia',
    'exp.sub':
      'Una década construyendo a escala — desde pasarelas de pago hasta plataformas globales usadas por millones.',

    'exp.hangar.sector': 'Design Systems · Arquitectura',
    'exp.hangar.loc': 'Madrid y Santiago · Remoto',
    'exp.hangar.highlight': 'Boilerplate para 50+ equipos en toda la compañía',
    'exp.hangar.bullets': [
      'Lideré el diseño y desarrollo de soluciones UI transversales para LATAM Airlines, creando código boilerplate para más de 50 equipos en distintas áreas con foco en performance, accesibilidad y buenas prácticas.',
      'Desarrollé y mantuve componentes para proyectos en React y React Native, brindando soporte a equipos en todo el negocio.',
      'Diseñé y construí los distintos pipelines de CI/CD, el despliegue de aplicaciones y la creación de MCPs y Skills para uso de equipos y agentes.',
      'Automaticé procesos y construí herramientas de recopilación de datos y métricas para la toma de decisiones.',
    ],
    'exp.hangar.cs': 'Ver caso de estudio →',

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

    'exp.simple-sme.sector': 'Retail · eCommerce',
    'exp.simple-sme.highlight': 'SME durante la crisis COVID-19',
    'exp.simple-sme.bullets': [
      'Asumí el rol de Subject Matter Expert, apoyando a los nuevos miembros del equipo en el diseño, desarrollo, implementación y despliegue de nuevas funcionalidades en el contexto de la crisis COVID-19.',
      'Lideré decisiones técnicas y mantuve la estabilidad del sistema ante el aumento de la demanda del ecommerce durante la pandemia.',
      'Stack: React microfrontends, Node.js/Express APIs, Redis, imgix como CDN de imágenes, Heroku y GitLab CI/CD.',
    ],

    'exp.gateway.sector': 'Pagos digitales · eCommerce',
    'exp.gateway.highlight': 'Pasarela de pagos para Chile y Perú',
    'exp.gateway.bullets': [
      'Desarrollé una pasarela de pagos con Node.js y Express para CocaCola Embonor, operando en Chile y Perú, con MySQL para la persistencia de transacciones.',
      'Desplegué en AWS EKS usando Kubernetes como orquestador de contenedores, con GitLab CI/CD para la integración continua.',
      'Integré Kiphu como SaaS para pagos digitales.',
    ],

    'exp.simple-fs.sector': 'Retail · eCommerce',
    'exp.simple-fs.highlight': 'Core de ventas online de uno de los mayores retail de Chile y Perú',
    'exp.simple-fs.bullets': [
      'Desarrollé la página principal del sitio, catálogos de productos, ficha de producto y el panel de administración para que los analistas creen campañas, entre otros módulos.',
      'Trabajé de la mano con los departamentos de marketing y tecnología, integrando tecnologías de distintos proveedores y realizando análisis de requerimientos.',
      'Stack: React microfrontends, Node.js/Express APIs, Redis, imgix como CDN de imágenes, Heroku y GitLab CI/CD.',
    ],

    'exp.innspiral.sector': 'Innovación Corporativa',
    'exp.innspiral.highlight': '30% menos time-to-market',
    'exp.innspiral.bullets': [
      'Desarrollé y desplegué plataformas de innovación end-to-end para clientes corporativos, gestionando el ciclo completo desde modelado de BD hasta deploy en cloud.',
      'Reduje en 30% el time-to-market de los pilotos internos.',
    ],

    'exp.earlier.sector': 'Salud · Finanzas · Docencia',
    'exp.earlier.title': 'Roles anteriores',
    'exp.earlier.highlight': 'Donde se sentaron las bases',
    'exp.earlier.ta-title': 'Ayudante — Duoc UC',
    'exp.earlier.ormasoft.bullets': [
      'Arquitecté un sistema unificado de fichas médicas para el sector salud chileno con Aurelia, D3.js para visualización clínica y HTML5 Canvas para renderizado de alto rendimiento.',
    ],
    'exp.earlier.analisis.bullets': [
      'Construí software contable especializado para CasaIdeas con Angular y Node.js/Express, implementando consultas PL/SQL complejas para reportería financiera precisa.',
    ],
    'exp.earlier.duoc.bullets': [
      'Mentoreé a estudiantes en Fundamentos de Programación y Diseño de Bases de Datos mediante talleres y guía práctica.',
    ],

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
      'App de analítica de running integrada con Strava. Coaching con IA via Gemini 2.5 Flash que extrae insights de tu historial de entrenamiento y te ayuda a planificar semanas más inteligentes.',
    'projects.pace.status': 'En desarrollo',
    'projects.intervalo.title': 'Intervalo',
    'projects.intervalo.desc':
      'Visualización sonora de redes de metro (Santiago y Madrid) usando datos abiertos GTFS, MapLibre GL JS y la Web Audio API. Cada estación, línea y trasbordo se convierte en sonido.',
    'projects.intervalo.status': 'En desarrollo',
    'projects.repo': 'Repo',
    'projects.demo': 'Demo',

    // writing
    'writing.title': 'Blog',
    'writing.sub': 'Apuntes sobre performance web, accesibilidad y construir a escala.',
    'writing.more': 'Ver todos los posts',

    // contact
    'contact.title': 'Hablemos.',
    'contact.sub':
      'Abierto a roles de Staff Frontend Engineer y Design System Lead. La forma más rápida de contactarme es por email.',

    // footer
    'footer.credit': 'Diseñado y construido por Rodrigo Bustamante · Madrid · 2026',

    // case study — Hangar Design System
    'hangar.cs.back': '← Volver',
    'hangar.cs.tag': 'Caso de estudio',
    'hangar.cs.title': 'Hangar Design System',
    'hangar.cs.subtitle': 'El backbone de design system para la aerolínea más grande de América Latina',
    'hangar.cs.meta.role': 'Rol',
    'hangar.cs.meta.role.v': 'Software Architect',
    'hangar.cs.meta.period': 'Período',
    'hangar.cs.meta.period.v': 'Sep 2024 — Mar 2026',
    'hangar.cs.meta.scope': 'Alcance',
    'hangar.cs.meta.scope.v': '50+ equipos · React & React Native · Millones de pasajeros',
    'hangar.cs.meta.stack': 'Stack',
    'hangar.cs.meta.stack.v': 'React, React Native, Next.js, TypeScript, Storybook, GCP, Terraform, GitLab CI, Docker',
    'hangar.cs.s1.label': '01 — Problema y contexto',
    'hangar.cs.s1.title': 'Escalar consistencia de UI en 50+ equipos',
    'hangar.cs.s1.p1':
      'LATAM Airlines opera a una escala que pocas organizaciones frontend enfrentan: decenas de equipos de producto independientes, dos plataformas principales (web y mobile), y una base de pasajeros de millones en América Latina y Europa. Antes de Hangar, cada equipo mantenía su propia librería de componentes, generando UX inconsistente, esfuerzo de ingeniería duplicado y ciclos de iteración lentos.',
    'hangar.cs.s1.p2':
      'El mandato era claro pero técnicamente complejo: diseñar y construir un design system unificado que más de 50 equipos pudieran adoptar sin sacrificar su autonomía, garantizando accesibilidad, performance y consistencia de marca en cada touchpoint.',
    'hangar.cs.s2.label': '02 — Arquitectura',
    'hangar.cs.s2.title': 'Tokens, componentes y pipelines',
    'hangar.cs.s2.tokens.h': 'Design tokens',
    'hangar.cs.s2.tokens.p':
      'Una capa de tokens estructurada — color, tipografía, espaciado, movimiento y elevación — funcionó como fuente única de verdad compartida entre diseño (Figma) e ingeniería. Los tokens se versionaban y distribuían como paquetes NPM, permitiendo que los equipos actualizaran de forma incremental.',
    'hangar.cs.s2.components.h': 'Librería de componentes',
    'hangar.cs.s2.components.p':
      'Componentes cross-platform para React (web) y React Native (mobile) cubrieron el espectro completo de UI: formularios, navegación, visualización de datos, feedback y primitivas de layout. Cada componente se documentó en Storybook con anotaciones de accesibilidad y guías de uso.',
    'hangar.cs.s2.cicd.h': 'CI/CD y distribución',
    'hangar.cs.s2.cicd.p':
      'Los pipelines de GitLab CI gestionaron testing automatizado, revisiones de regresión visual, versionado semántico y publicación en NPM en cada merge a main. Terraform Cloud administró la infraestructura GCP que soporta el tooling interno y la instancia de Storybook.',
    'hangar.cs.s3.label': '03 — Diferenciador',
    'hangar.cs.s3.title': 'MCPs y Skills: hacer el DS agent-native',
    'hangar.cs.s3.p1':
      'Más allá de la librería de componentes en sí, diseñé y construí servidores MCP (Model Context Protocol) y Claude Skills que permitieron que los equipos de producto — y los agentes de IA — consumieran Hangar directamente desde su entorno de desarrollo. Los ingenieros podían consultar APIs de componentes, obtener ejemplos de uso y generar UIs conformes sin salir de su editor.',
    'hangar.cs.s3.p2':
      'Esto convirtió a Hangar en uno de los primeros design systems de la región explícitamente arquitectado para flujos de desarrollo asistidos por IA, reduciendo la fricción de onboarding para nuevos equipos y acelerando la adopción.',
    'hangar.cs.s4.label': '04 — Impacto',
    'hangar.cs.s4.title': 'Métricas y resultados',
    'hangar.cs.s4.adoption.h': 'Adopción',
    'hangar.cs.s4.adoption.v': '50+ equipos de producto consumiendo Hangar',
    'hangar.cs.s4.velocity.h': 'Velocidad de entrega',
    'hangar.cs.s4.velocity.v': '~40% más rápido en entrega de UI vía componentes compartidos + Storybook',
    'hangar.cs.s4.a11y.h': 'Accesibilidad',
    'hangar.cs.s4.a11y.v': '100% de los componentes core con WCAG AA',
    'hangar.cs.s4.reach.h': 'Alcance',
    'hangar.cs.s4.reach.v':
      'Componentes desplegados en productos que llegan a millones de pasajeros en más de 10 países.',
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
