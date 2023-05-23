import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { totalProducts } = useLoaderData();

 

  const totalPage = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumbers =[]
  // for(let i=1; i<=totalPage; i++ ){
  //   pageNumbers.push(i)
  // }

  const pageNumbers = [...Array(totalPage).keys()];

  useEffect(() => {
    fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [currentPage,itemsPerPage]);

  useEffect(() => {
    const savedCart = [];
    const storedCart = getShoppingCart();
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product._id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleCartItem = (product) => {
    let newCart = [];
    const exist = cart.find((pd) => pd._id === product._id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exist];
    }
    setCart(newCart);

    const newProduct = [...cart, product];
    setCart(newProduct);
    addToDb(product._id);
  };
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };



  const handleSelectChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(0);
  };
  const options = [5, 10, 15];

  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              product={product}
              handleCartItem={handleCartItem}
              key={product._id}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart handleClearCart={handleClearCart} cart={cart}>
            <Link to="/orders">
              <button className="btn-proceed">Order Review</button>
            </Link>
          </Cart>
        </div>
      </div>

      <div className="pagination">
        <p>currentPage: {currentPage}</p>
        {pageNumbers.map((number) => (
          <button onClick={() => setCurrentPage(number)} key={number}>
            {number}
          </button>
        ))}
           <select value={itemsPerPage} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
   
    </>
  );
};

export default Shop;
