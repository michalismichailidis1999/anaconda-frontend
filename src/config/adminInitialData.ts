import { Box, LineChartState, PieChartState } from "../interfaces";

export const boxes: Box[] = [
  {
    extraClass: "orders-box",
    icon: "fas fa-truck-loading",
    text: "Παραγγελίες",
    total: 0
  },
  {
    extraClass: "users-box",
    icon: "fas fa-users",
    text: "Χρήστες",
    total: 0
  },
  {
    extraClass: "messages-box",
    icon: "fas fa-envelope",
    text: "Μηνύματα",
    total: 0
  },
  {
    extraClass: "products-box",
    icon: "fas fa-tags",
    text: "Ποϊόντα",
    total: 0
  },
  {
    extraClass: "categories-box",
    icon: "fas fa-hashtag",
    text: "Κατηγορίες",
    total: 0
  }
];

export const profitBoxes: Box[] = [
  {
    extraClass: "profit-box",
    icon: "fas fa-money-bill-wave",
    text: "Κέρδος",
    total: 0
  },
  {
    extraClass: "monthly-profit-box",
    icon: "fas fa-search-dollar",
    text: "Μηνιαίο Κέρδος",
    total: 0
  }
];

export const lineChart: LineChartState = {
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "rgba(255, 0, 0, .3)",
        pointBackgroundColor: "rgba(66, 135, 245, 1)",
        label: "",
        radius: 2
      }
    ]
  },
  options: {
    title: { display: true, text: "Μηνιαίο Κέρδος", fontSize: 19 },
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Κέρδος"
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Μήνες"
          }
        }
      ]
    }
  }
};

export const pieChart: PieChartState = {
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        label: "Κατηγορίες",
        backgroundColor: [
          "rgba(185, 66, 245, 1)",
          "rgba(66, 135, 245, 1)",
          "rgba(201, 22, 52, 1)",
          "rgba(22, 27, 196, 1)",
          "rgba(13, 161, 18, 1)",
          "rgba(196, 219, 20, 1)",
          "rgba(56, 4, 99, 1)",
          "rgba(219, 129, 26, 1)"
        ]
      }
    ]
  },
  options: {
    title: { display: true, text: "Πωλήσεις Κάθε Κατηγορίας", fontSize: 19 }
  }
};

export const months = [
  "Ιαν",
  "Φεβ",
  "Μαρ",
  "Απρ",
  "Μαϊος",
  "Ιουν",
  "Ιουλ",
  "Αυγ",
  "Σεπ",
  "Οκτ",
  "Νοεμ",
  "Δεκ"
];
