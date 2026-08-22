const $=id=>document.getElementById(id);
const set=(id,v)=>{const e=$(id);if(e)e.textContent=v};
const href=(id,v)=>{const e=$(id);if(e)e.href=v};

document.addEventListener("DOMContentLoaded",()=>{
  set("groomDisplay",WEDDING.couple.groomDisplay);
  set("brideDisplay",WEDDING.couple.brideDisplay);

  const n=WEDDING.nikah,w=WEDDING.walima;
  set("nikahVenue",n.venue);set("nikahAddress",n.address);href("nikahMap",n.map);
  set("walimaVenue",w.venue);set("walimaAddress",w.address);href("walimaMap",w.map);

  set("groomFather",WEDDING.families.groomFather);
  set("groomMother",WEDDING.families.groomMother);
  set("brideFather",WEDDING.families.brideFather);
  set("brideMother",WEDDING.families.brideMother);

  const contacts=$("contacts");
  WEDDING.contacts.forEach(number=>{
    const el=document.createElement("div");
    el.className="contact";
    el.innerHTML=`<div class="contact-number">${number}</div>
      <div class="contact-actions">
        <a href="tel:${number}">CALL</a>
        <a href="https://wa.me/91${number}" target="_blank" rel="noopener">WHATSAPP</a>
      </div>`;
    contacts.appendChild(el);
  });

  const screens=[...document.querySelectorAll(".screen")];
  const bottom=[...document.querySelectorAll(".bottom-nav button")];

  function go(id){
    screens.forEach(s=>s.classList.toggle("active",s.dataset.screen===id));
    bottom.forEach(b=>b.classList.toggle("active",b.dataset.go===id));
    window.scrollTo(0,0);
    document.querySelector(".drawer").classList.remove("open");
  }

  document.querySelectorAll("[data-go]").forEach(el=>el.addEventListener("click",()=>go(el.dataset.go)));
  $("menuBtn").addEventListener("click",()=>$("drawer").classList.add("open"));
  $("closeMenu").addEventListener("click",()=>$("drawer").classList.remove("open"));

  setTimeout(()=>$("preloader").classList.add("hide"),900);

  function countdown(){
    const diff=new Date(WEDDING.nikah.countdownTarget).getTime()-Date.now();
    if(diff<=0){set("countdown","THE DAY IS HERE");return}
    const d=Math.floor(diff/86400000);
    const h=Math.floor(diff%86400000/3600000);
    const m=Math.floor(diff%3600000/60000);
    const s=Math.floor(diff%60000/1000);
    set("countdown",`${d} DAYS · ${String(h).padStart(2,"0")} HRS · ${String(m).padStart(2,"0")} MIN · ${String(s).padStart(2,"0")} SEC`);
  }
  countdown();setInterval(countdown,1000);

  // Keep the interaction quiet: no autoplay audio, no intrusive popups.
});

window.openLightbox = function(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lightbox.classList.add("active");
};

window.closeLightbox = function() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("active");
};

// --- UI UPGRADES ---

// Magical Golden Bokeh & Embers
const ambientBg = document.querySelector(".ambient-bg");
if (ambientBg) {
  ambientBg.innerHTML = ""; // Clear old static rays/blobs
  
  // 1. Massive Soft Golden Bokeh
  for (let i = 0; i < 30; i++) {
    const bokeh = document.createElement("div");
    bokeh.className = "bokeh-orb";
    const size = 30 + Math.random() * 150;
    bokeh.style.width = size + "px";
    bokeh.style.height = size + "px";
    bokeh.style.left = Math.random() * 100 + "%";
    
    const duration = 20 + Math.random() * 40;
    const delay = Math.random() * -60; // start mid-animation
    
    bokeh.style.animationDuration = duration + "s";
    bokeh.style.animationDelay = delay + "s";
    ambientBg.appendChild(bokeh);
  }
}

// 2. Tiny Floating Embers (Dust)
const dustContainer = document.getElementById("dustContainer");
if (dustContainer) {
  dustContainer.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    const dust = document.createElement("div");
    dust.className = "dust";
    dust.style.left = Math.random() * 100 + "%";
    dust.style.top = Math.random() * 100 + "%";
    dust.style.animationDelay = Math.random() * -15 + "s";
    dust.style.animationDuration = 5 + Math.random() * 15 + "s";
    dustContainer.appendChild(dust);
  }
}

// Elite 3D Tilt for Card with Glare
const card = document.querySelector(".image-card");
const glare = document.querySelector(".card-glare");
if (card) {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `scale(1.04) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
    
    // Move glare
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 60%)`;
    }
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = `scale(1) rotateX(0deg) rotateY(0deg) translateY(0)`;
    if (glare) {
      glare.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, transparent 60%)`;
    }
  });
}

// Music Player Logic (Mobile Optimized)
const bgMusic = document.getElementById("bgMusic");

if (bgMusic) {
  let isPlaying = false;
  
  const playAudio = () => {
    if (!isPlaying) {
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isPlaying = true;
          document.removeEventListener('click', playAudio);
          document.removeEventListener('touchend', playAudio);
        }).catch((e) => {
          console.log('Autoplay blocked');
        });
      }
    }
  };
  
  // Bind to document
  document.addEventListener('click', playAudio, { once: true });
  document.addEventListener('touchend', playAudio, { once: true });
  
  // Bind directly to action buttons to guarantee iOS playback
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', playAudio);
    btn.addEventListener('touchend', playAudio);
  });
}
