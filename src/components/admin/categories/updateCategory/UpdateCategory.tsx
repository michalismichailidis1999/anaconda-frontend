import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
  updateCategory,
  deleteCategory,
  setCategory,
} from "../../../../actions/admin/category";
import { State, Category } from "../../../../interfaces";

const UpdateCategory = (props: {
  category: Category;
  categories: Category[];
  userId: string;
  token: string;
  categoryUpdated: boolean;
  categoryDeleted: boolean;
  setCategory: Function;
  setShowCategories: Function;
  setShowCreateCategory: Function;
  setShowUpdateCategory: Function;
  updateCategory: Function;
  deleteCategory: Function;
}) => {
  const history = useHistory();

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.categories.length > 0 && categoryId === "") {
      let id = window.location.search.split("&")[2].split("=")[1];

      let category = props.categories.find((c) => c.id === id)!;

      props.setCategory(category);

      setCategoryId(id);

      setName(category.name);
    }
  }, [props.categories]);

  useEffect(() => {
    if (props.categoryUpdated && props.category.id !== "") {
      props.setShowCategories(true);
      props.setShowCreateCategory(false);
      props.setShowUpdateCategory(false);
      history.push("/admin/dashboard?view_categories");
    }
  }, [props.categoryUpdated]);

  useEffect(() => {
    if (props.categoryDeleted && props.category.id !== "") {
      props.setShowCategories(true);
      props.setShowCreateCategory(false);
      props.setShowUpdateCategory(false);
      history.push("/admin/dashboard?view_categories");
    }
  }, [props.categoryDeleted]);

  const update = () => {
    props.updateCategory(props.userId, props.token, name, categoryId);
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
          Όνομα Κατηγορίας <span className="required">*Υποχρεωτικό</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
      </div>

      <div className="buttons">
        <button className="btn create-btn" type="submit">
          Αποθήκευση
        </button>

        <button
          className="btn delete-btn"
          type="button"
          onClick={() => {
            if (
              window.confirm(
                "Θέλετε σίγουρα να διαγράψετε την κατηγορία αυτήν?"
              )
            ) {
              props.deleteCategory(props.userId, props.token, categoryId);
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
  categoryUpdated: state.admin.category.categoryUpdated,
  categoryDeleted: state.admin.category.categoryDeleted,
  categories: state.product.categories,
  category: state.admin.category.category,
});

export default connect(mapStateToProps, {
  setCategory,
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
  updateCategory,
  deleteCategory,
})(UpdateCategory);
