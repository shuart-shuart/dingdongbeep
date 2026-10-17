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
