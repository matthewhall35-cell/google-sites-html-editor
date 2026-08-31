const canvas = document.querySelector('#site-canvas');
const hero = document.querySelector('#hero');
const toast = document.querySelector('#toast');
const layers = document.querySelectorAll('.layer');

function selectSection(button) {
  layers.forEach(item => item.classList.remove('active'));
  document.querySelectorAll('.site-canvas > section, .site-canvas > footer').forEach(item => item.classList.remove('selected-section'));
  button.classList.add('active');
  const section = document.querySelector(`#${button.dataset.section}`);
  section.classList.add('selected-section');
  document.querySelector('#selected-name').textContent = `${button.textContent.trim().replace('⠿', '').replace('◇', '').replace('▦', '').replace('❞', '').replace('—', '').replace('◉', '').trim()} section`;
}
layers.forEach(button => button.addEventListener('click', () => selectSection(button)));

document.querySelectorAll('.swatch').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.swatch').forEach(swatch => swatch.classList.remove('selected-swatch'));
  button.classList.add('selected-swatch');
  hero.style.background = button.dataset.color;
}));
document.querySelector('#height-range').addEventListener('input', event => {
  hero.style.height = `${event.target.value}px`;
  document.querySelector('#height-value').value = `${event.target.value} px`;
});
document.querySelector('#type-size').addEventListener('input', event => {
  document.querySelector('.hero h1').style.fontSize = `${event.target.value}px`;
});
document.querySelectorAll('.layout').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.layout').forEach(option => option.classList.remove('active'));
  button.classList.add('active');
}));
document.querySelectorAll('.device-switcher button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.device-switcher button').forEach(option => option.classList.remove('selected'));
  button.classList.add('selected');
  canvas.style.width = button.dataset.device === 'mobile' ? '375px' : button.dataset.device === 'tablet' ? '650px' : '';
}));
document.querySelector('#export-button').addEventListener('click', () => {
  const documentHtml = `<!doctype html>\n${document.documentElement.outerHTML.replace(/<script src="app.js"><\/script>/, '')}`;
  const file = new Blob([documentHtml], { type: 'text/html' });
  const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(file), download: `${document.querySelector('#project-name').value || 'sitecraft-design'}.html` });
  link.click(); URL.revokeObjectURL(link.href);
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500);
});
document.querySelector('#preview-button').addEventListener('click', () => window.open(URL.createObjectURL(new Blob([canvas.outerHTML], { type: 'text/html' })), '_blank'));
document.querySelector('#delete-section').addEventListener('click', () => { hero.style.display = 'none'; document.querySelector('[data-section="hero"]').style.opacity = '.35'; });
document.querySelector('#save-template').addEventListener('click', () => { toast.textContent = 'Template saved to this browser'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); });
