export default function decorate(block) {
  block.textContent = '';
  block.classList.add('flight-strip');

  const bar = document.createElement('div');
  bar.className = 'fs-bar';

  const inner = document.createElement('div');
  inner.className = 'fs-inner';
  inner.innerHTML = `
    <ul class="fs-steps">
      <li class="fs-step fs-active">
        <span class="fs-icon" aria-hidden="true">✈</span>
        <span class="fs-label">Select Flight</span>
      </li>
      <li class="fs-step">
        <span class="fs-icon" aria-hidden="true">🪪</span>
        <span class="fs-label">Guest Details</span>
      </li>
      <li class="fs-step">
        <span class="fs-icon" aria-hidden="true">➕</span>
        <span class="fs-label">Add-ons</span>
      </li>
      <li class="fs-step">
        <span class="fs-icon" aria-hidden="true">💳</span>
        <span class="fs-label">Payment</span>
      </li>
      <li class="fs-step">
        <span class="fs-icon" aria-hidden="true">✓</span>
        <span class="fs-label">Confirmation</span>
      </li>
    </ul>
  `;
  bar.append(inner);
  block.append(bar);
}


