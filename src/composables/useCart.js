import { computed, ref, watch } from "vue";

// State global untuk cart
const cart = ref([]);
const initialized = ref(false);

// Load cart from localStorage
const loadCart = () => {
  if (!initialized.value) {
    try {
      const savedCart = localStorage.getItem("pawon-cart");
      if (savedCart) {
        cart.value = JSON.parse(savedCart);
      }
      initialized.value = true;
    } catch (error) {
      console.error("Error loading cart:", error);
      cart.value = [];
    }
  }
};

// Watch cart changes and save to localStorage
watch(
  cart,
  (newCart) => {
    try {
      localStorage.setItem("pawon-cart", JSON.stringify(newCart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  },
  { deep: true }
);

export function useCart() {
  // Initialize cart
  loadCart();

  // Computed
  const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const subtotal = computed(() => {
    return cart.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  // Methods
  const addToCart = (menu) => {
    const existingItem = cart.value.find((item) => item.id === menu.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        image: menu.image,
        category: menu.category,
        quantity: 1,
      });
    }

    return true;
  };

  const removeItem = (id) => {
    const index = cart.value.findIndex((item) => item.id === id);
    if (index > -1) {
      cart.value.splice(index, 1);
    }
  };

  const incrementQuantity = (id) => {
    const item = cart.value.find((item) => item.id === id);
    if (item && item.quantity < 99) {
      item.quantity += 1;
    }
  };

  const decrementQuantity = (id) => {
    const item = cart.value.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const getCart = () => {
    return cart.value;
  };

  return {
    cart,
    cartCount,
    subtotal,
    addToCart,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getCart,
  };
}
