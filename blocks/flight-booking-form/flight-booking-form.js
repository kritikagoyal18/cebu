export default function decorate(block) {
  // Clear any author-supplied markup and render a static booking form UI
  block.textContent = '';
  block.classList.add('flight-booking-form');

  const tabs = document.createElement('div');
  tabs.className = 'fbf-tabs';
  tabs.innerHTML = `
    <span class="fbf-tab fbf-primary">Fly Here Next</span>
    <span class="fbf-tab">San Vicente (Port Barton)</span>
    <span class="fbf-tab">Sydney</span>
    <span class="fbf-tab">Hong Kong</span>
  `;

  const card = document.createElement('div');
  card.className = 'fbf-card';
  card.innerHTML = `
    <div class="fbf-header">
      <div class="fbf-title">
        <span class="fbf-icon">✈</span>
        <span>Flight</span>
      </div>
      <div class="fbf-trip-type">Round-trip</div>
    </div>
    <div class="fbf-grid">
      <div class="fbf-field">
        <span class="fbf-label">From</span>
        <div class="fbf-value">Manila MNL</div>
      </div>
      <div class="fbf-field">
        <span class="fbf-label">To</span>
        <div class="fbf-value fbf-dim">Select Destination</div>
      </div>
      <div class="fbf-field">
        <span class="fbf-label">Depart</span>
        <div class="fbf-value">13 Nov 2025</div>
      </div>
      <div class="fbf-field">
        <span class="fbf-label">Return</span>
        <div class="fbf-value fbf-dim">Returning on</div>
      </div>
      <div class="fbf-actions">
        <a href="#" class="fbf-search-button" aria-label="Search flights">Search flights</a>
      </div>
    </div>
  `;

  block.append(tabs, card);

  const button = block.querySelector('.fbf-search-button');
  if (button) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const event = new CustomEvent('flight-booking-form:search', {
        bubbles: true,
        detail: {
          from: 'Manila MNL',
          to: null,
          depart: '13 Nov 2025',
          return: null
        }
      });
      block.dispatchEvent(event);
    });
  }
}


