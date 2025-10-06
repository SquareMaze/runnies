/**
 * Bundle Page Enhancement Script
 * Adds advanced functionality for conversion optimization
 */

class BundlePage {
  constructor() {
    this.init();
  }

  init() {
    this.setupCountdownTimer();
    this.setupScrollAnimations();
    this.setupCTAEnhancements();
    this.setupSocialProof();
    this.setupUrgencyElements();
    this.setupAnalytics();
  }

  // Countdown Timer with Enhanced Functionality
  setupCountdownTimer() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements.forEach(countdown => {
      const endDate = countdown.dataset.endDate;
      const endTime = countdown.dataset.endTime;
      const endDateTime = new Date(endDate + ' ' + endTime).getTime();
      
      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = endDateTime - now;
        
        if (distance < 0) {
          countdown.innerHTML = '<div class="timer-text">⏰ Offer Expired!</div>';
          this.triggerUrgencyEvent('timer_expired');
          return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        const daysEl = countdown.querySelector('[data-days]');
        const hoursEl = countdown.querySelector('[data-hours]');
        const minutesEl = countdown.querySelector('[data-minutes]');
        const secondsEl = countdown.querySelector('[data-seconds]');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        // Add urgency effects
        if (hours < 24) {
          countdown.classList.add('urgent');
          this.triggerUrgencyEvent('less_than_24_hours');
        }
        
        if (hours < 1) {
          countdown.classList.add('critical');
          this.triggerUrgencyEvent('less_than_1_hour');
        }
      };
      
      updateCountdown();
      setInterval(updateCountdown, 1000);
    });
  }

  // Scroll-triggered Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.triggerAnalyticsEvent('element_viewed', {
            element: entry.target.className
          });
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .faq-item, .guarantee-feature').forEach(el => {
      observer.observe(el);
    });
  }

  // Enhanced CTA Functionality
  setupCTAEnhancements() {
    const ctaButtons = document.querySelectorAll('.bundle-cta');
    
    ctaButtons.forEach(button => {
      // Add click tracking
      button.addEventListener('click', (e) => {
        this.triggerAnalyticsEvent('cta_clicked', {
          button_text: button.textContent.trim(),
          position: this.getElementPosition(button)
        });
        
        // Add loading state
        this.addLoadingState(button);
        
        // Simulate add to cart (replace with actual cart integration)
        setTimeout(() => {
          this.addBundleToCart();
        }, 1000);
      });
      
      // Add hover effects
      button.addEventListener('mouseenter', () => {
        this.triggerAnalyticsEvent('cta_hovered', {
          button_text: button.textContent.trim()
        });
      });
    });
  }

  // Social Proof Enhancements
  setupSocialProof() {
    const socialProofElements = document.querySelectorAll('.social-proof');
    
    socialProofElements.forEach(element => {
      // Add dynamic review rotation
      this.rotateTestimonials(element);
      
      // Add trust signals
      this.addTrustSignals(element);
    });
  }

  // Urgency Elements
  setupUrgencyElements() {
    // Add stock counter (simulated)
    this.addStockCounter();
    
    // Add recent purchases
    this.addRecentPurchases();
    
    // Add exit intent detection
    this.setupExitIntent();
  }

  // Analytics Setup
  setupAnalytics() {
    // Track page view
    this.triggerAnalyticsEvent('bundle_page_viewed', {
      bundle_name: 'Everyday Bundle',
      bundle_price: '250',
      currency: 'AED'
    });
    
    // Track scroll depth
    this.trackScrollDepth();
    
    // Track time on page
    this.trackTimeOnPage();
  }

  // Utility Methods
  addBundleToCart() {
    const bundleProducts = [
      'UNB-ABD-002',
      'IGN-PRL-006', 
      'SNP-SEA-001'
    ];
    
    // This would integrate with your actual cart system
    console.log('Adding bundle to cart:', bundleProducts);
    
    // Show success message
    this.showSuccessMessage('Bundle added to cart! Redirecting to checkout...');
    
    // Track conversion
    this.triggerAnalyticsEvent('bundle_added_to_cart', {
      products: bundleProducts,
      bundle_price: '250',
      currency: 'AED'
    });
  }

  addLoadingState(button) {
    button.classList.add('loading');
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Adding to Cart...';
    
    setTimeout(() => {
      button.classList.remove('loading');
      button.disabled = false;
      button.textContent = originalText;
    }, 2000);
  }

  showSuccessMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'success-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
      messageEl.remove();
    }, 3000);
  }

  rotateTestimonials(element) {
    const testimonials = [
      {
        text: "This bundle is absolutely perfect! The quality is amazing and the savings are incredible.",
        name: "Sarah M.",
        rating: 5
      },
      {
        text: "Best purchase I've made this year! Everything fits perfectly and the quality is outstanding.",
        name: "Ahmed K.",
        rating: 5
      },
      {
        text: "Amazing value for money. The bundle exceeded my expectations in every way.",
        name: "Fatima A.",
        rating: 5
      }
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
      const testimonial = testimonials[currentIndex];
      const textEl = element.querySelector('.testimonial-text');
      const nameEl = element.querySelector('.customer-name');
      
      if (textEl && nameEl) {
        textEl.style.opacity = '0';
        nameEl.style.opacity = '0';
        
        setTimeout(() => {
          textEl.textContent = `"${testimonial.text}"`;
          nameEl.textContent = `- ${testimonial.name}`;
          textEl.style.opacity = '1';
          nameEl.style.opacity = '1';
        }, 300);
      }
      
      currentIndex = (currentIndex + 1) % testimonials.length;
    }, 5000);
  }

  addTrustSignals(element) {
    const trustSignals = [
      '🔒 Secure Checkout',
      '🚚 Free Shipping',
      '💰 30-Day Returns',
      '⭐ 5-Star Reviews'
    ];
    
    const signalsEl = document.createElement('div');
    signalsEl.className = 'trust-signals';
    signalsEl.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 15px;
      flex-wrap: wrap;
    `;
    
    trustSignals.forEach(signal => {
      const signalEl = document.createElement('span');
      signalEl.textContent = signal;
      signalEl.style.cssText = `
        font-size: 0.8rem;
        color: #666;
        background: #f0f0f0;
        padding: 5px 10px;
        border-radius: 15px;
      `;
      signalsEl.appendChild(signalEl);
    });
    
    element.appendChild(signalsEl);
  }

  addStockCounter() {
    const stockEl = document.createElement('div');
    stockEl.className = 'stock-counter';
    stockEl.innerHTML = `
      <div style="
        background: #ff4757;
        color: white;
        padding: 10px 15px;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        text-align: center;
        margin: 20px 0;
        animation: pulse 2s infinite;
      ">
        ⚡ Only 12 bundles left in stock!
      </div>
    `;
    
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      ctaSection.insertBefore(stockEl, ctaSection.firstChild);
    }
  }

  addRecentPurchases() {
    const purchasesEl = document.createElement('div');
    purchasesEl.className = 'recent-purchases';
    purchasesEl.innerHTML = `
      <div style="
        background: #f8f9fa;
        padding: 15px;
        border-radius: 10px;
        margin: 20px 0;
        font-size: 0.9rem;
        color: #666;
        text-align: center;
      ">
        <div style="margin-bottom: 10px;">🛒 Recent purchases:</div>
        <div id="recent-purchases-list">
          <div>Ahmed from Dubai just purchased this bundle</div>
          <div>Sarah from Abu Dhabi just purchased this bundle</div>
          <div>Omar from Sharjah just purchased this bundle</div>
        </div>
      </div>
    `;
    
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      ctaSection.appendChild(purchasesEl);
    }
    
    // Rotate recent purchases
    this.rotateRecentPurchases();
  }

  rotateRecentPurchases() {
    const purchases = [
      'Ahmed from Dubai just purchased this bundle',
      'Sarah from Abu Dhabi just purchased this bundle',
      'Omar from Sharjah just purchased this bundle',
      'Fatima from Ajman just purchased this bundle',
      'Khalid from Ras Al Khaimah just purchased this bundle'
    ];
    
    const listEl = document.getElementById('recent-purchases-list');
    if (!listEl) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
      listEl.style.opacity = '0';
      setTimeout(() => {
        listEl.innerHTML = `<div>${purchases[currentIndex]}</div>`;
        listEl.style.opacity = '1';
        currentIndex = (currentIndex + 1) % purchases.length;
      }, 300);
    }, 3000);
  }

  setupExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        this.showExitIntentPopup();
      }
    });
  }

  showExitIntentPopup() {
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup';
    popup.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          max-width: 500px;
          margin: 20px;
        ">
          <h3 style="margin-bottom: 20px; color: #333;">Wait! Don't Miss Out!</h3>
          <p style="margin-bottom: 25px; color: #666;">Get 20% off your bundle with code SAVE20</p>
          <button onclick="this.closest('.exit-intent-popup').remove()" style="
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            margin-right: 10px;
          ">Claim Discount</button>
          <button onclick="this.closest('.exit-intent-popup').remove()" style="
            background: #ccc;
            color: #333;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
          ">No Thanks</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    this.triggerAnalyticsEvent('exit_intent_shown', {
      discount_code: 'SAVE20'
    });
  }

  trackScrollDepth() {
    const depths = [25, 50, 75, 90];
    const trackedDepths = new Set();
    
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      depths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          this.triggerAnalyticsEvent('scroll_depth', {
            depth: depth
          });
        }
      });
    });
  }

  trackTimeOnPage() {
    const startTime = Date.now();
    
    setInterval(() => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (timeOnPage === 30) {
        this.triggerAnalyticsEvent('time_on_page', { seconds: 30 });
      } else if (timeOnPage === 60) {
        this.triggerAnalyticsEvent('time_on_page', { seconds: 60 });
      } else if (timeOnPage === 120) {
        this.triggerAnalyticsEvent('time_on_page', { seconds: 120 });
      }
    }, 1000);
  }

  triggerUrgencyEvent(eventType) {
    console.log('Urgency Event:', eventType);
    // Integrate with your analytics platform
  }

  triggerAnalyticsEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    // Integrate with Google Analytics, Facebook Pixel, etc.
    
    // Example Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }
    
    // Example Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, properties);
    }
  }

  getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    if (rect.top < viewportHeight * 0.25) return 'top';
    if (rect.top < viewportHeight * 0.75) return 'middle';
    return 'bottom';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BundlePage();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  .animate-in {
    animation: slideInUp 0.6s ease forwards;
  }
  
  .urgent {
    animation: pulse 1s infinite;
  }
  
  .critical {
    animation: pulse 0.5s infinite;
  }
  
  .loading {
    opacity: 0.7;
    pointer-events: none;
  }
`;
document.head.appendChild(style);
