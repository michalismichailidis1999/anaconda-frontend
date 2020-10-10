import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { State, AdminDashboardState } from "../../../interfaces";
import {
  getOrdersTotalCount,
  getAvgMonthlyProfit,
  getTotalProfit,
  getLineChartData,
  getPieChartData,
} from "../../../actions/admin/order";
import { getUsersTotalCount } from "../../../actions/admin/user";
import { getMessagesTotalCount } from "../../../actions/admin/message";
import { getProductsTotalCount } from "../../../actions/admin/product";
import { getCategoriesTotalCount } from "../../../actions/admin/category";
import { connect } from "react-redux";

// Components
import Boxes from "./Boxes";

const BusinessDetails = (props: {
  getOrdersTotalCount: Function;
  getAvgMonthlyProfit: Function;
  getTotalProfit: Function;
  getUsersTotalCount: Function;
  getMessagesTotalCount: Function;
  getProductsTotalCount: Function;
  getCategoriesTotalCount: Function;
  userId: string;
  token: string;
  dashboard: AdminDashboardState;
  getLineChartData: Function;
  getPieChartData: Function;
  choosed: string;
}) => {
  const [boxes, setBoxes] = useState(props.dashboard.boxes);
  const [profitBoxes, setProfitBoxes] = useState(props.dashboard.boxes);

  const [lineChart, setLineChart] = useState(props.dashboard.lineChart);

  const [pieChart, setPieChart] = useState(props.dashboard.pieChart);

  useEffect(() => {
    if (
      props.choosed === "dashboard" &&
      props.dashboard.fetchCount !== 7 &&
      !props.dashboard.lineChartDataFetched &&
      !props.dashboard.pieChartDataFetched
    ) {
      props.getOrdersTotalCount(props.userId, props.token);
      props.getUsersTotalCount(props.userId, props.token);
      props.getMessagesTotalCount(props.userId, props.token);
      props.getProductsTotalCount(props.userId, props.token);
      props.getCategoriesTotalCount(props.userId, props.token);
      props.getTotalProfit(props.userId, props.token);
      props.getAvgMonthlyProfit(props.userId, props.token);

      props.getLineChartData(props.userId, props.token);
      props.getPieChartData(props.userId, props.token);
    }
  }, []);

  useEffect(() => {
    if (props.dashboard.fetchCount === 7) {
      setBoxes(props.dashboard.boxes);
      setProfitBoxes(props.dashboard.profitBoxes);
    }

    if (props.dashboard.lineChartDataFetched) {
      setLineChart(props.dashboard.lineChart);
    }

    if (props.dashboard.pieChartDataFetched) {
      setPieChart(props.dashboard.pieChart);
    }
  }, [props.dashboard]);

  return (
    <div className="business-details">
      <h2>
        Αρχική <i className="fas fa-tachometer-alt"></i>
      </h2>
      <Boxes boxes={boxes} />

      <h3 className="box-title">
        Απόδοση Εταιρίας <i className="far fa-check-circle"></i>
      </h3>

      <Boxes boxes={profitBoxes} />

      {props.dashboard.lineChartDataFetched &&
        props.dashboard.pieChartDataFetched && (
          <div className="charts">
            <div className="chart">
              <Line data={lineChart.data} options={lineChart.options} />
            </div>

            <div className="chart">
              <Pie data={pieChart.data} options={pieChart.options} />
            </div>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.admin.user.id,
  token: state.admin.user.token,
  dashboard: state.admin.dashboard,
});

export default connect(mapStateToProps, {
  getOrdersTotalCount,
  getAvgMonthlyProfit,
  getTotalProfit,
  getUsersTotalCount,
  getMessagesTotalCount,
  getProductsTotalCount,
  getCategoriesTotalCount,
  getLineChartData,
  getPieChartData,
})(BusinessDetails);
