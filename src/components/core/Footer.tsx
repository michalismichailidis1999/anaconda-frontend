import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { State, Category } from "../../interfaces";
import { setInitialQuery, setCategoryName } from "../../actions/app";

const Footer = (props: {
  categories: Category[];
  setInitialQuery: Function;
  setCategoryName: Function;
}) => {
  const [checkoutLinks] = useState([
    {
      link: "Κορυφαίες Πωλήσεις",
      setQueryTo: { page: 1, filter: "sold", sortBy: "DESC", category: "all" },
    },
    {
      link: "Προσφορές",
      setQueryTo: { page: 1, filter: "sale", sortBy: "ASC", category: "all" },
    },
    {
      link: "Νέα Προϊόντα",
      setQueryTo: {
        page: 1,
        filter: "created_at",
        sortBy: "DESC",
        category: "all",
      },
    },
  ]);
  const [userLinks] = useState([
    { link: "Εγγραφή", url: "/signup" },
    { link: "Είσοδος", url: "/signin" },
    { link: "Οι παραγγελίες μου", url: "/user?my_orders" },
    { link: "Τα στοιχεία μου", url: "/user?user_details" },
  ]);
  const [adminContactDetails] = useState([
    { icon: "fas fa-phone", contact: "23810 83077" },
    { icon: "fas fa-mobile-alt", contact: "+30 6947031634" },
    { icon: "fas fa-at", contact: "anakonta2011@hotmail.com" },
  ]);

  const [workingHours] = useState([
    "-Δευτέρα 9:00 - 2:30 και 17:00 - 21:00",
    "-Τρίτη 9:00 - 2:30 και 17:00 - 21:00",
    "-Τετάρτη 9:00 - 2:30 και 17:00 - 21:00",
    "-Πέμπτη 9:00 - 2:30 και 17:00 - 21:00",
    "-Παρασκευή 9:00 - 2:30 και 17:00 - 21:00",
  ]);

  return (
    <footer>
      <section className="footer-section-1">
        <div className="footer-grid-column">
          <h4>
            Προϊόντα <i className="fas fa-tags"></i>
          </h4>

          <ul>
            {props.categories.map((c, i) => (
              <li key={i}>
                <Link
                  to="/shop"
                  className="footer-link"
                  onClick={() => {
                    props.setCategoryName(c.name);
                    props.setInitialQuery({
                      page: 0,
                      filter: "created_at",
                      sortBy: "ASC",
                      category: c.id,
                    });
                  }}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          <h4>
            Αγορές <i className="fas fa-shopping-cart"></i>
          </h4>

          <ul>
            {checkoutLinks.map((cl, i) => (
              <li key={i}>
                <Link
                  to="/shop"
                  className="footer-link"
                  onClick={() => props.setInitialQuery(cl.setQueryTo)}
                >
                  {cl.link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-grid-column when-merged-display-none">
          <h4>
            Χρήστης <i className="fas fa-user"></i>
          </h4>

          <ul>
            {userLinks.map((usL, i) => (
              <li key={i}>
                <Link to={usL.url} className="footer-link">
                  {usL.link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-grid-column when-merged-display-none">
          <h4>
            Επικοινωνία <i className="fas fa-envelope"></i>
          </h4>

          <ul>
            {adminContactDetails.map((adL, i) => (
              <li key={i}>
                <i className={adL.icon}></i> {adL.contact}
              </li>
            ))}

            <li>
              <a
                href="https://bit.ly/3lTXaed"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i> https://bit.ly/3lTXaed
              </a>
            </li>
          </ul>
        </div>

        <div className="merged">
          <div className="footer-grid-column">
            <h4>
              Χρήστης <i className="fas fa-user"></i>
            </h4>

            <ul>
              {userLinks.map((usL, i) => (
                <li key={i}>
                  <Link to={usL.url} className="footer-link">
                    {usL.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-grid-column">
            <h4>
              Επικοινωνία <i className="fas fa-envelope"></i>
            </h4>

            <ul>
              {adminContactDetails.map((adL, i) => (
                <li key={i}>
                  <i className={adL.icon}></i> {adL.contact}
                </li>
              ))}

              <li>
                <a
                  href="https://facebook.com"
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook"></i>{" "}
                  https://my_faceboom.com/1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-grid-column">
          <h4>
            Το κατάστημα μας <i className="fas fa-store"></i>
          </h4>

          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i> Σκύδρα, Μεγάλου
              Αλεξάνδρου 48
            </li>
          </ul>

          <h4>
            Ώρες Λειτουργείας <i className="far fa-calendar-alt"></i>
          </h4>

          <ul>
            {workingHours.map((wh, i) => (
              <li key={i}>{wh}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="footer-section-2">
        <p>Anakonta &copy; 2020</p>
      </section>
    </footer>
  );
};

const mapStateToProps = (state: State) => ({
  categories: state.product.categories,
});

export default connect(mapStateToProps, { setInitialQuery, setCategoryName })(
  Footer
);
