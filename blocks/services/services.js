export default function decorate(block) {
  // Clear authored content; static render
  block.textContent = '';
  block.classList.add('services');

  const wrapper = document.createElement('div');
  wrapper.className = 'services-card';

  const makeItem = (iconText, label) => {
    const item = document.createElement('div');
    item.className = 'service';

    const icon = document.createElement('span');
    icon.className = 'svc-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = iconText;

    const title = document.createElement('div');
    title.className = 'svc-title';
    title.textContent = label;

    item.append(icon, title);
    return item;
  };

  const items = [
    makeItem('✓', 'Check In'),
    makeItem('₱', 'CEB Super Pass'),
    makeItem('✈', 'Flight Status'),
    makeItem('✎', 'Manage Booking'),
  ];

  items.forEach((item, idx) => {
    wrapper.append(item);
  });

  block.append(wrapper);
}


