export function getCookie(key: string) {                                      // Get cookie
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");    
  return b ? b.pop() : "";                                                // Return cookie value
}

export function currencyFormat(amount: number) {    // Format currency
  return '₹' + (amount/10).toFixed(2);           // Return formatted currency
}