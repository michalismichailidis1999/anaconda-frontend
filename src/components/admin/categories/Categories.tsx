import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { State, AdminCategoryState } from "../../../interfaces";
import {
  createCategory,
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
} from "../../../actions/admin/category";

// Components
import ShowCategories from "./showCategories/ShowCategories";
import CreateCategory from "./createCategory/CreateCategory";
import UpdateCategory from "./updateCategory/UpdateCategory";

const Categories = (props: {
  setShowCategories: Function;
  setShowCreateCategory: Function;
  setShowUpdateCategory: Function;
  adminCategoryState: AdminCategoryState;
}) => {
  const [showCategories, setShowCategories] = useState(
    props.adminCategoryState.showCategories
  );
  const [showCreateCategory, setShowCreateCategory] = useState(
    props.adminCategoryState.showCreateCategory
  );
  const [showUpdateCategory, setShowUpdateCategory] = useState(
    props.adminCategoryState.showUpdateCategory
  );

  const setComponentToShow = (
    categories: boolean,
    create: boolean,
    update: boolean
  ) => {
    props.setShowCategories(categories);
    props.setShowCreateCategory(create);
    props.setShowUpdateCategory(update);
  };

  useEffect(() => {
    let query = window.location.search;

    // ?view_categories&create
    // ?view_categories&update&id=1
    if (query.split("&").length > 1) {
      if (query.split("&")[1] === "create") {
        setComponentToShow(false, true, false);
      } else {
        setComponentToShow(false, false, true);
      }
    } else {
      if (!showCategories) {
        setComponentToShow(true, false, false);
      }
    }
  }, []);

  useEffect(() => {
    setShowCategories(props.adminCategoryState.showCategories);
    setShowCreateCategory(props.adminCategoryState.showCreateCategory);
    setShowUpdateCategory(props.adminCategoryState.showUpdateCategory);
  }, [props.adminCategoryState]);

  return (
    <div className="categories-admin">
      <h2>
        Κατηγορίες <i className="fas fa-hashtag"></i>
      </h2>

      {showCategories && <ShowCategories />}

      {showCreateCategory && <CreateCategory />}

      {showUpdateCategory && <UpdateCategory />}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  adminCategoryState: state.admin.category,
});

export default connect(mapStateToProps, {
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
})(Categories);
