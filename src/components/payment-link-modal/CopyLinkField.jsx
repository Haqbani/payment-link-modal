import { useEffect, useId, useRef, useState } from 'react';
import './payment-link-modal.css';

export function CopyLinkField({ paymentUrl, label = 'Share your link' }) {
  const id = useId();
  const resetTimer = useRef(null);
  const mounted = useRef(false);
  const requestVersion = useRef(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; requestVersion.current += 1; clearTimeout(resetTimer.current); };
  }, []);

  useEffect(() => {
    requestVersion.current += 1;
    clearTimeout(resetTimer.current);
    setStatus('idle');
  }, [paymentUrl]);

  async function copyLink() {
    const version = ++requestVersion.current;
    let nextStatus;
    try {
      await navigator.clipboard.writeText(paymentUrl);
      nextStatus = 'copied';
    } catch {
      nextStatus = 'error';
    }
    if (!mounted.current || version !== requestVersion.current) return;
    setStatus(nextStatus);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus('idle'), 2600);
  }

  return (
    <section className="plm-link-section plm-ui" aria-labelledby={`${id}-label`}>
      <h2 id={`${id}-label`}>{label}</h2>
      <div className="plm-url-control">
        <input type="text" aria-label="Payment link" readOnly value={paymentUrl} onFocus={(event) => event.currentTarget.select()} />
        <button className="plm-copy" type="button" onClick={copyLink} aria-label={status === 'copied' ? 'Payment link copied' : 'Copy payment link'}>
          <span className="plm-copy-glyph" aria-hidden="true" />
        </button>
      </div>
      <span className="plm-copy-status" role="status">
        {status === 'copied' ? 'Link copied' : status === 'error' ? 'Select the link and copy it manually' : ''}
      </span>
    </section>
  );
}
