
let mainCart = document.getElementById("table-headers");
let creatTable = document.createElement("table");
let creatthead = document.createElement("thead");
creatTable.appendChild(creatthead);
let creatTr = document.createElement("tr");
creatthead.appendChild(creatTr);
let creatTh1 = document.createElement("th");
creatTr.appendChild(creatTh1);
creatTh1.innerText = "Id";
creatTh1.className = "column1";

let creatTh2 = document.createElement("th");
creatTr.appendChild(creatTh2);
creatTh2.innerText = "FirstName";
creatTh2.className = "column2";

let creatTh3 = document.createElement("th");
creatTr.appendChild(creatTh3);
creatTh3.innerText = "LastName";
creatTh3.className = "LastName";

let creatTh4 = document.createElement("th");
creatTr.appendChild(creatTh4);
creatTh4.innerText = "Email";
creatTh4.className = "column4";

let creatTh5 = document.createElement("th");
creatTr.appendChild(creatTh5);
creatTh5.innerText = "Phone";
creatTh5.className = "column5";
mainCart.appendChild(creatTable);

let someProduct = new Promise((resolve, reject) => {
  $.get("https://607c412c67e6530017573d5a.mockapi.io/admin", (response) => {
    let productData = response;
    resolve(productData);
    productData.forEach((item) => {
      let tbval = document.getElementById("tbval");
      let trData = document.createElement("tr");
      tbval.appendChild(trData);
      trData.className = "data-row";

      let dataTd1 = document.createElement("td");
      dataTd1.className = "column1";
      dataTd1.innerText = item.id;
      trData.appendChild(dataTd1);

      let dataTd2 = document.createElement("td");
      dataTd2.className = "column2";
      dataTd2.innerText = item.firstName;

      trData.appendChild(dataTd2);

      let dataTd3 = document.createElement("td");
      dataTd3.className = "column3";
      dataTd3.innerText = item.lastName;
      trData.appendChild(dataTd3);

      let dataTd4 = document.createElement("td");
      dataTd4.className = "column4";
      dataTd4.innerText = item.email;
      trData.appendChild(dataTd4);

      let dataTd5 = document.createElement("td");
      dataTd5.className = "column5";
      dataTd5.innerText = item.phone;
      trData.appendChild(dataTd5);
    });

    $(".data-row").on("click", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
    let MainCartUsre = document.getElementById("info-content");
    let USerDiv1 = document.createElement("div");
    let selectUser = document.createElement("span");
    let UserDiv2 = document.createElement("div");
    let descriptionUser = document.createElement("b");
    let textArea = document.createElement("textarea");
    let USerDiv3 = document.createElement("div");
    let addressUser = document.createElement("span");
    let USerDiv4 = document.createElement("div");
    let cityUser = document.createElement("span");
    let USerDiv5 = document.createElement("div");
    let stateUser = document.createElement("span");
    let USerDiv6 = document.createElement("div");
    let zipUser = document.createElement("span");

    $(".data-row").ready(function () {
      $("table tbody tr").click(function (e) {
        selectUser.innerText = `${e.target.parentElement.children[1].innerText} ${e.target.parentElement.children[2].innerText}`;

        USerDiv1.innerText = "User selected:";
        USerDiv1.appendChild(selectUser);
        MainCartUsre.appendChild(USerDiv1);

        descriptionUser.innerText = "Description:";
        UserDiv2.appendChild(descriptionUser);
        MainCartUsre.appendChild(UserDiv2);

        textArea.innerText = productData[length].description;
        textArea.rows = "5";
        textArea.cols = "50";
        textArea.readonly = true;
        UserDiv2.appendChild(textArea);

        addressUser.innerText = productData[length].address.streetAddress;
        USerDiv3.innerText = "Address:";
        USerDiv3.appendChild(addressUser);
        MainCartUsre.appendChild(USerDiv3);

        cityUser.innerText = productData[length].address.city;
        USerDiv4.innerText = "City:";
        USerDiv4.appendChild(cityUser);
        MainCartUsre.appendChild(USerDiv4);

        stateUser.innerText = productData[length].address.state;
        USerDiv5.innerText = "State:";
        USerDiv5.appendChild(stateUser);
        MainCartUsre.appendChild(USerDiv5);

        zipUser.innerText = productData[length].address.zip;
        USerDiv6.innerText = "zip";
        USerDiv6.appendChild(zipUser);
        MainCartUsre.appendChild(USerDiv6);

        if (typeof Storage !== "undefined") {
          let items1 = [];
          let item = {
            id: e.target.parentElement.children[0].innerText,
            UserSelected: `${e.target.parentElement.children[1].innerText}
                       ${e.target.parentElement.children[2].innerText}`,

            description: productData[length++].description,
            Address: productData[length++]["address"]["streetAddress"],
            City: productData[length++]["address"]["city"],
            State: productData[length++]["address"]["state"],
            Zip: productData[length++]["address"]["zip"],
          };
          addItemLocal(item);
          function addItemLocal(item) {
            let cartItem = JSON.parse(localStorage.getItem("itemsList"));
            if (cartItem === null) {
              items1.push(item);
              localStorage.setItem("itemsList", JSON.stringify(items1));
              window.location.reload();
            }
          }
        }
      });
    });

    $("#search-box").on("keyup", function () {
      let value = $(this).val().toUpperCase();
      let tr = $(".data-row");
      for (let i = 0; i < tr.length; i++) {
        let td = tr[i].children[1];
        if (td) {
          let textValue = td.textContent || td.innerHTML;

          if (textValue.toUpperCase().indexOf(value) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    });
  }).fail((err) => {
    reject(
      new Error(`call failed for GET List request with status ${err.status}`)
    );
  });
})
  .then((response) => {
    console.log("Call Success");
    console.log("Then Response =>", response);
  })
  .catch((error) => {
    console.log("Call Failed");
    console.log("Catch Error =>", error);
  });
