import React from 'react';
import {
  RotateCcw,
  Sparkles,
  Shuffle,
  Clock,
  CreditCard,
  Receipt,
  Layers,
  ChevronDown,
  Building,
  Award,
  Globe,
} from 'lucide-react';
import { ReceiptData } from '../types/receipt';
import { PRESETS } from '../utils/presets';
import {
  generateRandomOrderNumber,
  getCurrentFormattedDate,
} from '../utils/formatters';

interface ReceiptFormProps {
  data: ReceiptData;
  onChange: (data: ReceiptData) => void;
  onResetToImageDefault: () => void;
  onApplyOfficialHtmlPreset: () => void;
  onApplyEnglishPreset?: () => void;
}

const PAYMENT_PROVIDERS = [
  'Mastercard',
  'Visa',
  'GoPay',
  'DANA',
  'OVO',
  'ShopeePay',
  'BCA',
  'Mandiri',
  'BRI',
  'BNI',
  'Telkomsel Pulsa',
  'Indosat Pulsa',
  'XL Pulsa',
  'Saldo Google Play',
];

export const ReceiptForm: React.FC<ReceiptFormProps> = ({
  data,
  onChange,
  onResetToImageDefault,
  onApplyOfficialHtmlPreset,
  onApplyEnglishPreset,
}) => {
  const updateField = <K extends keyof ReceiptData>(field: K, value: ReceiptData[K]) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleApplyPreset = (presetId: string) => {
    const selected = PRESETS.find((p) => p.id === presetId);
    if (selected) {
      onChange({ ...selected.data });
    }
  };

  const visiblePresets = PRESETS.filter((preset) => {
    if (data.language === 'en') {
      return preset.data.language === 'en';
    }
    return preset.data.language !== 'en';
  });

  return (
    <div className="space-y-3">
      {/* Preset Selector */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-100/80">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
              <Layers className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-none">
                {data.language === 'en' ? 'Receipt Templates' : 'Template Tanda Terima'}
              </h2>
              <p className="text-[11px] text-slate-500 mt-1">
                {data.language === 'en'
                  ? 'Select official Google Play receipt samples'
                  : 'Pilih contoh tanda terima resmi Google Play'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Segmented Control */}
            <div
              role="radiogroup"
              aria-label="Pilih bahasa template"
              className="flex items-center gap-0.5 bg-slate-100/90 p-1 rounded-xl text-xs border border-slate-200/70"
            >
              <button
                type="button"
                role="radio"
                aria-checked={data.language !== 'en'}
                onClick={() => {
                  if (onApplyOfficialHtmlPreset) onApplyOfficialHtmlPreset();
                  updateField('language', 'id');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                  data.language !== 'en'
                    ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
                title="Format Bahasa Indonesia (590px)"
              >
                Indonesia
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={data.language === 'en'}
                onClick={() => {
                  if (onApplyEnglishPreset) onApplyEnglishPreset();
                  updateField('language', 'en');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                  data.language === 'en'
                    ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
                title="Format English (Official Trial)"
              >
                English
              </button>
            </div>

            <button
              type="button"
              onClick={onResetToImageDefault}
              className="text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 px-2.5 py-1.5 rounded-xl font-medium flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200/70 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-hidden"
              title="Kembalikan ke data Google One 200GB"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {visiblePresets.map((preset) => {
            const isActive =
              data.itemName === preset.data.itemName &&
              data.itemPrice === preset.data.itemPrice &&
              data.period === preset.data.period &&
              (preset.data.language ? data.language === preset.data.language : true);

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                  isActive
                    ? 'border-blue-500 bg-blue-50/70 text-blue-950 font-medium ring-1 ring-blue-400 shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isActive ? 'bg-blue-600 ring-2 ring-blue-200' : 'bg-slate-300'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="truncate">
                    <span className="font-semibold text-slate-900 block truncate">{preset.label}</span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {preset.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {preset.data.paymentProvider}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {preset.data.currency}
                    {preset.data.itemPrice.toLocaleString('id-ID')}
                    {preset.data.period}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Informasi Pesanan */}
      <details className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <summary className="p-4 sm:p-5 flex items-center justify-between cursor-pointer list-none select-none border-b border-transparent group-open:border-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded-2xl">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
              <Receipt className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-none">Informasi Pesanan & Akun</h2>
              <p className="text-[11px] text-slate-500 mt-1">Nomor pesanan, tanggal, email, dan entitas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block font-mono text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 max-w-[120px] truncate">
              {data.orderNumber.split('-')[0] || data.orderNumber}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200" aria-hidden="true" />
          </div>
        </summary>

        <div className="p-4 sm:p-5 pt-3 space-y-4">

        {/* Tipe Pembelian / Intro Header */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-800 block">
            Gaya Kalimat Notifikasi
          </label>
          <div
            role="radiogroup"
            aria-label="Gaya kalimat notifikasi"
            className="grid grid-cols-1 sm:grid-cols-3 gap-2"
          >
            <button
              type="button"
              role="radio"
              aria-checked={data.introType === 'trial_subscription'}
              onClick={() => updateField('introType', 'trial_subscription')}
              className={`text-xs py-2 px-2.5 rounded-xl border text-center font-medium cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                data.introType === 'trial_subscription'
                  ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-400 shadow-2xs'
                  : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              Trial / Uji Coba Gratis
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={data.introType === 'new_subscription'}
              onClick={() => updateField('introType', 'new_subscription')}
              className={`text-xs py-2 px-2.5 rounded-xl border text-center font-medium cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                data.introType === 'new_subscription'
                  ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-400 shadow-2xs'
                  : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              Langganan Baru
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={data.introType === 'renew_subscription'}
              onClick={() => updateField('introType', 'renew_subscription')}
              className={`text-xs py-2 px-2.5 rounded-xl border text-center font-medium cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                data.introType === 'renew_subscription'
                  ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-400 shadow-2xs'
                  : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              Perpanjangan Rutin
            </button>
          </div>

          {(data.introType === 'new_subscription' || data.introType === 'trial_subscription') && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor="renewal-date-input" className="text-xs font-medium text-slate-700 block mb-1">
                  {data.introType === 'trial_subscription' ? 'Trial Berakhir Pada' : 'Tanggal Otomatis Diperpanjang'}
                </label>
                <input
                  id="renewal-date-input"
                  name="renewalDate"
                  type="text"
                  autoComplete="off"
                  value={data.renewalDate}
                  onChange={(e) => updateField('renewalDate', e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden transition-colors"
                  placeholder={data.language === 'en' ? 'Aug 27, 2026…' : '16 Mar 2027…'}
                />
              </div>
              {data.introType === 'trial_subscription' && (
                <div>
                  <label htmlFor="trial-cost-input" className="text-xs font-medium text-slate-700 block mb-1">
                    Biaya Pasca-Trial
                  </label>
                  <input
                    id="trial-cost-input"
                    name="trialCost"
                    type="text"
                    autoComplete="off"
                    value={data.trialCost || ''}
                    onChange={(e) => updateField('trialCost', e.target.value)}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden transition-colors"
                    placeholder="Rp 309.000,00/month…"
                  />
                </div>
              )}
            </div>
          )}

          {data.introType === 'renew_subscription' && (
            <div className="mt-3 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={!!data.showBackupPaymentNotice}
                  onChange={(e) => updateField('showBackupPaymentNotice', e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span>Tampilkan tombol & notifikasi cadangan pembayaran (Add backup)</span>
              </label>
            </div>
          )}
        </div>

        {/* Nomor Pesanan */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="order-number-input" className="text-xs font-semibold text-slate-800">
              Nomor Pesanan
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => updateField('orderNumber', generateRandomOrderNumber('GPA'))}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                title="Format standar Google: GPA.xxxx-xxxx-xxxx-xxxxx"
              >
                <Shuffle className="w-3 h-3" aria-hidden="true" />
                <span>Acak GPA</span>
              </button>
              <button
                type="button"
                onClick={() => updateField('orderNumber', generateRandomOrderNumber('SOP'))}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-hidden"
                title="Format SOP: SOP.xxxx-xxxx-xxxx-xxxxx..0"
              >
                <Shuffle className="w-3 h-3" aria-hidden="true" />
                <span>Acak SOP</span>
              </button>
            </div>
          </div>
          <input
            id="order-number-input"
            name="orderNumber"
            type="text"
            autoComplete="off"
            spellCheck={false}
            value={data.orderNumber}
            onChange={(e) => updateField('orderNumber', e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden font-mono tracking-tight transition-colors"
            placeholder="GPA.3322-0977-6366-29822…"
          />
        </div>

        {/* Tanggal Pesanan */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="order-date-input" className="text-xs font-semibold text-slate-800">
              Tanggal & Waktu Pesanan
            </label>
            <button
              type="button"
              onClick={() => updateField('orderDate', getCurrentFormattedDate('WIB'))}
              className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
            >
              <Clock className="w-3 h-3" aria-hidden="true" />
              <span>Waktu Sekarang</span>
            </button>
          </div>
          <input
            id="order-date-input"
            name="orderDate"
            type="text"
            autoComplete="off"
            value={data.orderDate}
            onChange={(e) => updateField('orderDate', e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden transition-colors"
            placeholder="16 Mar 2026 19.17.40 WIB…"
          />
        </div>

        {/* Akun Email & Penjual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label htmlFor="account-email-input" className="text-xs font-semibold text-slate-800 block mb-1.5">
              Akun Anda (Email)
            </label>
            <input
              id="account-email-input"
              name="accountEmail"
              type="email"
              autoComplete="email"
              spellCheck={false}
              value={data.accountEmail}
              onChange={(e) => updateField('accountEmail', e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden transition-colors"
              placeholder="email@gmail.com…"
            />
          </div>

          <div>
            <label htmlFor="merchant-input" className="text-xs font-semibold text-slate-800 block mb-1.5">
              Entitas Pengembang / Penjual
            </label>
            <input
              id="merchant-input"
              name="merchant"
              type="text"
              autoComplete="organization"
              value={data.merchant}
              onChange={(e) => updateField('merchant', e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden transition-colors"
              placeholder="Negroni Applications Limited…"
            />
          </div>
        </div>
        </div>
      </details>

      {/* Rincian Item / Produk */}
      <details className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <summary className="p-4 sm:p-5 flex items-center justify-between cursor-pointer list-none select-none border-b border-transparent group-open:border-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded-2xl">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
              <Building className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-none">Detail Item & Produk</h2>
              <p className="text-[11px] text-slate-500 mt-1">Nama langganan, paket, harga, dan periode</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 max-w-[130px] truncate">
              {data.currency}{data.itemPrice.toLocaleString('id-ID')}{data.period}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200" aria-hidden="true" />
          </div>
        </summary>

        <div className="p-4 sm:p-5 pt-3 space-y-4">

        <div className="space-y-1.5">
          <label htmlFor="item-name-input" className="text-xs font-semibold text-slate-800 block">
            Nama Item & Paket
          </label>
          <textarea
            id="item-name-input"
            name="itemName"
            rows={2}
            value={data.itemName}
            onChange={(e) => updateField('itemName', e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden transition-colors"
            placeholder="Google AI Pro (2 TB) (Google One)&#10;(by Google LLC)…"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="item-subtitle-input" className="text-xs font-semibold text-slate-800 block">
            Keterangan / Subtitle
          </label>
          <input
            id="item-subtitle-input"
            name="itemSubtitle"
            type="text"
            value={data.itemSubtitle}
            onChange={(e) => updateField('itemSubtitle', e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden transition-colors"
            placeholder="Memperpanjang langganan secara otomatis…"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1.5">
            <label htmlFor="item-price-input" className="text-xs font-semibold text-slate-800 block">
              Harga Pokok ({data.currency})
            </label>
            <input
              id="item-price-input"
              name="itemPrice"
              type="number"
              min="0"
              inputMode="numeric"
              value={data.itemPrice || ''}
              onChange={(e) => updateField('itemPrice', Number(e.target.value) || 0)}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden font-semibold transition-colors"
              placeholder="144999…"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800 block">
              Periode Penagihan
            </label>
            <div
              role="radiogroup"
              aria-label="Periode penagihan"
              className="grid grid-cols-3 gap-1.5"
            >
              {[
                { label: '/tahun', val: '/tahun' },
                { label: '/bulan', val: '/bulan' },
                { label: 'Sekali Beli', val: '' },
              ].map((p) => {
                const isSelected = data.period === p.val;
                return (
                  <button
                    key={p.label}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => updateField('period', p.val)}
                    className={`text-xs py-2 px-2 rounded-xl border text-center font-medium cursor-pointer transition-all select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-400 shadow-2xs'
                        : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        </div>
      </details>

      {/* Pajak & Total */}
      <details className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <summary className="p-4 sm:p-5 flex items-center justify-between cursor-pointer list-none select-none border-b border-transparent group-open:border-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded-2xl">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-none">Rincian Pajak & Total</h2>
              <p className="text-[11px] text-slate-500 mt-1">Perhitungan PPN otomatis atau nominal custom</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
              {data.currency}{data.totalType === 'custom' ? (data.customTotalAmount || 0).toLocaleString('id-ID') : 'Auto'}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200" aria-hidden="true" />
          </div>
        </summary>

        <div className="p-4 sm:p-5 pt-3 space-y-4">

        {/* Pajak Mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-800 block">
            Pengaturan Pajak (PPN)
          </label>
          <div
            role="radiogroup"
            aria-label="Pengaturan pajak"
            className="grid grid-cols-3 gap-2"
          >
            {[
              { id: 'custom', label: 'Kustom Manual' },
              { id: 'auto', label: `Otomatis (${data.taxPercent}%)` },
              { id: 'none', label: 'Tanpa Pajak' },
            ].map((t) => {
              const isSelected = data.taxType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => updateField('taxType', t.id as any)}
                  className={`text-xs py-2 px-2 rounded-xl border text-center font-medium cursor-pointer transition-all select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-400 shadow-2xs'
                      : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {data.taxType === 'custom' && (
            <div className="mt-2.5 pt-1">
              <label htmlFor="custom-tax-input" className="text-xs font-medium text-slate-700 block mb-1">
                Nominal Pajak Manual (misal 15950)
              </label>
              <input
                id="custom-tax-input"
                name="customTaxAmount"
                type="number"
                min="0"
                inputMode="numeric"
                value={data.customTaxAmount || ''}
                onChange={(e) => updateField('customTaxAmount', Number(e.target.value) || 0)}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden transition-colors"
                placeholder="15950…"
              />
            </div>
          )}
        </div>

        {/* Total Mode */}
        <div className="pt-3 border-t border-slate-100 space-y-1.5">
          <label className="text-xs font-semibold text-slate-800 block">
            Pengaturan Baris Total
          </label>
          <div
            role="radiogroup"
            aria-label="Pengaturan total"
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {[
              { id: 'custom', label: 'Kustom Manual' },
              { id: 'auto', label: 'Hitung Otomatis (Harga + Pajak)' },
            ].map((tot) => {
              const isSelected = data.totalType === tot.id;
              return (
                <button
                  key={tot.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => updateField('totalType', tot.id as any)}
                  className={`text-xs py-2 px-2.5 rounded-xl border text-center font-medium cursor-pointer transition-all select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-400 shadow-2xs'
                      : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {tot.label}
                </button>
              );
            })}
          </div>

          {data.totalType === 'custom' && (
            <div className="mt-2.5 pt-1">
              <label htmlFor="custom-total-input" className="text-xs font-medium text-slate-700 block mb-1">
                Nominal Total Kustom (misal 160949)
              </label>
              <input
                id="custom-total-input"
                name="customTotalAmount"
                type="number"
                min="0"
                inputMode="numeric"
                value={data.customTotalAmount || ''}
                onChange={(e) => updateField('customTotalAmount', Number(e.target.value) || 0)}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden font-bold transition-colors"
                placeholder="160949…"
              />
            </div>
          )}
        </div>
        </div>
      </details>

      {/* Metode Pembayaran */}
      <details className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <summary className="p-4 sm:p-5 flex items-center justify-between cursor-pointer list-none select-none border-b border-transparent group-open:border-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded-2xl">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
              <CreditCard className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-none">Metode Pembayaran</h2>
              <p className="text-[11px] text-slate-500 mt-1">Penyedia, kartu, atau e-wallet</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 max-w-[140px] truncate">
              {data.paymentProvider} {data.paymentDetails}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200" aria-hidden="true" />
          </div>
        </summary>

        <div className="p-4 sm:p-5 pt-3 space-y-4">

        <div>
          <label className="text-xs font-semibold text-slate-800 block mb-2">
            Pilih Cepat Penyedia
          </label>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {PAYMENT_PROVIDERS.slice(0, 8).map((provider) => {
              const isSelected = data.paymentProvider.toLowerCase().includes(provider.toLowerCase());
              return (
                <button
                  key={provider}
                  type="button"
                  onClick={() => updateField('paymentProvider', provider)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium cursor-pointer transition-colors select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-400'
                      : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {provider}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label htmlFor="payment-provider-input" className="text-xs font-semibold text-slate-800 block">
                Nama Kartu / Penyedia
              </label>
              <input
                id="payment-provider-input"
                name="paymentProvider"
                type="text"
                autoComplete="off"
                value={data.paymentProvider}
                onChange={(e) => updateField('paymentProvider', e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden transition-colors"
                placeholder="Mastercard…"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="payment-details-input" className="text-xs font-semibold text-slate-800 block">
                Format Nomor / Digit
              </label>
              <input
                id="payment-details-input"
                name="paymentDetails"
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={data.paymentDetails}
                onChange={(e) => updateField('paymentDetails', e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden font-mono transition-colors"
                placeholder="-0433 atau •••• 5150…"
              />
            </div>
          </div>
        </div>
        </div>
      </details>

      {/* Play Points Section */}
      <details className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <summary className="p-4 sm:p-5 flex items-center justify-between cursor-pointer list-none select-none border-b border-transparent group-open:border-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded-2xl">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100/60 shrink-0">
              <Award className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-none">Google Play Points</h2>
              <p className="text-[11px] text-slate-500 mt-1">Ikon diamond Play Points pada tanda terima</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${data.showPlayPoints ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
              {data.showPlayPoints ? `+${data.playPointsEarned} pts` : 'Nonaktif'}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200" aria-hidden="true" />
          </div>
        </summary>

        <div className="p-4 sm:p-5 pt-3 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-800">Status Fitur Play Points</span>
            <label className="inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                name="showPlayPoints"
                checked={data.showPlayPoints}
                onChange={(e) => updateField('showPlayPoints', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-10 h-6 bg-slate-200 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-2.5 text-xs font-semibold text-slate-800">
                {data.showPlayPoints ? 'Aktif' : 'Nonaktif'}
              </span>
            </label>
          </div>

          {data.showPlayPoints && (
            <div className="space-y-1.5 pt-1">
              <label htmlFor="play-points-input" className="text-xs font-semibold text-slate-800 block">
                Poin yang Diraih (+)
              </label>
              <input
                id="play-points-input"
                name="playPointsEarned"
                type="number"
                min="0"
                inputMode="numeric"
                value={data.playPointsEarned || ''}
                onChange={(e) => updateField('playPointsEarned', Number(e.target.value) || 0)}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden font-semibold transition-colors"
                placeholder="97…"
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                Menampilkan logo berlian resmi 4 warna Play Points dengan nilai tambah poin.
              </p>
            </div>
          )}
        </div>
      </details>

      {/* Bagian Bawah & Footer Email */}
      <details className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <summary className="p-4 sm:p-5 flex items-center justify-between cursor-pointer list-none select-none border-b border-transparent group-open:border-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded-2xl">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
              <Globe className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-none">Komponen Footer Email Resmi</h2>
              <p className="text-[11px] text-slate-500 mt-1">Ketentuan layanan, disclaimer hukum, dan link bantuan</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200" aria-hidden="true" />
        </summary>

        <div className="p-4 sm:p-5 pt-3 space-y-4">

        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors select-none">
            <input
              type="checkbox"
              name="showQuestionLink"
              checked={data.showQuestionLink}
              onChange={(e) => updateField('showQuestionLink', e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 w-4 h-4 cursor-pointer"
            />
            <span className="font-medium text-slate-800">Tampilkan baris &quot;Ada pertanyaan? Kunjungi [Pengembang]&quot;</span>
          </label>

          <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors select-none">
            <input
              type="checkbox"
              name="showFooterPromo"
              checked={data.showFooterPromo}
              onChange={(e) => updateField('showFooterPromo', e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 w-4 h-4 cursor-pointer"
            />
            <span className="font-medium text-slate-800">Tampilkan banner promo &quot;Semua hiburan ada di satu tempat…&quot;</span>
          </label>

          <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors select-none">
            <input
              type="checkbox"
              name="showFooterAddress"
              checked={data.showFooterAddress}
              onChange={(e) => updateField('showFooterAddress', e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 w-4 h-4 cursor-pointer"
            />
            <span className="font-medium text-slate-800">Tampilkan Alamat Kantor Singapore & Ketentuan Google 2026</span>
          </label>
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="footer-disclaimer-input" className="text-xs font-semibold text-slate-800">
              Disclaimer Hukum
            </label>
            <button
              type="button"
              onClick={() =>
                updateField(
                  'footerDisclaimer',
                  data.language === 'en'
                    ? 'By subscribing, you authorize us to charge you the subscription cost (as described above) automatically, charged to the payment method provided until canceled.'
                    : 'Dengan berlangganan, Anda memberi kami otorisasi untuk menagih biaya langganan kepada Anda (seperti dijelaskan di atas) secara otomatis, yang ditagihkan ke metode pembayaran yang diberikan sampai langganan tersebut dibatalkan. Pelajari cara membatalkan. Simpan email ini sebagai catatan.'
                )
              }
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded px-1"
            >
              Reset teks
            </button>
          </div>
          <textarea
            id="footer-disclaimer-input"
            name="footerDisclaimer"
            rows={2}
            value={data.footerDisclaimer}
            onChange={(e) => updateField('footerDisclaimer', e.target.value)}
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-hidden text-slate-700 transition-colors"
          />
        </div>
        </div>
      </details>
    </div>
  );
};
