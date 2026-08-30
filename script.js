document.querySelectorAll('.nav-overlay a').forEach(link=>link.addEventListener('click',(e)=>{const cb=document.querySelector('.nav-checkbox');if(cb)cb.checked=false;const href=link.getAttribute('href');if(href&&href.startsWith('#')){const target=document.querySelector(href);if(target){e.preventDefault();setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),50)}}}));
const parcelData={1:{title:'Parcel 1',acres:'Approx. 127.78 Acres',image:'assets/images/parcel-1.jpg'},2:{title:'Parcel 2',acres:'Approx. 212.58 Acres',image:'assets/images/parcel-2.jpg'},3:{title:'Parcel 3',acres:'Approx. 112.95 Acres',image:'assets/images/parcel-3.jpg'}};
document.querySelectorAll('.parcel-tab').forEach(btn=>btn.addEventListener('click',()=>{const p=parcelData[btn.dataset.parcel];document.getElementById('parcelImage').src=p.image;document.getElementById('parcelImage').alt=p.title+' map';document.getElementById('parcelTitle').textContent=p.title;document.getElementById('parcelAcres').textContent=p.acres;document.querySelectorAll('.parcel-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}));
document.querySelectorAll('.video-shell').forEach(shell=>shell.addEventListener('click',()=>{const id=shell.dataset.videoId;if(!id||id==='REPLACE_WITH_YOUTUBE_ID'){alert('Video URL placeholder: replace REPLACE_WITH_YOUTUBE_ID in index.html with the final YouTube video ID.');return}shell.innerHTML=`<iframe width="100%" height="620" src="https://www.youtube.com/embed/${id}?autoplay=1" title="Sasabe Property Tour" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`}));
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
document.getElementById('shareBtn')?.addEventListener('click',async()=>{const data={title:'Own Sasabe',text:'Historic border town property in Sasabe, Arizona.',url:location.href};if(navigator.share){await navigator.share(data)}else{await navigator.clipboard.writeText(location.href);alert('Property link copied.')}});

// ===== Articles: load from assets/data/articles.json, render featured + grid =====
fetch('assets/data/articles.json')
  .then(r => r.json())
  .then(articles => {
    if (!articles.length) return;
    articles.sort((a,b) => new Date(b.date) - new Date(a.date));
    const featured = articles[0];
    const fLink = document.getElementById('featuredArticleLink');
    const fImg = document.getElementById('featuredArticleImg');
    const fTitle = document.getElementById('featuredArticleTitle');
    if (fLink) fLink.href = featured.file;
    if (fImg) fImg.src = featured.image;
    if (fTitle) fTitle.textContent = featured.title;

    const grid = document.getElementById('articlesGrid');
    if (grid) {
      grid.innerHTML = articles.slice(0, 6).map(a => `
        <a class="article-card" href="${a.file}">
          <img src="${a.image}" alt="${a.title}" />
          <div class="article-card-title">${a.title}</div>
          <div class="article-card-date">${a.date}</div>
        </a>
      `).join('');
    }
  })
  .catch(() => {});
