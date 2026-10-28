import { ReceiptData } from '../types/receipt';
import { formatCurrency } from './formatters';

export function generateRawGooglePlayHtml(data: ReceiptData): string {
  const isEn = data.language === 'en';
  const useDecimal = data.decimalFormat ?? isEn;

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

  const formattedItemPrice = formatCurrency(data.itemPrice, data.currency, useDecimal);
  const formattedTax = formatCurrency(taxAmount, data.currency, useDecimal);
  const formattedTotal = formatCurrency(totalAmount, data.currency, useDecimal);

  let introSection = '';
  if (data.introType === 'trial_subscription') {
    introSection = `<div>
You have signed up for a trial subscription from <span class="il"><span class="il"><span class="il">Google</span></span></span> Digital Inc. on <span class="il"><span class="il"><span class="il">Google Play</span></span></span>. Your trial will end on <b>${data.renewalDate}</b>. You will be <b>automatically charged the subscription cost
(currently ${data.trialCost || 'Rp 309.000,00/month'})</b> at the end of your trial unless canceled. You can cancel anytime. <a href="https://play.google.com/store/account/subscriptions" style="text-decoration:none;color:#1565c0" target="_blank">Manage your subscriptions</a>
</div>`;
  } else if (data.introType === 'new_subscription') {
    introSection = isEn
      ? `<div>
You have purchased a subscription from <span dir="ltr">${data.merchant}</span> on <span class="il"><span class="il"><span class="il">Google Play</span></span></span>. Your subscription will <b>automatically renew on ${data.renewalDate}</b> unless canceled. You can cancel anytime. <a href="https://play.google.com/store/account/subscriptions" style="text-decoration:none;color:#1565c0" target="_blank">Manage your subscriptions</a>
</div>`
      : `<div>
Anda telah melakukan pembelian langganan dari <span dir="ltr">${data.merchant}</span> di <span class="il"><span class="il"><span class="il"><span class="il">Google Play</span></span></span></span>. Langganan Anda akan <b>otomatis diperpanjang pada ${data.renewalDate}</b> kecuali jika Anda membatalkannya sebelum tanggal tersebut. Anda dapat membatalkannya kapan saja. <a href="https://play.google.com/store/account/subscriptions" style="text-decoration:none;color:#1565c0" target="_blank">Kelola langganan Anda</a>
</div>`;
  } else {
    introSection = isEn
      ? `<div>
Your subscription from ${data.merchant || 'Google Digital Inc.'} on Google Play continues and you've been charged. <a href="https://play.google.com/store/account/subscriptions" style="text-decoration:none;color:#1565c0" target="_blank">Manage your subscriptions</a>
${
  data.showBackupPaymentNotice
    ? `<br aria-hidden="true"><br aria-hidden="true">
To help keep your subscription active, add a backup payment method.<div style="margin-bottom:36px"></div>
<div style="text-align:center">
<a style="background:#00818f;color:#fdfdfd;font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:500;border-top:12px solid #00818f;border-bottom:12px solid #00818f;border-left:48px solid #00818f;border-right:48px solid #00818f;text-decoration:none" href="https://play.google.com/store/paymentmethods" target="_blank">
Add backup </a>
</div><div style="margin-bottom:36px"></div>`
    : ''
}
</div>`
      : `<div>
Langganan Anda dari ${data.merchant || 'Google Digital Inc.'} di Google Play berlanjut dan Anda telah dikenakan tagihan. <a href="https://play.google.com/store/account/subscriptions" style="text-decoration:none;color:#1565c0" target="_blank">Kelola langganan Anda</a>
${
  data.showBackupPaymentNotice
    ? `<br aria-hidden="true"><br aria-hidden="true">
Untuk membantu menjaga langganan Anda tetap aktif, tambahkan metode pembayaran cadangan.<div style="margin-bottom:36px"></div>
<div style="text-align:center">
<a style="background:#00818f;color:#fdfdfd;font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:500;border-top:12px solid #00818f;border-bottom:12px solid #00818f;border-left:48px solid #00818f;border-right:48px solid #00818f;text-decoration:none" href="https://play.google.com/store/paymentmethods" target="_blank">
Tambahkan cadangan </a>
</div><div style="margin-bottom:36px"></div>`
    : ''
}
</div>`;
  }

  const playPointsSection = data.showPlayPoints
    ? `<div style="border-bottom:1px solid #ededed"></div>
<div>
<table role="presentation" style="width:100%;margin:5px 0;padding:0;border-spacing:0">
<tbody><tr>
<td style="vertical-align:top;text-align:left;font-size:14px;line-height:21px;padding-top:5px;width:100%">
<b>
${isEn ? 'Play Points earned' : 'Play Points diraih'} </b>
</td>
<td style="vertical-align:top;text-align:right;font-size:14px;line-height:21px;width:150px">
<div style="display:table">
<img aria-hidden="true" alt="" title="" style="display:table-cell;vertical-align:-5px;padding-right:5px;height:25px;width:25px" src="https://www.gstatic.com/gumdrop/files/ads-diamond-logo-desk-transparent-w512px-h512px-2x.png" class="CToWUd">
<span style="display:table-cell;vertical-align:top;padding-right:3px;padding-top:1px">
+${data.playPointsEarned}
</span>
</div>
</td>
</tr>
</tbody></table>
</div>`
    : '';

  const promoSection = data.showFooterPromo
    ? `<div style="border-bottom:1px solid #ededed"></div>
<div style="margin:10px 5px;display:inline-block">
<table role="presentation">
<tbody>
<tr>
<td aria-hidden="true" style="vertical-align:top">
<div style="margin-left:8px;margin-top:3px"><img width="56" src="https://www.gstatic.com/gumdrop/files/google-play-crm-logo-transparent-w192px-h192px-2x.png" alt="" title="Google Play" class="CToWUd"></div>
</td>
<td style="vertical-align:top;font-size:12px;color:#555555;line-height:18px">
<div style="font-size:14px;line-height:21px;font-weight:bold;margin-bottom:8px"><span class="il">Google Play</span></div>
<div style="margin-bottom:8px">
${
  isEn
    ? `All your entertainment in one place, available anywhere. <a href="https://play.google.com" style="text-decoration:none;color:#1565c0" target="_blank">Learn more</a> <span style="font-family:'Droid Sans',Arial,sans-serif;color:#2b7f91;font-size:14px;padding-left:4px">›</span>`
    : `Semua hiburan ada di satu tempat, tersedia di mana saja. <a href="https://play.google.com" style="text-decoration:none;color:#1565c0" target="_blank">Pelajari lebih lanjut</a> <span style="font-family:'Droid Sans',Arial,sans-serif;color:#2b7f91;font-size:14px;padding-left:4px">›</span>`
}</div>
</td>
</tr>
</tbody>
</table>
</div>`
    : '';

  const addressSection = data.showFooterAddress
    ? `<div style="border-bottom:1px solid #ededed"></div>
<div>
${
  isEn
    ? `See your <a href="https://play.google.com/store/account/orderhistory" style="text-decoration:none;color:#1565c0" target="_blank">Google Play Order History</a>. <br><br>
View the Google Play <a href="https://support.google.com/googleplay/answer/2479637" style="text-decoration:none;color:#1565c0" target="_blank">Refund Policy</a> and the <a href="https://play.google.com/about/play-terms/" style="text-decoration:none;color:#1565c0" target="_blank">Terms of Service</a>.`
    : `Lihat <a href="https://play.google.com/store/account/orderhistory" style="text-decoration:none;color:#1565c0" target="_blank">Histori Pesanan Google Play</a> Anda. <br><br>
Lihat <a href="https://support.google.com/googleplay/answer/2479637" style="text-decoration:none;color:#1565c0" target="_blank">Kebijakan Pengembalian Dana</a> dan <a href="https://play.google.com/about/play-terms/" style="text-decoration:none;color:#1565c0" target="_blank">Persyaratan Layanan Google Play</a>.`
}</div>
<div style="font-size:10px;line-height:15px;color:#707070">
<br>
© 2025 Google | ${isEn ? 'All Rights Reserved.' : 'Semua Hak Dilindungi Undang-Undang.'} <br>
Google Asia Pacific Pte. Limited, 70 Pasir Panjang Road, #03-71, Mapletree Business City, Singapore 117371 <br><br>
${
  isEn
    ? `Please don't reply to this email, as we are unable to respond from this email address. If you need support, visit the <a href="https://support.google.com/googleplay" style="text-decoration:none;color:#1565c0" target="_blank">Google Play Help Center</a>.`
    : `Harap jangan balas email ini, karena kami tidak dapat membalas dari alamat email ini. Jika Anda memerlukan dukungan, buka <a href="https://support.google.com/googleplay" style="text-decoration:none;color:#1565c0" target="_blank">Pusat Bantuan Google Play</a>.`
}</div>`
    : '';

  return `<div style="width:590px;margin:0 auto;font-family:Roboto,Arial,sans-serif;background:#ffffff;color:#222222;">
<div style="padding-top:30px;padding-left:50px;padding-right:50px">
<a href="https://play.google.com" style="display:inline-block;border-top:4px solid transparent;border-bottom:4px solid transparent" target="_blank">
<img alt="Google Play" title="Google Play" width="162" src="https://www.gstatic.com/gumdrop/files/google-play-crm-lockup-ic-h-transparent-w688px-h140px-2x.png" style="border:none">
</a>
</div>
<div style="padding-left:50px;padding-right:50px;padding-bottom:1px">
<div style="border-bottom:1px solid #ededed"></div>
<div style="margin:20px 0px;font-size:30px;line-height:36px;text-align:left">
${isEn ? 'Thank you' : 'Terima kasih'}</div>
<div style="text-align:left">
${introSection}
<br aria-hidden="true">
<div style="margin-bottom:20px;text-align:left">
<b>${isEn ? 'Order number: ' : 'Nomor pesanan: '}</b> ${data.orderNumber}<br>
<b>${isEn ? 'Order date: ' : 'Tanggal pesanan: '}</b> ${data.orderDate}<br>
<b>${isEn ? 'Your account: ' : 'Akun Anda: '}</b><a href="mailto:${data.accountEmail}" target="_blank" style="color:#1565c0;text-decoration:none;">${data.accountEmail}</a>
</div>
</div>
<div>
<table role="presentation" style="width:100%;margin:5px 0">
<tbody>
<tr>
<td style="text-align:left;font-weight:bold;font-size:14px;line-height:21px">
Item </td>
<td style="text-align:right;font-weight:bold;font-size:14px;line-height:21px" width="70">
${isEn ? 'Price' : 'Harga'} </td>
</tr>
</tbody>
</table>
<div style="border-bottom:1px solid #ededed"></div>
<table role="presentation" style="width:100%;margin:5px 0">
<tbody><tr>
<td style="text-align:left;font-size:14px;line-height:21px;padding-right:10px;white-space:pre-line;">
<span dir="ltr">${data.itemName}</span>
</td>
<td style="text-align:right;font-size:14px;line-height:21px;vertical-align:top;">
<span>${formattedItemPrice}${data.period}</span>
</td>
</tr>
${
  data.itemSubtitle
    ? `<tr>
<td style="text-align:left;font-size:14px;line-height:21px;padding-right:10px;color:#555555;">
${data.itemSubtitle}</td>
<td style="text-align:right;font-size:14px;line-height:21px"></td>
</tr>`
    : ''
}
</tbody></table>
<div style="border-bottom:1px solid #ededed"></div>
<table role="presentation" style="width:100%;margin:5px 0">
<tbody>
${
  data.taxType !== 'none'
    ? `<tr>
<td style="text-align:right;font-size:14px;line-height:21px" width="150" colspan="2">${isEn ? 'Tax:' : 'Pajak:'}<span dir="left"> ${formattedTax}</span></td>
</tr>`
    : ''
}
<tr>
<td style="text-align:right;font-size:14px;line-height:21px" width="150" colspan="2">
<span dir="left">Total</span>: <span style="font-weight:bold;">
${formattedTotal}${data.period}</span>
</td>
</tr>
</tbody></table>
<div style="border-bottom:1px solid #ededed"></div>
<table role="presentation" style="width:100%;margin:5px 0 15px 0;padding:0;border-spacing:0">
<tbody><tr>
<td style="text-align:left;font-weight:bold;font-size:14px;line-height:21px;vertical-align:top">
${isEn ? 'Payment method:' : 'Metode pembayaran:'} </td>
<td>
<table role="presentation" style="margin-left:auto;font-size:14px;line-height:21px">
<tbody>
<tr>
<td style="font-size:14px;line-height:21px;text-align:right">
${data.paymentProvider} ${data.paymentDetails}
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody></table>
${playPointsSection}
<div style="border-bottom:1px solid #ededed"></div>
<div style="margin:48px 0 20px 0;font-size:10px;line-height:15px;color:#707070">
${data.footerDisclaimer} <a href="https://play.google.com/store/account/subscriptions" style="color:#1565c0;text-decoration:none;" target="_blank">${isEn ? 'Learn how to cancel' : 'Pelajari cara membatalkan'}</a>. ${isEn ? 'Keep this for your records.' : 'Simpan email ini sebagai catatan.'}
${
  data.showQuestionLink
    ? `<br><br>${isEn ? 'Questions? Visit ' : 'Ada pertanyaan? Kunjungi '}<a href="#" style="color:#1565c0;text-decoration:none;"><span dir="ltr">${data.merchant}</span></a>.`
    : ''
}
</div>
${promoSection}
${addressSection}
</div>
</div>`;
}
