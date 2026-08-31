const canvas = document.querySelector('#site-canvas');
const hero = document.querySelector('#hero');
const toast = document.querySelector('#toast');
const layers = document.querySelectorAll('.layer');
const picker = document.querySelector('#element-picker');

function showToast(message) { toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2500); }
function selectSection(button) {
  layers.forEach(item => item.classList.remove('active'));
  document.querySelectorAll('.site-canvas > section, .site-canvas > footer').forEach(item => item.classList.remove('selected-section'));
  button.classList.add('active');
  const section = document.querySelector(`#${button.dataset.section}`);
  if (!section) return;
  section.classList.add('selected-section');
  document.querySelector('#selected-name').textContent = `${button.querySelector('.layer-icon').nextElementSibling.textContent} section`;
}
function openPicker() { picker.classList.add('open'); picker.setAttribute('aria-hidden', 'false'); }
function closePicker() { picker.classList.remove('open'); picker.setAttribute('aria-hidden', 'true'); }
function addElement(type) {
  const element = document.createElement('section');
  element.className = `custom-element custom-${type}`;
  const content = {
    text: '<p class="eyebrow" contenteditable="true">A NEW CHAPTER</p><h2 contenteditable="true">Tell your story here.</h2><p contenteditable="true">Click this copy to make it yours. Add as much detail as you need to introduce this part of your site.</p>',
    button: '<p class="eyebrow" contenteditable="true">READY WHEN YOU ARE</p><h2 contenteditable="true">Let’s work together.</h2><button class="added-button" contenteditable="true">Get in touch →</button>',
    image: '<div><p class="eyebrow">IMAGE</p><h2 contenteditable="true">A place for your image.</h2><p contenteditable="true">Choose an image file to replace this placeholder.</p><label class="image-upload">Choose image<input class="image-file" type="file" accept="image/*" /></label><img class="uploaded-image" alt="Your uploaded design" hidden /></div>',
    divider: '<hr />',
    embed: '<p class="eyebrow">EMBED</p><h2 contenteditable="true">Add an embed URL.</h2><input class="embed-url" type="url" placeholder="Paste a YouTube, Google Drive, or website URL" /><button class="embed-button">Add embed</button><p class="embed-result">Your embed link will appear here.</p>',
    gallery: '<p class="eyebrow">GALLERY</p><h2 contenteditable="true">A visual collection.</h2><div class="gallery-grid"><div></div><div></div><div></div></div>',
  };
  element.innerHTML = content[type];
  canvas.insertBefore(element, canvas.querySelector('footer'));
  closePicker(); showToast(`${type[0].toUpperCase() + type.slice(1)} added to your page`);
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
canvas.addEventListener('change', event => {
  if (!event.target.matches('.image-file')) return;
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => { const image = event.target.closest('.custom-image').querySelector('.uploaded-image'); image.src = reader.result; image.hidden = false; showToast('Image added to your page'); });
  reader.readAsDataURL(file);
});
canvas.addEventListener('click', event => {
  if (!event.target.matches('.embed-button')) return;
  const section = event.target.closest('.custom-embed');
  const url = section.querySelector('.embed-url').value;
  section.querySelector('.embed-result').textContent = url ? `Embed link added: ${url}` : 'Paste a URL first.';
});
layers.forEach(button => button.addEventListener('click', () => selectSection(button)));
document.querySelector('#add-section').addEventListener('click', openPicker);
document.querySelector('#close-picker').addEventListener('click', closePicker);
picker.addEventListener('click', event => { if (event.target === picker) closePicker(); });
document.querySelectorAll('[data-element]').forEach(button => button.addEventListener('click', () => addElement(button.dataset.element)));
document.querySelectorAll('.swatch').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.swatch').forEach(swatch => swatch.classList.remove('selected-swatch')); button.classList.add('selected-swatch'); hero.style.background = button.dataset.color; }));
document.querySelector('.add-swatch').addEventListener('click', () => { const input = Object.assign(document.createElement('input'), { type: 'color', value: '#f1eee7' }); input.addEventListener('input', () => { hero.style.background = input.value; }); input.click(); });
document.querySelector('#height-range').addEventListener('input', event => { hero.style.height = `${event.target.value}px`; document.querySelector('#height-value').value = `${event.target.value} px`; });
document.querySelector('#type-size').addEventListener('input', event => { document.querySelector('.hero h1').style.fontSize = `${event.target.value}px`; });
document.querySelector('#font-picker').addEventListener('change', event => {
  const family = event.target.value;
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet'; fontLink.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}:wght@400;500;600;700&display=swap`;
  document.head.append(fontLink);
  document.querySelector('.hero h1').style.fontFamily = `'${family}', sans-serif`;
  showToast(`${family} loaded from Google Fonts`);
});
document.querySelectorAll('.layout').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.layout').forEach(option => option.classList.remove('active')); button.classList.add('active'); hero.style.gridTemplateColumns = button.textContent.includes('Stack') ? '1fr' : button.textContent.includes('Full') ? '1fr 0fr' : '53% 47%'; }));
document.querySelectorAll('.device-switcher button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.device-switcher button').forEach(option => option.classList.remove('selected')); button.classList.add('selected'); canvas.style.width = button.dataset.device === 'mobile' ? '375px' : button.dataset.device === 'tablet' ? '650px' : ''; }));
document.querySelector('#undo-button').addEventListener('click', () => showToast('Undo is ready for your next edit'));
document.querySelector('#redo-button').addEventListener('click', () => showToast('Nothing to redo yet'));
document.querySelector('#close-inspector').addEventListener('click', () => document.querySelector('.inspector').classList.toggle('hidden'));
document.querySelector('#share-button').addEventListener('click', async () => { try { await navigator.clipboard.writeText(window.location.href); showToast('Link copied to clipboard'); } catch { showToast('Copy this link from your browser address bar'); } });
document.querySelector('#add-page').addEventListener('click', () => { const name = `New page ${document.querySelectorAll('.page').length}`; const page = document.createElement('div'); page.className = 'page'; page.innerHTML = `<span>◇</span> ${name}`; document.querySelector('#pages-list').append(page); showToast(`${name} added`); });
document.querySelector('#export-button').addEventListener('click', () => { const documentHtml = `<!doctype html>\n${document.documentElement.outerHTML.replace(/<script src="app.js"><\/script>/, '')}`; const file = new Blob([documentHtml], { type: 'text/html' }); const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(file), download: `${document.querySelector('#project-name').value || 'sitecraft-design'}.html` }); link.click(); URL.revokeObjectURL(link.href); showToast('HTML export downloaded'); });
document.querySelector('#preview-button').addEventListener('click', () => window.open(URL.createObjectURL(new Blob([document.documentElement.outerHTML], { type: 'text/html' })), '_blank'));
document.querySelector('#delete-section').addEventListener('click', () => { hero.style.display = 'none'; document.querySelector('[data-section="hero"]').style.opacity = '.35'; showToast('Hero section deleted'); });
document.querySelector('#save-template').addEventListener('click', () => { localStorage.setItem('sitecraft-template', canvas.innerHTML); showToast('Template saved to this browser'); });
