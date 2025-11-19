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
        <input class="fbf-input fbf-input-from" name="from" type="text" value="Manila MNL" aria-label="From">
      </div>
      <div class="fbf-field">
        <span class="fbf-label">To</span>
        <input class="fbf-input fbf-input-to" name="to" type="text" value="Melbourne MEL" aria-label="To">
      </div>
      <div class="fbf-field fbf-depart-field">
        <span class="fbf-trip-type">Round-trip</span>
        <span class="fbf-label">Depart</span>
        <input class="fbf-input fbf-input-depart" name="depart" type="date" value="2026-01-13" aria-label="Depart">
      </div>
      <div class="fbf-field">
        <span class="fbf-label">Return</span>
        <input class="fbf-input fbf-input-return" name="return" type="date" value="2026-01-23" aria-label="Return">
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

  // Expose a small API so other scripts can set/read values easily
  const api = {
    setValues: ({ from, to, depart, returnDate } = {}) => {
      if (from !== undefined) block.querySelector('.fbf-input-from').value = from;
      if (to !== undefined) block.querySelector('.fbf-input-to').value = to;
      if (depart !== undefined) block.querySelector('.fbf-input-depart').value = depart;
      if (returnDate !== undefined) block.querySelector('.fbf-input-return').value = returnDate;
    },
    getValues: () => ({
      from: block.querySelector('.fbf-input-from').value,
      to: block.querySelector('.fbf-input-to').value,
      depart: block.querySelector('.fbf-input-depart').value,
      return: block.querySelector('.fbf-input-return').value,
    }),
  };
  // attach to the block and a global namespace for convenience
  // usage: document.querySelector('.flight-booking-form').fbf.setValues({ from: 'MNL' })
  // or: window.flightBookingForm.setValues({...})
  block.fbf = api;
  window.flightBookingForm = api;
}


