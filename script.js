const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
menuButton.addEventListener('click', () => {
  mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.style.display = 'none'));

const overlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchItems = [
  {title:'Benefits', text:'Pure, safe and effective daily cleansing benefits.', href:'#benefits'},
  {title:'Customer Reels', text:'Swipe through customer Instagram reels one by one.', href:'#reels'},
  {title:'Dermatologist-inspired routine', text:'See the simple 3-step cleansing routine.', href:'#dermatologist'},
  {title:'Customer Reviews', text:'Read happy customer experiences.', href:'#reviews'},
  {title:'Buy Now — ₹349', text:'Official website offer and marketplace links.', href:'#buy'},
  {title:'Amazon — ₹499', text:'Open the Amazon product page.', href:'https://amzn.in/d/0fFSCJ0h'},
  {title:'Flipkart — ₹499', text:'Open the Flipkart product page.', href:'https://dl.flipkart.com/dl/ai-skin-world-gentle-face-wash/p/itm5bfef70eb8eb4?pid=FCWHJRYFCYKEYHUZ&lid=LSTFCWHJRYFCYKEYHUZPDG5ZQ&marketplace=FLIPKART&_refId=&_appId=CL'}
];
function openSearch(){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');setTimeout(()=>searchInput.focus(),100);renderSearch('')}
function closeSearch(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}
function renderSearch(query){
  const q=query.toLowerCase().trim();
  const items=searchItems.filter(i => !q || `${i.title} ${i.text}`.toLowerCase().includes(q));
  searchResults.innerHTML = items.length ? items.map(i=>`<a class="search-result" href="${i.href}" ${i.href.startsWith('http')?'target="_blank" rel="noopener noreferrer"':''}><strong>${i.title}</strong><small>${i.text}</small></a>`).join('') : '<div class="search-result">No results found. Try “buy”, “reels” or “benefits”.</div>';
  searchResults.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeSearch));
}
document.getElementById('searchButton').addEventListener('click',openSearch);
document.getElementById('searchClose').addEventListener('click',closeSearch);
document.getElementById('searchSubmit').addEventListener('click',()=>renderSearch(searchInput.value));
searchInput.addEventListener('input',e=>renderSearch(e.target.value));
searchInput.addEventListener('keydown',e=>{if(e.key==='Enter')renderSearch(e.target.value)});
overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSearch()});

const track = document.getElementById('reelTrack');
const cards = [...track.children];
const dotsWrap = document.getElementById('reelDots');
let reelIndex = 0;
cards.forEach((_,i)=>{const dot=document.createElement('button');dot.setAttribute('aria-label',`Go to reel ${i+1}`);dot.addEventListener('click',()=>goToReel(i));dotsWrap.appendChild(dot)});
const dots=[...dotsWrap.children];
function updateDots(){dots.forEach((d,i)=>d.classList.toggle('active',i===reelIndex))}
function goToReel(i){reelIndex=(i+cards.length)%cards.length;track.scrollTo({left:track.clientWidth*reelIndex,behavior:'smooth'});updateDots()}
document.getElementById('reelPrev').addEventListener('click',()=>goToReel(reelIndex-1));
document.getElementById('reelNext').addEventListener('click',()=>goToReel(reelIndex+1));
let scrollTimer;
track.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{reelIndex=Math.round(track.scrollLeft/track.clientWidth);updateDots()},80)});
updateDots();
