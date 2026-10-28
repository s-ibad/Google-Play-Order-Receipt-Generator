export function formatCurrency(
  amount: number,
  prefix: string = 'Rp ',
  decimal: boolean = false
): string {
  if (isNaN(amount)) return decimal ? `${prefix}0,00` : `${prefix}0`;
  const formattedNumber = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decimal ? `${prefix}${formattedNumber},00` : `${prefix}${formattedNumber}`;
}

export function generateRandomOrderNumber(prefix: 'SOP' | 'GPA' = 'SOP'): string {
  const randBlock = (digits: number) => {
    let result = '';
    for (let i = 0; i < digits; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  };

  if (prefix === 'SOP') {
    // Format in user's image: SOP.3343-8530-3490-03950..0
    return `SOP.${randBlock(4)}-${randBlock(4)}-${randBlock(4)}-${randBlock(5)}..0`;
  } else {
    // Standard Google Play order ID: GPA.3343-8530-3490-03950
    return `GPA.${randBlock(4)}-${randBlock(4)}-${randBlock(4)}-${randBlock(5)}`;
  }
}

export function getCurrentFormattedDate(timezone: string = 'WIB'): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const now = new Date();
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${day} ${month} ${year} ${hours}.${minutes}.${seconds} ${timezone}`;
}
