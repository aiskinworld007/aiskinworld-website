const menuButton=document.getElementById('menuButton');
const mobileMenu=document.getElementById('mobileMenu');
menuButton?.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
mobileMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

document.querySelectorAll('[data-slider]').forEach(slider=>{
  const viewport=slider.querySelector('.slider-viewport');
  const track=slider.querySelector('.slider-track');
  const slides=[...slider.querySelectorAll('.slide')];
  const prev=slider.querySelector('.prev');
  const next=slider.querySelector('.next');
  const dots=slider.querySelector('.slider-dots');
  let index=0,startX=0,deltaX=0,dragging=false;
  slides.forEach((_,i)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Go to slide ${i+1}`);dot.addEventListener('click',()=>go(i));dots.appendChild(dot);});
  const dotButtons=[...dots.children];
  function go(newIndex){index=(newIndex+slides.length)%slides.length;track.style.transform=`translateX(-${index*100}%)`;dotButtons.forEach((dot,i)=>dot.classList.toggle('active',i===index));}
  prev?.addEventListener('click',()=>go(index-1));next?.addEventListener('click',()=>go(index+1));
  viewport.addEventListener('pointerdown',e=>{dragging=true;startX=e.clientX;deltaX=0;viewport.setPointerCapture(e.pointerId);});
  viewport.addEventListener('pointermove',e=>{if(!dragging)return;deltaX=e.clientX-startX;});
  viewport.addEventListener('pointerup',()=>{if(!dragging)return;dragging=false;if(Math.abs(deltaX)>55)go(index+(deltaX<0?1:-1));});
  viewport.addEventListener('pointercancel',()=>{dragging=false;});
  go(0);
});

// Always open the website from the top, even when the browser restores an old scroll position.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', () => {
  if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

// 10-minute offer countdown. It restarts after reaching zero.
const offerTimer = document.getElementById('offerTimer');
if (offerTimer) {
  const duration = 10 * 60;
  let remaining = duration;
  const renderTimer = () => {
    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    offerTimer.textContent = `${minutes}:${seconds}`;
    remaining = remaining <= 0 ? duration : remaining - 1;
  };
  renderTimer();
  window.setInterval(renderTimer, 1000);
}
