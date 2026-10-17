// Minimal offline gallery support, replacing remote Elementor lightbox scripts.
document.addEventListener('click', function(e) {
 const a=e.target.closest('a[href]'); if (!a) return;
 const href=a.getAttribute('href');
 if (href && /\.(?:jpe?g|png|webp|gif)$/i.test(href) && a.querySelector('img')) {
  e.preventDefault();
  const dialog=document.createElement('dialog');dialog.className='archive-lightbox';
  dialog.innerHTML='<button aria-label="Close enlarged image" autofocus>×</button><img alt="">';
  dialog.querySelector('img').src=href;dialog.querySelector('img').alt=a.querySelector('img').alt || '';
  Object.assign(dialog.style,{border:'none',background:'transparent',padding:'16px',maxWidth:'96vw',maxHeight:'96vh'});
  const img=dialog.querySelector('img');Object.assign(img.style,{objectFit:'contain',maxWidth:'90vw',maxHeight:'86vh'});
  const btn=dialog.querySelector('button');Object.assign(btn.style,{position:'absolute',right:'4px',top:'0',fontSize:'30px',cursor:'pointer'});
  document.body.append(dialog);dialog.showModal();btn.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>dialog.remove());
 }
});


// Restore static Elementor/Swiper galleries without WordPress or Swiper runtime.
document.addEventListener('DOMContentLoaded', function () {
 document.querySelectorAll('.elementor-widget-image-carousel').forEach(function (widget) {
  const track = widget.querySelector('.elementor-image-carousel.swiper-wrapper');
  if (!track) return;
  const slides = Array.from(track.children).filter(el =>
   el.classList.contains('swiper-slide') && !el.classList.contains('swiper-slide-duplicate')
  );
  if (!slides.length) return;
  const shell = widget.querySelector('.elementor-image-carousel-wrapper');
  if (!shell) return;
  widget.classList.add('archive-carousel-ready');
  track.style.setProperty('transform', 'none', 'important');
  track.style.setProperty('transition', 'none', 'important');
  const all = Array.from(track.children).filter(el => el.classList.contains('swiper-slide'));
  let index = 0;
  const bullets = Array.from(widget.querySelectorAll('.swiper-pagination-bullet'));
  function show(next) {
   index = (next + slides.length) % slides.length;
   all.forEach(slide => {
    const active = slide === slides[index];
    slide.style.setProperty('display', active ? 'block' : 'none', 'important');
    slide.style.setProperty('width', active ? '100%' : '0', 'important');
    slide.setAttribute('aria-hidden', active ? 'false' : 'true');
   });
   bullets.forEach((dot, i) => {
    dot.classList.toggle('swiper-pagination-bullet-active', i === index);
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.setAttribute('aria-current', i === index ? 'true' : 'false');
   });
  }
  function bind(el, fn) {
   if (!el) return;
   el.setAttribute('role', 'button');
   el.setAttribute('tabindex', '0');
   el.addEventListener('click', fn);
   el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); }
   });
  }
  bind(widget.querySelector('.elementor-swiper-button-prev'), () => show(index - 1));
  bind(widget.querySelector('.elementor-swiper-button-next'), () => show(index + 1));
  bullets.forEach((b, i) => bind(b, () => show(i)));
  show(0);
 });
});
