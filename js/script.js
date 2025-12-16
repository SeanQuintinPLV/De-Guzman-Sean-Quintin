// Smooth scroll and active nav link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const feedback = document.getElementById('formFeedback');
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            feedback.textContent = '✓ Message sent successfully!';
            feedback.classList.add('success');
            contactForm.reset();
            setTimeout(() => {
                feedback.textContent = '';
                feedback.classList.remove('success');
            }, 3000);
        } else {
            feedback.textContent = '✗ Please fill all required fields';
            feedback.classList.add('error');
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Projects Filter + Pagination (3 per page)
(function() {
    const cards = Array.from(document.querySelectorAll('.project-card'))
    const prevBtn = document.querySelector('.pagination-btn.prev')
    const nextBtn = document.querySelector('.pagination-btn.next')
    const tabs = Array.from(document.querySelectorAll('.filter-tab'))
    const toolbar = document.querySelector('.projects-toolbar')

    let currentPage = 1
    const perPage = 3
    let activeFilter = null

    function getFilteredCards() {
        if (!activeFilter || activeFilter === 'all') return cards
        return cards.filter(c => c.getAttribute('data-category') === activeFilter)
    }

    function render() {
        const list = getFilteredCards()
        const totalPages = Math.max(1, Math.ceil(list.length / perPage))
        if (currentPage > totalPages) currentPage = totalPages
        if (currentPage < 1) currentPage = 1

        cards.forEach(c => { c.style.display = 'none' })
        const start = (currentPage - 1) * perPage
        const visible = list.slice(start, start + perPage)
        visible.forEach(c => {
            c.style.display = ''
            c.style.animation = 'fadeInUp 0.6s ease'
        })

        if (prevBtn) prevBtn.disabled = currentPage <= 1
        if (nextBtn) nextBtn.disabled = currentPage >= totalPages
        if (toolbar) toolbar.style.display = ''
    }

    // Initialize active filter to first visible tab if 'all' is hidden
    const initialTab = tabs.find(t => t.getAttribute('data-filter') !== 'all')
    if (initialTab) {
        tabs.forEach(t => t.classList.remove('active'))
        initialTab.classList.add('active')
        activeFilter = initialTab.getAttribute('data-filter')
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'))
            this.classList.add('active')
            activeFilter = this.getAttribute('data-filter')
            currentPage = 1
            render()
        })
    })

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentPage -= 1
            render()
        })
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentPage += 1
            render()
        })
    }

    render()
})();

;(function(){
    const hero = document.querySelector('.hero-section')
    const title = document.querySelector('.hero-title.interactive')
    const orbs = document.querySelectorAll('.hero-decor .orb')
    const primaryBtn = document.querySelector('.hero-cta .btn-primary')
    if (!hero) return
    let lastX = 0, lastY = 0, ticking = false
    function applyParallax() {
        const rect = hero.getBoundingClientRect()
        const x = lastX
        const y = lastY
        orbs.forEach((o,i)=>{ const m = 6 + i*2; o.style.transform = `translate3d(${x*m}px, ${y*m}px, 0)` })
        if (title){ const rx = y*-2.5; const ry = x*3.5; title.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)` }
        if (primaryBtn){ primaryBtn.style.transform = `translate3d(${x*4}px, ${y*4}px, 0)` }
        ticking = false
    }
    function parallax(e){
        const rect = hero.getBoundingClientRect()
        lastX = (e.clientX - rect.left) / rect.width - 0.5
        lastY = (e.clientY - rect.top) / rect.height - 0.5
        if (!ticking) {
            ticking = true
            requestAnimationFrame(applyParallax)
        }
    }
    function reset(){ orbs.forEach(o=>{o.style.transform=''}); if (title) title.style.transform=''; if (primaryBtn) primaryBtn.style.transform='' }
    hero.addEventListener('mousemove', parallax)
    hero.addEventListener('mouseleave', reset)
    if (primaryBtn){
        primaryBtn.addEventListener('click', ()=>{
            const rect = primaryBtn.getBoundingClientRect()
            const container = hero
            for(let i=0;i<10;i++){
                const el = document.createElement('span')
                el.className = 'confetti'
                const colors = ['#6366f1','#22c55e','#06b6d4','#f59e0b','#ef4444']
                el.style.background = colors[i%colors.length]
                const x = rect.left + rect.width/2 - container.getBoundingClientRect().left
                const y = rect.top + rect.height/2 - container.getBoundingClientRect().top
                el.style.left = x+'px'
                el.style.top = y+'px'
                const dx = (Math.random()*160-80)+'px'
                el.style.setProperty('--dx', dx)
                el.style.animation = 'confettiFall 700ms ease-out forwards'
                container.appendChild(el)
                setTimeout(()=>el.remove(),800)
            }
        })
    }
})();

;(function() {
    const modal = document.getElementById('projectModal')
    if (!modal) return
    const backdrop = modal.querySelector('.modal-backdrop')
    const closeBtn = modal.querySelector('.modal-close')
    const imgEl = modal.querySelector('.modal-image img')
    const titleEl = modal.querySelector('.modal-title')
    const descEl = modal.querySelector('.modal-description')
    const prevBtn = modal.querySelector('.modal-prev')
    const nextBtn = modal.querySelector('.modal-next')
    const videoWrap = modal.querySelector('.modal-video')
    const videoEl = modal.querySelector('.modal-video video')
    const meta = {
        date: modal.querySelector('.meta-item[data-field="date"] .meta-value'),
        time: modal.querySelector('.meta-item[data-field="time"] .meta-value'),
        venue: modal.querySelector('.meta-item[data-field="venue"] .meta-value')
    }
    const metaItems = {
        date: modal.querySelector('.meta-item[data-field="date"]'),
        time: modal.querySelector('.meta-item[data-field="time"]'),
        venue: modal.querySelector('.meta-item[data-field="venue"]')
    }
    const typeBadge = modal.querySelector('.modal-type-badge')
    const statusBadge = modal.querySelector('.modal-status-badge')
    const techsEl = modal.querySelector('.modal-techs')
    const linksEl = modal.querySelector('.modal-links')

    let gallery = []
    let index = 0

    function render() {
        const item = gallery[index] || ''
        const isVideo = /\.mp4($|\?)/i.test(item)
        if (isVideo) {
            if (videoWrap) videoWrap.classList.remove('hidden')
            if (imgEl) imgEl.style.display = 'none'
            if (videoEl) {
                videoEl.src = item
                try { videoEl.load() } catch (e) {}
            }
        } else {
            if (videoWrap) videoWrap.classList.add('hidden')
            if (imgEl) {
                imgEl.style.display = ''
                imgEl.src = item
                imgEl.alt = titleEl ? (titleEl.textContent || 'Project image') : 'Project image'
                try { imgEl.decoding = 'async' } catch(e) {}
            }
        }
        if (prevBtn) { const d = gallery.length <= 1 || index <= 0; prevBtn.disabled = d; prevBtn.setAttribute('aria-disabled', String(d)) }
        if (nextBtn) { const d = gallery.length <= 1 || index >= gallery.length - 1; nextBtn.disabled = d; nextBtn.setAttribute('aria-disabled', String(d)) }
    }

    function openForCard(card) {
        if (!card) return
        try {
            console.log('openForCard called for', card && (card.querySelector('.project-content h3') || card).textContent || card)
            const img = card.querySelector('.project-image img')
            const title = card.querySelector('.project-content h3')
            const desc = card.querySelector('.project-content p')
            const statusEl = card.querySelector('.status-badge')
            const tagNodes = card.querySelectorAll('.project-tags .tag')
            const dataOverview = card.getAttribute('data-overview') || ''
            const dataTechs = card.getAttribute('data-technologies') || ''

            if (titleEl) titleEl.textContent = title ? title.textContent : ''
            if (descEl) descEl.textContent = dataOverview || (desc ? desc.textContent : '')
            if (techsEl) {
                techsEl.innerHTML = ''
                const list = dataTechs ? dataTechs.split(',').map(s => s.trim()).filter(Boolean) : Array.from(tagNodes).map(t => t.textContent.trim()).filter(Boolean)
                list.forEach(name => {
                    const span = document.createElement('span')
                    span.className = 'tag'
                    span.textContent = name
                    techsEl.appendChild(span)
                })
            }

        const dataGallery = card.getAttribute('data-gallery')
        const dataDate = card.getAttribute('data-date')
        const dataTime = card.getAttribute('data-time')
        const dataVenue = card.getAttribute('data-venue')
        const dataVideo = card.getAttribute('data-video')
        if (dataGallery) {
            gallery = dataGallery.split(',').map(s => s.trim()).filter(Boolean)
        } else {
            gallery = [img ? img.src : '']
            if (dataVideo) gallery.push(dataVideo)
        }
        index = 0
        const badgeEl = card.querySelector('.project-badge')
        const badgeText = badgeEl ? (badgeEl.textContent || '').trim() : ''
        if (meta.date) meta.date.textContent = (dataDate || badgeText || '')
        if (meta.time) meta.time.textContent = dataTime || ''
        if (meta.venue) meta.venue.textContent = dataVenue || ''
        if (metaItems.date) metaItems.date.style.display = (dataDate || badgeText) ? '' : 'none'
        if (metaItems.time) metaItems.time.style.display = dataTime ? '' : 'none'
        if (metaItems.venue) metaItems.venue.style.display = dataVenue ? '' : 'none'

        const category = card.getAttribute('data-category') || ''
        const categoryLabel = { web: 'Web Platform', design: 'Design', '3d': '3D & Motion', game: 'Game Assets' }[category] || ''
        if (typeBadge) {
            typeBadge.textContent = categoryLabel
            typeBadge.style.display = categoryLabel ? '' : 'none'
        }

        if (statusBadge) {
            const statusText = statusEl ? statusEl.textContent.trim() : ''
            statusBadge.textContent = statusText
            statusBadge.style.display = statusText ? '' : 'none'
        }

            if (linksEl) {
                linksEl.innerHTML = ''
                const dataLinks = card.getAttribute('data-links') || card.getAttribute('data-link') || ''
                const links = dataLinks ? dataLinks.split(',').map(s => s.trim()).filter(Boolean) : []
                links.forEach((linkStr, i) => {
                    let label = 'View Link'
                    let href = linkStr
                    const colonIndex = linkStr.indexOf(':')
                    // try to parse `Label: https://...` patterns
                    if (colonIndex > 0 && /https?:\/\//i.test(linkStr.slice(colonIndex + 1))) {
                        label = linkStr.slice(0, colonIndex).trim()
                        href = linkStr.slice(colonIndex + 1).trim()
                    }
                    const a = document.createElement('a')
                    a.href = href
                    a.target = '_blank'
                    a.rel = 'noopener'
                    a.innerHTML = '<i class="fas fa-external-link-alt"></i> ' + label
                    linksEl.appendChild(a)
                })
                // Hide the links section if no links
                const linksSection = linksEl.closest('.modal-section')
                if (linksSection) {
                    linksSection.style.display = links.length > 0 ? '' : 'none'
                }
            }
            // expose for debug
            try { window.__lastOpenedCard = card } catch(e) {}
            render()
            modal.classList.add('show')
            modal.setAttribute('aria-hidden','false')
            if (closeBtn) closeBtn.focus()
            document.body.style.overflow = 'hidden'
        } catch (err) {
            console.error('openForCard error', err)
            // fallback: show minimal modal with title/overview so user sees something
            try {
                const title = card.querySelector('.project-content h3')
                const desc = card.querySelector('.project-content p')
                if (titleEl) titleEl.textContent = title ? title.textContent : 'Project'
                if (descEl) descEl.textContent = card.getAttribute('data-overview') || (desc ? desc.textContent : '')
                if (techsEl) techsEl.innerHTML = ''
                if (linksEl) linksEl.innerHTML = ''
                modal.classList.add('show')
                modal.setAttribute('aria-hidden','false')
                document.body.style.overflow = 'hidden'
            } catch (e2) { console.error('fallback show failed', e2) }
        }
    }

    function closeModal() {
        modal.classList.remove('show')
        modal.setAttribute('aria-hidden','true')
        document.body.style.overflow = ''
        if (videoEl) {
            try { videoEl.pause() } catch(e) {}
            videoEl.removeAttribute('src')
            try { videoEl.load() } catch(e) {}
        }
    }

    // Attach click + keyboard handlers to each project card (more reliable than delegation)
    document.querySelectorAll('.project-card').forEach(card => {
        card.setAttribute('tabindex','0')
        card.setAttribute('role','button')
        const t = card.querySelector('.project-content h3')
        if (t) card.setAttribute('aria-label', 'Open details for ' + t.textContent)
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openForCard(card) }
        })
        card.addEventListener('click', e => {
            // avoid clicks on inner links triggering duplicate behavior
            const innerLink = e.target.closest('a')
            if (innerLink) return
            try { console.log('project card click:', t ? t.textContent : card) } catch(e) {}
            try { openForCard(card) } catch (err) { console.error('openForCard threw', err) }
        })
    })
    // Expose function for manual testing
    try { window.openForCard = openForCard } catch(e) {}

    // removed explicit .view-btn handlers; entire card click works

    if (closeBtn) closeBtn.addEventListener('click', closeModal)
    if (backdrop) backdrop.addEventListener('click', closeModal)
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal()
        if (modal.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'ArrowLeft' && index > 0) { index -= 1; render(); e.preventDefault() }
            if (e.key === 'ArrowRight' && index < gallery.length - 1) { index += 1; render(); e.preventDefault() }
            if (e.key === 'Tab') {
                const scope = modal.querySelector('.modal-content')
                if (!scope) return
                const focusables = Array.from(scope.querySelectorAll('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null)
                if (focusables.length === 0) return
                const first = focusables[0]
                const last = focusables[focusables.length - 1]
                const active = document.activeElement
                if (e.shiftKey) {
                    if (active === first || !scope.contains(active)) { last.focus(); e.preventDefault() }
                } else {
                    if (active === last || !scope.contains(active)) { first.focus(); e.preventDefault() }
                }
            }
        }
    })
    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (index > 0) { index -= 1; render() }
    })
    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (index < gallery.length - 1) { index += 1; render() }
    })

    // Robust delegated handlers in case cards are re-rendered or filtered
    const grid = document.querySelector('.projects-grid')
    if (grid) {
        grid.addEventListener('click', e => {
            const card = e.target.closest('.project-card')
            if (!card) return
            const innerLink = e.target.closest('a')
            if (innerLink) return
            openForCard(card)
        })
        grid.addEventListener('keydown', e => {
            const card = e.target.closest('.project-card')
            if (!card) return
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openForCard(card) }
        })
    }

})()
