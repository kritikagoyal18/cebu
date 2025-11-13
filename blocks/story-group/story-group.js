import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Collect up to 5 images from authored content
  const images = [];
  [...block.children].forEach((row) => {
    const img = row.querySelector('img');
    if (img) {
      images.push({
        src: img.src,
        alt: img.alt || '',
      });
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
    caption.textContent = item.alt || `Story ${idx + 1}`;

    li.append(thumbWrap, caption);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}


