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
    <div class="fbf-header"></div>
    <div class="fbf-grid">
      <div class="fbf-field fbf-from-field">
        <div class="fbf-title fbf-inline-title">
          <span class="fbf-icon">✈</span>
          <span>Flight</span>
        </div>
        <span class="fbf-label">From</span>
        <div class="fbf-value">Manila MNL</div>
      </div>
      <div class="fbf-field">
        <span class="fbf-label">To</span>
        <div class="fbf-value fbf-dim">Melbourne MEL</div>
      </div>
      <div class="fbf-field fbf-depart-field">
        <span class="fbf-trip-type">Round-trip</span>
        <span class="fbf-label">Depart</span>
        <div class="fbf-value">13 January 2026</div>
      </div>
      <div class="fbf-field">
        <span class="fbf-label">Return</span>
        <div class="fbf-value fbf-dim">23 January 2026</div>
      </div>
      <div class="fbf-actions">
        <a href="#" class="fbf-search-button" aria-label="Search flights">Search flights</a>
      </div>
    </div>
  `;

  block.append(tabs, card);

  const button = block.querySelector('.fbf-search-button');
  if (button) {
    // Navigate to Flight Details page on click
    button.setAttribute('href', 'https://main--cebu--kritikagoyal18.aem.live/en/flight-details');
  }
}


