/**
 * Custom Bundle System - Handles adding bundle products to cart
 */

class CustomBundleSystem {
  constructor() {
    this.bundleTag = 'bundle-everyday';
    this.bundleProducts = [];
    this.init();
  }

  init() {
    this.fetchBundleProducts();
    this.setupEventListeners();
  }

  async fetchBundleProducts() {
    try {
      // Fetch products with the bundle tag
      const response = await fetch('/collections/all/products.json');
      const data = await response.json();
      
      this.bundleProducts = data.products.filter(product => 
        product.tags.includes(this.bundleTag)
      );
      
      console.log('Bundle products found:', this.bundleProducts);
    } catch (error) {
      console.error('Error fetching bundle products:', error);
    }
  }

  setupEventListeners() {
    const bundleButton = document.querySelector('.bundle-cta');
    if (bundleButton) {
      bundleButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.addBundleToCart();
      });
    }
  }

  async addBundleToCart() {
    if (this.bundleProducts.length === 0) {
      alert('No bundle products found. Please make sure your products are tagged with "bundle-everyday"');
      return;
    }

    const button = document.querySelector('.bundle-cta');
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Adding to Cart...';
    button.disabled = true;

    try {
      // Add each product to cart
      for (const product of this.bundleProducts) {
        await this.addProductToCart(product.id, 1);
      }
      
      // Show success and redirect
      button.textContent = 'Added to Cart!';
      setTimeout(() => {
        window.location.href = '/cart';
      }, 1000);
      
    } catch (error) {
      console.error('Error adding bundle to cart:', error);
      alert('Error adding bundle to cart. Please try again.');
      button.textContent = originalText;
      button.disabled = false;
    }
  }

  async addProductToCart(productId, quantity) {
    const formData = {
      'id': productId,
      'quantity': quantity
    };

    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Failed to add product ${productId} to cart`);
    }

    return await response.json();
  }

  // Alternative method using form submission
  addBundleToCartForm() {
    if (this.bundleProducts.length === 0) {
      alert('No bundle products found. Please make sure your products are tagged with "bundle-everyday"');
      return;
    }

    // Create a form and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/cart/add';

    // Add each product to the form
    this.bundleProducts.forEach((product, index) => {
      const idInput = document.createElement('input');
      idInput.type = 'hidden';
      idInput.name = `items[${index}][id]`;
      idInput.value = product.variants[0].id; // Use first variant
      form.appendChild(idInput);

      const quantityInput = document.createElement('input');
      quantityInput.type = 'hidden';
      quantityInput.name = `items[${index}][quantity]`;
      quantityInput.value = 1;
      form.appendChild(quantityInput);
    });

    document.body.appendChild(form);
    form.submit();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CustomBundleSystem();
});

// Export for use in other scripts
window.CustomBundleSystem = CustomBundleSystem;
