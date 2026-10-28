import React, { forwardRef } from 'react';
import { ReceiptData } from '../types/receipt';
import { formatCurrency } from '../utils/formatters';
import { GooglePlayLogo } from './GooglePlayLogo';
import { PlayPointsDiamond } from './PlayPointsDiamond';

interface ReceiptPreviewProps {
  data: ReceiptData;
  scale?: number;
  previewMode?: 'clean' | 'gmail';
}

export const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(
  ({ data, previewMode = 'clean' }, ref) => {
    // Calculate Tax
    let taxAmount = 0;
    if (data.taxType === 'custom') {
      taxAmount = data.customTaxAmount;
    } else if (data.taxType === 'auto') {
      taxAmount = Math.round((data.itemPrice * data.taxPercent) / 100);
    } else {
      taxAmount = 0;
    }

    // Calculate Total
    let totalAmount = 0;
    if (data.totalType === 'custom') {
      totalAmount = data.customTotalAmount;
    } else {
      totalAmount = data.itemPrice + taxAmount;
    }

    const isEn = data.language === 'en';
    const useDecimal = data.decimalFormat ?? isEn;

    const formattedItemPrice = formatCurrency(data.itemPrice, data.currency, useDecimal);
    const formattedTax = formatCurrency(taxAmount, data.currency, useDecimal);
    const formattedTotal = formatCurrency(totalAmount, data.currency, useDecimal);

    const receiptContent = (
      <div
        id="receipt-print-area"
        className="w-[590px] min-w-[590px] mx-auto bg-white text-[#222222] font-['Roboto',Arial,sans-serif] selection:bg-blue-100 antialiased text-[14px] leading-[21px]"
        style={{
          boxSizing: 'border-box',
        }}
      >
        {/* Top Header Section (with 50px left/right padding) */}
        <div className="pt-[30px] px-[50px] pb-3">
          <a
            href="#google-play"
            className="inline-block"
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex items-center gap-2">
              <GooglePlayLogo className="h-7 w-auto" showText={true} />
            </div>
          </a>
        </div>

        {/* Mid Section */}
        <div className="px-[50px] pb-[20px]">
          {/* Divider */}
          <div className="border-b border-[#ededed]" />

          {/* Heading */}
          <div className="my-[20px] text-[30px] leading-[36px] text-left text-[#202124] font-normal tracking-tight">
            {isEn ? 'Thank you' : 'Terima kasih'}
          </div>

          {/* Intro Description */}
          <div className="text-left text-[#3c4043] text-[14px] leading-[21px]">
            {data.introType === 'trial_subscription' ? (
              <div>
                You have signed up for a trial subscription from{' '}
                <span dir="ltr" className="font-normal text-[#202124]">
                  {data.merchant || 'Google Digital Inc.'}
                </span>{' '}
                on <span>Google Play</span>. Your trial will end on{' '}
                <b>{data.renewalDate || 'Aug 27, 2026'}</b>. You will be{' '}
                <b>
                  automatically charged the subscription cost
                  {data.trialCost ? ` (currently ${data.trialCost})` : ''}
                </b>{' '}
                at the end of your trial unless canceled. You can cancel anytime.{' '}
                <a
                  href="#manage"
                  onClick={(e) => e.preventDefault()}
                  className="no-underline text-[#1565c0] hover:underline cursor-pointer"
                >
                  Manage your subscriptions
                </a>
              </div>
            ) : data.introType === 'new_subscription' ? (
              <div>
                {isEn ? (
                  <>
                    You have purchased a subscription from{' '}
                    <span dir="ltr" className="font-normal text-[#202124]">
                      {data.merchant || 'Negroni Applications Limited'}
                    </span>{' '}
                    on <span>Google Play</span>. Your subscription will{' '}
                    <b>
                      automatically renew on {data.renewalDate || '16 Mar 2027'}
                    </b>{' '}
                    unless canceled. You can cancel anytime.{' '}
                    <a
                      href="#manage"
                      onClick={(e) => e.preventDefault()}
                      className="no-underline text-[#1565c0] hover:underline cursor-pointer"
                    >
                      Manage your subscriptions
                    </a>
                  </>
                ) : (
                  <>
                    Anda telah melakukan pembelian langganan dari{' '}
                    <span dir="ltr" className="font-normal text-[#202124]">
                      {data.merchant || 'Negroni Applications Limited'}
                    </span>{' '}
                    di <span>Google Play</span>. Langganan Anda akan{' '}
                    <b>
                      otomatis diperpanjang pada {data.renewalDate || '16 Mar 2027'}
                    </b>{' '}
                    kecuali jika Anda membatalkannya sebelum tanggal tersebut. Anda dapat membatalkannya kapan saja.{' '}
                    <a
                      href="#manage"
                      onClick={(e) => e.preventDefault()}
                      className="no-underline text-[#1565c0] hover:underline cursor-pointer"
                    >
                      Kelola langganan Anda
                    </a>
                  </>
                )}
              </div>
            ) : data.introType === 'renew_subscription' ? (
              <div>
                {isEn ? (
                  <>
                    Your subscription from {data.merchant || 'Google Digital Inc.'} on Google Play continues and you've been charged.{' '}
                    <a
                      href="#manage"
                      onClick={(e) => e.preventDefault()}
                      className="no-underline text-[#1565c0] hover:underline cursor-pointer"
                    >
                      Manage your subscriptions
                    </a>
                  </>
                ) : (
                  <>
                    Langganan Anda dari {data.merchant || 'Google Digital Inc.'} di Google Play berlanjut dan Anda telah dikenakan tagihan.{' '}
                    <a
                      href="#manage"
                      onClick={(e) => e.preventDefault()}
                      className="no-underline text-[#1565c0] hover:underline cursor-pointer"
                    >
                      Kelola langganan Anda
                    </a>
                  </>
                )}
                {data.showBackupPaymentNotice && (
                  <div className="mt-4 mb-2">
                    <p className="mb-6">
                      {isEn
                        ? 'To help keep your subscription active, add a backup payment method.'
                        : 'Untuk membantu menjaga langganan Anda tetap aktif, tambahkan metode pembayaran cadangan.'}
                    </p>
                    <div className="text-center my-6">
                      <a
                        href="#backup"
                        onClick={(e) => e.preventDefault()}
                        style={{
                          background: '#00818f',
                          color: '#fdfdfd',
                          fontFamily: 'Roboto,Helvetica Neue,Helvetica,Arial,sans-serif',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 500,
                          borderTop: '12px solid #00818f',
                          borderBottom: '12px solid #00818f',
                          borderLeft: '48px solid #00818f',
                          borderRight: '48px solid #00818f',
                          textDecoration: 'none',
                          display: 'inline-block',
                        }}
                      >
                        {isEn ? 'Add backup' : 'Tambahkan cadangan'}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>{data.customIntroText}</div>
            )}

            <div className="my-[20px] text-left text-[14px] leading-[21px] text-[#3c4043] space-y-0.5">
              <div>
                <b className="text-[#202124]">{isEn ? 'Order number: ' : 'Nomor pesanan: '}</b> {data.orderNumber}
              </div>
              <div>
                <b className="text-[#202124]">{isEn ? 'Order date: ' : 'Tanggal pesanan: '}</b> {data.orderDate}
              </div>
              <div>
                <b className="text-[#202124]">{isEn ? 'Your account: ' : 'Akun Anda: '}</b>{' '}
                <a
                  href={`mailto:${data.accountEmail}`}
                  className="text-[#1565c0] hover:underline no-underline"
                >
                  {data.accountEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Table Header: Item & Harga */}
          <table role="presentation" className="w-full my-[5px]">
            <tbody>
              <tr>
                <td className="text-left font-bold text-[14px] leading-[21px] text-[#202124]">
                  Item
                </td>
                <td className="text-right font-bold text-[14px] leading-[21px] text-[#202124] w-[70px]">
                  {isEn ? 'Price' : 'Harga'}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Divider */}
          <div className="border-b border-[#ededed]" />

          {/* Table Item Details */}
          <table role="presentation" className="w-full my-[5px]">
            <tbody>
              <tr>
                <td className="text-left text-[14px] leading-[21px] pr-[10px] text-[#3c4043] whitespace-pre-line">
                  <span dir="ltr">{data.itemName}</span>
                </td>
                <td className="text-right text-[14px] leading-[21px] text-[#3c4043] whitespace-nowrap align-top">
                  <span>
                    {formattedItemPrice}
                    {data.period}
                  </span>
                </td>
              </tr>
              {data.itemSubtitle && (
                <tr>
                  <td className="text-left text-[14px] leading-[21px] pr-[10px] text-[#555555]">
                    {data.itemSubtitle}
                  </td>
                  <td className="text-right text-[14px] leading-[21px]"></td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Divider */}
          <div className="border-b border-[#ededed]" />

          {/* Tax & Total */}
          <table role="presentation" className="w-full my-[5px]">
            <tbody>
              {data.taxType !== 'none' && (
                <tr>
                  <td
                    className="text-right text-[14px] leading-[21px] text-[#3c4043] w-[150px]"
                    colSpan={2}
                  >
                    {isEn ? 'Tax:' : 'Pajak:'} <span dir="left">{formattedTax}</span>
                  </td>
                </tr>
              )}
              <tr>
                <td
                  className="text-right text-[14px] leading-[21px] font-normal text-[#202124] w-[150px]"
                  colSpan={2}
                >
                  <span dir="left">Total</span>:{' '}
                  <span className="font-bold">
                    {formattedTotal}
                    {data.period}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Divider */}
          <div className="border-b border-[#ededed]" />

          {/* Payment Method */}
          <table
            role="presentation"
            className="w-full my-[5px] mb-[15px] p-0 border-spacing-0"
          >
            <tbody>
              <tr>
                <td className="text-left font-bold text-[14px] leading-[21px] align-top text-[#202124]">
                  {isEn ? 'Payment method:' : 'Metode pembayaran:'}
                </td>
                <td>
                  <table
                    role="presentation"
                    className="ml-auto text-[14px] leading-[21px]"
                  >
                    <tbody>
                      <tr>
                        <td className="text-[14px] leading-[21px] text-right text-[#3c4043]">
                          {data.paymentProvider}
                          {data.paymentDetails ? `${data.paymentDetails.startsWith(' ') || data.paymentDetails.startsWith('-') || data.paymentDetails.startsWith(':') ? '' : ' '}${data.paymentDetails}` : ''}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Play Points Section (Optional / Toggleable) */}
          {data.showPlayPoints && (
            <>
              <div className="border-b border-[#ededed]" />
              <table
                role="presentation"
                className="w-full my-[5px] p-0 border-spacing-0"
              >
                <tbody>
                  <tr>
                    <td className="align-top text-left text-[14px] leading-[21px] pt-[5px] w-full text-[#202124]">
                      <b>{isEn ? 'Play Points earned' : 'Play Points diraih'}</b>
                    </td>
                    <td className="align-top text-right text-[14px] leading-[21px] w-[150px]">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <PlayPointsDiamond className="w-[22px] h-[22px]" />
                        <span className="align-top pr-[3px] pt-[1px] font-semibold text-[#202124] text-[14px]">
                          +{data.playPointsEarned}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {/* Divider */}
          <div className="border-b border-[#ededed]" />

          {/* Legal disclaimer */}
          <div className="mt-[48px] mb-[20px] text-[10px] leading-[15px] text-[#707070]">
            {data.footerDisclaimer}{' '}
            <a
              href="#cancel"
              onClick={(e) => e.preventDefault()}
              className="text-[#1565c0] hover:underline no-underline"
            >
              {isEn ? 'Learn how to cancel' : 'Pelajari cara membatalkan'}
            </a>
            . {isEn ? 'Keep this for your records.' : 'Simpan email ini sebagai catatan.'}
            {data.showQuestionLink && (
              <>
                <br />
                <br />
                {isEn ? 'Questions? Visit ' : 'Ada pertanyaan? Kunjungi '}
                <a
                  href="#contact"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#1565c0] hover:underline no-underline"
                >
                  <span dir="ltr">{data.merchant || (isEn ? 'Google Digital Inc.' : 'Negroni Applications Limited')}</span>
                </a>
                .
              </>
            )}
          </div>

          {/* Marketing / Google Play Entertainment Box (Optional) */}
          {data.showFooterPromo && (
            <>
              <div className="border-b border-[#ededed]" />
              <div className="my-[10px] mx-[5px] inline-block w-full">
                <table role="presentation" className="w-full">
                  <tbody>
                    <tr>
                      <td className="align-top w-[64px] pr-2">
                        <div className="ml-[4px] mt-[3px]">
                          <GooglePlayLogo className="w-12 h-12" showText={false} />
                        </div>
                      </td>
                      <td className="align-top text-[12px] text-[#555555] leading-[18px]">
                        <div className="text-[14px] leading-[21px] font-bold mb-[8px] text-[#202124]">
                          Google Play
                        </div>
                        <div className="mb-[8px]">
                          {isEn ? (
                            <>
                              All your entertainment in one place, available anywhere.{' '}
                              <a
                                href="#learnmore"
                                onClick={(e) => e.preventDefault()}
                                className="no-underline text-[#1565c0] hover:underline"
                              >
                                Learn more
                              </a>{' '}
                              <span className="text-[#2b7f91] font-bold">›</span>
                            </>
                          ) : (
                            <>
                              Semua hiburan ada di satu tempat, tersedia di mana saja.{' '}
                              <a
                                href="#learnmore"
                                onClick={(e) => e.preventDefault()}
                                className="no-underline text-[#1565c0] hover:underline"
                              >
                                Pelajari lebih lanjut
                              </a>{' '}
                              <span className="text-[#2b7f91] font-bold">›</span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Footer Terms & Singapore Address (Optional) */}
          {data.showFooterAddress && (
            <>
              <div className="border-b border-[#ededed]" />
              <div className="pt-2 text-[10px] leading-[15px] text-[#707070] space-y-2">
                <div>
                  {isEn ? 'See your ' : 'Lihat '}
                  <a
                    href="#history"
                    onClick={(e) => e.preventDefault()}
                    className="no-underline text-[#1565c0] hover:underline"
                  >
                    {isEn ? 'Google Play Order History' : 'Histori Pesanan Google Play'}
                  </a>
                  {isEn ? '.' : ' Anda.'}
                </div>
                <div>
                  {isEn ? 'View the Google Play ' : 'Lihat '}
                  <a
                    href="#refund"
                    onClick={(e) => e.preventDefault()}
                    className="no-underline text-[#1565c0] hover:underline"
                  >
                    {isEn ? 'Refund Policy' : 'Kebijakan Pengembalian Dana'}
                  </a>{' '}
                  {isEn ? 'and the ' : 'dan '}
                  <a
                    href="#terms"
                    onClick={(e) => e.preventDefault()}
                    className="no-underline text-[#1565c0] hover:underline"
                  >
                    {isEn ? 'Terms of Service' : 'Persyaratan Layanan Google Play'}
                  </a>
                  .
                </div>
                <div className="pt-1">
                  © 2025 Google | {isEn ? 'All Rights Reserved.' : 'Semua Hak Dilindungi Undang-Undang.'} <br />
                  Google Asia Pacific Pte. Limited, 70 Pasir Panjang Road, #03-71,
                  Mapletree Business City, Singapore 117371 <br />
                  <br />
                  {isEn ? (
                    <>
                      Please don't reply to this email, as we are unable to respond from this email address. If you need support, visit the{' '}
                      <a
                        href="#help"
                        onClick={(e) => e.preventDefault()}
                        className="no-underline text-[#1565c0] hover:underline"
                      >
                        Google Play Help Center
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      Harap jangan balas email ini, karena kami tidak dapat membalas
                      dari alamat email ini. Jika Anda memerlukan dukungan, buka{' '}
                      <a
                        href="#help"
                        onClick={(e) => e.preventDefault()}
                        className="no-underline text-[#1565c0] hover:underline"
                      >
                        Pusat Bantuan Google Play
                      </a>
                      .
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );

    if (previewMode === 'gmail') {
      return (
        <div
          ref={ref}
          className="w-[640px] min-w-[640px] mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
        >
          {/* Gmail Header Simulation */}
          <div className="bg-[#f2f6fc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#c2e7ff] text-[#001d35] flex items-center justify-center font-bold text-sm">
                G
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">
                    Google Play
                  </span>
                  <span className="text-xs text-slate-500">
                    &lt;googleplay-noreply@google.com&gt;
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Kepada: {data.accountEmail}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              {data.orderDate.split(' ').slice(0, 3).join(' ')}
            </div>
          </div>

          <div className="p-3 sm:p-5 bg-[#fafafa]">
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              {receiptContent}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="w-[590px] min-w-[590px] mx-auto bg-white shadow-md border border-slate-200/80 rounded-lg overflow-hidden"
      >
        {receiptContent}
      </div>
    );
  }
);

ReceiptPreview.displayName = 'ReceiptPreview';
