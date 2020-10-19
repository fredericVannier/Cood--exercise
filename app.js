const deleteBtn = document.querySelector(".delete-btn");
const selectList = document.querySelector("select");
const table = document.getElementById("myTable");
const searchBar = document.querySelector("#search-input");
let myData = {};

// OBJECT TO BE ABLE TO MAKE A REQUEST WITH THE LOCAL JSON FILE
const myRequest = new Request("./groups.json");
console.log(myRequest);

fetch(myRequest)
  .then((res) => res.json())
  .then((obj) => {
    myData = obj;
    buildTable(obj);
  })
  .catch((err) => console.log(err));

// INPUT SEARCH FUNCTION
const searchTable = (value, data) => {
  let filteredData = [];

  for (let i = 0; i < data.length; i++) {
    value = value.toLowerCase();
    const name = data[i].name.toLowerCase();
    const usersNum = data[i].users.length;
    const valueNum = parseInt(value);

    // CONDITION TO KNOW IF WE COMPARE A NUMBER OR A STRING
    if (name.includes(value)) {
      filteredData.push(data[i]);
    } else if (usersNum === valueNum) {
      filteredData.push(data[i]);
    }
  }
  return filteredData;
};

// INPUT SEARCH BAR EVENT
searchBar.addEventListener("keyup", () => {
  let value = searchBar.value;

  let data = searchTable(value, myData);
  buildTable(data);
});

// FUNCTION TO DELETE THE FILTERS
function buildTableBis(data) {
  selectList.selectedIndex = 0;
  searchBar.value = "";
  table.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let colName = `${data[i].name}`;
    let colType = `${data[i].type}`;
    let colUsers = `${data[i].users}`;

    let row = `<tr>
       <td class="name-col" dataName=${colName}>${data[i].name}</td>
       <td dataType=${colType}>${data[i].type}</td>
       <td dataUsers=${colUsers}>${data[i].users.length}</td>
       </tr>`;
    table.innerHTML += row;
  }
}

// BUTTON TO DELETE THE FILTERS
deleteBtn.addEventListener("click", () => {
  buildTableBis(myData);
});

// FUNTION TO CREATE ROWS DYNAMICALLY
function buildTable(data) {
  table.innerHTML = "";
  let index = selectList.selectedIndex;

  if (index == 0) {
    for (let i = 0; i < data.length; i++) {
      let colName = `${data[i].name}`;
      let colType = `${data[i].type}`;
      let colUsers = `${data[i].users}`;

      let row = `<tr>
          <td class="name-col" dataName=${colName}>${data[i].name}</td>
          <td dataType=${colType}>${data[i].type}</td>
          <td dataUsers=${colUsers}>${data[i].users.length}</td>
          </tr>`;
      table.innerHTML += row;
    }
  } else if (index == 1) {
    let collectionArray = data.filter((res) => res.type == "collection");

    for (let i = 0; i < collectionArray.length; i++) {
      let colName = `${collectionArray[i].name}`;
      let colType = `${collectionArray[i].type}`;
      let colUsers = `${collectionArray[i].users}`;

      let row = `<tr>
        <td class="name-col" dataName=${colName}>${collectionArray[i].name}</td>
        <td dataType=${colType}>${collectionArray[i].type}</td>
        <td dataUsers=${colUsers}>${collectionArray[i].users.length}</td>
        </tr>`;
      table.innerHTML += row;
    }
    return collectionArray;
  } else if (index == 2) {
    let classArray = data.filter((res) => res.type == "class");

    for (let i = 0; i < classArray.length; i++) {
      let colName = `${classArray[i].name}`;
      let colType = `${classArray[i].type}`;
      let colUsers = `${classArray[i].users}`;

      let row = `<tr>
      <td class="name-col" dataName=${colName}>${classArray[i].name}</td>
      <td dataType=${colType}>${classArray[i].type}</td>
      <td dataUsers=${colUsers}>${classArray[i].users.length}</td>
      </tr>`;
      table.innerHTML += row;
    }
    return classArray;
  } else {
    console.log("nothing to show");
  }
}

// TYPE FILTER FOR THE SELECT PICKER
selectList.addEventListener("change", () => {
  buildTable(myData);
});
