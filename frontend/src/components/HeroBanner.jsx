export default function HeroBanner() {
  return (
    <section className="relative bg-ink text-sand overflow-hidden">
      <div className="absolute inset-0 bg-crate-lines" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 relative grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-amber uppercase mb-4">
            Manifest No. TD-2026-0729 · Dermaga Digital
          </p>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.03] tracking-tight">
            Sumber grosir,
            <br />
            langsung dari <span className="text-amber">pabrik.</span>
          </h1>
          <p className="mt-5 text-sand/70 text-base md:text-lg max-w-xl">
            Bandingkan tingkatan harga per kuantitas, verifikasi pemasok secara real-time,
            dan kirim RFQ ke ratusan produsen terverifikasi dalam satu manifest pengadaan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="bg-amber hover:bg-amber-dark transition-colors text-ink font-display font-bold px-6 py-3 rounded-sm text-sm">
              Mulai Cari Pemasok
            </button>
            <button className="border border-sand/30 hover:border-amber hover:text-amber transition-colors px-6 py-3 rounded-sm text-sm font-display font-bold">
              Ajukan RFQ Massal
            </button>
          </div>

          <dl className="mt-10 grid grid-cols-3 max-w-md font-mono">
            <div className="border-l border-sand/20 pl-3">
              <dt className="text-[11px] text-sand/50 uppercase tracking-wider">Pemasok</dt>
              <dd className="text-xl font-semibold text-white">42.6K</dd>
            </div>
            <div className="border-l border-sand/20 pl-3">
              <dt className="text-[11px] text-sand/50 uppercase tracking-wider">Negara Tujuan</dt>
              <dd className="text-xl font-semibold text-white">190+</dd>
            </div>
            <div className="border-l border-sand/20 pl-3">
              <dt className="text-[11px] text-sand/50 uppercase tracking-wider">RFQ / Hari</dt>
              <dd className="text-xl font-semibold text-white">8.1K</dd>
            </div>
          </dl>
        </div>

        {/* Signature manifest card */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 border border-amber/30 rounded-sm" aria-hidden="true" />
          <div className="relative bg-sand text-ink rounded-sm shadow-2xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-ink/15 pb-3 mb-3">
              <span className="font-display font-extrabold text-sm tracking-tight">SHIPMENT MANIFEST</span>
              <span className="border border-verified text-verified px-1.5 py-0.5 rounded-sm text-[10px] -rotate-6">
                VERIFIED
              </span>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-slate">Item</span>
                <span className="font-medium">Modul LED Solar 400W</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate">MOQ</span>
                <span className="font-medium">20 pcs</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate">Harga/unit (≥500pcs)</span>
                <span className="font-medium text-amber-dark">US$49.00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate">Asal</span>
                <span className="font-medium">Jiangsu, CN</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate">Estimasi Kirim</span>
                <span className="font-medium">12–18 hari</span>
              </li>
            </ul>
            <div className="mt-4 pt-3 border-t border-dashed border-ink/20 text-center text-[10px] text-slate">
              Trade Assurance melindungi transaksi ini
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
