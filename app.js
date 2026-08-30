/* Global flag: has the user interacted with the page yet? */
window.__userInteracted = false;
['click', 'touchstart', 'keydown'].forEach(function (evt) {
  document.addEventListener(evt, function () { window.__userInteracted = true; }, { capture: true, once: true });
});

(function () {
  var projects = [
    { id: 'project-urban-runner', title: 'Where is Paul?', label: 'Track your life story across space & time · 27 countries · 53+ moments', desc: 'A reimagining of personal history as a living, spatial record of a life deliberately lived — a luminous Earth where cities, crossings, and hard-won stays rise as glowing markers, and time itself becomes navigable. Moments appear as blog posts, swipeable cards, videos, and AI-generated comic-book sequences drawn from real photographs and lived scenes, some carrying QR codes that open onto the actual places they depict. The people who shaped the journey are present too, each with a short video in which they speak for themselves. A deliberate trail of adventure, curiosity, and human connection left to inspire the future generation — proof that a full, challenging, far-reaching life is possible, and that the map, the stories, the places, and the voices still remain for them to continue.', img: 'where-is-paul', alt: 'Where is Paul — track your life story across space and time on an interactive 3D canvas', url: '/apps/where-is-paul', repo: 'https://github.com/paulvisciano/where-is-paul', videos: ['https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/portfolio/where-is-paul-tablet.mp4', 'https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/portfolio/who-is-paul-apple-vision-2.mp4'], videosPortrait: ['https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/where-is-paul-portrait.mp4', 'https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/who-is-paul-apple-vision-2-portrait.mp4'] },
    { id: 'project-musical-cubes', title: 'Musical Cubes', label: 'Music Production · React · Ionic · Capacitor', desc: 'An interactive music production app where tracks live as rotating 3D cubes — each face is an instrument stem you can play, loop, and sync in real time. Rotate a cube to switch between piano, keys, brass, vocal, bass, and guitar. Each face has its own waveform you can scrub, and all stems share a playhead so layered instruments stay in time. Built cross-platform as a PWA and native mobile app with haptics, so making music feels like playing with sound, not operating software.', img: 'musical-cubes', alt: 'Musical Cubes — interactive 3D cube instruments for music production, built with React, Ionic, and Swiper', url: '/apps/musical-cubes', repo: 'https://github.com/paulvisciano/musical-cubes', videos: ['https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/musical-cubes-landscape.mp4'], videosPortrait: ['https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/musical-cubes.mp4'] },
    { id: 'project-neuro-graph', title: 'Neuro Graph', label: '3D Neural Graph · Canvas · Force-directed · Memory as Network', desc: 'A 3D neural graph that visualizes a human life as a living network — people, places, activities, emotions, and moments in time, connected by synapses. The consciousness layer of a two-tier memory system: a private encrypted archive of raw transcripts, audio, and photos, and a public curated graph published on a timeline you can orbit. Nodes are concepts, synapses are relationships, and temporal nodes orbit by date so you can see when memories formed. Click any neuron to focus its cluster, drag to orbit, scroll to zoom. 149 neurons, 418 synapses, growing with every experience.', images: ['neuro-graph-1'], alt: 'Neuro Graph — a 3D force-directed neural network visualizing memory as connected nodes of people, places, emotions, and time', url: '/apps/neuro-graph', repo: 'https://github.com/paulvisciano/neuro-graph' },
    { id: 'project-knowledge-graph', title: 'Knowledge Graph', label: 'Spatial AI · Time as Dimension · Voice + Photos · Local LLM · Coming soon', desc: 'A private spatial interface for memory and knowledge. Conversations, photos, and voice notes live as floating elements on an infinite canvas of time — scroll to move through days and months, speak to query or add. Everything runs locally on your own machine. Not a chat window, but a living personal command space where your data stays sovereign.', images: ['knowledge-graph-1', 'knowledge-graph-2'], alt: 'Knowledge Graph — a private visual memory palace on a Three.js time-layered canvas, with local LLM, voice input, and photo ingestion', repo: 'https://github.com/paulvisciano/knowledge-graph', videos: ['https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/knowledge-graph-video.mp4'], videosPortrait: ['https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/knowledge-graph-video-portrait.mp4'] },
    { id: 'project-jarvis', title: 'JARVIS', label: 'Sovereign Local AI · Git as Memory · 3D Neural Interface · Whisper', desc: 'The original attempt at building a sovereign, local-first AI with reliable memory. Instead of fragile vector stores, Git itself is the memory layer — every commit is a learning event, every commit a neuron. The repository is the mind: versioned, auditable, portable, inspectable. A cinematic 3D interface with a glowing central orb for voice and text interaction, a dual-brain neurograph visualizing both the AI\u2019s technical memory and the user\u2019s life context, and early local Whisper integration. This project laid the foundation for everything that followed, evolving into Neuro Graph and later the Knowledge Graph.', images: ['portfolio/jarvis-tablet'], alt: 'JARVIS — cinematic neural mind UI on tablet, a local-first AI using Git as its memory layer with a 3D neurograph interface', repo: 'https://github.com/paulvisciano/JARVIS' },
  ];

  var grid = document.querySelector('.project-grid');
  if (!grid) return;

  /* Cache-bust version. Bump when any R2 image is replaced. */
  var IMG_VERSIONS = {
    'neuro-graph-1': 5,
    'where-is-paul': 5,
    'knowledge-graph-1': 5,
    'knowledge-graph-2': 5,
    'musical-cubes': 5,
    'portfolio/jarvis-tablet': 5
  };
  function imgV(name) {
    return 'v=' + (IMG_VERSIONS[name] || 5);
  }

  var isPortrait = window.matchMedia('(max-width: 760px)').matches;
  grid.innerHTML = projects.map(function (item) {
    var vids = item.videos || (item.video ? [item.video] : []);
    var vidsPortrait = item.videosPortrait || [];
    var imgs = item.images || (item.img ? [item.img] : []);
    var videoHTML = vids.map(function (v, i) {
      var portraitSrc = vidsPortrait[i] || '';
      var usePortrait = isPortrait && portraitSrc;
      var src = usePortrait ? portraitSrc : v;
      return '<video src="' + src + '" muted playsinline preload="metadata"' +
        (portraitSrc ? ' data-src-landscape="' + v + '" data-src-portrait="' + portraitSrc + '"' : '') +
        (i === 0 ? ' class="video-active"' : '') + '></video>';
    }).join('');
    var imageHTML = imgs.map(function (img, i) {
      var v = imgV(img);
      return '<picture data-img-index="' + i + '"' + (i === 0 ? ' class="img-active"' : '') + '>' +
        '<source type="image/webp" srcset="https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/' + img + '.webp?' + v + '">' +
        '<img src="https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/' + img + '.jpg?' + v + '" alt="' + item.alt + '" width="1200" height="676" loading="lazy" />' +
        '</picture>';
    }).join('');
    var imgClipCount = imgs.length > 1 ? imgs.length : 0;
    var vidClipCount = vids.length > 1 ? vids.length : 0;
    var clipCount = vidClipCount || imgClipCount;
    var hasClips = clipCount > 1;
    var indicatorHTML = hasClips
      ? '<div class="clip-indicator">' + Array.from({ length: clipCount }, function (_, i) {
          return '<span' + (i === 0 ? ' class="clip-active"' : '') + '></span>';
        }).join('') + '</div>'
      : '';
    var card = '<article class="project-card" data-od-id="' + item.id + '"' +
      (item.url ? ' data-url="' + item.url + '" style="cursor:pointer"' : '') + '>' +
      '<div class="img-wrap">' +
      '<picture class="img-active"><source type="image/webp" srcset="https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/' + imgs[0] + '.webp?' + imgV(imgs[0]) + '"><img src="https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/' + imgs[0] + '.jpg?' + imgV(imgs[0]) + '" alt="' + item.alt + '" width="1200" height="676" loading="lazy" /></picture>' +
      videoHTML + indicatorHTML +
      '<button class="card-unmute" type="button" aria-label="Unmute video" aria-pressed="false">' +
        '<span class="cu-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></span>' +
      '</button>' +
      (item.url ? '<span class="card-tooltip">Click to visit live site ↗</span>' : '') +
      '</div>' +
      '<div class="card-body"><h2>' + item.title + (item.url ? ' <span class="card-link">↗</span>' : '') + '</h2><p class="card-label">' + item.label + '</p>' +
      (item.desc ? '<div class="card-desc-wrap"><p class="card-desc">' + item.desc + '</p><button class="card-desc-toggle" type="button" aria-expanded="false" aria-controls="desc-' + item.id + '">Read more<span class="arrow">↓</span></button></div>' : '') +
      (item.repo ? '<a class="card-repo" href="' + item.repo + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">Code ↗</a>' : '') +
      '</div>' +
      '</article>';
    return card;
  }).join('');

  grid.querySelectorAll('.project-card[data-url]').forEach(function (card) {
    card.addEventListener('click', function () {
      window.open(card.getAttribute('data-url'), '_blank', 'noopener');
    });
  });

  grid.querySelectorAll('.card-desc-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wrap = btn.closest('.card-desc-wrap');
      if (!wrap) return;
      var expanded = wrap.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      btn.firstChild.textContent = expanded ? 'Read less' : 'Read more';
    });
  });

  var dimOverlay = document.getElementById('video-dim');
  var cardMuteIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  var cardUnmuteIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';

  grid.querySelectorAll('.project-card').forEach(function (card) {
    var videos = card.querySelectorAll('video');
    if (!videos.length) return;
    var indicators = card.querySelectorAll('.clip-indicator span');
    var muteBtn = card.querySelector('.card-unmute');
    var clipIdx = 0;
    var isInView = false;

    function showClip(i) {
       videos.forEach(function (v, j) {
         v.classList.toggle('video-active', j === i);
         if (j === i) {
           v.currentTime = 0;
           v.muted = !window.__userInteracted;
           var p = v.play();
           if (p && p.then) p.catch(function () {});
         } else { v.pause(); }
       });
       indicators.forEach(function (s, j) { s.classList.toggle('clip-active', j === i); });
       clipIdx = i;
       syncMuteBtn();
    }

    function syncMuteBtn() {
      if (!muteBtn) return;
      var active = videos[clipIdx];
      if (!active) return;
      var icon = muteBtn.querySelector('.cu-icon');
      if (active.muted) {
        icon.innerHTML = cardMuteIcon;
        muteBtn.classList.remove('unmuted');
        muteBtn.setAttribute('aria-pressed', 'false');
        muteBtn.setAttribute('aria-label', 'Unmute video');
      } else {
        icon.innerHTML = cardUnmuteIcon;
        muteBtn.classList.add('unmuted');
        muteBtn.setAttribute('aria-pressed', 'true');
        muteBtn.setAttribute('aria-label', 'Mute video');
      }
    }

    videos.forEach(function (v, i) {
      v.addEventListener('ended', function () {
        if (isInView && videos.length > 1) {
          showClip((i + 1) % videos.length);
        } else {
          v.classList.remove('video-active');
        }
      });
      v.addEventListener('play', function () { card.classList.add('video-playing'); if (dimOverlay) dimOverlay.classList.add('active'); });
      v.addEventListener('pause', function () { card.classList.remove('video-playing'); if (dimOverlay) dimOverlay.classList.remove('active'); });
    });

    if (muteBtn) {
      muteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var active = videos[clipIdx];
        if (!active) return;
        if (active.muted) {
          window.__userInteracted = true;
          active.muted = false;
          active.currentTime = 0;
          var p = active.play();
          if (p && p.then) p.catch(function () {
            active.muted = true;
            active.play().catch(function () {});
          });
        } else {
          active.muted = true;
        }
        syncMuteBtn();
      });
    }

    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          isInView = true;
          showClip(0);
        } else {
          isInView = false;
          card.classList.remove('video-playing');
          if (dimOverlay) dimOverlay.classList.remove('active');
          videos.forEach(function (v) { v.pause(); });
        }
      });
    }, { threshold: 0.6 });
    videoObserver.observe(card);
  });

  grid.querySelectorAll('.project-card').forEach(function (card) {
    var pictures = card.querySelectorAll('.img-wrap picture');
    if (pictures.length < 2) return;
    var videos = card.querySelectorAll('video');
    var indicators = card.querySelectorAll('.clip-indicator span');
    var picIdx = 0;
    var picTimer = null;
    var picInView = false;

    function showPic(i) {
      pictures.forEach(function (p, j) {
        p.classList.toggle('img-active', j === i);
      });
      indicators.forEach(function (s, j) {
        s.classList.toggle('clip-active', j === i);
      });
      picIdx = i;
    }

    function startCycling() {
      if (picTimer) return;
      if (card.classList.contains('video-playing')) return;
      picTimer = setInterval(function () {
        showPic((picIdx + 1) % pictures.length);
      }, 3500);
    }
    function stopCycling() {
      if (picTimer) { clearInterval(picTimer); picTimer = null; }
    }

    var picObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          picInView = true;
          showPic(0);
          startCycling();
        } else {
          picInView = false;
          stopCycling();
        }
      });
    }, { threshold: 0.6 });
    picObserver.observe(card);

    if (videos.length) {
      var mo = new MutationObserver(function () {
        if (card.classList.contains('video-playing')) {
          stopCycling();
        } else if (picInView) {
          showPic(0);
          startCycling();
        }
      });
      mo.observe(card, { attributes: true, attributeFilter: ['class'] });
    }
  });

  var portraitMQ = window.matchMedia('(max-width: 760px)');
  var currentPortrait = portraitMQ.matches;
  portraitMQ.addEventListener('change', function (e) {
    var nowPortrait = e.matches;
    if (nowPortrait === currentPortrait) return;
    currentPortrait = nowPortrait;
    grid.querySelectorAll('video[data-src-portrait]').forEach(function (v) {
      var wasPlaying = !v.paused && !v.ended;
      var t = v.currentTime;
      v.src = nowPortrait ? v.getAttribute('data-src-portrait') : v.getAttribute('data-src-landscape');
      v.load();
      v.currentTime = t;
      if (wasPlaying) v.play().catch(function () {});
    });
  });

  var breadcrumbs = document.querySelector('[data-od-id="project-breadcrumbs"]');
  if (breadcrumbs) {
    breadcrumbs.innerHTML = projects.map(function (item, i) {
      return '<span class="crumb" data-idx="' + i + '">' + item.title + '</span>' +
        (i < projects.length - 1 ? '<span class="sep">/</span>' : '');
    }).join('');

    var crumbs = breadcrumbs.querySelectorAll('.crumb');

    function activeIndex() {
      var gridRect = grid.getBoundingClientRect();
      var center = gridRect.left + gridRect.width / 2;
      var best = 0, bestDist = Infinity;
      var cards = grid.querySelectorAll('.project-card');
      cards.forEach(function (card, i) {
        var cardRect = card.getBoundingClientRect();
        var cardCenter = cardRect.left + cardRect.width / 2;
        var dist = Math.abs(cardCenter - center);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    }

    var lastIdx = -1;
    function updateCrumbs() {
      var idx = activeIndex();
      if (idx === lastIdx) return;
      lastIdx = idx;
      crumbs.forEach(function (c, i) { c.classList.toggle('active', i === idx); });
      var breadcrumbs = document.querySelector('[data-od-id="project-breadcrumbs"]');
      if (breadcrumbs && crumbs[idx]) {
        var crumbRect = crumbs[idx].getBoundingClientRect();
        var navRect = breadcrumbs.getBoundingClientRect();
        var offset = crumbRect.left + crumbRect.width / 2 - (navRect.left + navRect.width / 2);
        breadcrumbs.scrollTo({
          left: breadcrumbs.scrollLeft + offset,
          behavior: 'smooth'
        });
      }
    }

    var scrollTimer;
    function onScroll() {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateCrumbs, 80);
    }
    grid.addEventListener('scroll', onScroll, { passive: true });
    if ('onscrollend' in window) {
      grid.addEventListener('scrollend', updateCrumbs, { passive: true });
    }
    window.addEventListener('resize', function () { lastIdx = -1; updateCrumbs(); });

    var pollTimer;
    function pollAfterTouch() {
      clearInterval(pollTimer);
      var ticks = 0;
      pollTimer = setInterval(function () {
        updateCrumbs();
        if (++ticks > 15) clearInterval(pollTimer);
      }, 60);
    }
    grid.addEventListener('touchend', pollAfterTouch, { passive: true });
    grid.addEventListener('touchcancel', pollAfterTouch, { passive: true });

    crumbs.forEach(function (crumb, i) {
      crumb.addEventListener('click', function () {
        var cards = grid.querySelectorAll('.project-card');
        if (!cards[i]) return;
        var cardRect = cards[i].getBoundingClientRect();
        var gridRect = grid.getBoundingClientRect();
        var offset = cardRect.left + cardRect.width / 2 - (gridRect.left + gridRect.width / 2);
        grid.scrollTo({
          left: grid.scrollLeft + offset,
          behavior: 'smooth'
        });
      });
    });

    updateCrumbs();

    var cards = grid.querySelectorAll('.project-card');

    function scrollToCard(i) {
      if (!cards[i]) return;
      var cardRect = cards[i].getBoundingClientRect();
      var gridRect = grid.getBoundingClientRect();
      var offset = cardRect.left + cardRect.width / 2 - (gridRect.left + gridRect.width / 2);
      grid.scrollTo({
        left: grid.scrollLeft + offset,
        behavior: 'smooth'
      });
    }

    var arrowPrev = document.createElement('button');
    arrowPrev.className = 'carousel-arrow carousel-arrow-prev';
    arrowPrev.setAttribute('aria-label', 'Previous project');
    arrowPrev.innerHTML = '←';

    var arrowNext = document.createElement('button');
    arrowNext.className = 'carousel-arrow carousel-arrow-next';
    arrowNext.setAttribute('aria-label', 'Next project');
    arrowNext.innerHTML = '→';

    var workSection = document.getElementById('work');
    if (workSection) {
      workSection.style.position = 'relative';
      workSection.appendChild(arrowPrev);
      workSection.appendChild(arrowNext);
    }

    arrowPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      var idx = activeIndex();
      scrollToCard(idx === 0 ? cards.length - 1 : idx - 1);
    });

    arrowNext.addEventListener('click', function (e) {
      e.stopPropagation();
      var idx = activeIndex();
      scrollToCard((idx + 1) % cards.length);
    });
  }
})();

(function () {
  var navLinks = document.querySelectorAll('.topnav nav a, .mobile-nav a');
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    var sec = document.getElementById(id);
    if (sec) sections.push({ link: link, el: sec, id: id });
  });

  var activeId = null;

  function setActive(id) {
    if (!id || id === activeId) return;
    activeId = id;
    navLinks.forEach(function (l) {
      var href = l.getAttribute('href').replace('#', '');
      l.classList.toggle('active', href === id);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    threshold: [0.4],
    rootMargin: '-10% 0px -10% 0px'
  });

  sections.forEach(function (s) {
    observer.observe(s.el);
  });

  function updateActive() {
    var scrollY = window.scrollY + window.innerHeight * 0.4;
    var bestId = sections.length ? sections[0].id : null;
    sections.forEach(function (s) {
      if (s.el.offsetTop <= scrollY) bestId = s.id;
    });
    setActive(bestId);
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive);

  requestAnimationFrame(updateActive);
})();

(function () {
  var greetings = ['Hello, I\'m', 'Здравей, аз съм', 'Hola, soy', 'Hallo, ich bin'];
  var el = document.querySelector('[data-od-id="greeting"]');
  if (!el) return;
  var gi = 0;
  var ci = 0;
  var typing = true;
  el.textContent = '';

  function tick() {
    var current = greetings[gi];
    if (typing) {
      ci++;
      el.textContent = current.substring(0, ci);
      if (ci >= current.length) {
        typing = false;
        setTimeout(tick, 2500);
        return;
      }
      setTimeout(tick, 80);
    } else {
      ci--;
      el.textContent = current.substring(0, ci);
      if (ci <= 0) {
        typing = true;
        gi = (gi + 1) % greetings.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 40);
    }
  }
  tick();
})();

(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('cf-name').value.trim();
    var email = document.getElementById('cf-email').value.trim();
    var msg = document.getElementById('cf-msg').value.trim();
    var subject = 'Portfolio contact — ' + (name || 'New message');
    var body = 'From: ' + name + ' <' + email + '>\n\n' + msg;
    window.location.href = 'mailto:paulvisciano.dev@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    form.querySelector('.form-confirm').hidden = false;
    form.querySelector('button').disabled = true;
  });
})();

(function () {
  var portrait = document.querySelector('.about-portrait[data-od-id="portrait"]');
  var video = portrait ? portrait.querySelector('.portrait-video') : null;
  if (!portrait || !video) return;

  var unmuteBtn = portrait.querySelector('[data-od-id="portrait-unmute"]');
  var controls = portrait.querySelector('[data-od-id="portrait-controls"]');
  var replayBtn = controls ? controls.querySelector('.pc-replay') : null;
  var muteIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  var unmuteIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';

  var started = false;
  var playedOnce = false;

  function setMuted(muted) {
    video.muted = muted;
    if (unmuteBtn) {
      var icon = unmuteBtn.querySelector('.um-icon');
      var label = unmuteBtn.querySelector('.um-label');
      if (muted) {
        icon.innerHTML = muteIcon;
        label.textContent = 'Unmute';
        unmuteBtn.setAttribute('aria-pressed', 'false');
        unmuteBtn.classList.add('is-muted');
      } else {
        icon.innerHTML = unmuteIcon;
        label.textContent = 'Tap to mute';
        unmuteBtn.setAttribute('aria-pressed', 'true');
        unmuteBtn.classList.remove('is-muted');
      }
    }
  }

  function unmuteAndRestart() {
    window.__userInteracted = true;
    playedOnce = false;
    started = true;
    video.currentTime = 0;
    video.muted = false;
    setMuted(false);
    portrait.classList.add('video-active');
    video.play().catch(function () {});
  }

  video.addEventListener('ended', function () {
    playedOnce = true;
    started = false;
    portrait.classList.remove('video-active');
  });

  function startTransition() {
    if (started || playedOnce) return;
    started = true;
    video.currentTime = 0;
    if (window.__userInteracted) {
      video.muted = false;
      setMuted(false);
    } else {
      video.muted = true;
      setMuted(true);
    }
    portrait.classList.add('video-active');
    video.play().catch(function () {});
  }

  function stopTransition() {
    started = false;
    video.pause();
    video.muted = true;
    portrait.classList.remove('video-active');
    if (unmuteBtn) unmuteBtn.classList.remove('is-muted');
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      unmuteAndRestart();
    });
  }

  if (unmuteBtn) {
    unmuteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      unmuteAndRestart();
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        startTransition();
      } else {
        stopTransition();
      }
    });
  }, { threshold: 0.3 });
  io.observe(portrait);

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover) {
    portrait.addEventListener('mouseenter', function () {
      if (playedOnce) return;
      if (started && video.paused) {
        portrait.classList.add('video-active');
        video.play().catch(function () {});
      }
    });
    portrait.addEventListener('mouseleave', function () {
      if (!started) return;
      video.pause();
    });
  } else {
    portrait.addEventListener('click', function (e) {
      if (e.target.closest('.portrait-controls') || e.target.closest('.portrait-unmute')) return;
      if (playedOnce) return;
      if (!started) {
        startTransition();
      } else if (video.paused) {
        portrait.classList.add('video-active');
        video.play().catch(function () {});
      } else {
        video.pause();
      }
    });
  }
})();

(function () {
  var scroll = document.querySelector('.blog-scroll');
  if (!scroll) return;
  var grid = scroll.querySelector('.blog-grid');
  var prev = scroll.querySelector('.blog-arrow-prev');
  var next = scroll.querySelector('.blog-arrow-next');
  if (!grid || !prev || !next) return;

  var cardW = function () {
    var card = grid.querySelector('.blog-card');
    var gap = parseFloat(getComputedStyle(grid).columnGap || getComputedStyle(grid).gap) || 0;
    return card ? card.getBoundingClientRect().width + gap : grid.clientWidth * 0.85;
  };

  var update = function () {
    var maxScroll = grid.scrollWidth - grid.clientWidth;
    var atStart = grid.scrollLeft <= 2;
    var atEnd = grid.scrollLeft >= maxScroll - 2;
    prev.classList.toggle('is-visible', !atStart);
    next.classList.toggle('is-visible', !atEnd);
  };

  prev.addEventListener('click', function () {
    grid.scrollBy({ left: -cardW() * 2, behavior: 'smooth' });
  });
  next.addEventListener('click', function () {
    grid.scrollBy({ left: cardW() * 2, behavior: 'smooth' });
  });

  grid.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  if (window.ResizeObserver) {
    new ResizeObserver(update).observe(grid);
  }
  update();
})();
