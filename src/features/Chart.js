import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { UserDataJson } from "../Common/UsersDataJson";

ChartJS.register(...registerables);

const Chart = () => {
  const users = UserDataJson;
  //   const month = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  return (
    <div>
      {/* <Bar
        data={{
          labels: ["Users", "Resumes", "Portals"],
          datasets: [
            {
              label: "Total Data",
              data: [users.length, 110, 3],
              backgroundColor: ["#e9b949", "#647acb", "#d66a6a"],
              //   borderColor: ["black"],
              borderWidth: 1,
            },
          ],
        }}
        height={300}
        options={{
          maintainAspectRatio: false,
          //   scales: {
          //     yAxes: [
          //       {
          //         ticks: {
          //           beginAtZero: true,
          //         },
          //       },
          //     ],
          //   },
        }}
      /> */}
      <Bar
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Users",
              data: [users.length, 30, 27, 32, 29, 27, 35],
              backgroundColor: ["#e9b949"],
              //   borderColor: ["black"],
              borderWidth: 1,
            },
            {
              label: "Resumes",
              data: [20, 30, 50, 90, 110, 120, 150],
              backgroundColor: ["#647acb"],
              //   borderColor: ["black"],
              borderWidth: 1,
            },
            {
              label: "Portals",
              data: [5, 9, 9, 12, 15, 20, 25],
              backgroundColor: ["#d66a6a"],
              //   borderColor: ["black"],
              borderWidth: 1,
            },
          ],
        }}
        height={390}
        options={{
          maintainAspectRatio: false,
          //   scales: {
          //     yAxes: [
          //       {
          //         ticks: {
          //           beginAtZero: true,
          //         },
          //       },
          //     ],
          //   },
        }}
      />
    </div>
  );
};

export default Chart;
