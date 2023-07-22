import { data } from "./data.js";
import { properties } from "./properties.js";

const tableBody = document.querySelector("[data-table-body]");
const tableHead = document.querySelector("[data-table-head]");

// form elements
const filterForm = document.querySelector("[data-filter-form]");
const closingRankFromInput = document.querySelector("#closing-rank-from");
const closingRankToInput = document.querySelector("#closing-rank-to");

// functions
function sortColleges(colleges) {
  return colleges.sort((collegeA, collegeB) => {
    return collegeA.jeeClosingRank - collegeB.jeeClosingRank;
  });
}

// create filters
function generateFilterOptions(property) {
  let options = [];
  data.forEach((college) => {
    let isThere = options.some((option) => {
      return option === college[property];
    });

    if (!isThere) {
      options.push(college[property]);
    }
  });
  options = options.sort();
  return options;
}

function createSelectOption(property, title) {
  const select = document.createElement("select");
  select.classList.add("filter-select");
  select.dataset.selectProperty = property;
  select.id = property;
  select.name = property;
  select.title = title;

  const allOptionElem = document.createElement("option");
  allOptionElem.value = "All";
  allOptionElem.textContent = "All";
  allOptionElem.selected = true;
  select.append(allOptionElem);

  generateFilterOptions(property).forEach((option) => {
    const optionElem = document.createElement("option");
    optionElem.value = option;
    optionElem.textContent = option;
    select.append(optionElem);
  });

  const label = document.createElement("label");
  label.setAttribute("for", select.id);
  label.textContent = title;

  let wrapper = document.createElement("div");
  wrapper.classList.add("form-group");
  wrapper.classList.add("filter-select-wrapper");
  wrapper.append(label);
  wrapper.append(select);
  return wrapper;
}

function createFilters() {
  for (let i = properties.length - 1; i >= 0; i--) {
    const tableColumn = properties[i];
    if (tableColumn.createFilter) {
      filterForm.prepend(
        createSelectOption(tableColumn.property, tableColumn.displayName)
      );
    }
  }
}

// apply filters
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

function checkOtherFilters(college) {
  let allMatch = true;
  [...document.querySelectorAll("[data-select-property")].forEach((select) => {
    if (
      select.value != "All" &&
      college[select.dataset.selectProperty] != select.value
    ) {
      allMatch = false;
    }
  });
  return allMatch;
}

function fitForFilters(college) {
  let isFitForFilters = checkRankFilter(college) && checkOtherFilters(college);
  return isFitForFilters;
}

// html
function createTableRow(college) {
  const tr = document.createElement("tr");
  properties.forEach((property) => {
    if (property.showInTable) {
      const td = document.createElement("td");
      td.textContent = college[property.property].toLocaleString("HI");
      tr.append(td);
    }
  });
  return tr;
}

function createTableHeadRow() {
  const tr = document.createElement("tr");
  properties.forEach((property) => {
    if (property.showInTable) {
      const th = document.createElement("th");
      th.textContent = property.displayName;
      tr.append(th);
    }
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
createFilters();
renderColleges();

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  renderColleges();
});
