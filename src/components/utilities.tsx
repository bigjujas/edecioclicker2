export const formatNumber = (num: number, decimals: number = 1): string => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(decimals) + 'B';
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(decimals) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(decimals) + 'K';
    } else if (num >= 100) {
      return (num.toFixed(0))
    } else {
      return num % 1 === 0 ? num.toString() : num.toFixed(decimals);
    }
  };