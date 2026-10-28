export interface ReceiptData {
  language?: 'id' | 'en';

  // Merchant & Vendor
  merchant: string; // e.g. "Negroni Applications Limited" or "Google Digital Inc."

  // Intro Text Style
  introType: 'new_subscription' | 'renew_subscription' | 'trial_subscription' | 'custom';
  renewalDate: string; // e.g. "16 Mar 2027" or "Aug 27, 2026"
  trialCost?: string; // e.g. "Rp 309.000,00/month"
  customIntroText: string;

  // Order Identification
  orderNumber: string; // e.g. "GPA.3322-0977-6366-29822"
  orderDate: string; // e.g. "16 Mar 2026 19.17.40 WIB" or "May 27, 2025 12:50:55 AM GMT+7"
  accountEmail: string; // e.g. "email@gmail.com"

  // Item Info
  itemName: string; // e.g. "New Yearly Offer (Flight Tracker－Live Air Radar)"
  itemSubtitle: string; // e.g. "Memperpanjang langganan secara otomatis" or "Auto-renewing subscription"

  // Pricing
  currency: string; // "Rp "
  itemPrice: number; // 144999
  period: string; // "/tahun", "/bulan", or ""
  decimalFormat?: boolean; // format with ,00 like Rp 0,00

  // Tax
  taxType: 'auto' | 'custom' | 'none';
  taxPercent: number; // 11
  customTaxAmount: number; // 15950

  // Total
  totalType: 'auto' | 'custom';
  customTotalAmount: number; // 160949

  // Payment
  paymentProvider: string; // "Mastercard" or "GoPay"
  paymentDetails: string; // "-0433" or "•••• 5150"

  // Play Points
  showPlayPoints: boolean;
  playPointsEarned: number; // 97

  // Extra Footers & Notices
  showBackupPaymentNotice?: boolean; // "To help keep your subscription active, add a backup payment method."
  showQuestionLink: boolean;
  showFooterPromo: boolean; // "Semua hiburan ada di satu tempat..."
  showFooterAddress: boolean; // Singapore address & copyright 2026

  // Legal Disclaimer
  footerDisclaimer: string;
}

export interface PresetItem {
  id: string;
  label: string;
  category: string;
  data: ReceiptData;
}
