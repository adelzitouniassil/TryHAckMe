import { LearningPath } from '../types';

export const learningPathsData: LearningPath[] = [
  {
    id: 'complete-beginner',
    title: {
      en: 'Complete Beginner',
      fr: 'Grand Débutant',
    },
    badgeName: 'Beginner Path',
    color: 'from-emerald-500 to-teal-700',
    description: {
      en: 'The essential starting point for anyone entering cyber security. Learn Linux, networking fundamentals, web basics, and fundamental hacking methodologies.',
      fr: 'Le point de départ incontournable en cybersécurité. Maîtrisez Linux, les fondamentaux du réseau, le web et les méthodologies de hacking.',
    },
    level: {
      en: 'Beginner',
      fr: 'Débutant',
    },
    estimatedHours: 42,
    modulesCount: 8,
    roomsCount: 29,
    roomIds: ['linux-fundamentals-1', 'network-services-1', 'owasp-top-10'],
    enrolled: 420500,
  },
  {
    id: 'jr-pentester',
    title: {
      en: 'Jr Penetration Tester',
      fr: 'Testeur d\'intrusion Junior',
    },
    badgeName: 'Pentester Path',
    color: 'from-red-500 to-rose-700',
    description: {
      en: 'Master hands-on penetration testing methodologies, network and web vulnerability scanning, exploit frameworks, privilege escalation, and CTF techniques.',
      fr: 'Apprenez les méthodologies réelles d\'intrusion, l\'exploitation de vulnérabilités web et réseau, l\'élévation de privilèges et les techniques CTF.',
    },
    level: {
      en: 'Intermediate',
      fr: 'Intermédiaire',
    },
    estimatedHours: 65,
    modulesCount: 12,
    roomsCount: 44,
    roomIds: ['linux-fundamentals-1', 'owasp-top-10', 'blue-eternal-blue', 'pickle-rick', 'linux-privesc'],
    enrolled: 310200,
  },
  {
    id: 'web-fundamentals',
    title: {
      en: 'Web Fundamentals',
      fr: 'Fondamentaux de la Sécurité Web',
    },
    badgeName: 'Web Specialist',
    color: 'from-amber-500 to-orange-700',
    description: {
      en: 'Explore the modern web stack and learn how to uncover vulnerabilities like OWASP Top 10, cross-site scripting (XSS), SQL injection, and authentication flaws.',
      fr: 'Explorez la sécurité des applications web modernes et détectez les failles OWASP Top 10, XSS, injections SQL et contournements d\'authentification.',
    },
    level: {
      en: 'Beginner - Intermediate',
      fr: 'Débutant - Intermédiaire',
    },
    estimatedHours: 38,
    modulesCount: 7,
    roomsCount: 24,
    roomIds: ['owasp-top-10', 'pickle-rick'],
    enrolled: 245000,
  },
  {
    id: 'cyber-defense',
    title: {
      en: 'Cyber Defense & SOC Level 1',
      fr: 'Cyberdéfense & Analyste SOC',
    },
    badgeName: 'Blue Teamer',
    color: 'from-blue-500 to-indigo-700',
    description: {
      en: 'Become a blue-team analyst. Learn threat detection, log analysis (Splunk, Wireshark, ELK), digital forensics, phishing investigations, and incident response.',
      fr: 'Formez-vous aux opérations défensives (Blue Team) : détection de menaces, analyse de logs avec Splunk/Wireshark, analyse forensique et gestion d\'incidents.',
    },
    level: {
      en: 'Intermediate',
      fr: 'Intermédiaire',
    },
    estimatedHours: 54,
    modulesCount: 10,
    roomsCount: 36,
    roomIds: ['network-services-1', 'blue-eternal-blue'],
    enrolled: 198000,
  },
  {
    id: 'sql-and-database-security',
    title: {
      en: 'SQL & Database Security Mastery',
      fr: 'Maîtrise du SQL & Sécurité des Bases de Données',
    },
    badgeName: 'SQL Master',
    color: 'from-cyan-500 to-blue-700',
    description: {
      en: 'Master relational database architecture, SQL syntax, and both offensive and defensive database operations: In-Band & UNION SQLi, Blind SQL injection, automated tools like sqlmap, and prepared statement security.',
      fr: 'Maîtrisez l\'architecture des bases relationnelles, la syntaxe SQL et les opérations offensives/défensives : injections SQL directes et UNION, Blind SQLi, outils automatisés comme sqlmap et requêtes préparées.',
    },
    level: {
      en: 'Beginner - Advanced',
      fr: 'Débutant - Avancé',
    },
    estimatedHours: 32,
    modulesCount: 5,
    roomsCount: 18,
    roomIds: ['sql-fundamentals', 'sqli-fundamentals', 'advanced-sqli-and-defense'],
    enrolled: 184500,
  },
];
