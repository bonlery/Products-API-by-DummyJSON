import { useEffect, useState } from "react"
import ProductCard from "./components/ProductCard/ProductCard";
import NavBar from "./components/NavBar/NavBar";

function App() {

  const [products, setProducts] = useState();
  const [product, setProduct] = useState();

  useEffect(()=>{
    fetch("https://dummyjson.com/products").then((response)=>response.json()).then((data)=>{
      setProducts(data.products);
    })
  },[]);


  function hanldleSearch(e){
    let s = e.target.value.trim();
    
    setProduct(null);

    if(/^\d+$/.test(s)){
      fetch("https://dummyjson.com/products/"+s).then((response)=>{
      if(!response.ok){
        throw new Error(`Product not found (status: ${response.status})`);
      }
      return response.json()
      }).then((data)=>{
        setProduct(data);
      })
    }else if(s){
      fetch("https://dummyjson.com/products/search?q=" + encodeURIComponent(s))
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Search failed (status: ${response.status})`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.products && data.products.length > 0) {
            setProduct(data.products[0]); 
          } else {
            setProduct(null); 
          }
        })
    }
    
  }

  return (
    <>
      <NavBar/>
      <main>
        <div className="search-container">
          <input type="text" id="searchField" onChange={hanldleSearch}/>
        </div>
        <div className="products-container">
           {products &&
              (!product ?(
                products.map((p)=>{
                return <ProductCard product={p}/>
              }))
              :
              (
              <ProductCard product={product}/>
              )   
              )     
            }
        </div>
      </main>
    </>
  )
}

export default App
