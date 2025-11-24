import { getMetadata } from '../../scripts/aem.js';
import { isAuthorEnvironment } from '../../scripts/scripts.js';
import { getHostname } from '../../scripts/utils.js';

function sortItemsByLastModified(items) {
  return items.sort((a, b) => {
    const getLastModified = (item) => {
      const metaArr = item._metadata?.calendarMetadata || [];
      const lastMod = metaArr.find(m => m.name === 'cq:lastModified');
      return lastMod ? Date.parse(lastMod.value) : 0;
    };
    return getLastModified(b) - getLastModified(a);
  });
}

async function loadContentFragments(queryValue) {
  const GRAPHQL_FAQ_LIST_QUERY = '/graphql/execute.json/ref-demo-eds/FAQList';
  const CONFIG = {
    WRAPPER_SERVICE_URL: 'https://3635370-refdemoapigateway-stage.adobeioruntime.net/api/v1/web/ref-demo-api-gateway/fetch-cf'
  };

  // Decode path in case author passed an encoded URL
  const decodedPath = decodeURIComponent(queryValue);

  const hostnameFromPlaceholders = await getHostname();
  const hostname = hostnameFromPlaceholders ? hostnameFromPlaceholders : getMetadata('hostname');
  const aemauthorurl = getMetadata('authorurl') || '';
  const aempublishurl = hostname?.replace('author', 'publish')?.replace(/\/$/, '') || '';
  const isAuthor = isAuthorEnvironment();

  const requestConfig = isAuthor
    ? {
        url: `${aemauthorurl}${GRAPHQL_FAQ_LIST_QUERY};path=${decodedPath};ts=${Date.now()}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    : {
        url: `${CONFIG.WRAPPER_SERVICE_URL}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          graphQLPath: `${aempublishurl}${GRAPHQL_FAQ_LIST_QUERY}`,
          cfPath: decodedPath,
          variation: `main;ts=${Date.now()}`
        })
      };

  const response = await fetch(requestConfig.url, {
    method: requestConfig.method,
    headers: requestConfig.headers,
    ...(requestConfig.body && { body: requestConfig.body })
  });

  if (!response.ok) {
    throw new Error(`FAQ GraphQL request failed: ${response.status}`);
  }

  let payload;
  try {
    payload = await response.json();
  } catch (e) {
    throw new Error('Failed to parse FAQ GraphQL JSON');
  }

  const items = Object.values(payload?.data || {})?.[0]?.items || [];
  return items;
}

// Helper to get attribute value by prop name, supporting both author and publish environments
function getBlockPropValue(block, propName, order) {
  const attrDiv = block.querySelector(`[data-aue-prop="${propName}"]`);
  if (attrDiv) {
    return attrDiv.textContent?.trim() || '';
  } else if (block.children[order]) {
    return block.children[order].textContent?.trim() || '';
  }
  return '';
}

export default function decorate(block) {
  // Get configuration from block attributes or sequential divs.
  const queryValue = getBlockPropValue(block, 'reference', 0);

  if (!queryValue) return;
  // Clear authored content immediately so any plain link isn't converted to a button
  // by global decorateButtons before we render the FAQ items.
  block.textContent = '';

  // Responsive columns for grid
  function getResponsiveColumns() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 600) return 2;
    return 1; // mobile
  }

  let currentColumns = getResponsiveColumns();
  let allItems = [];
  let sortedItems = [];

  // Card-based slide structure
  function createSlide(item) {
    const id = `faq-${Math.random().toString(36).slice(2)}`;
    const itemEl = document.createElement('div');
    itemEl.classList.add('faq-item');
    itemEl.innerHTML = `
      <button class="faq-acc-header" id="${id}-header" aria-controls="${id}-panel" aria-expanded="false">
        <span class="faq-acc-title">${item.questionTitle}</span>
        <span class="faq-acc-chevron" aria-hidden="true"></span>
      </button>
      <div class="faq-acc-panel" id="${id}-panel" role="region" aria-labelledby="${id}-header">
        <div class="faq-acc-content">
          <p>${item.answerDescription?.plaintext || item.answerDescription || ''}</p>
        </div>
      </div>
    `;
    return itemEl;
  }

  // Apply grid styles inline to override old carousel CSS
  function applyGridStyles(columns) {
    block.style.display = 'grid';
    block.style.gridTemplateColumns = `repeat(1, minmax(0, 1fr))`;
    block.style.gap = '20px';
    block.style.overflow = 'visible';
    block.style.scrollBehavior = 'auto';
  }

  function renderGrid(itemsToRender) {
    block.replaceChildren();
    currentColumns = getResponsiveColumns();
    applyGridStyles(currentColumns);
    itemsToRender.forEach(item => {
      block.append(createSlide(item));
    });
    initAccordion();
  }

  function render() {
    sortedItems = sortItemsByLastModified(allItems);
    renderGrid(sortedItems);
  }

  function initAccordion() {
    const items = Array.from(block.querySelectorAll('.faq-item'));
    const toggle = (clicked) => {
      items.forEach((it) => {
        const header = it.querySelector('.faq-acc-header');
        const panel = it.querySelector('.faq-acc-panel');
        const shouldOpen = it === clicked ? header.getAttribute('aria-expanded') !== 'true' : false;
        header.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        it.classList.toggle('open', shouldOpen);
      });
    };
    items.forEach((it, index) => {
      const header = it.querySelector('.faq-acc-header');
      header.addEventListener('click', () => toggle(it));
      if (index === 0) {
        // open first by default
        header.setAttribute('aria-expanded', 'true');
        it.classList.add('open');
      }
    });
  }

  (async () => {
    try {
      // Fetch and process data
      const cfItems = await loadContentFragments(queryValue);
      allItems = cfItems;
      render();

      // No customStyle authoring; keep block classnames minimal

      // Responsive: update grid columns on resize
      window.addEventListener('resize', () => {
        const newColumns = getResponsiveColumns();
        if (newColumns !== currentColumns) {
          currentColumns = newColumns;
          applyGridStyles(currentColumns);
        }
      });

    } catch (error) {
      console.error('Error loading content fragments:', error);
    }
  })();
}