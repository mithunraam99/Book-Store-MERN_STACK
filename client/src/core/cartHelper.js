export const addItem = (item ,next)  => {
  let cart = [];
  if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
          //JSON format
          cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.push({
          ...item,
          count: 1
      });

      // remove duplicates
      // build an Array from new Set and turn it back into array using Array.from
      // so that later we can re-map it
      // new set will only allow unique values in it
      // so pass the ids of each object/product
      // If the loop tries to add the same value again, it'll get ignored
      // ...with the array of ids we got on when first map() was used
      // run map() on it again and return the actual product from the cart

      cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
          return cart.find(p => p._id === id);
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      next();
  }
};


//Total iems in cart
export const itemTotal = () => {
  if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
          return JSON.parse(localStorage.getItem('cart')).length;
      }
  }
  return 0;
};


//get
export const getCart = () => {
  if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
          return JSON.parse(localStorage.getItem('cart'));
      }
  }
  return [];
};


//update
export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
          cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) => {
          if (product._id === productId) {
              cart[i].count = count;
          }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
  }
};


//remove
export const removeItem = productId => {
  let cart = [];
  if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
          cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) => {
          if (product._id === productId) {
              cart.splice(i, 1);
          }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = next => {
  if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
      next();
  }
};
