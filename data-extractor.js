const rows = document.querySelectorAll("tr");
let x = 0;
const colleges = [];
const regex = /\s*\n\s*/g;

function purgeString(str) {
  str = str.trim();
  str = str.replaceAll(/\n/g, "");
  str = str.replaceAll(/\s+/g, " ");
  return str;
}

function purgeNumber(num) {
  num = num.trim();
  num = parseInt(num);
  return num;
}

rows.forEach((row) => {
  const collegeInfo = {};
  const srNo = parseInt(row.children[0].innerText);
  if (!isNaN(srNo)) {
    x++;
    if (x != srNo) {
      console.error("x != SrNo");
    } else {
      collegeInfo.instituteName = purgeString(row.children[1].innerText);
      collegeInfo.instituteType = purgeString(row.children[2].innerText);
      collegeInfo.fw = purgeString(row.children[3].innerText);
      collegeInfo.branch = purgeString(row.children[4].innerText);
      collegeInfo.nationalPlayer = purgeString(row.children[5].innerText);
      collegeInfo.jeeOpeningRank = purgeNumber(row.children[6].innerText);
      collegeInfo.jeeClosingRank = purgeNumber(row.children[7].innerText);
      collegeInfo.allottedCategory = purgeString(row.children[8].innerText);
      collegeInfo.domicile = purgeString(row.children[9].innerText);
      collegeInfo.totalAllotted = purgeNumber(row.children[10].innerText);
      colleges.push(collegeInfo);
    }
  }
});

console.log(JSON.stringify(colleges));
