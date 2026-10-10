import { useId } from 'react';
import email from './assets/icons/email.svg';
import imessage from './assets/icons/imessage.svg';
import linkedin from './assets/icons/linkedin.svg';
import x from './assets/icons/x.svg';
import whatsapp from './assets/icons/whatsapp.svg';
import './payment-link-modal.css';

export function ShareButtons({ paymentUrl, label = 'Share to' }) {
  const id = useId();
  const encodedUrl = encodeURIComponent(paymentUrl);
  const destinations = [
    { name: 'Email', type: 'email', icon: email, href: `mailto:?subject=Payment%20link&body=${encodedUrl}` },
    { name: 'iMessage', type: 'imessage', icon: imessage, href: `sms:&body=${encodedUrl}` },
    { name: 'LinkedIn', type: 'linkedin', icon: linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, external: true },
    { name: 'X', type: 'x', icon: x, href: `https://twitter.com/intent/tweet?url=${encodedUrl}`, external: true },
    { name: 'WhatsApp', type: 'whatsapp', icon: whatsapp, href: `https://wa.me/?text=${encodedUrl}`, external: true },
  ];

  return (
    <section className="plm-share-section plm-ui" aria-labelledby={`${id}-label`}>
      <h2 id={`${id}-label`}>{label}</h2>
      <div className="plm-destinations">
        {destinations.map(({ name, type, icon, href, external }) => (
          <a key={name} className="plm-destination" href={href} aria-label={`Share via ${name}`} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
            <span className={`plm-icon plm-icon--${type}`} aria-hidden="true">
              <img src={icon} alt="" width="32" height="32" draggable="false" />
            </span>
            <span>{name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
