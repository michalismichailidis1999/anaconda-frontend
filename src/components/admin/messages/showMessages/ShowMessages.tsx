import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { State } from "../../../../interfaces";
import { fetchMessages } from "../../../../actions/admin/message";

// Components
import Ticks from "../../orders/Ticks";
import Table from "./Table";

const ShowMessages = (props: {
  fetchMessages: Function;
  userId: string;
  token: string;
}) => {
  const [ticksTitle] = useState("Μηνύματα");
  const [ticks, setTicks] = useState([
    { text: "Όλα", choosed: true },
    { text: "Αδιάβαστα", choosed: false },
    { text: "Διαβασμένα", choosed: false },
  ]);

  const [tickChanged, setTickChanged] = useState(false);
  const queryValues = ["all", "unchecked", "checked"];

  const handleTickClick = (tick: { text: string; choosed: boolean }) => {
    let newTicks = ticks.map((t) => {
      if (tick.text === t.text) {
        t.choosed = true;
      } else {
        t.choosed = false;
      }

      return t;
    });

    setTicks(newTicks);

    setTickChanged(true);
  };

  const getMessages = () => {
    let query = "";

    for (let i = 0; i < ticks.length; i++) {
      if (ticks[i].choosed) {
        query = queryValues[i];
        break;
      }
    }

    props.fetchMessages(props.userId, props.token, query);

    setTickChanged(false);
  };

  useEffect(() => {
    let query = window.location.search;

    if (query.split("&").length === 1) {
      getMessages();
    }
  }, []);

  useEffect(() => {
    if (tickChanged) {
      getMessages();
    }
  }, [tickChanged]);

  return (
    <div className="show-messages">
      <Ticks
        ticks={ticks}
        handleTickClick={handleTickClick}
        ticksTitle={ticksTitle}
      />

      <Table />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.admin.user.id,
  token: state.admin.user.token,
});

export default connect(mapStateToProps, { fetchMessages })(ShowMessages);
