import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { State, Category, Product, ProductImage } from "../../../../interfaces";
import {
  fetchProduct,
  updateProduct,
  uploadImage,
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
  deleteProduct,
} from "../../../../actions/admin/product";
import { useHistory } from "react-router-dom";

const CreateProduct = (props: {
  userId: string;
  token: string;
  productFetched: boolean;
  fetchingProduct: boolean;
  fetchProduct: Function;
  categories: Category[];
  product: Product;
  updateProduct: Function;
  uploadImage: Function;
  setShowCreateProduct: Function;
  setShowProducts: Function;
  setShowUpdateProduct: Function;
  productUpdated: boolean;
  deleteProduct: Function;
  productDeleted: boolean;
  productImages: ProductImage[]
}) => {
  const history = useHistory();

  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(props.product);
  const [name, setName] = useState(props.product.name);
  const [category_id, setCategoryId] = useState(props.product.category_id);
  const [code, setCode] = useState(props.product.code);
  const [price, setPrice] = useState(props.product.price);
  const [weight, setWeight] = useState(props.product.weight);
  const [quantity, setQuantity] = useState(props.product.quantity);
  const [on_sale, setOnSale] = useState(props.product.on_sale);
  const [new_price, setNewPrice] = useState(props.product.new_price);
  const [description, setDescription] = useState(props.product.description);

  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [showDisplayerImages, setShowDisplayerImages] = useState(false);
  const [showDisplayerImages2, setShowDisplayerImages2] = useState(false);
  const [showDisplayerImages3, setShowDisplayerImages3] = useState(false);
  const [showDisplayerImages4, setShowDisplayerImages4] = useState(false);

  useEffect(() => {
    let id = window.location.search.split("&")[2].split("=")[1];

    props.fetchProduct(props.userId, props.token, id);

    setProductId(id);
  }, []);

  useEffect(() => {
    if (props.productFetched) {
      setProduct(props.product);

      setName(props.product.name);
      setCategoryId(props.product.category_id);
      setCode(props.product.code);
      setPrice(props.product.price);
      setWeight(props.product.weight);
      setQuantity(props.product.quantity);
      setOnSale(props.product.on_sale);
      setNewPrice(props.product.new_price);
      setDescription(props.product.description);
    }
  }, [props.productFetched]);

  useEffect(() => {
    if (props.productUpdated && product.id !== "") {
      props.setShowProducts(true);
      props.setShowUpdateProduct(false);
      props.setShowCreateProduct(false);
      history.push("/admin/dashboard?view_products");
    }
  }, [props.productUpdated]);

  useEffect(() => {
    if (props.productDeleted && product.id !== "") {
      props.setShowProducts(true);
      props.setShowUpdateProduct(false);
      props.setShowCreateProduct(false);
      history.push("/admin/dashboard?view_products");
    }
  }, [props.productDeleted]);

  const update = () => {
    const formData = {
      name, category_id, code, price, weight, quantity, description, image, image2, image3, image4, on_sale, new_price
    };


    props.updateProduct(props.userId, props.token, productId, formData);
  };

  return (
    <form
      className="admin-form"
      onSubmit={(e) => {
        e.preventDefault();

        update();
      }}
    >
      <div className="input-group">
        <label>
          Όνομα <span className="required">*Υποχρεωτικό</span>
        </label>
        <input
          type="text"
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>
          Κατηγορία <span className="required">*Υποχρεωτικό</span>
        </label>
        <select
          defaultValue={product.category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          required={true}
        >
          {props.categories.map((c, i) => (
            <option key={i} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>Κωδικός</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>
          Τιμή <span className="required">*Υποχρεωτικό</span>
        </label>
        <input
          required={true}
          type="number"
          value={price}
          onChange={(e) => {
            if (parseInt(e.target.value) > 0) {
              setPrice(parseInt(e.target.value));
            } else {
              setPrice(0);
            }
          }}
        />
      </div>

      <div className="input-group">
        <label>
          Βάρος <span className="required">*Υποχρεωτικό</span>
        </label>
        <input
          required={true}
          type="number"
          value={weight}
          onChange={(e) => {
            if (parseFloat(e.target.value) > 0) {
              setWeight(parseFloat(e.target.value));
            } else {
              setWeight(0);
            }
          }}
        />
      </div>

      <div className="input-group">
        <label>
          Ποσότητα <span className="required">*Υποχρεωτικό</span>
        </label>
        <input
          type="number"
          required={true}
          value={quantity}
          onChange={(e) => {
            if (parseInt(e.target.value) > 0) {
              setQuantity(parseInt(e.target.value));
            } else {
              setQuantity(0);
            }
          }}
        />
      </div>

      <div className="input-group">
        <label>
          Περιγραφή <span className="required">*Υποχρεωτικό</span>
        </label>
        <textarea
          required={true}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="input-group">
        <label>
          Προσφορά <span className="required">*Υποχρεωτικό</span>
        </label>
        <select
          value={on_sale}
          required={true}
          onChange={(e) => setOnSale(parseInt(e.target.value))}
        >
          <option value={0}>Όχι</option>
          <option value={1}>Ναι</option>
        </select>
      </div>

      <div className="input-group">
        <label>
          Τιμή Προσφοράς <span className="required">*Υποχρεωτικό</span>
        </label>
        <input
          type="number"
          required={true}
          value={new_price}
          onChange={(e) => {
            if (parseInt(e.target.value) > 0) {
              setNewPrice(parseInt(e.target.value));
            } else {
              setNewPrice(0);
            }
          }}
        />
      </div>

      <div className="input-group">
        <label>Φωτογραφία 1</label>

        <div className="image-displayer" onClick={() => 
          {
            let temp = showDisplayerImages;
            setShowDisplayerImages(!temp)

            if(!temp){
              setShowDisplayerImages2(false);
              setShowDisplayerImages3(false);
              setShowDisplayerImages4(false);
            }
          }
        }>

          <span className="select-arrow-down">
            <i className="fas fa-caret-down"></i>
          </span>

          {image === "" && <div className="image-displayer-text">Επιλέξτε μια φωτογραφία</div>}
          {image !== "" && <div className="image-displayer-option">
          <img src={image} alt="Product"/>
            </div>}
          {showDisplayerImages && <div className="images-container">
            {
              props.productImages.map(product_image => 
              <div className="image-displayer-option image-option" key={product_image.id} onClick={() => {
                setImage(product_image.image_path);
                setShowDisplayerImages(false);
              }}>
                <img src={product_image.image_path} alt="Product"/>
              </div>)
            }
          </div>}
        </div>
      </div>

      {props.product.image !== "" && (
        <div className="choosed-img">
          <img
            src={props.product.image}
            alt="Product"
          />
        </div>
      )}

      <div className="input-group">
        <label>Φωτογραφία 2</label>

        <div className="image-displayer" onClick={() => 
          {
            let temp = showDisplayerImages2;
            setShowDisplayerImages2(!temp)

            if(!temp){
              setShowDisplayerImages(false);
              setShowDisplayerImages3(false);
              setShowDisplayerImages4(false);
            }
          }
        }>

          <span className="select-arrow-down">
            <i className="fas fa-caret-down"></i>
          </span>

          {image2 === "" && <div className="image-displayer-text">Επιλέξτε μια φωτογραφία</div>}
          {image2 !== "" && <div className="image-displayer-option">
          <img src={image2} alt="Product"/>
            </div>}
          {showDisplayerImages2 && <div className="images-container">
            {
              props.productImages.map(product_image => 
              <div className="image-displayer-option image-option" key={product_image.id} onClick={() => {
                setImage2(product_image.image_path);
                setShowDisplayerImages2(false);
              }}>
                <img src={product_image.image_path} alt="Product"/>
              </div>)
            }
          </div>}
        </div>
      </div>

      {props.product.image2 !== "" && (
        <div className="choosed-img">
          <img
            src={props.product.image2}
            alt="Product"
          />
        </div>
      )}

      <div className="input-group">
        <label>Φωτογραφία 3</label>

        <div className="image-displayer" onClick={() => 
          {
            let temp = showDisplayerImages3;
            setShowDisplayerImages3(!temp)

            if(!temp){
              setShowDisplayerImages2(false);
              setShowDisplayerImages(false);
              setShowDisplayerImages4(false);
            }
          }
        }>

          <span className="select-arrow-down">
            <i className="fas fa-caret-down"></i>
          </span>

          {image3 === "" && <div className="image-displayer-text">Επιλέξτε μια φωτογραφία</div>}
          {image3 !== "" && <div className="image-displayer-option">
          <img src={image3} alt="Product"/>
            </div>}
          {showDisplayerImages3 && <div className="images-container">
            {
              props.productImages.map(product_image => 
              <div className="image-displayer-option image-option" key={product_image.id} onClick={() => {
                setImage3(product_image.image_path);
                setShowDisplayerImages3(false);
              }}>
                <img src={product_image.image_path} alt="Product"/>
              </div>)
            }
          </div>}
        </div>
      </div>

      {props.product.image3 !== "" && (
        <div className="choosed-img">
          <img
            src={props.product.image3}
            alt="Product"
          />
        </div>
      )}

      <div className="input-group">
        <label>Φωτογραφία 4</label>

        <div className="image-displayer" onClick={() => 
          {
            let temp = showDisplayerImages4;
            setShowDisplayerImages4(!temp)

            if(!temp){
              setShowDisplayerImages2(false);
              setShowDisplayerImages3(false);
              setShowDisplayerImages(false);
            }
          }
        }>

          <span className="select-arrow-down">
            <i className="fas fa-caret-down"></i>
          </span>

          {image4 === "" && <div className="image-displayer-text">Επιλέξτε μια φωτογραφία</div>}
          {image4 !== "" && <div className="image-displayer-option">
          <img src={image4} alt="Product"/>
            </div>}
          {showDisplayerImages4 && <div className="images-container">
            {
              props.productImages.map(product_image => 
              <div className="image-displayer-option image-option" key={product_image.id} onClick={() => {
                setImage4(product_image.image_path);
                setShowDisplayerImages4(false);
              }}>
                <img src={product_image.image_path} alt="Product"/>
              </div>)
            }
          </div>}
        </div>
      </div>

      {props.product.image4 !== "" && (
        <div className="choosed-img">
          <img
            src={props.product.image4}
            alt="Product"
          />
        </div>
      )}

      <div className="buttons">
        <button className="btn create-btn" type="submit">
          Αποθήκευση
        </button>

        <button
          className="btn delete-btn"
          type="button"
          onClick={() => {
            if (
              window.confirm("Θέλετε σίγουρα να διαγράψετε το προϊόν αυτό?")
            ) {
              props.deleteProduct(props.userId, props.token, productId);
            }
          }}
        >
          Διέγραψε
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.admin.user.id,
  token: state.admin.user.token,
  productFetched: state.admin.product.productFetched,
  fetchingProduct: state.admin.product.fetchingProduct,
  categories: state.product.categories,
  product: state.admin.product.product,
  productUpdated: state.admin.product.productUpdated,
  productDeleted: state.admin.product.productDeleted,
  productImages: state.admin.product.productImages
});

export default connect(mapStateToProps, {
  fetchProduct,
  updateProduct,
  uploadImage,
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
  deleteProduct,
})(CreateProduct);
