import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Copy, Check, CornerDownLeft, Sparkles } from 'lucide-react';
import { Language, TerminalEntry } from '../types';
import { getTranslation } from '../translations';

interface AttackBoxProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  targetIP: string | null;
}

export const AttackBoxModal: React.FC<AttackBoxProps> = ({
  isOpen,
  onClose,
  lang,
  targetIP,
}) => {
  const t = getTranslation(lang);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultIp = targetIP || '10.10.112.45';

  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: 'init-1',
      type: 'output',
      text: `TryHackMe AttackBox (Ubuntu 22.04 LTS / Kali Tools Suite)
Linux attackbox 5.15.0-76-generic #83-Ubuntu SMP x86_64
Active IP: 10.10.14.33 | Target VM: ${defaultIp}`,
    },
    {
      id: 'init-2',
      type: 'output',
      text: `${t.terminal.helpMessage}`,
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen, entries]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newEntries: TerminalEntry[] = [
      ...entries,
      {
        id: `in-${Date.now()}`,
        type: 'input',
        text: `root@attackbox:~# ${cmd}`,
      },
    ];

    const args = cmd.split(' ');
    const mainCmd = args[0].toLowerCase();

    let outputText = '';
    let outputType: TerminalEntry['type'] = 'output';

    switch (mainCmd) {
      case 'help':
      case '?':
        outputText = `Supported Commands:
  • help / ?                   - Show this assistance manual
  • nmap [args] <target_ip>     - Perform port & vulnerability scan
  • ping <target_ip>           - Send ICMP echo requests to target
  • curl <url>                 - Transfer data from or to a server
  • whoami                     - Print current effective user ID (root)
  • pwd                        - Print current working directory
  • ls [-la]                   - List directory contents
  • cat <file>                 - Concatenate and display file content
  • ifconfig / ip a            - Display network interfaces
  • gobuster dir -u <url>      - Brute-force web directories
  • sqlmap -u <url> [args]     - Automated SQL injection detection & dump
  • mysql / sqlite3            - Open interactive database client
  • sudo -l                    - List user privileges
  • clear                      - Clear the terminal console`;
        break;

      case 'clear':
        setEntries([]);
        setInputVal('');
        return;

      case 'whoami':
        outputText = 'root';
        break;

      case 'pwd':
        outputText = '/root';
        break;

      case 'ls':
        outputText = 'Desktop  Documents  Downloads  exploits  scripts  tools  flag.txt';
        break;

      case 'ifconfig':
      case 'ip':
        outputText = `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.14.33  netmask 255.255.0.0  broadcast 10.10.255.255
        ether 02:42:0a:0a:0e:21  txqueuelen 0  (Ethernet)
tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500
        inet 10.14.28.190  destination 10.14.28.190`;
        break;

      case 'ping':
        const pingTarget = args[1] || defaultIp;
        outputText = `PING ${pingTarget} (${pingTarget}) 56(84) bytes of data.
64 bytes from ${pingTarget}: icmp_seq=1 ttl=64 time=18.4 ms
64 bytes from ${pingTarget}: icmp_seq=2 ttl=64 time=19.1 ms
64 bytes from ${pingTarget}: icmp_seq=3 ttl=64 time=17.8 ms
--- ${pingTarget} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms`;
        outputType = 'success';
        break;

      case 'nmap':
        const scannedIp = args[args.length - 1] || defaultIp;
        if (scannedIp.includes('198.12') || cmd.includes('ms17-010')) {
          outputText = `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for ${scannedIp}
Host is up (0.021s latency).
PORT    STATE SERVICE      VERSION
135/tcp open  msrpc        Microsoft Windows RPC
139/tcp open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp open  microsoft-ds Windows 7 Professional 7601 Service Pack 1
Host script results:
| smb-vuln-ms17-010: 
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     Risk factor: HIGH
|     A critical remote code execution vulnerability exists in Microsoft SMBv1.
|_    References: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143
Nmap done: 1 IP address (1 host up) scanned in 4.12 seconds`;
          outputType = 'success';
        } else if (scannedIp.includes('220.74')) {
          outputText = `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for ${scannedIp}
PORT    STATE SERVICE     VERSION
23/tcp  open  telnet      Linux telnetd
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X
445/tcp open  netbios-ssn Samba smbd 4.3.11-Ubuntu
Nmap done: 1 IP address (1 host up) scanned in 2.89 seconds`;
        } else {
          outputText = `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for ${scannedIp}
Host is up (0.019s latency).
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
Nmap done: 1 IP address (1 host up) scanned in 3.10 seconds`;
        }
        break;

      case 'curl':
        if (cmd.includes('ping.php') || cmd.includes('/etc/flag')) {
          outputText = `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8

PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.032 ms
--- 127.0.0.1 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss

[+] FLAG EXTRACTED:
THM{c0mm4nd_1nj3ct10n_succ3ss}`;
          outputType = 'success';
        } else if (cmd.includes('robots.txt')) {
          outputText = `User-agent: *
Disallow: /
# Note to self: Rick's password portal: Wubbalubbadubdub123!`;
        } else {
          outputText = `<!DOCTYPE html>
<html>
<head><title>TryHackMe Vulnerable Target</title></head>
<body>
<h1>Welcome to Target ${defaultIp}</h1>
<p>System operational. SSH (Port 22), Web (Port 80) available.</p>
<!-- Hint: Check hidden endpoints like /ping.php or robots.txt -->
</body>
</html>`;
        }
        break;

      case 'cat':
        const fileTarget = args[1] || '';
        if (fileTarget.includes('flag.txt') || fileTarget.includes('shiba2')) {
          outputText = 'THM{l1nux_b4s1cs_m4st3r}';
          outputType = 'success';
        } else if (fileTarget.includes('root.txt')) {
          outputText = 'THM{r00t_pr1v1l3g3_3sc4l4t10n}';
          outputType = 'success';
        } else if (fileTarget.includes('Sup3rS3cretPickl3Ingred.txt') || fileTarget.includes('pickle')) {
          outputText = 'mr. meeseek hair';
          outputType = 'success';
        } else if (fileTarget.includes('passwd')) {
          outputText = `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
shiba2:x:1001:1001:,,,:/home/shiba2:/bin/bash
rick:x:1002:1002:Rick Sanchez:/home/rick:/bin/bash`;
        } else {
          outputText = `THM{l1nux_b4s1cs_m4st3r}\n(Congratulations! Flag retrieved successfully from ${fileTarget || 'flag.txt'})`;
          outputType = 'success';
        }
        break;

      case 'gobuster':
        outputText = `===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://${defaultIp}
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
===============================================================
/login.php            (Status: 200) [Size: 1542]
/robots.txt           (Status: 200) [Size: 67]
/ping.php             (Status: 200) [Size: 840]
/assets               (Status: 301) [Size: 312]
===============================================================
Finished`;
        break;

      case 'sudo':
        if (cmd.includes('-l')) {
          outputText = `Matching Defaults entries for root on attackbox:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin

User shiba2 may run the following commands on this machine:
    (ALL : ALL) NOPASSWD: /usr/bin/find`;
        } else {
          outputText = 'root privileges active.';
        }
        break;

      case 'sqlmap':
        if (cmd.includes('210.95') || cmd.includes('--dump') || cmd.includes('blind')) {
          outputText = `        ___
       __H__
 ___ ___["]_____ ___ ___  {1.7.2#stable}
|_ -| . ["]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

[*] starting @ 14:22:01 /2026-09-03/
[INFO] testing connection to the target URL
[INFO] checking if the target is protected by some kind of WAF/IPS
[INFO] testing if the target URL content is stable
[INFO] target URL is stable
[INFO] testing if GET parameter 'id' is dynamic
[INFO] GET parameter 'id' is dynamic
[INFO] heuristic test shows that GET parameter 'id' might be injectable (DBMS: 'MySQL')
[+] Parameter: id (GET)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause
    Payload: id=1 AND 8821=8821

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: id=1 AND (SELECT 9912 FROM (SELECT(SLEEP(5)))XXXX)

    Type: UNION query
    Title: Generic UNION query (NULL) - 3 columns
    Payload: id=-1 UNION ALL SELECT NULL,CONCAT(0x7170707a71,flag,0x7178767171),NULL FROM vault-- -

[+] Available databases [3]:
[*] information_schema
[*] mysql
[*] production_db

[+] Database: production_db
[+] Table: flag_vault [1 entry]
+----+-----------------------------------------------+
| id | flag_data                                     |
+----+-----------------------------------------------+
| 1  | THM{bl1nd_sql1_4nd_pr3p4r3d_st4t3m3nts}       |
+----+-----------------------------------------------+

[INFO] Fetched 1 entry successfully.`;
          outputType = 'success';
        } else if (cmd.includes('165.80') || cmd.includes('vault')) {
          outputText = `[+] sqlmap identified the following injection points with a total of 42 HTTP(s) requests:
---
Parameter: search (GET)
    Type: UNION query
    Title: Generic UNION query (NULL) - 3 columns
    Payload: search=-1' UNION SELECT 1,table_name,3 FROM information_schema.tables WHERE table_schema=database()-- -
---
[+] Database: security_portal
Table: vault_secrets
[1 entry]
+----+---------------------------------------+
| id | secret_flag                           |
+----+---------------------------------------+
| 1  | THM{un10n_b4s3d_sql1_3xtr4ct10n}      |
+----+---------------------------------------+`;
          outputType = 'success';
        } else {
          outputText = `Usage: sqlmap -u <target_url> [options]
Examples:
  sqlmap -u "http://${defaultIp}/search?id=1" --batch
  sqlmap -u "http://${defaultIp}/search?id=1" --dbs
  sqlmap -u "http://${defaultIp}/search?id=1" -D production_db --tables
  sqlmap -u "http://${defaultIp}/search?id=1" -D production_db -T accounts --dump`;
        }
        break;

      case 'mysql':
      case 'sqlite3':
        outputText = `Welcome to the MariaDB/MySQL database terminal.
Server version: 10.5.15-MariaDB-0+deb11u1 Debian 11

MariaDB [(none)]> USE production_db;
Database changed.
MariaDB [production_db]> SELECT * FROM flag_store;
+----+------------------------------------+---------------------+
| id | flag_data                          | created_at          |
+----+------------------------------------+---------------------+
| 1  | THM{sql_qu3ry_fund4m3nt4ls_m4st3r} | 2026-09-03 08:30:00 |
+----+------------------------------------+---------------------+
1 row in set (0.001 sec)

Type 'exit' to return to bash.`;
        outputType = 'success';
        break;

      default:
        outputText = `bash: ${mainCmd}: command not found. Type 'help' to view available commands.`;
        outputType = 'error';
        break;
    }

    newEntries.push({
      id: `out-${Date.now()}`,
      type: outputType,
      text: outputText,
    });

    setEntries(newEntries);
    setInputVal('');
  };

  const copyLastFlag = () => {
    const lastSuccess = entries.slice().reverse().find(e => e.type === 'success' && e.text.includes('THM{'));
    if (lastSuccess) {
      const match = lastSuccess.text.match(/THM\{[^}]+\}/);
      if (match) {
        navigator.clipboard.writeText(match[0]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div 
      id="attackbox-container"
      className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col ${
        isExpanded
          ? 'inset-4 md:inset-8 bg-[#0a0f1d] border-2 border-emerald-500/50 rounded-xl'
          : 'bottom-4 right-4 w-[95vw] sm:w-[620px] h-[440px] bg-[#0a0f1d] border border-emerald-500/40 rounded-xl'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex h-10 items-center justify-between border-b border-slate-800/80 bg-slate-950 px-3 select-none rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 pl-2">
            <TerminalIcon className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-mono-code text-xs font-semibold text-slate-200">
              {t.terminal.title}
            </span>
            <span className="rounded bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.2 text-[10px] font-bold text-emerald-400">
              {t.terminal.status}
            </span>
          </div>
        </div>

        {/* Quick actions on terminal */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyLastFlag}
            title="Copy latest discovered THM flag"
            className="flex items-center gap-1 rounded bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span className="hidden sm:inline">Copy Flag</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            title={isExpanded ? 'Restore' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-rose-900/50 hover:text-rose-400 transition"
            title={t.terminal.close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Target Status bar */}
      <div className="flex items-center justify-between border-b border-slate-800/50 bg-slate-900/60 px-4 py-1.5 text-xs text-slate-400 font-mono-code">
        <div className="flex items-center gap-2">
          <span>Target:</span>
          <span className="text-emerald-400 font-semibold">{defaultIp}</span>
          <span className="text-slate-600">|</span>
          <span>AttackBox IP:</span>
          <span className="text-sky-400">10.10.14.33</span>
        </div>
        <div className="flex gap-2">
          <span className="text-slate-500">Try: nmap, cat flag.txt, ping</span>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-4 font-mono-code text-xs leading-relaxed space-y-2 select-text"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="whitespace-pre-wrap break-all">
            {entry.type === 'input' && (
              <span className="text-emerald-400 font-bold">{entry.text}</span>
            )}
            {entry.type === 'output' && (
              <span className="text-slate-300">{entry.text}</span>
            )}
            {entry.type === 'success' && (
              <span className="text-emerald-300 bg-emerald-950/40 px-1 py-0.5 rounded border border-emerald-500/20 font-semibold inline-block">
                {entry.text}
              </span>
            )}
            {entry.type === 'error' && (
              <span className="text-rose-400">{entry.text}</span>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Line */}
      <form 
        onSubmit={handleCommand}
        className="flex items-center gap-2 border-t border-slate-800 bg-slate-950 px-4 py-2.5 rounded-b-xl"
      >
        <span className="font-mono-code text-xs font-bold text-emerald-400 shrink-0">
          root@attackbox:~#
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type a command (e.g. nmap, cat flag.txt, help)..."
          className="flex-1 bg-transparent font-mono-code text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded bg-slate-800 p-1 text-slate-400 hover:bg-emerald-600 hover:text-white transition"
          title="Send Command"
        >
          <CornerDownLeft className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
};
