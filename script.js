// This is the modified code
      // Product data
      const products = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 },
        { id: 3, name: "Product 3", price: 30 },
        { id: 4, name: "Product 4", price: 40 },
        { id: 5, name: "Product 5", price: 50 },
      ];

      // DOM elements
      const productList = document.getElementById("product-list");
      const cartList = document.getElementById("cart-list");
      const clearCartBtn = document.getElementById("clear-cart-btn");

      // Get cart data from session storage or initialize an empty array
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      // Render product list
      function renderProducts() {
        products.forEach((product) => {
          const li = document.createElement("li");
          li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
          productList.appendChild(li);
        });
      }

      // Render cart list
      function renderCart() {
        // Clear existing cart items
        cartList.innerHTML = "";

        // Render updated cart items
        cart.forEach((cartItem) => {
          const li = document.createElement("li");
          li.innerHTML = `${cartItem.name} - $${cartItem.price} <button class="remove-from-cart-btn" data-id="${cartItem.id}">Remove</button>`;
          cartList.appendChild(li);
        });
      }

      // Add item to cart
      function addToCart(productId) {
        // Find the product by id
        const product = products.find((p) => p.id === productId);

        // Add the product to the cart
        cart.push(product);

        // Save the updated cart data to session storage
        sessionStorage.setItem("cart", JSON.stringify(cart));

        // Render the updated cart
        renderCart();
      }

      // Remove item from cart
      function removeFromCart(productId) {
        // Find the index of the product in the cart
        const index = cart.findIndex((item) => item.id === productId);

        // Remove the product from the cart if found
        if (index !== -1) {
          cart.splice(index, 1);

          // Save the updated cart data to session storage
          sessionStorage.setItem("cart", JSON.stringify(cart));

          // Render the updated cart
          renderCart();
        }
      }

      // Clear cart
      function clearCart() {
        // Clear the cart array and session storage
        cart = [];
        sessionStorage.removeItem("cart");

        // Render the empty cart
        renderCart();
      }

      // Event listeners
      productList.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart-btn")) {
          const productId = parseInt(event.target.dataset.id);
          addToCart(productId);
        }
      });

      cartList.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-from-cart-btn")) {
          const productId = parseInt(event.target.dataset.id);
          removeFromCart(productId);
        }
      });

      clearCartBtn.addEventListener("click", clearCart);

      // Initial render
      renderProducts();
      renderCart();