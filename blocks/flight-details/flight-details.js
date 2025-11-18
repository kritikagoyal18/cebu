function sectionTemplate(title, routeFrom, routeTo, selectedDateLabel, fareLabel, fareAmount, extraBadge) {
  return `
    <div class="fd-section">
      <h3 class="fd-title">${title}</h3>
      <div class="fd-route"><span class="fd-city">${routeFrom}</span> <span class="fd-plane">✈</span> <span class="fd-city">${routeTo}</span></div>

      <div class="fd-dates">
        <ul class="fd-date-list">
          <li class="fd-date">Sun 04 Jan <span>PHP 35,779.71</span></li>
          <li class="fd-date">Mon 05 Jan <span>No Flights</span></li>
          <li class="fd-date">Tue 06 Jan <span>PHP 35,779.71</span></li>
          <li class="fd-date">Wed 07 Jan <span>No Flights</span></li>
          <li class="fd-date fd-active">${selectedDateLabel} <span>${fareAmount}</span></li>
          <li class="fd-date">Fri 09 Jan <span>PHP 32,079.71</span></li>
          <li class="fd-date">Sat 10 Jan <span>PHP 35,779.71</span></li>
        </ul>
      </div>

      <div class="fd-toolbar">
        <div class="fd-filter-group">
          <button class="fd-pill">Time of flight</button>
          <button class="fd-pill">Stops</button>
          <button class="fd-pill">Price</button>
        </div>
        <div class="fd-sort">
          <button class="fd-pill">Sort by</button>
        </div>
      </div>

      <div class="fd-card">
        <div class="fd-card-main">
          <div class="fd-times">
            <div class="fd-col">
              <div class="fd-time">12:40 PM</div>
              <div class="fd-meta">Depart · MNL</div>
            </div>
            <div class="fd-duration">8h 25m</div>
            <div class="fd-col">
              <div class="fd-time">12:05 AM</div>
              <div class="fd-meta">Arrive · ${routeTo.split(' ')[0]} <span class="fd-note">(next day)</span></div>
            </div>
            <div class="fd-stops">1 stop</div>
          </div>
          <div class="fd-ops">Flight operated by: <span>Cebu Pacific</span> · <span>Cebgo</span> · <span>AirSWIFT</span></div>
        </div>
        <div class="fd-card-price">
          ${extraBadge ? `<div class="fd-badge">${extraBadge}</div>` : ''}
          <div class="fd-price-label">${fareLabel}</div>
          <div class="fd-price">${fareAmount} <span class="fd-chevron">›</span></div>
        </div>
      </div>
    </div>
  `;
}

export default function decorate(block) {
  block.textContent = '';
  block.classList.add('flight-details');

  const wrapper = document.createElement('div');
  wrapper.className = 'fd-wrapper';

  wrapper.innerHTML = `
    ${sectionTemplate(
      'Select your departing flight',
      'Manila MNL',
      'Melbourne MEL',
      'Thu 08 Jan',
      'All-in Fare/guest',
      'PHP 35,779.71'
    )}
    ${sectionTemplate(
      'Select your returning flight',
      'Melbourne MEL',
      'Manila MNL',
      'Fri 16 Jan',
      'All-in Fare/guest',
      'PHP 15,439.31',
      'DISCOUNTED FARE'
    )}
  `;

  block.append(wrapper);
}


