import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { getProducts } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader";
import { toast } from "react-toastify";
import Product from "../product/product";

import Pagenation from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
const ProductSearch = () => {
  const dispatch = useDispatch();

  const { products=[], loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 100000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);

  let categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Cloths/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  let { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }
    dispatch(getProducts(keyword, priceChanged,category, rating,currentPage));
  }, [error, dispatch, currentPage, priceChanged, keyword,category,rating]);

  console.log(rating)

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h1 id="products_heading">Search Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mb-5  mt-5">
                {/* price Filter  */}
                <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                  <Slider
                    range={true}
                    marks={{
                      1: "$1",
                      100000: "$100000",
                    }}
                    min={1}
                    max={100000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={` $ ${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}></div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>

                <hr className="my-5"></hr>
                {/* category filter  */}

                <div className="mt-5">
                  <h3 className="mb-3">Categories</h3>
                  <ul className="pl-0">
                    {
                      categories.map((e,i)=>{
                        return (<li key={i} onClick={()=>setCategory(e)}>{e}</li>)
                      })
                    }
                  </ul>
                </div>

                <hr className="my-5"></hr>
                {/* Rating filter  */}

                <div className="mt-5">
                  <h4 className="mb-3">Rating</h4>
                  <ul className="pl-0">
                    {
                      [5,4,3,2,1].map((e,i)=>{
                        return (<li key={i} onClick={()=>setRating(e)}>

                          <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${e * 20}%` }}
                            ></div>
                          </div>
                        </li>)
                      })
                    }
                  </ul>

                </div>

                
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  {products &&
                    products?.map((e) => {
                      return <Product Product={e} key={e._id} col={4} />;
                    })}
                </div>
              </div>
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagenation
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass="page-link"
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductSearch;
