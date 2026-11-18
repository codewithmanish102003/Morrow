import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCategories, initialProducts, initialSettings } from '../data/catalog';
import { toast } from 'sonner';

const StoreContext = createContext(null);

export function formatPrice(amount) {
  if (amount == null) return '';
  return `₹${Number(amount).toFixed(amount % 1 === 0 ? 0 : 2)}`;
}

export function getProductImage(product) {
  if (!product) return '/assets/product-shirt.jpg';
  if (product.images && product.images.length > 0 && product.images[0].url) {
    return product.images[0].url;
  }
  if (product.product_images && product.product_images.length > 0 && product.product_images[0].url) {
    return product.product_images[0].url;
  }
  return '/assets/product-shirt.jpg';
}

export function StoreProvider({ children }) {
  // Products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('morrow_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Categories
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('morrow_categories');
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  // Store Settings (seasonal banner)
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('morrow_settings');
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  // Cart: [{ productId, quantity, size, color }]
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('morrow_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites: [productId]
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('morrow_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User auth state: { id, email, full_name, phone, role: 'customer' }
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('morrow_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup' | 'forgot'

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  // Orders: [{ id, customer_name, email, phone, address, items, total, status, payment_status, created_at }]
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('morrow_orders');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'ord-8f921ab4',
          customer_name: 'Eleanor Vance',
          email: 'eleanor@example.com',
          phone: '+1 555-0192',
          address: {
            street: '142 Mercer Street, Apt 4B',
            city: 'New York',
            state: 'NY',
            postal_code: '10012',
            country: 'United States'
          },
          order_items: [
            { product_name: 'The Everyday Linen Shirt', quantity: 1, size: 'M', color: 'Ivory', price: 89 },
            { product_name: 'Pink Grapefruit Fizz', quantity: 2, price: 12 }
          ],
          total: 113,
          status: 'Confirmed',
          payment_status: 'awaiting_payment',
          created_at: new Date(Date.now() - 86400000 * 2).toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  // Addresses
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('morrow_addresses');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'addr-01',
          full_name: 'Eleanor Vance',
          phone: '+1 555-0192',
          street: '142 Mercer Street, Apt 4B',
          city: 'New York',
          state: 'NY',
          postal_code: '10012',
          country: 'United States'
        }
      ];
    } catch {
      return [];
    }
  });

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('morrow_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('morrow_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('morrow_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('morrow_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('morrow_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('morrow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('morrow_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('morrow_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('morrow_addresses', JSON.stringify(addresses));
  }, [addresses]);

  // Cart operations
  const add = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (p) => p.productId === item.productId && p.size === item.size && p.color === item.color
      );
      if (idx < 0) {
        return [...prev, item];
      }
      return prev.map((p, i) => (i === idx ? { ...p, quantity: p.quantity + item.quantity } : p));
    });
    toast.success('Added to your bag');
  };

  const update = (index, quantity) => {
    setCart((prev) => prev.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  const remove = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    toast.info('Item removed from bag');
  };

  const clear = () => setCart([]);

  // Wishlist toggle
  const toggleFavorite = (productId) => {
    if (!user) {
      toast.info('Sign in to save favorites');
      return;
    }
    const isFav = favorites.includes(productId);
    setFavorites((prev) => (isFav ? prev.filter((id) => id !== productId) : [...prev, productId]));
    toast.success(isFav ? 'Removed from favorites' : 'Saved to favorites');
  };

  // Auth operations
  const signIn = async (email, password) => {
    // Demo login
    const isAdmin = email.toLowerCase().includes('admin');
    const signedInUser = {
      id: isAdmin ? 'usr-admin-01' : 'usr-' + Math.random().toString(36).slice(2, 9),
      email,
      full_name: isAdmin ? 'Store Owner' : email.split('@')[0],
      phone: '+1 555-0100',
      role: isAdmin ? 'admin' : 'customer'
    };
    setUser(signedInUser);
    toast.success('Welcome to Morrow');
    return { user: signedInUser, error: null };
  };

  const signUp = async (name, email, password) => {
    const newUser = {
      id: 'usr-' + Math.random().toString(36).slice(2, 9),
      email,
      full_name: name,
      phone: '',
      role: 'customer'
    };
    setUser(newUser);
    toast.success('Account created successfully');
    return { user: newUser, error: null };
  };

  const signOut = () => {
    setUser(null);
    toast.info('Signed out');
  };

  const updateProfile = (data) => {
    if (!user) return;
    setUser((prev) => ({ ...prev, ...data }));
    toast.success('Profile updated');
  };

  // Address operations
  const addAddress = (addr) => {
    const newAddr = { id: 'addr-' + Date.now(), ...addr };
    setAddresses((prev) => [...prev, newAddr]);
    toast.success('Address saved');
  };

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.info('Address removed');
  };

  // Place order
  const placeOrder = (orderData) => {
    const orderId = 'ord-' + Math.random().toString(36).substring(2, 10);
    const newOrder = {
      id: orderId,
      created_at: new Date().toISOString(),
      status: 'Pending',
      payment_status: 'awaiting_payment',
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    clear();
    return orderId;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    toast.success(`Order status updated to ${newStatus}`);
  };

  // Admin Catalog operations
  const saveProduct = (productData) => {
    if (productData.id && products.some((p) => p.id === productData.id)) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? { ...p, ...productData, updated_at: new Date().toISOString() } : p))
      );
      toast.success('Product updated');
    } else {
      const newProd = {
        ...productData,
        id: productData.id || 'prod-' + Math.random().toString(36).substring(2, 10),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setProducts((prev) => [newProd, ...prev]);
      toast.success('Product created');
    }
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    toast.success('Product deleted');
  };

  const updateStoreSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    toast.success('Seasonal edit saved');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        settings,
        cart,
        favorites,
        user,
        orders,
        addresses,
        add,
        update,
        remove,
        clear,
        toggleFavorite,
        signIn,
        signUp,
        signOut,
        updateProfile,
        addAddress,
        removeAddress,
        placeOrder,
        updateOrderStatus,
        saveProduct,
        deleteProduct,
        updateStoreSettings,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
