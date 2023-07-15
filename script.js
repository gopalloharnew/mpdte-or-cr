import { data } from "./data.js";

const tableBody = document.querySelector("[data-table-body]");
const tableHead = document.querySelector("[data-table-head]");

// form elements
const filterForm = document.querySelector("[data-filter-form]");
const closingRankFromInput = document.querySelector("#closing-rank-from");
const closingRankToInput = document.querySelector("#closing-rank-to");

const tableColumnOrder = [
  { property: "instituteName", displayName: "Institute Name" },
  { property: "instituteType", displayName: "Institute Type" },
  { property: "fw", displayName: "FW" },
  { property: "branch", displayName: "Branch" },
  { property: "jeeOpeningRank", displayName: "JEE Opening Rank" },
  { property: "jeeClosingRank", displayName: "JEE Closing Rank" },
  { property: "allottedCategory", displayName: "Category" },
  { property: "domicile", displayName: "Domicile" },
  { property: "totalAllotted", displayName: "Total Alloted" },
];

// functions
function sortColleges(colleges) {
  return colleges.sort((collegeA, collegeB) => {
    return collegeA.jeeClosingRank - collegeB.jeeClosingRank;
  });
}

// filters
function checkRankFilter(college) {
  let closingRankFrom = parseInt(closingRankFromInput.value);
  let closingRankTo = parseInt(closingRankToInput.value);
  if (!isNaN(closingRankFrom) && college.jeeClosingRank < closingRankFrom) {
    return false;
  } else if (!isNaN(closingRankTo) && college.jeeClosingRank > closingRankTo) {
    return false;
  }
  return true;
}

function fitForFilters(college) {
  let isFitForFilters = checkRankFilter(college);
  return isFitForFilters;
}

// html
function createTableRow(college) {
  const tr = document.createElement("tr");
  tableColumnOrder.forEach((column) => {
    const td = document.createElement("td");
    td.textContent = college[column.property];
    tr.append(td);
  });
  return tr;
}

function createTableHeadRow() {
  const tr = document.createElement("tr");
  tableColumnOrder.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column.displayName;
    tr.append(th);
  });
  return tr;
}

// main
function renderColleges() {
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";
  tableHead.append(createTableHeadRow());
  let colleges = sortColleges(data);
  colleges.forEach((college) => {
    if (fitForFilters(college)) {
      tableBody.append(createTableRow(college));
    }
  });
}

// execution
renderColleges();

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  renderColleges();
});
