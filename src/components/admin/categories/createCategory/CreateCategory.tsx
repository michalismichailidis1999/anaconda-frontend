import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
  createCategory,
} from "../../../../actions/admin/category";
import { State } from "../../../../interfaces";

const CreateCategory = (props: {
  setShowCategories: Function;
  setShowCreateCategory: Function;
  setShowUpdateCategory: Function;
  createCategory: Function;
  userId: string;
  token: string;
  categoryCreated: boolean;
}) => {
  const history = useHistory();

  const [name, setName] = useState("");

  const create = () => {
    props.createCategory(props.userId, props.token, name);
  };

  useEffect(() => {
    if (props.categoryCreated) {
      props.setShowCategories(true);
      props.setShowCreateCategory(false);
      props.setShowUpdateCategory(false);
      history.push("/admin/dashboard?view_categories");
    }
  }, [props.categoryCreated]);

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
          Όνομα Κατηγορίας <span className="required">*Υποχρεωτικό</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
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
  categoryCreated: state.admin.category.categoryCreated,
});

export default connect(mapStateToProps, {
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
  createCategory,
})(CreateCategory);
