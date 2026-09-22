import { ALTERNANCE } from '../lib/constants';

/** Bandeau de télémétrie affiché au-dessus de la navigation. */
export const TopBar = () => (
  <div className="flex w-full items-center justify-between border-b border-slate-800/50 bg-slate-950/70 px-4 py-1 font-mono text-[11px] tracking-wider text-slate-400">
    <div className="no-scrollbar flex items-center gap-4 overflow-x-auto py-0.5">
      <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
        <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" aria-hidden />
        <span className="-ml-3.5 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
        TELEMETRY: OPTIMAL
      </span>

      <span className="text-slate-700" aria-hidden>|</span>
      <span className="whitespace-nowrap text-slate-300">
        NODE: <span className="text-cyan-400">LIMOGES-FR [IUT-87]</span>
      </span>

      <span className="hidden text-slate-700 sm:inline" aria-hidden>|</span>
      <span className="hidden whitespace-nowrap text-slate-300 sm:inline">
        LATENCY: <span className="text-emerald-400">14ms</span>
      </span>

      <span className="hidden text-slate-700 md:inline" aria-hidden>|</span>
      <span className="hidden whitespace-nowrap text-slate-300 md:inline">
        CORE: <span className="text-slate-200">JAVA 21 / PYTHON</span>
      </span>

      <span className="hidden text-slate-700 lg:inline" aria-hidden>|</span>
      <span className="hidden whitespace-nowrap text-emerald-300 lg:inline">
        ALTERNANCE: {ALTERNANCE.company.toUpperCase()} ({ALTERNANCE.period.toUpperCase()})
      </span>
    </div>

    <div className="hidden shrink-0 items-center gap-3 pl-3 sm:flex">
      <span className="text-slate-400">STATUS:</span>
      <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
        EN ALTERNANCE
      </span>
    </div>
  </div>
);
