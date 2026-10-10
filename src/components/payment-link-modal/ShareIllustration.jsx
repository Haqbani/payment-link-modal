import womanTaupe from './assets/avatars/saudi-woman-taupe-hijab.webp';
import womanBlack from './assets/avatars/saudi-woman-black-hijab.webp';
import man from './assets/avatars/saudi-man-shemagh.webp';
import link from './assets/icons/link.svg';
import './payment-link-modal.css';

const portraits = [
  { src: womanTaupe, x: 203, y: 82 },
  { src: womanBlack, x: 253, y: 180 },
  { src: man, x: 441, y: 167 },
  { src: man, x: 572, y: 103 },
];

/** Decorative illustration, hidden from assistive technology. */
export function ShareIllustration() {
  return (
    <div className="plm-art" aria-hidden="true">
      <svg className="plm-orbits" viewBox="0 0 552 212" fill="none">
        {[0, 8, 16].map((inset) => (
          <ellipse key={inset} cx="394" cy="93" rx={230 - inset} ry={88 - inset / 3} transform="rotate(-14 394 93)" />
        ))}
      </svg>
      <span className="plm-distant-disc" />
      {portraits.map(({ src, x, y }, index) => (
        <span className="plm-portrait-disc" key={index} style={{ left: `${x / 552 * 100}%`, top: `${y / 212 * 100}%` }}>
          <img src={src} alt="" draggable="false" />
        </span>
      ))}
      <span className="plm-link-disc"><img src={link} alt="" draggable="false" /></span>
    </div>
  );
}
