export default function Footer() {
  return (
    <footer className="border-t border-slate-500/10 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-slate-400">
            Hecho por <span className="text-slate-200 font-semibold">Ramiro Mantero</span>
          </p>
          <p className="text-[11px] text-slate-600 mt-1 max-w-md">
            Datos: DolarAPI y ArgentinaDatos. Solo informativo, no es
            asesoramiento financiero.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ramiromantero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-slate-400 hover:text-emerald-300 transition-colors"
          >
            GitHub
          </a>
          <span className="text-slate-700">·</span>
          <a
            href="https://linkedin.com/in/ramiro-mantero-319931186"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-slate-400 hover:text-emerald-300 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
