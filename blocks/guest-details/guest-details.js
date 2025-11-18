export default function decorate(block) {
  block.textContent = '';
  block.classList.add('guest-details');

  const wrapper = document.createElement('div');
  wrapper.className = 'gd-wrapper';

  const title = document.createElement('h2');
  title.className = 'gd-title';
  // If a section heading exists (outside the block), reuse its text and hide it
  const section = block.closest('.section');
  const authoredHeading = section?.querySelector('.default-content-wrapper h1, .default-content-wrapper h2');
  if (authoredHeading) {
    title.textContent = authoredHeading.textContent.trim();
    authoredHeading.style.display = 'none';
  } else {
    title.textContent = 'Guest Details';
  }

  const card = document.createElement('div');
  card.className = 'gd-card';

  const sidebar = document.createElement('aside');
  sidebar.className = 'gd-sidebar';
  sidebar.innerHTML = `
    <div class="gd-tab gd-tab-active">
      <span>Adult 1</span>
    </div>
  `;

  const main = document.createElement('div');
  main.className = 'gd-main';

  // Top bundles row
  const bundles = document.createElement('div');
  bundles.className = 'gd-bundles';
  bundles.innerHTML = `
    <div class="gd-bundles-heading">Selected bundles for this guest</div>
    <div class="gd-bundle-pills">
      <span class="gd-route">MNL–MEL</span>
      <span class="gd-bundle">GO Basic ✈</span>
      <span class="gd-divider"></span>
      <span class="gd-route">MEL–MNL</span>
      <span class="gd-bundle">GO Basic ✈</span>
    </div>
  `;

  // Form layout (static presentation)
  const form = document.createElement('div');
  form.className = 'gd-form';
  form.innerHTML = `
    <div class="gd-field full">
      <label class="gd-label">Name</label>
      <div class="gd-help">Please make sure that you enter your name exactly as it is shown on your Valid ID</div>
    </div>
    <div class="gd-field">
      <label class="gd-label">Title</label>
      <input class="gd-input" placeholder="Select" disabled>
    </div>
    <div class="gd-field">
      <label class="gd-label">First name*</label>
      <input class="gd-input" placeholder="Enter first name" disabled>
    </div>
    <div class="gd-field">
      <label class="gd-label">Last name*</label>
      <input class="gd-input" placeholder="Enter last name" disabled>
    </div>
    <div class="gd-field full">
      <label class="gd-checkbox"><input type="checkbox" disabled> I have no first name</label>
    </div>
    <div class="gd-field">
      <label class="gd-label">Day*</label>
      <input class="gd-input" placeholder="DD" disabled>
    </div>
    <div class="gd-field">
      <label class="gd-label">Month*</label>
      <input class="gd-input" placeholder="Month" disabled>
    </div>
    <div class="gd-field">
      <label class="gd-label">Year*</label>
      <input class="gd-input" placeholder="YYYY" disabled>
    </div>
    <div class="gd-field full">
      <label class="gd-label">Nationality*</label>
      <input class="gd-input" placeholder="Select nationality" disabled>
    </div>
    <div class="gd-field full">
      <label class="gd-label">Go Rewards Membership ID (Optional)</label>
      <input class="gd-input" placeholder="e.g. 4041178445" disabled>
    </div>
    <div class="gd-field">
      <label class="gd-label">Passport number</label>
      <input class="gd-input" placeholder="Enter passport number" disabled>
    </div>
    <div class="gd-field">
      <label class="gd-label">Country of Issue</label>
      <input class="gd-input" placeholder="Select country" disabled>
    </div>
    <div class="gd-field">
      <label class="gd-label">Day</label>
      <input class="gd-input" placeholder="DD" disabled>
    </div>
    <div class="gd-field">
      <label class="gd-label">Month</label>
      <input class="gd-input" placeholder="Month" disabled>
    </div>
    <div class="gd-field">
      <label class="gd-label">Year</label>
      <input class="gd-input" placeholder="YYYY" disabled>
    </div>
    <div class="gd-field full">
      <label class="gd-checkbox"><input type="checkbox" disabled> I am an Overseas Filipino Worker (OFW)</label>
    </div>
    <div class="gd-field full">
      <label class="gd-checkbox"><input type="checkbox" disabled> I have a declaration / request</label>
    </div>
    <div class="gd-field full">
      <label class="gd-checkbox"><input type="checkbox" disabled> I am a Person with Disability</label>
    </div>
  `;

  main.append(bundles, form);
  card.append(sidebar, main);
  wrapper.append(title, card);
  block.append(wrapper);
}


