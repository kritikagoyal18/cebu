import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Collect up to 5 images and optional captions from authored content
  const images = [];
  const captions = [];
  [...block.children].forEach((row) => {
    const img = row.querySelector('img');
    const p = row.querySelector('p');
    if (img) {
      images.push({ src: img.src, alt: img.alt || '' });
    } else if (p && p.textContent?.trim()) {
      captions.push(p.textContent.trim());
    }
  });

  // Fallback: if no children came through, render nothing
  if (!images.length) {
    return;
  }

  // Limit to 5
  const items = images.slice(0, 5);

  const ul = document.createElement('ul');
  ul.className = 'sg-list';

  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'sg-item';

    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'sg-thumb';

    const optimizedPic = createOptimizedPicture(item.src, item.alt || `Story ${idx + 1}`, false, [
      { width: '200' },
    ]);
    thumbWrap.append(optimizedPic);

    const caption = document.createElement('div');
    caption.className = 'sg-caption';
    caption.textContent = captions[idx] || item.alt || `Story ${idx + 1}`;

    li.append(thumbWrap, caption);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}


