import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { State, Category } from "../../../../interfaces";
import {
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
} from "../../../../actions/admin/category";

const Table = (props: {
  categories: Category[];
  setShowCategories: Function;
  setShowCreateCategory: Function;
  setShowUpdateCategory: Function;
}) => {
  const history = useHistory();

  return (
    <React.Fragment>
      {props.categories.length === 0 && (
        <div className="empty-message">
          <p>Δεν υπάρχουν κατηγορίες ακόμα</p>
        </div>
      )}

      {props.categories.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Όνομα Κατηγορίας</th>
              <th>Επεξεργασία</th>
            </tr>
          </thead>

          <tbody>
            {props.categories.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td
                  className="icon"
                  onClick={() => {
                    history.push(
                      `/admin/dashboard?view_categories&update&id=${c.id}`
                    );
                    props.setShowCategories(false);
                    props.setShowCreateCategory(false);
                    props.setShowUpdateCategory(true);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  categories: state.product.categories,
});

export default connect(mapStateToProps, {
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
})(Table);
