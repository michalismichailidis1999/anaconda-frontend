import React, { useState, useEffect } from "react";
import { State, Category, ProductImage } from "../../../../interfaces";
import {
  uploadImage,
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
  createProduct,
} from "../../../../actions/admin/product";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const CreateProduct = (props: {
  uploadImage: Function;
  setShowCreateProduct: Function;
  setShowProducts: Function;
  setShowUpdateProduct: Function;
  createProduct: Function;
  userId: string;
  token: string;
  productCreated: boolean;
  categories: Category[];
  productImages: ProductImage[]
}) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [showDisplayerImages, setShowDisplayerImages] = useState(false);
  const [showDisplayerImages2, setShowDisplayerImages2] = useState(false);
  const [showDisplayerImages3, setShowDisplayerImages3] = useState(false);
  const [showDisplayerImages4, setShowDisplayerImages4] = useState(false);

  const [showRequiredPopup, setShowRequiredPopup] = useState(false);

  const create = () => {
    if(image === ""){
      setShowRequiredPopup(true);
      return;
    }

    const formData = {
      name, category_id, code, price, weight, quantity, description, image, image2, image3, image4
    };

    props.createProduct(props.userId, props.token, formData);
  };

  useEffect(() => {
    if (props.productCreated) {
      props.setShowProducts(true);
      props.setShowUpdateProduct(false);
      props.setShowCreateProduct(false);
      history.push("/admin/dashboard?view_products");
    }
  }, [props.productCreated]);

  return (
    <form
      className="admin-form"
      onSubmit={(e) => {
        e.preventDefault();

        create();
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
        <select required={true} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Επιλέξτε μια κατηγορία</option>
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
          type="number"
          value={weight}
          required={true}
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
          required={true}
          type="number"
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
        <label>Φωτογραφία 1 <span className="required">*Υποχρεωτικό</span></label>

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

                if(showRequiredPopup){
                  setShowRequiredPopup(false);
                }
              }}>
                <img src={product_image.image_path} alt="Product"/>
              </div>)
            }
          </div>}

          {showRequiredPopup && <div className="image-required-popup">
            <p><i className="fas fa-exclamation-circle"></i> Παρακαλώ επιλέξτε μια φωτογραφία από την λίστα</p>
          </div>}
        </div>
      </div>

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

      <button className="btn create-btn" type="submit" disabled={false}>
        Δημιουργία
      </button>
    </form>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.admin.user.id,
  token: state.admin.user.token,
  productCreated: state.admin.product.productCreated,
  categories: state.product.categories,
  productImages: state.admin.product.productImages
});

export default connect(mapStateToProps, {
  uploadImage,
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
  createProduct,
})(CreateProduct);
