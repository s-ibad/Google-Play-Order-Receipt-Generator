import React, { useState, useRef } from 'react';
import {
  Download,
  Copy,
  Printer,
  Info,
  Check,
  Eye,
  Mail,
  FileImage,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Code2,
} from 'lucide-react';
import { toPng, toJpeg, toBlob } from 'html-to-image';
import { ReceiptData } from './types/receipt';
import {
  OFFICIAL_HTML_RECEIPT_DATA,
  DEFAULT_RECEIPT_DATA,
  ENGLISH_HTML_RECEIPT_DATA,
} from './utils/presets';
import { generateRawGooglePlayHtml } from './utils/htmlGenerator';
import { ReceiptPreview } from './components/ReceiptPreview';
import { ReceiptForm } from './components/ReceiptForm';
import { ReferenceComparisonModal } from './components/ReferenceComparisonModal';
import { GooglePlayLogo } from './components/GooglePlayLogo';

export default function App() {
  // Default to the official HTML data supplied by the user
  const [data, setData] = useState<ReceiptData>(OFFICIAL_HTML_RECEIPT_DATA);
  const [previewMode, setPreviewMode] = useState<'clean' | 'gmail'>('clean');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [bgColor, setBgColor] = useState<'slate' | 'zinc' | 'dark' | 'white'>('slate');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const receiptRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleResetToImageDefault = () => {
    setData({ ...DEFAULT_RECEIPT_DATA });
    showToast('Memuat data gambar pertama (Google One 200GB)!');
  };

  const handleApplyOfficialHtmlPreset = () => {
    setData({ ...OFFICIAL_HTML_RECEIPT_DATA });
    showToast('Memuat template email resmi (Flight Tracker + Play Points)!');
  };

  const handleApplyEnglishPreset = () => {
    setData({ ...ENGLISH_HTML_RECEIPT_DATA });
    showToast('Memuat template English resmi (Google AI Pro Trial)!');
  };

  const getExportConfig = async () => {
    const el = receiptRef.current;
    if (!el) return null;

    if (document.fonts) {
      await document.fonts.ready;
    }

    const isGmail = previewMode === 'gmail';
    const targetWidth = isGmail ? 640 : 590;
    const targetHeight = Math.max(el.scrollHeight, el.offsetHeight);

    return {
      el,
      targetWidth,
      targetHeight,
      options: {
        width: targetWidth,
        height: targetHeight,
        cacheBust: true,
        style: {
          transform: 'none',
          margin: '0',
          maxWidth: 'none',
          minWidth: `${targetWidth}px`,
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
        },
      },
    };
  };

  const handleDownloadPng = async () => {
    try {
      setIsExporting(true);
      const config = await getExportConfig();
      if (!config) return;

      const dataUrl = await toPng(config.el, {
        ...config.options,
        quality: 0.98,
        pixelRatio: 2.5, // 2.5x high resolution crisp rendering
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `GooglePlay_Receipt_${data.orderNumber.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
      showToast('Gambar PNG berhasil diunduh dalam resolusi tinggi!');
    } catch (err) {
      console.error('Error exporting PNG:', err);
      showToast('Gagal mengunduh gambar. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadJpg = async () => {
    try {
      setIsExporting(true);
      const config = await getExportConfig();
      if (!config) return;

      const dataUrl = await toJpeg(config.el, {
        ...config.options,
        quality: 0.95,
        pixelRatio: 2.5,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `GooglePlay_Receipt_${data.orderNumber.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
      link.href = dataUrl;
      link.click();
      showToast('Gambar JPG berhasil diunduh!');
    } catch (err) {
      console.error('Error exporting JPG:', err);
      showToast('Gagal mengunduh JPG.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImage = async () => {
    try {
      setIsExporting(true);
      const config = await getExportConfig();
      if (!config) return;

      const blob = await toBlob(config.el, {
        ...config.options,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        showToast('Gambar struk berhasil disalin ke clipboard! (Siap Paste)');
      } else {
        throw new Error('Clipboard API not supported');
      }
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
      showToast('Browser membatasi salin otomatis. Silakan gunakan tombol Unduh PNG.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyRawHtml = async () => {
    try {
      const rawHtml = generateRawGooglePlayHtml(data);
      await navigator.clipboard.writeText(rawHtml);
      showToast('Kode HTML email berhasil disalin ke clipboard!');
    } catch (err) {
      console.error('Copy HTML failed:', err);
      showToast('Gagal menyalin kode HTML.');
    }
  };

  const handleDownloadHtmlFile = () => {
    const rawHtml = generateRawGooglePlayHtml(data);
    const blob = new Blob([rawHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GooglePlay_Receipt_${data.orderNumber.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('File template .html berhasil diunduh!');
  };

  const handlePrint = () => {
    window.print();
  };

  const getCanvasBg = () => {
    switch (bgColor) {
      case 'dark':
        return 'bg-slate-900 border-slate-800';
      case 'zinc':
        return 'bg-[#e2e8f0] border-slate-300';
      case 'white':
        return 'bg-white border-slate-200';
      default:
        return 'bg-[#f1f5f9] border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <GooglePlayLogo className="h-6 sm:h-7 shrink-0" showText={false} />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-none text-pretty">
                  Google Play Order Receipt
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Official 590px
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              aria-label="Tentang Aplikasi"
              className="text-xs bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-medium px-3 py-2 sm:py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden min-h-[36px] sm:min-h-0"
            >
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Tentang Aplikasi</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset template ke format resmi default?')) {
                  handleApplyOfficialHtmlPreset();
                }
              }}
              aria-label="Reset Template ke format resmi"
              title="Reset ke format Flight Tracker & Play Points"
              className="text-xs bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-800 font-semibold px-3 py-2 sm:py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden min-h-[36px] sm:min-h-0"
            >
              <RefreshCw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Reset Template</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6 print:hidden order-2 lg:order-1">
            <ReceiptForm
              data={data}
              onChange={setData}
              onResetToImageDefault={handleResetToImageDefault}
              onApplyOfficialHtmlPreset={handleApplyOfficialHtmlPreset}
              onApplyEnglishPreset={handleApplyEnglishPreset}
            />
          </div>

          {/* Right Column: Live Preview & Action Toolbar (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2 lg:sticky lg:top-20">
            {/* Toolbar Panel */}
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
              {/* Preview Mode Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewMode('clean')}
                  className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                    previewMode === 'clean'
                      ? 'bg-white text-slate-800 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Struk bersih 590px"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Struk 590px
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('gmail')}
                  className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                    previewMode === 'gmail'
                      ? 'bg-white text-slate-800 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tampilan dalam bingkai email Gmail"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Tampilan Gmail
                </button>
              </div>

              {/* Canvas Background & Zoom Controls */}
              <div className="flex items-center gap-2">
                <div
                  className="hidden sm:flex items-center gap-1 text-xs text-slate-500 mr-1"
                  role="group"
                  aria-label="Pilih warna latar kanvas pratinjau"
                >
                  <span>Latar:</span>
                  <button
                    type="button"
                    onClick={() => setBgColor('slate')}
                    aria-label="Latar kanvas abu-abu lembut"
                    aria-pressed={bgColor === 'slate'}
                    className="p-1 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                    title="Latar Abu-abu Lembut"
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-slate-200 border border-slate-300 transition-shadow ${
                        bgColor === 'slate' ? 'ring-2 ring-blue-500 ring-offset-1 shadow-xs' : ''
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgColor('dark')}
                    aria-label="Latar kanvas gelap kontras"
                    aria-pressed={bgColor === 'dark'}
                    className="p-1 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                    title="Latar Gelap Kontras"
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-slate-800 border border-slate-700 transition-shadow ${
                        bgColor === 'dark' ? 'ring-2 ring-blue-500 ring-offset-1 shadow-xs' : ''
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgColor('white')}
                    aria-label="Latar kanvas putih"
                    aria-pressed={bgColor === 'white'}
                    className="p-1 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                    title="Latar Putih"
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white border border-slate-300 transition-shadow ${
                        bgColor === 'white' ? 'ring-2 ring-blue-500 ring-offset-1 shadow-xs' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                    aria-label="Perkecil tampilan struk"
                    className="p-1 text-slate-600 hover:text-slate-900 rounded cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                    title="Perkecil"
                  >
                    <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-600 px-1 select-none" aria-live="polite">
                    {zoomLevel}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                    aria-label="Perbesar tampilan struk"
                    className="p-1 text-slate-600 hover:text-slate-900 rounded cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                    title="Perbesar"
                  >
                    <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(100)}
                    aria-label="Reset zoom tampilan ke 100%"
                    className="p-1 text-slate-600 hover:text-slate-900 rounded cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                    title="Reset 100%"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: Download & Export (Placed above preview for zero-scroll accessibility) */}
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                <span className="font-semibold text-slate-800">
                  Ekspor & Unduh Bukti Pembayaran
                </span>
                <span className="text-[11px] font-medium text-emerald-600">
                  Siap Digunakan
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={isExporting}
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                  title="Unduh gambar PNG resolusi tinggi tajam"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>{isExporting ? 'Memproses...' : 'Unduh PNG (HD)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyRawHtml}
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
                  title="Salin kode HTML email resmi 590px siap tempel"
                >
                  <Code2 className="w-4 h-4 shrink-0" />
                  <span>Salin Kode HTML</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  disabled={isExporting}
                  className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-medium text-xs py-2 px-3 rounded-lg border border-slate-200/90 flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-hidden shadow-2xs"
                  title="Salin gambar langsung ke clipboard untuk ditempel di chat/dokumen"
                >
                  <Copy className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Salin Gambar</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadJpg}
                  disabled={isExporting}
                  className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-medium text-xs py-2 px-3 rounded-lg border border-slate-200/90 flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-hidden shadow-2xs"
                  title="Unduh format gambar JPG standar"
                >
                  <FileImage className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Unduh JPG</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadHtmlFile}
                  className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-medium text-xs py-2 px-3 rounded-lg border border-slate-200/90 flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-hidden shadow-2xs"
                  title="Unduh sebagai file .html yang dapat dibuka di browser mana saja"
                >
                  <Download className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Unduh File .HTML</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-medium text-xs py-2 px-3 rounded-lg border border-slate-200/90 flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-hidden shadow-2xs"
                  title="Cetak langsung atau simpan sebagai PDF melalui dialog browser"
                >
                  <Printer className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Cetak / PDF</span>
                </button>
              </div>
            </div>

            {/* Receipt Preview Canvas Container */}
            <div
              className={`rounded-2xl border p-2 sm:p-8 flex items-start sm:items-center justify-start sm:justify-center transition-colors min-h-[420px] sm:min-h-[500px] overflow-auto ${getCanvasBg()}`}
            >
              <div
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out',
                }}
                className="m-auto py-2 flex justify-center"
              >
                <ReceiptPreview
                  ref={receiptRef}
                  data={data}
                  previewMode={previewMode}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Reference comparison modal */}
      <ReferenceComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
