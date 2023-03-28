import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

useEffect(()=>{
  const savedCart =[]
const storedCart =  getShoppingCart()
for(const id in storedCart){
 const addedProduct= products.find(product => product.id === id)
if(addedProduct){
  const quantity = storedCart[id]
  addedProduct.quantity = quantity;
  savedCart.push(addedProduct)
}

}
setCart(savedCart)
}, [products])


  const handleCartItem = (product) => {
    const newProduct = [...cart, product];
    setCart(newProduct);
    addToDb(product.id)
  };




  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            product={product}
            handleCartItem={handleCartItem}
            key={product.id}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
