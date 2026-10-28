import React, { useEffect } from 'react';
import {
  X,
  Info,
  ShieldCheck,
  Mail,
  Globe,
  Layers,
  Download,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ReferenceComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceComparisonModal: React.FC<ReferenceComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        style={{ overscrollBehavior: 'contain' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Info className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h2 id="about-modal-title" className="font-bold text-slate-800 text-base leading-snug">
                Tentang Google Play Order Receipt
              </h2>
              <p className="text-xs text-slate-500">
                Informasi & Panduan Aplikasi Pembuat Struk Resmi 590px
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600">
          <p className="text-slate-700 leading-relaxed">
            <strong>Google Play Order Receipt Generator</strong> adalah aplikasi web untuk membuat, mengedit, dan mengekspor tanda terima email Google Play Store dengan tata letak 100% presisi mengikuti standar email resmi 590px Google.
          </p>

          {/* Fitur Utama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <span className="font-bold text-slate-800 flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                Standar Email Resmi 590px
              </span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Dimensi dan tabel HTML disesuaikan persis dengan email notifikasi transaksi Google Play asli (lebar 590px, logo SVG 4 warna, font Roboto).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <span className="font-bold text-slate-800 flex items-center gap-2 text-xs">
                <Globe className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                Dukungan Dua Bahasa (ID & EN)
              </span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Tersedia penuh dalam Bahasa Indonesia (WIB, format mata uang Rp) dan English (GMT, phrasing legal resmi Google Play global).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <span className="font-bold text-slate-800 flex items-center gap-2 text-xs">
                <Layers className="w-4 h-4 text-purple-600 shrink-0" aria-hidden="true" />
                Ragam Tipe Langganan & Preset
              </span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Mendukung Langganan Baru, Perpanjangan Rutin (+ tombol &apos;Add backup&apos;), hingga Free Trial Google AI Pro 2 TB.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <span className="font-bold text-slate-800 flex items-center gap-2 text-xs">
                <Download className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                Pilihan Ekspor Lengkap
              </span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Unduh gambar PNG tajam (2.5x HD), JPG, Salin Gambar ke Clipboard, unduh berkas .HTML mandiri, atau Cetak/PDF.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <span className="font-bold text-slate-800 flex items-center gap-2 text-xs">
                <Sparkles className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                Google Play Points & Pajak
              </span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Dilengkapi perhitungan PPN 11% otomatis/kustom, nomor pesanan format SOP/GPA acak, dan badge poin Play Points asli.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <span className="font-bold text-slate-800 flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                Privasi 100% Sisi Klien
              </span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Seluruh data hanya diproses secara lokal di browser Anda. Tidak ada data akun atau transaksi yang dikirim atau disimpan di server.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3.5 rounded-xl text-xs space-y-1.5">
            <span className="font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
              Tips Penggunaan:
            </span>
            <ul className="list-disc list-inside space-y-1 text-blue-800/90 pl-1">
              <li>Pilih <strong>Preset Cepat</strong> di kolom kiri untuk memuat template populer dalam satu klik.</li>
              <li>Gunakan tombol <strong>Salin Kode HTML</strong> bila ingin menempelkan kode langsung ke pengirim email.</li>
              <li>Gunakan tombol <strong>Unduh PNG (HD)</strong> untuk menghasilkan tangkapan gambar resolusi tinggi tanpa terpotong.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Official 590px Email Spec</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
