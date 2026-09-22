import { useState } from 'react';
import type { ReactNode } from 'react';

/* Jetons de coloration du terminal */
const Key = ({ children }: { children: ReactNode }) => <span className="text-emerald-400">{children}</span>;
const Str = ({ children }: { children: ReactNode }) => <span className="text-amber-300">{children}</span>;
const Txt = ({ children }: { children: ReactNode }) => <span className="text-slate-200">{children}</span>;
const Brace = ({ children }: { children: ReactNode }) => <span className="text-cyan-400">{children}</span>;

const Prompt = ({ command }: { command: string }) => (
  <div className="flex items-center gap-2 text-slate-400">
    <span>
      <span className="font-bold text-emerald-400">benjamin@limoges-dev</span>
      <span className="text-slate-400">:</span>
      <span className="text-cyan-400">~</span>
      <span className="text-slate-400">$ </span>
      {command}
    </span>
  </div>
);

const Caret = () => (
  <div className="mt-4 flex items-center gap-2 text-slate-400">
    <span>
      <span className="font-bold text-emerald-400">benjamin@limoges-dev</span>
      <span className="text-slate-400">:</span>
      <span className="text-cyan-400">~</span>
      <span className="text-slate-400">$ </span>
    </span>
    <span className="inline-block h-4 w-2.5 animate-pulse bg-emerald-400" aria-hidden />
  </div>
);

/* ── Sorties des trois commandes ──────────────────────────────────────── */

const ProfileOutput = () => (
  <>
    <Prompt command="./getProfile.sh --verbose" />
    <div className="mt-3 text-slate-300">
      <span className="text-slate-500">{'// Fetching developer telemetry matrix...'}</span>
      <br />
      <Brace>{'{'}</Brace>
      <br />
      {'  '}<Key>"developer"</Key>: <Str>"Benjamin Marty"</Str>,<br />
      {'  '}<Key>"academic"</Key>: <Txt>"BUT Informatique 3A (IUT du Limousin)"</Txt>,<br />
      {'  '}<Key>"alternance"</Key>: <span className="font-bold text-emerald-300">"Faure Menuiseries — Sept. 2026 / Juil. 2027"</span>,<br />
      {'  '}<Key>"primary_stack"</Key>: [<Str>"Java 21"</Str>, <Str>"Python"</Str>, <Str>"Spring Boot 3.3"</Str>, <Str>"PostgreSQL 15"</Str>],<br />
      {'  '}<Key>"domains"</Key>: [<br />
      {'    '}<span className="text-slate-300">"Architecture API RESTful &amp; Authentification JWT"</span>,<br />
      {'    '}<span className="text-slate-300">"Migration &amp; modélisation relationnelle FoxPro → MySQL"</span>,<br />
      {'    '}<span className="text-slate-300">"Conception Orientée Objet &amp; Modélisation UML stricte"</span><br />
      {'  '}],<br />
      {'  '}<Key>"soft_skills"</Key>: <span className="text-slate-300">"Sens du collectif, autonomie, rigueur et régularité"</span>,<br />
      {'  '}<Key>"current_role"</Key>: <Str>"Développeur alternant — Migration ERP FoxPro → MySQL"</Str>,<br />
      {'  '}<Key>"status"</Key>: <span className="font-bold text-emerald-400">"IN_ALTERNANCE"</span><br />
      <Brace>{'}'}</Brace>
    </div>
    <Caret />
  </>
);

const StackOutput = () => (
  <>
    <Prompt command="cat skills.env" />
    <div className="mt-2 font-mono text-[11px] text-slate-300">
      <span className="text-cyan-400"># ENV CONFIGURATION MATRIX</span>
      <br />
      LANGUAGES=&quot;Java 21, Python, SQL, JavaScript, PHP&quot;<br />
      FRAMEWORKS=&quot;Spring Boot 3.3, Spring Security, JPA/Hibernate, Vue.js&quot;<br />
      DATABASES=&quot;PostgreSQL 15, MySQL, FoxPro (Legacy Migration)&quot;<br />
      INFRA=&quot;Docker, Docker Compose, Linux Debian, Nginx, Kathará, Wireshark&quot;<br />
      ARCHITECTURE=&quot;RESTful API, Stateless JWT, POO Rigoureuse, Modélisation UML, Git&quot;<br />
      <span className="text-emerald-400">STATUS=&quot;READY_FOR_PRODUCTION_CHALLENGES&quot;</span>
    </div>
    <Caret />
  </>
);

const PingOutput = () => (
  <>
    <Prompt command="ping -c 3 erp.iut-limousin.local" />
    <div className="mt-2 font-mono text-[11px] text-slate-300">
      PING erp.iut-limousin.local (10.87.0.26): 56 data bytes<br />
      64 bytes from 10.87.0.26: icmp_seq=0 ttl=64 time=1.24 ms [SPRING_BOOT: UP]<br />
      64 bytes from 10.87.0.26: icmp_seq=1 ttl=64 time=0.98 ms [POSTGRES: HEALTHY]<br />
      64 bytes from 10.87.0.26: icmp_seq=2 ttl=64 time=1.12 ms [MODULES: 6/6]<br />
      --- erp.iut-limousin.local ping statistics ---<br />
      <span className="text-emerald-400">3 packets transmitted, 3 packets received, 0.0% packet loss</span>
    </div>
    <Caret />
  </>
);

type CommandId = 'profile' | 'stack' | 'ping';

const commands: { id: CommandId; label: string; hoverClass: string }[] = [
  { id: 'profile', label: './getProfile.sh', hoverClass: 'hover:bg-cyan-950 text-cyan-300 hover:text-cyan-200' },
  { id: 'stack', label: 'cat skills.env', hoverClass: 'hover:bg-emerald-950 text-emerald-300 hover:text-emerald-200' },
  { id: 'ping', label: 'ping erp-prod', hoverClass: 'hover:bg-violet-950 text-violet-300 hover:text-violet-200' },
];

const outputs: Record<CommandId, () => ReactNode> = {
  profile: ProfileOutput,
  stack: StackOutput,
  ping: PingOutput,
};

/** Terminal interactif : chaque bouton remplace la sortie affichée. */
export const Terminal = () => {
  const [active, setActive] = useState<CommandId>('profile');
  const Output = outputs[active];

  return (
    <div className="group relative w-full overflow-hidden rounded-xl border border-slate-700/70 bg-[#0a0f18] font-mono text-xs shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
      {/* Barre de titre */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-rose-500/80" aria-hidden />
          <span className="inline-block h-3 w-3 rounded-full bg-amber-500/80" aria-hidden />
          <span className="inline-block h-3 w-3 rounded-full bg-emerald-500/80" aria-hidden />
          <span className="ml-2 truncate text-[11px] text-slate-400">
            bash — benjamin@iut-deb-core: ~
          </span>
        </div>
        <div className="hidden items-center gap-1 text-[10px] text-slate-500 sm:flex">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" aria-hidden />
          <span>SSH-2.0-OpenSSH_9.2</span>
        </div>
      </div>

      {/* Barre de commandes */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-800/80 bg-slate-950/90 px-3 py-1.5">
        <span className="mr-1 text-[10px] uppercase tracking-wider text-slate-500">Exécuter:</span>
        {commands.map(cmd => (
          <button
            key={cmd.id}
            type="button"
            onClick={() => setActive(cmd.id)}
            aria-pressed={active === cmd.id}
            className={`rounded border px-2 py-0.5 text-[11px] transition-all ${cmd.hoverClass} ${
              active === cmd.id
                ? 'border-slate-500 bg-slate-700'
                : 'border-slate-700 bg-slate-800'
            }`}
          >
            {cmd.label}
          </button>
        ))}
      </div>

      {/* Écran */}
      <div
        className="max-h-[420px] min-h-[340px] overflow-x-auto bg-[#070b12] p-5 leading-relaxed text-slate-300"
        aria-live="polite"
      >
        <Output />
      </div>

      {/* Barre d'état */}
      <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950 px-4 py-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          <span>READY: CLI session interactive</span>
        </div>
        <span className="text-slate-400">UTF-8 / LF</span>
      </div>
    </div>
  );
};
