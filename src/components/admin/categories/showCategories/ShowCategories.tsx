import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { State, AdminCategoryState } from "../../../../interfaces";
import { getCategories } from "../../../../actions/product";
import {
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
} from "../../../../actions/admin/category";

// Components
import Table from "./Table";

const ShowCategories = (props: {
  getCategories: Function;
  setShowCategories: Function;
  setShowCreateCategory: Function;
  setShowUpdateCategory: Function;
  adminCategoryState: AdminCategoryState;
}) => {
  const history = useHistory();

  useEffect(() => {
    props.getCategories();
  }, []);

  return (
    <div className="show-categories">
      <div className="btn-container">
        <button
          className="btn create-btn"
          onClick={() => {
            history.push(`/admin/dashboard?view_categories&create`);
            props.setShowCategories(false);
            props.setShowCreateCategory(true);
            props.setShowUpdateCategory(false);
          }}
        >
          Δημιουργία
        </button>
      </div>

      <Table />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  adminCategoryState: state.admin.category,
});

export default connect(mapStateToProps, {
  getCategories,
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
})(ShowCategories);
