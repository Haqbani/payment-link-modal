import { useEffect, useId, useRef } from 'react';
import { CopyLinkField } from './CopyLinkField.jsx';
import { ShareButtons } from './ShareButtons.jsx';
import { ShareIllustration } from './ShareIllustration.jsx';
import './payment-link-modal.css';

/** Controlled dialog: the parent owns open and updates it in onClose. */
export function PaymentLinkModal({ open, onClose, paymentUrl }) {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) {
      dialog.showModal();
      titleRef.current?.focus({ preventScroll: true });
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => { if (dialog.open) dialog.close(); };
  }, [open]);

  function dismissOutside(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="plm-modal plm-ui"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={dismissOutside}
    >
      <div className="plm-surface">
        <header className="plm-header">
          <ShareIllustration />
          <button className="plm-close" type="button" aria-label="Close payment link sharing" onClick={onClose}>
            <span aria-hidden="true" />
          </button>
          <div className="plm-header-copy">
            <h1 id={`${id}-title`} ref={titleRef} tabIndex={-1}>Share payment link</h1>
            <p id={`${id}-description`}>Send this link to your customer so they<br className="plm-desktop-break" /> can complete their payment.</p>
          </div>
        </header>
        <div className="plm-body">
          {open && <CopyLinkField paymentUrl={paymentUrl} />}
          <ShareButtons paymentUrl={paymentUrl} />
        </div>
      </div>
    </dialog>
  );
}
