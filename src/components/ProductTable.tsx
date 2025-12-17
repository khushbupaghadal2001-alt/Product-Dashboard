import { use, useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import "../css/productTable.css";
import Pagination from "./Pagination";
import { useGetProducts } from "../hook/useProducts";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  console.log("🚀 ~ ProductTable ~ products:", products);
  // const response = use(useGetProducts());
  // console.log("🚀 ~ ProductTable ~ response:", response)
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await useGetProducts();
      setProducts(response);
    };
    fetchProducts();
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  return (
    <>
      <div>
        <button onClick={() => setOpenModal(true)} className="addProductButton">
          Add Product
        </button>

        <div className="card-container">
          {products.map((product: any, index: number) => {
            return (
              <div className="card-dtails" key={index}>
                <div>
                  <h2 className="cardName">{product.name}</h2>
                  <span className="category">{product.category}</span>
                  <div className="priceDetails">
                    <h3 className="price">${product.price}</h3>
                    <p
                      className={`stockDetails ${
                        product.stock == 0 ? "outOfStock" : "inStock"
                      }`}
                    >
                      {product.stock == 0 ? "Out of Stock" : "In Stock"}
                    </p>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="editeButton"
                    onClick={() => setOpenModal(true)}
                  >
                    Edit
                  </button>
                  <button className="delteButton">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Pagination />
      {openModal && (
        <ProductForm
          openModal={openModal}
          setOpenModal={setOpenModal}
          editData={editData}
          setEditData={setEditData}
        />
      )}
    </>
  );
};

export default ProductTable;
