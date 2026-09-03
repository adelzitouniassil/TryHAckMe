import { Room } from '../types';

export const roomsData: Room[] = [
  {
    id: 'linux-fundamentals-1',
    slug: 'linux-fundamentals-part-1',
    title: 'Linux Fundamentals Part 1',
    difficulty: 'Easy',
    category: 'Linux',
    type: 'Walkthrough',
    free: true,
    usersEnrolled: 342190,
    rating: 4.95,
    badgeIcon: 'terminal',
    targetIP: '10.10.112.45',
    description: {
      en: 'Learn the foundational concepts of the Linux operating system, command line navigation, directory traversal, and essential commands.',
      fr: 'Apprenez les bases fondamentales du système d\'exploitation Linux, la navigation en ligne de commande et les commandes essentielles.',
    },
    tasks: [
      {
        id: 'task-1',
        title: {
          en: 'Task 1: Introduction to Linux & Commands',
          fr: 'Tâche 1 : Introduction à Linux & Commandes',
        },
        content: {
          en: `Linux is an open-source, Unix-like operating system kernel created by Linus Torvalds in 1991. Today, Linux powers over 90% of cloud servers, supercomputers, and critical infrastructure.

When interacting with a Linux system, the terminal (or shell) is your primary weapon. The standard shell in most Linux distributions is **bash** (Bourne Again SHell).

Here are the fundamental commands for navigation:
- \`whoami\`: Prints the username of the currently logged-in user.
- \`pwd\`: Print Working Directory - displays the full path of the current folder.
- \`ls\`: Lists the contents of the current directory.
- \`cd <dir>\`: Change Directory to navigate to another folder.

Deploy the target machine or open your **AttackBox Terminal** to inspect your environment and complete the questions below.`,
          fr: `Linux est un noyau de système d'exploitation de type Unix créé par Linus Torvalds en 1991. Aujourd'hui, Linux propulse plus de 90 % des serveurs cloud, des supercalculateurs et des infrastructures critiques.

Lorsque vous interagissez avec un système Linux, le terminal (ou shell) est votre arme principale. Le shell standard sur la plupart des distributions est **bash**.

Voici les commandes fondamentales de navigation :
- \`whoami\` : Affiche le nom d'utilisateur actuel.
- \`pwd\` : Affiche le chemin absolu du répertoire de travail actuel.
- \`ls\` : Liste le contenu du répertoire courant.
- \`cd <rep>\` : Change de répertoire pour naviguer dans un dossier.

Démarrez la machine cible ou ouvrez votre **Terminal AttackBox** pour explorer votre environnement et répondre aux questions ci-dessous.`,
        },
        questions: [
          {
            id: 'q1-1',
            question: {
              en: 'What command displays the current logged in user?',
              fr: 'Quelle commande affiche l\'utilisateur actuellement connecté ?',
            },
            hint: {
              en: 'Think of "who am I" combined into one word.',
              fr: 'Pensez à "qui suis-je" en anglais en un seul mot.',
            },
            answer: 'whoami',
            points: 10,
          },
          {
            id: 'q1-2',
            question: {
              en: 'What is the acronym of the command used to output the current directory path?',
              fr: 'Quel est l\'acronyme de la commande utilisée pour afficher le chemin du répertoire actuel ?',
            },
            hint: {
              en: 'Print Working Directory.',
              fr: 'Print Working Directory (3 lettres).',
            },
            answer: 'pwd',
            points: 10,
          },
        ],
      },
      {
        id: 'task-2',
        title: {
          en: 'Task 2: Interacting with the Filesystem & Reading Flags',
          fr: 'Tâche 2 : Interaction avec le système de fichiers & Lecture de flags',
        },
        content: {
          en: `In Linux, "everything is a file". Even hardware devices are represented as file nodes under \`/dev\`.

To read and manipulate text files directly from the terminal, the following commands are crucial:
- \`cat <filename>\`: Concatenates and outputs the entire content of a file to stdout.
- \`grep <pattern> <file>\`: Searches for lines containing a specific keyword or pattern.
- \`find / -name "*.txt" 2>/dev/null\`: Searches the filesystem for files ending in .txt while suppressing permission errors.

On the target machine, a secret flag was left by the system administrator in the \`/home/shiba2/flag.txt\` directory.

Inspect the target by executing:
\`cat /home/shiba2/flag.txt\` or read the files in the directory.`,
          fr: `Dans Linux, "tout est fichier". Même les périphériques matériels sont représentés sous forme de fichiers dans \`/dev\`.

Pour lire et manipuler des fichiers texte directement depuis le terminal, les commandes suivantes sont cruciales :
- \`cat <fichier>\` : Concatène et affiche tout le contenu d'un fichier sur la sortie standard.
- \`grep <motif> <fichier>\` : Recherche les lignes contenant un mot-clé ou motif spécifique.
- \`find / -name "*.txt" 2>/dev/null\` : Recherche dans le système les fichiers se terminant par .txt en ignorant les erreurs de permission.

Sur la machine cible, un flag secret a été déposé par l'administrateur dans \`/home/shiba2/flag.txt\`.

Exécutez :
\`cat /home/shiba2/flag.txt\` pour découvrir le flag.`,
        },
        questions: [
          {
            id: 'q2-1',
            question: {
              en: 'What command is used to concatenate and read the contents of a file?',
              fr: 'Quelle commande est utilisée pour concaténer et lire le contenu d\'un fichier ?',
            },
            hint: {
              en: 'Related to a feline pet.',
              fr: 'Nom d\'un félin en anglais.',
            },
            answer: 'cat',
            points: 15,
          },
          {
            id: 'q2-2',
            question: {
              en: 'What is the flag found in /home/shiba2/flag.txt?',
              fr: 'Quel est le flag trouvé dans /home/shiba2/flag.txt ?',
            },
            hint: {
              en: 'Run "cat /home/shiba2/flag.txt" in your AttackBox terminal.',
              fr: 'Exécutez "cat /home/shiba2/flag.txt" dans votre terminal AttackBox.',
            },
            answer: 'THM{l1nux_b4s1cs_m4st3r}',
            points: 25,
          },
        ],
      },
    ],
  },
  {
    id: 'owasp-top-10',
    slug: 'owasp-top-10',
    title: 'OWASP Top 10 Web Security',
    difficulty: 'Medium',
    category: 'Web',
    type: 'Walkthrough',
    free: true,
    usersEnrolled: 289430,
    rating: 4.92,
    badgeIcon: 'globe',
    targetIP: '10.10.165.88',
    description: {
      en: 'Master the 10 most critical web application security risks defined by OWASP, including SQL Injection, Command Injection, and Broken Access Control.',
      fr: 'Maîtrisez les 10 risques de sécurité des applications web les plus critiques définis par l\'OWASP (Injection SQL, Injection de commandes, etc.).',
    },
    tasks: [
      {
        id: 'owasp-task-1',
        title: {
          en: 'Task 1: Command Injection Vulnerability',
          fr: 'Tâche 1 : Vulnérabilité d\'injection de commande (Command Injection)',
        },
        content: {
          en: `Command injection occurs when server-side code executes system shell commands using unvalidated user input.

Consider this vulnerable PHP snippet:
\`\`\`php
<?php
$ip = $_GET['ip'];
system("ping -c 4 " . $ip);
?>
\`\`\`

If an attacker inputs \`127.0.0.1; whoami\` or \`127.0.0.1 && cat /etc/passwd\`, the server executes both the ping command AND the attacker's arbitrary command!

Test the web server running on port 80 of your target:
\`curl "http://10.10.165.88/ping.php?ip=127.0.0.1;cat+/etc/flag"\`

Observe the returned flag.`,
          fr: `L'injection de commandes survient lorsqu'un code serveur exécute des commandes système en utilisant des entrées utilisateur non assainies.

Exemple de code PHP vulnérable :
\`\`\`php
<?php
$ip = $_GET['ip'];
system("ping -c 4 " . $ip);
?>
\`\`\`

Si un attaquant soumet \`127.0.0.1; whoami\` ou \`127.0.0.1 && cat /etc/passwd\`, le serveur exécute le ping ET la commande arbitraire injectée !

Testez le serveur web sur le port 80 de la cible :
\`curl "http://10.10.165.88/ping.php?ip=127.0.0.1;cat+/etc/flag"\`

Observez le flag retourné.`,
        },
        questions: [
          {
            id: 'owasp-q1',
            question: {
              en: 'What shell separator character allows chaining two commands in Linux bash?',
              fr: 'Quel caractère séparateur de shell permet d\'enchaîner deux commandes sous Linux ?',
            },
            hint: {
              en: 'A punctuation mark used at the end of statements in C/Java.',
              fr: 'Le point-virgule.',
            },
            answer: ';',
            points: 10,
          },
          {
            id: 'owasp-q2',
            question: {
              en: 'What is the command injection flag retrieved from /etc/flag?',
              fr: 'Quel est le flag d\'injection de commande récupéré dans /etc/flag ?',
            },
            hint: {
              en: 'Run "curl http://10.10.165.88/ping.php?ip=127.0.0.1;cat+/etc/flag" in the terminal.',
              fr: 'Exécutez "curl http://10.10.165.88/ping.php?ip=127.0.0.1;cat+/etc/flag" dans le terminal.',
            },
            answer: 'THM{c0mm4nd_1nj3ct10n_succ3ss}',
            points: 30,
          },
        ],
      },
      {
        id: 'owasp-task-2',
        title: {
          en: 'Task 2: SQL Injection (SQLi) Bypass',
          fr: 'Tâche 2 : Contournement par Injection SQL (SQLi)',
        },
        content: {
          en: `SQL Injection occurs when malicious SQL statements are inserted into entry fields for execution.

In an authentication form:
\`\`\`sql
SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD_INPUT';
\`\`\`

Injecting \`' OR '1'='1\` turns the query into:
\`\`\`sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '...';
\`\`\`
Because \`'1'='1'\` evaluates to true, the authentication succeeds as the first user (often the admin).`,
          fr: `L'injection SQL se produit lorsque des requêtes SQL malveillantes sont insérées dans des champs d'entrée non sécurisés.

Dans un formulaire de connexion :
\`\`\`sql
SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD_INPUT';
\`\`\`

Injecter \`' OR '1'='1\` transforme la requête et évalue la condition comme vraie, accordant l'accès administrateur.`,
        },
        questions: [
          {
            id: 'owasp-q3',
            question: {
              en: 'What is the standard payload string used to evaluate SQL login bypass to true?',
              fr: 'Quelle est la charge utile (payload) standard pour forcer une condition vraie en SQL ?',
            },
            hint: {
              en: "' OR '1'='1",
              fr: "' OR '1'='1",
            },
            answer: "' OR '1'='1",
            points: 20,
          },
        ],
      },
    ],
  },
  {
    id: 'blue-eternal-blue',
    slug: 'blue-ms17-010',
    title: 'Blue (MS17-010 EternalBlue)',
    difficulty: 'Easy',
    category: 'Windows',
    type: 'Walkthrough',
    free: true,
    usersEnrolled: 412980,
    rating: 4.96,
    badgeIcon: 'shield-alert',
    targetIP: '10.10.198.12',
    description: {
      en: 'Scan and exploit a Windows 7 machine vulnerable to the famous EternalBlue exploit (MS17-010) leaked by Shadow Brokers.',
      fr: 'Scannez et exploitez une machine Windows 7 vulnérable au célèbre exploit EternalBlue (MS17-010) ayant causé WannaCry.',
    },
    tasks: [
      {
        id: 'blue-task-1',
        title: {
          en: 'Task 1: Reconnaissance with Nmap',
          fr: 'Tâche 1 : Reconnaissance avec Nmap',
        },
        content: {
          en: `Reconnaissance is the first step of ethical hacking. Nmap (Network Mapper) is the industry-standard tool for network scanning and vulnerability discovery.

Run an aggressive port and script scan on the target:
\`nmap -sV -sC -p 139,445 10.10.198.12\`

Notice the SMB port 445 open on the target. Then run the nmap vulnerability script:
\`nmap --script smb-vuln-ms17-010 -p 445 10.10.198.12\``,
          fr: `La reconnaissance est la première étape du piratage éthique. Nmap est l'outil de référence pour le scan réseau et la détection de vulnérabilités.

Lancez un scan de versions et de scripts sur la cible :
\`nmap -sV -sC -p 139,445 10.10.198.12\`

Le port SMB 445 est ouvert. Vérifiez la vulnérabilité avec :
\`nmap --script smb-vuln-ms17-010 -p 445 10.10.198.12\``,
        },
        questions: [
          {
            id: 'blue-q1',
            question: {
              en: 'How many ports are running SMB protocol on standard Windows systems (e.g. 139 and 445)?',
              fr: 'Quel port standard est utilisé par SMB direct sur TCP ?',
            },
            hint: {
              en: 'The port associated with Microsoft-DS.',
              fr: 'Le port 445.',
            },
            answer: '445',
            points: 10,
          },
          {
            id: 'blue-q2',
            question: {
              en: 'What is the official Microsoft Security Bulletin code for EternalBlue (e.g. MSXX-XXX)?',
              fr: 'Quel est le code du bulletin de sécurité Microsoft pour EternalBlue ?',
            },
            hint: {
              en: 'MS17-010',
              fr: 'MS17-010',
            },
            answer: 'MS17-010',
            points: 15,
          },
        ],
      },
      {
        id: 'blue-task-2',
        title: {
          en: 'Task 2: Gaining Access and Capturing the System Flag',
          fr: 'Tâche 2 : Obtention de l\'accès et capture du flag système',
        },
        content: {
          en: `Once the vulnerability is confirmed, Metasploit can be used with the exploit module:
\`exploit/windows/smb/ms17_010_eternalblue\`

When the payload executes successfully, you receive a \`NT AUTHORITY\\SYSTEM\` shell on the Windows target.

Navigate to \`C:\\Windows\\System32\\config\\flag.txt\` to find the root flag!`,
          fr: `Une fois la faille confirmée, le module Metasploit \`exploit/windows/smb/ms17_010_eternalblue\` permet d'exécuter un code distant.

L'exploitation donne directement un shell avec les privilèges suprêmes \`NT AUTHORITY\\SYSTEM\`.

Le flag est situé dans \`C:\\Windows\\System32\\config\\flag.txt\` !`,
        },
        questions: [
          {
            id: 'blue-q3',
            question: {
              en: 'What is the flag located in C:\\Windows\\System32\\config\\flag.txt?',
              fr: 'Quel est le flag situé dans C:\\Windows\\System32\\config\\flag.txt ?',
            },
            hint: {
              en: 'Use "nmap" or "cat" commands in AttackBox or inspect the machine.',
              fr: 'Utilisez le terminal AttackBox pour explorer le système.',
            },
            answer: 'THM{ms17_010_pwn3d}',
            points: 35,
          },
        ],
      },
    ],
  },
  {
    id: 'pickle-rick',
    slug: 'pickle-rick-ctf',
    title: 'Pickle Rick CTF Challenge',
    difficulty: 'Easy',
    category: 'Web',
    type: 'Challenge',
    free: true,
    usersEnrolled: 258900,
    rating: 4.88,
    badgeIcon: 'skull',
    targetIP: '10.10.180.201',
    description: {
      en: 'A Rick and Morty CTF challenge! Rick has turned himself into a pickle again and needs you to find his 3 secret ingredients to turn back human.',
      fr: 'Défi CTF Rick et Morty ! Rick s\'est encore transformé en cornichon et a besoin de vous pour retrouver ses 3 ingrédients secrets.',
    },
    tasks: [
      {
        id: 'rick-task-1',
        title: {
          en: 'Task 1: Recon & Finding Ingredient 1',
          fr: 'Tâche 1 : Reconnaissance & Premier Ingrédient',
        },
        content: {
          en: `This Rick and Morty-themed challenge requires you to exploit a web server to find 3 ingredients that will help Rick turn back from a pickle into a human.

Start by performing web reconnaissance:
1. Inspect the HTML page source of \`http://10.10.180.201\` (look for comments containing usernames like \`R1ckRul3s\`).
2. Check \`/robots.txt\` for hidden passwords or paths.
3. Access the portal login and execute commands to read the first ingredient:
\`cat "Sup3rS3cretPickl3Ingred.txt"\``,
          fr: `Dans ce défi inspiré de Rick et Morty, vous devez exploiter un serveur web pour récupérer 3 ingrédients secrets.

Commencez par la reconnaissance web :
1. Inspectez la source HTML de \`http://10.10.180.201\` (repérez les commentaires avec les identifiants \`R1ckRul3s\`).
2. Vérifiez \`/robots.txt\` pour trouver des mots de passe.
3. Connectez-vous au portail et lisez le premier ingrédient avec :
\`cat "Sup3rS3cretPickl3Ingred.txt"\``,
        },
        questions: [
          {
            id: 'rick-q1',
            question: {
              en: 'What is the first ingredient Rick needs?',
              fr: 'Quel est le premier ingrédient dont Rick a besoin ?',
            },
            hint: {
              en: 'mr. meeseek hair',
              fr: 'mr. meeseek hair',
            },
            answer: 'mr. meeseek hair',
            points: 25,
          },
          {
            id: 'rick-q2',
            question: {
              en: 'What is the second ingredient located in /home/rick/second ingredients?',
              fr: 'Quel est le second ingrédient situé dans /home/rick/second ingredients ?',
            },
            hint: {
              en: '1 jerry tear',
              fr: '1 jerry tear',
            },
            answer: '1 jerry tear',
            points: 30,
          },
        ],
      },
    ],
  },
  {
    id: 'network-services-1',
    slug: 'network-services-smb-telnet',
    title: 'Network Services: SMB & Telnet',
    difficulty: 'Easy',
    category: 'Network',
    type: 'Walkthrough',
    free: true,
    usersEnrolled: 184500,
    rating: 4.89,
    badgeIcon: 'server',
    targetIP: '10.10.220.74',
    description: {
      en: 'Learn how to enumerate and exploit misconfigured network services such as SMB file shares and unencrypted Telnet protocols.',
      fr: 'Apprenez à énumérer et exploiter les services réseau mal configurés comme les partages SMB et le protocole Telnet non chiffré.',
    },
    tasks: [
      {
        id: 'net-task-1',
        title: {
          en: 'Task 1: Enumerating SMB Shares with smbclient',
          fr: 'Tâche 1 : Énumération de partages SMB avec smbclient',
        },
        content: {
          en: `SMB (Server Message Block) is a client-server communication protocol used for sharing access to files, printers, and serial ports across a local network.

To list available shares anonymously:
\`smbclient -L //10.10.220.74/ -N\`

If you see a public share called \`profiles\`, connect to it:
\`smbclient //10.10.220.74/profiles -N\`

Once inside the share, use \`ls\` and \`get flag.txt\` to inspect files.`,
          fr: `SMB est un protocole de partage de fichiers et d'imprimantes sur réseau local.

Pour lister les partages accessibles anonymement :
\`smbclient -L //10.10.220.74/ -N\`

Connectez-vous au partage public \`profiles\` :
\`smbclient //10.10.220.74/profiles -N\`

Utilisez \`ls\` et \`get flag.txt\` pour télécharger et lire le fichier flag.`,
        },
        questions: [
          {
            id: 'net-q1',
            question: {
              en: 'What smbclient flag is used to connect with no password (anonymous login)?',
              fr: 'Quel paramètre de smbclient permet de se connecter sans mot de passe (-N) ?',
            },
            hint: {
              en: '-N',
              fr: '-N',
            },
            answer: '-N',
            points: 10,
          },
          {
            id: 'net-q2',
            question: {
              en: 'What is the secret flag retrieved from the profiles share?',
              fr: 'Quel est le flag secret récupéré sur le partage profiles ?',
            },
            hint: {
              en: 'THM{smb_sh4r3_pwn3d}',
              fr: 'THM{smb_sh4r3_pwn3d}',
            },
            answer: 'THM{smb_sh4r3_pwn3d}',
            points: 25,
          },
        ],
      },
    ],
  },
  {
    id: 'linux-privesc',
    slug: 'linux-privilege-escalation',
    title: 'Linux Privilege Escalation',
    difficulty: 'Hard',
    category: 'PrivEsc',
    type: 'Walkthrough',
    free: false,
    usersEnrolled: 198200,
    rating: 4.97,
    badgeIcon: 'key',
    targetIP: '10.10.245.99',
    description: {
      en: 'Escalate low-privilege user access to full root authority using SUID binaries, misconfigured sudo permissions, and cron jobs.',
      fr: 'Élevez vos privilèges utilisateur vers le statut root complet via les binaires SUID, sudoers mal configurés et tâches cron.',
    },
    tasks: [
      {
        id: 'priv-task-1',
        title: {
          en: 'Task 1: SUID Binary Exploitation',
          fr: 'Tâche 1 : Exploitation des binaires avec bit SUID',
        },
        content: {
          en: `When a binary has the SUID (Set User ID) permission bit enabled, it executes with the privileges of the file owner (often root) rather than the executing user.

To find all SUID binaries on a Linux machine:
\`find / -perm -u=s -type f 2>/dev/null\`

Check GTFOBins for binaries like \`/usr/bin/find\` or \`/usr/bin/vim\` that can spawn a root shell:
\`find . -exec /bin/sh -p \\; -quit\`

Once root, read \`/root/root.txt\`.`,
          fr: `Lorsqu'un binaire a le bit SUID activé, il s'exécute avec les privilèges du propriétaire (souvent root).

Pour lister tous les binaires SUID :
\`find / -perm -u=s -type f 2>/dev/null\`

Consultez GTFOBins pour exploiter des binaires comme find ou vim et obtenir un shell root :
\`find . -exec /bin/sh -p \\; -quit\`

Lisez ensuite \`/root/root.txt\`.`,
        },
        questions: [
          {
            id: 'priv-q1',
            question: {
              en: 'What command checks current sudo privileges for the logged-in user?',
              fr: 'Quelle commande vérifie les privilèges sudo de l\'utilisateur connecté ?',
            },
            hint: {
              en: 'sudo -l',
              fr: 'sudo -l',
            },
            answer: 'sudo -l',
            points: 15,
          },
          {
            id: 'priv-q2',
            question: {
              en: 'What is the root flag stored in /root/root.txt?',
              fr: 'Quel est le flag root enregistré dans /root/root.txt ?',
            },
            hint: {
              en: 'THM{r00t_pr1v1l3g3_3sc4l4t10n}',
              fr: 'THM{r00t_pr1v1l3g3_3sc4l4t10n}',
            },
            answer: 'THM{r00t_pr1v1l3g3_3sc4l4t10n}',
            points: 40,
          },
        ],
      },
    ],
  },
  {
    id: 'sql-fundamentals',
    slug: 'sql-fundamentals-and-queries',
    title: 'SQL Fundamentals & Relational Databases',
    difficulty: 'Easy',
    category: 'SQL',
    type: 'Walkthrough',
    free: true,
    usersEnrolled: 218400,
    rating: 4.96,
    badgeIcon: 'database',
    targetIP: '10.10.180.25',
    description: {
      en: 'Learn foundational SQL concepts, relational database architecture (RDBMS), writing SELECT queries, filtering with WHERE, relational JOINs, aggregations, and data modifications.',
      fr: 'Apprenez les concepts fondamentaux du SQL, l\'architecture des bases relationnelles (SGBDR), les requêtes SELECT, les filtres WHERE, les jointures (JOIN) et les agrégations.',
    },
    tasks: [
      {
        id: 'sql-task-1',
        title: {
          en: 'Task 1: Relational Architecture & The SELECT Query',
          fr: 'Tâche 1 : Architecture Relationnelle & Requête SELECT',
        },
        content: {
          en: `Structured Query Language (SQL) is the universal standard language for storing, manipulating, and retrieving data stored in Relational Database Management Systems (RDBMS) like PostgreSQL, MySQL, SQLite, and Microsoft SQL Server.

In an RDBMS, data is organized in **tables** composed of rows (records) and columns (fields). Each record is uniquely identified by a **Primary Key**.

The fundamental query in SQL is the \`SELECT\` statement:
- \`SELECT * FROM users;\` : Retrieves every column and row from the users table.
- \`SELECT username, email FROM staff WHERE role = 'Security';\` : Selects specific columns and filters rows with a \`WHERE\` clause.
- \`SELECT * FROM products ORDER BY price DESC;\` : Sorts results in descending order.

Inspect the sample database on the target machine \`10.10.180.25\` and answer the questions below.`,
          fr: `Le Structured Query Language (SQL) est le langage standard pour manipuler et interroger les données dans les systèmes de gestion de bases de données relationnelles (SGBDR) comme PostgreSQL, MySQL et SQLite.

Dans un SGBDR, les données sont stockées dans des **tables** composées de lignes (enregistrements) et de colonnes (champs).

La commande fondamentale est \`SELECT\` :
- \`SELECT * FROM users;\` : Récupère toutes les colonnes et lignes.
- \`SELECT username, email FROM staff WHERE role = 'Security';\` : Filtre avec la clause \`WHERE\`.
- \`SELECT * FROM products ORDER BY price DESC;\` : Trie les résultats par ordre décroissant.

Explorez la base d'exemple et répondez aux questions ci-dessous.`,
        },
        questions: [
          {
            id: 'q-sql-1',
            question: {
              en: 'What SQL keyword is used to filter records that meet a specified condition?',
              fr: 'Quel mot-clé SQL permet de filtrer les enregistrements selon une condition ?',
            },
            hint: {
              en: 'Commonly paired with operators like =, >, <, LIKE.',
              fr: 'Souvent associé à des opérateurs comme =, >, <, LIKE.',
            },
            answer: 'WHERE',
            points: 10,
          },
          {
            id: 'q-sql-2',
            question: {
              en: 'What SQL clause is used to sort the result-set in ascending or descending order?',
              fr: 'Quelle clause SQL est utilisée pour trier les résultats par ordre croissant ou décroissant ?',
            },
            hint: {
              en: 'ORDER ...',
              fr: 'ORDER ...',
            },
            answer: 'ORDER BY',
            points: 10,
          },
        ],
      },
      {
        id: 'sql-task-2',
        title: {
          en: 'Task 2: Relational JOINs & Aggregate Functions',
          fr: 'Tâche 2 : Jointures Relationnelles & Fonctions d\'Agrégation',
        },
        content: {
          en: `Real-world databases distribute data across multiple normalized tables connected through **Foreign Keys**.

To combine records from related tables in a single query, SQL provides **JOIN** operations:
- \`INNER JOIN\`: Returns records that have matching values in both tables.
  \`SELECT users.username, orders.total FROM users INNER JOIN orders ON users.id = orders.user_id;\`
- \`LEFT JOIN\`: Returns all records from the left table, and matched records from the right table.

SQL also includes powerful **Aggregate Functions**:
- \`COUNT(*)\`: Returns the number of rows.
- \`SUM(column)\` / \`AVG(column)\`: Calculates totals or arithmetic means.
- \`GROUP BY\`: Groups rows that have the same values into summary rows.`,
          fr: `Les bases de données réelles séparent les données dans plusieurs tables reliées par des **clés étrangères** (Foreign Keys).

Pour combiner des données provenant de plusieurs tables :
- \`INNER JOIN\` : Renvoie les enregistrements ayant des correspondances dans les deux tables.
- \`LEFT JOIN\` : Renvoie tous les enregistrements de la table de gauche et les correspondances de droite.

Les **fonctions d'agrégation** permettent de synthétiser les données :
- \`COUNT(*)\` : Compte le nombre de lignes.
- \`SUM()\` / \`AVG()\` : Calcule des sommes ou moyennes.
- \`GROUP BY\` : Regroupe les lignes ayant les mêmes valeurs.`,
        },
        questions: [
          {
            id: 'q-sql-3',
            question: {
              en: 'Which SQL clause joins rows from two tables based on matching key columns?',
              fr: 'Quelle clause SQL joint les lignes de deux tables en fonction de colonnes clés correspondantes ?',
            },
            hint: {
              en: 'INNER JOIN',
              fr: 'INNER JOIN',
            },
            answer: 'INNER JOIN',
            points: 10,
          },
          {
            id: 'q-sql-4',
            question: {
              en: 'What aggregate function returns the total number of rows matching a criteria?',
              fr: 'Quelle fonction d\'agrégation renvoie le nombre total de lignes correspondant à un critère ?',
            },
            hint: {
              en: 'COUNT(...)',
              fr: 'COUNT(...)',
            },
            answer: 'COUNT',
            points: 10,
          },
        ],
      },
      {
        id: 'sql-task-3',
        title: {
          en: 'Task 3: Data Manipulation (INSERT, UPDATE, DELETE) & Database Schema Inspection',
          fr: 'Tâche 3 : Manipulation de données & Exploration du Schéma',
        },
        content: {
          en: `Data Manipulation Language (DML) enables creating and modifying database records:
- \`INSERT INTO customers (name, role) VALUES ('Alice', 'Security Analyst');\`
- \`UPDATE customers SET role = 'Lead Auditor' WHERE name = 'Alice';\`
- \`DELETE FROM sessions WHERE expired_at < NOW();\`

On the target machine \`10.10.180.25\`, the database administrator provisioned a table named \`flag_store\` containing a verification hash.

Query the database or use the terminal to read the flag value from \`flag_store\`.`,
          fr: `Le langage de manipulation de données (DML) permet de créer et modifier des enregistrements :
- \`INSERT INTO ... VALUES (...)\`
- \`UPDATE ... SET ... WHERE ...\`
- \`DELETE FROM ... WHERE ...\`

Sur la machine cible \`10.10.180.25\`, la table \`flag_store\` contient un hash de validation pour valider cette salle.`,
        },
        questions: [
          {
            id: 'q-sql-5',
            question: {
              en: 'What SQL statement modifies existing records in a database table?',
              fr: 'Quelle instruction SQL permet de modifier des enregistrements existants ?',
            },
            hint: {
              en: 'UPDATE table_name SET ...',
              fr: 'UPDATE ...',
            },
            answer: 'UPDATE',
            points: 10,
          },
          {
            id: 'q-sql-6',
            question: {
              en: 'What is the flag found inside the flag_store table?',
              fr: 'Quel est le flag trouvé dans la table flag_store ?',
            },
            hint: {
              en: 'THM{sql_qu3ry_fund4m3nt4ls_m4st3r}',
              fr: 'THM{sql_qu3ry_fund4m3nt4ls_m4st3r}',
            },
            answer: 'THM{sql_qu3ry_fund4m3nt4ls_m4st3r}',
            points: 30,
          },
        ],
      },
    ],
  },
  {
    id: 'sqli-fundamentals',
    slug: 'sql-injection-fundamentals',
    title: 'SQL Injection (SQLi) Vulnerabilities',
    difficulty: 'Easy',
    category: 'SQL',
    type: 'Walkthrough',
    free: true,
    usersEnrolled: 329100,
    rating: 4.98,
    badgeIcon: 'shield-alert',
    targetIP: '10.10.165.80',
    description: {
      en: 'Understand how unvalidated user inputs corrupt backend SQL logic. Learn Authentication Bypass, Error-Based SQLi, UNION-Based query exploitation, and table enumeration.',
      fr: 'Comprenez comment des entrées non validées altèrent les requêtes SQL. Maîtrisez le contournement d\'authentification, les erreurs SQLi, l\'exploitation UNION et l\'énumération des tables.',
    },
    tasks: [
      {
        id: 'sqli-task-1',
        title: {
          en: 'Task 1: SQL Injection Anatomy & Authentication Bypass',
          fr: 'Tâche 1 : Anatomie de l\'Injection SQL & Contournement d\'Authentification',
        },
        content: {
          en: `SQL Injection (SQLi) occurs when untrusted user input is directly concatenated into a dynamic database query without proper validation or parameterization.

Consider this vulnerable PHP login code:
\`\`\`php
$username = $_POST['username'];
$password = $_POST['password'];
$sql = "SELECT * FROM users WHERE username = '" . $username . "' AND password = '" . $password . "';";
\`\`\`

If an attacker inputs:
\`admin' --\`

The resulting query executed by the database becomes:
\`\`\`sql
SELECT * FROM users WHERE username = 'admin' --' AND password = '...';
\`\`\`
The \`--\` characters instruct the database engine to treat everything following it as a comment, completely ignoring the password check!

Furthermore, entering \`' OR 1=1 --\` creates a tautology where the condition is permanently true, returning the first record in the table (usually the administrative account).`,
          fr: `L'injection SQL (SQLi) survient lorsque des entrées utilisateur non assainies sont concaténées directement dans une requête dynamique.

Si l'application utilise une chaîne brute, injecter \`admin' --\` ou \`' OR 1=1 --\` force la clause \`WHERE\` à être toujours vraie, contournant la vérification du mot de passe.`,
        },
        questions: [
          {
            id: 'q-sqli-1',
            question: {
              en: 'What standard character sequence is used in SQL to comment out the rest of a query line?',
              fr: 'Quelle suite de caractères standard commente le reste d\'une ligne en SQL ?',
            },
            hint: {
              en: 'Two dashes: --',
              fr: 'Deux tirets : --',
            },
            answer: '--',
            points: 10,
          },
          {
            id: 'q-sqli-2',
            question: {
              en: 'What classic tautology payload is injected into login fields to bypass authentication?',
              fr: 'Quelle charge utile classique est injectée pour contourner l\'authentification ?',
            },
            hint: {
              en: "' OR 1=1 --",
              fr: "' OR 1=1 --",
            },
            answer: "' OR 1=1 --",
            points: 15,
          },
        ],
      },
      {
        id: 'sqli-task-2',
        title: {
          en: 'Task 2: UNION-Based SQL Injection & Column Enumeration',
          fr: 'Tâche 2 : Injection UNION & Énumération des Colonnes',
        },
        content: {
          en: `When an application displays query results directly to the user (e.g. search pages or product catalogs), an attacker can use the \`UNION\` operator to append the results of their own injected query.

To execute a successful UNION attack, two conditions must be satisfied:
1. The injected query must return the exact same number of columns as the original query.
2. The columns must have compatible data types.

**Step 1: Finding Column Count with ORDER BY**
Inject:
\`' ORDER BY 1--\`
\`' ORDER BY 2--\`
\`' ORDER BY 3--\`
When \`ORDER BY 4--\` triggers an error (e.g. "Unknown column '4' in 'order clause'"), you know the original query has exactly 3 columns.

**Step 2: Finding Printable Columns**
Inject:
\`' UNION SELECT 'a', 'b', 'c'--\`
Observe which values appear on the page to identify which columns can be used to extract data.`,
          fr: `Lorsque l'application affiche directement le résultat d'une requête, l'opérateur \`UNION\` permet d'ajouter le résultat d'une seconde requête.

Il faut déterminer le nombre exact de colonnes avec \`ORDER BY 1--\`, \`ORDER BY 2--\`, etc., puis identifier les colonnes affichables avec \`UNION SELECT 1, 2, 3--\`.`,
        },
        questions: [
          {
            id: 'q-sqli-3',
            question: {
              en: 'Which SQL operator combines the result sets of two or more SELECT queries into a single output?',
              fr: 'Quel opérateur SQL combine les résultats de plusieurs requêtes SELECT en un seul ensemble ?',
            },
            hint: {
              en: 'UNION',
              fr: 'UNION',
            },
            answer: 'UNION',
            points: 10,
          },
          {
            id: 'q-sqli-4',
            question: {
              en: 'What SQL clause is sequentially incremented to discover the number of columns in the original query?',
              fr: 'Quelle clause SQL est incrémentée pour découvrir le nombre de colonnes de la requête originale ?',
            },
            hint: {
              en: 'ORDER BY',
              fr: 'ORDER BY',
            },
            answer: 'ORDER BY',
            points: 10,
          },
        ],
      },
      {
        id: 'sqli-task-3',
        title: {
          en: 'Task 3: Database Schema Enumeration & Vault Flag Extraction',
          fr: 'Tâche 3 : Énumération du Schéma & Extraction du Flag',
        },
        content: {
          en: `In MySQL and MariaDB, the database engine maintains a special meta-database called **information_schema** containing metadata about every database, table, and column.

Key enumeration queries:
- Current Database: \`UNION SELECT 1, database(), 3--\`
- All Tables: \`UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema = database()--\`
- All Columns: \`UNION SELECT 1, column_name, 3 FROM information_schema.columns WHERE table_name = 'vault_secrets'--\`

Target VM \`10.10.165.80\` runs a vulnerable search portal on port 80. By enumerating the tables, you will discover the \`vault_secrets\` table and extract the hidden flag.`,
          fr: `Dans MySQL/MariaDB, la base \`information_schema\` répertorie toutes les tables et colonnes.

En extrayant les données de \`vault_secrets\`, vous trouverez le flag de la salle.`,
        },
        questions: [
          {
            id: 'q-sqli-5',
            question: {
              en: 'What standard system database in MySQL/MariaDB stores table and column metadata?',
              fr: 'Quelle base système dans MySQL stocke les métadonnées sur les tables et colonnes ?',
            },
            hint: {
              en: 'information_schema',
              fr: 'information_schema',
            },
            answer: 'information_schema',
            points: 15,
          },
          {
            id: 'q-sqli-6',
            question: {
              en: 'What is the secret flag retrieved from the vault_secrets table?',
              fr: 'Quel est le flag secret extrait de la table vault_secrets ?',
            },
            hint: {
              en: 'THM{un10n_b4s3d_sql1_3xtr4ct10n}',
              fr: 'THM{un10n_b4s3d_sql1_3xtr4ct10n}',
            },
            answer: 'THM{un10n_b4s3d_sql1_3xtr4ct10n}',
            points: 35,
          },
        ],
      },
    ],
  },
  {
    id: 'advanced-sqli-and-defense',
    slug: 'advanced-blind-sqli-and-sqlmap',
    title: 'Advanced Blind SQLi & sqlmap Automation',
    difficulty: 'Medium',
    category: 'SQL',
    type: 'Challenge',
    free: true,
    usersEnrolled: 189200,
    rating: 4.94,
    badgeIcon: 'database',
    targetIP: '10.10.210.95',
    description: {
      en: 'Tackle advanced blind SQL injection scenarios: Boolean and Time-based inference (SLEEP), automate full-database extraction with sqlmap, and implement defense with Prepared Statements.',
      fr: 'Maîtrisez les injections aveugles (Blind SQLi booléennes et temporelles avec SLEEP), automatisez l\'extraction avec sqlmap et sécurisez le code avec les requêtes préparées.',
    },
    tasks: [
      {
        id: 'advsql-task-1',
        title: {
          en: 'Task 1: Boolean-Based & Time-Based Blind SQL Injection',
          fr: 'Tâche 1 : Injections Aveugles Booléennes & Temporelles',
        },
        content: {
          en: `When an application is vulnerable to SQL injection but never reflects query errors or data on the web page, the vulnerability is called **Blind SQL Injection**.

There are two primary blind exploitation vectors:

**1. Boolean-Based Blind SQLi**
The attacker crafts conditions that evaluate to TRUE or FALSE, observing binary page differences (such as "User found" vs "User not found"):
\`\`\`sql
AND (SELECT SUBSTRING(password, 1, 1) FROM users WHERE username = 'admin') = 's'
\`\`\`
By iterating through character positions and ASCII values, the full secret string can be extracted letter by letter.

**2. Time-Based Blind SQLi**
If the application shows no visible change between TRUE and FALSE, the attacker forces the database to pause execution using time delay functions:
- MySQL: \`AND (SELECT IF(1=1, SLEEP(5), 0))\`
- PostgreSQL: \`AND (SELECT pg_sleep(5))\`
- SQL Server: \`WAITFOR DELAY '0:0:5'\`

If the HTTP response takes 5+ seconds to return, the injected boolean condition is confirmed TRUE!`,
          fr: `Lorsqu'une application ne renvoie ni résultat ni message d'erreur, il s'agit d'une **Blind SQL Injection** (injection aveugle).

On utilise soit l'inférence booléenne (différence visible dans la réponse), soit des délais temporels avec \`SLEEP(5)\` pour confirmer les conditions caractère par caractère.`,
        },
        questions: [
          {
            id: 'q-advsql-1',
            question: {
              en: 'What MySQL function causes an intentional execution delay to verify time-based blind injection?',
              fr: 'Quelle fonction MySQL provoque un délai d\'exécution intentionnel en time-based blind SQLi ?',
            },
            hint: {
              en: 'SLEEP(seconds)',
              fr: 'SLEEP(secondes)',
            },
            answer: 'SLEEP',
            points: 15,
          },
          {
            id: 'q-advsql-2',
            question: {
              en: 'What SQL string function extracts a specific character substring at a given offset?',
              fr: 'Quelle fonction SQL extrait une sous-chaîne de caractères à un index donné ?',
            },
            hint: {
              en: 'SUBSTRING(str, pos, len) or SUBSTR()',
              fr: 'SUBSTRING(...)',
            },
            answer: 'SUBSTRING',
            points: 15,
          },
        ],
      },
      {
        id: 'advsql-task-2',
        title: {
          en: 'Task 2: Automated Exploitation & Schema Dumping with sqlmap',
          fr: 'Tâche 2 : Exploitation Automatisée & Dump avec sqlmap',
        },
        content: {
          en: `Extracting entire databases character-by-character manually is tedious. **sqlmap** is the premier automated penetration testing tool that detects and exploits SQL injection flaws.

Common sqlmap workflows:
- **Test URL**: \`sqlmap -u "http://10.10.210.95/item.php?id=1" --batch\`
- **List Databases**: \`sqlmap -u "http://10.10.210.95/item.php?id=1" --dbs\`
- **Enumerate Tables**: \`sqlmap -u "http://10.10.210.95/item.php?id=1" -D production_db --tables\`
- **Dump Table Contents**: \`sqlmap -u "http://10.10.210.95/item.php?id=1" -D production_db -T accounts --dump\`

You can also run \`sqlmap\` directly in your AttackBox terminal against target \`10.10.210.95\`!`,
          fr: `**sqlmap** est l'outil open-source incontournable pour automatiser la détection et l'exploitation des failles SQL injection.

Options clés :
- \`-u\` : Spécifie l'URL cible.
- \`--dbs\` : Énumère les bases de données.
- \`--tables\` : Énumère les tables.
- \`--dump\` : Extrait le contenu complet d'une table.`,
        },
        questions: [
          {
            id: 'q-advsql-3',
            question: {
              en: 'What command-line option in sqlmap specifies the target URL?',
              fr: 'Quelle option en ligne de commande dans sqlmap spécifie l\'URL cible ?',
            },
            hint: {
              en: '-u or --url',
              fr: '-u ou --url',
            },
            answer: '-u',
            points: 10,
          },
          {
            id: 'q-advsql-4',
            question: {
              en: 'What parameter instructs sqlmap to extract and dump database table entries?',
              fr: 'Quel paramètre ordonne à sqlmap d\'extraire et déverser les entrées de la table ?',
            },
            hint: {
              en: '--dump',
              fr: '--dump',
            },
            answer: '--dump',
            points: 10,
          },
        ],
      },
      {
        id: 'advsql-task-3',
        title: {
          en: 'Task 3: Defense & Remediation: Prepared Statements',
          fr: 'Tâche 3 : Défense & Remédiation : Requêtes Préparées',
        },
        content: {
          en: `Relying on string sanitization or Web Application Firewall (WAF) regexes often fails because attackers can bypass filters with alternative encodings, comments, or nested queries.

The gold standard for preventing SQL injection across all programming languages is **Parameterized Queries (Prepared Statements)**.

**Why Prepared Statements Work:**
When using prepared statements, the database engine compiles the SQL query skeleton first:
\`\`\`php
$stmt = $pdo->prepare('SELECT * FROM users WHERE username = :user AND password = :pass');
\`\`\`
Parameters are transmitted separately from the query structure:
\`\`\`php
$stmt->execute(['user' => $inputUser, 'pass' => $inputPass]);
\`\`\`
Because the query structure is already compiled, the database engine treats user input strictly as literal data, never as executable SQL code. Even if the user submits \`' OR 1=1 --\`, it is safely evaluated as a literal username string.`,
          fr: `La véritable défense contre l'injection SQL est l'utilisation systématique de **requêtes préparées (Prepared Statements)** avec liaison de paramètres (parameter binding).

Le moteur SQL compile d'abord la structure de la requête, traitant ensuite les entrées utilisateur strictement comme des données littérales, rendant toute injection impossible.`,
        },
        questions: [
          {
            id: 'q-advsql-5',
            question: {
              en: 'What programming technique separates SQL query logic from data inputs to eliminate SQL injection?',
              fr: 'Quelle technique sépare la logique SQL des données saisies pour éliminer toute injection SQL ?',
            },
            hint: {
              en: 'Prepared Statements (or Parameterized Queries)',
              fr: 'Prepared Statements (ou requêtes préparées)',
            },
            answer: 'Prepared Statements',
            points: 20,
          },
          {
            id: 'q-advsql-6',
            question: {
              en: 'What is the final challenge flag obtained from auditing the secure system?',
              fr: 'Quel est le flag final obtenu après l\'audit du système sécurisé ?',
            },
            hint: {
              en: 'THM{bl1nd_sql1_4nd_pr3p4r3d_st4t3m3nts}',
              fr: 'THM{bl1nd_sql1_4nd_pr3p4r3d_st4t3m3nts}',
            },
            answer: 'THM{bl1nd_sql1_4nd_pr3p4r3d_st4t3m3nts}',
            points: 40,
          },
        ],
      },
    ],
  },
];
