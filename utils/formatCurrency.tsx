'use client';

import { formatCurrencyString } from 'use-shopping-cart';

interface FormatCurrencyProps {
  value: number;
  currency: string;
}

export default function FormatCurrency({
  value,
  currency,
}: FormatCurrencyProps) {
  return (
    <span>
      {formatCurrencyString({
        value,
        currency,
      })}
    </span>
  );
}
