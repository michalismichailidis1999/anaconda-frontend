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

  const create = () => {
    console.log("Product created")
    // props.createProduct(props.userId, props.token, formData);
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

        <select required={true} onChange={e => setImage(e.target.value)}>
          <option value="">Επιλέξτε μια φωτογραφία</option>

          {/* TODO: Make a custom select to display the images */}
        </select>
      </div>

      <button className="btn create-btn" type="submit">
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
