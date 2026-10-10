import { useState } from 'react';
import { PaymentLinkModal } from './components/payment-link-modal';

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <main className="demo">
      <button className="demo-open" onClick={() => setOpen(true)}>
        Share payment link
      </button>
      <PaymentLinkModal
        open={open}
        onClose={() => setOpen(false)}
        paymentUrl="https://example.com/pay/123"
      />
    </main>
  );
}
