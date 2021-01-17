const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const day = document.getElementById('day');
const todayDate = document.getElementById('todayDate');
const datahide = document.getElementsByClassName('middle_layer');

let date = new Date;
const dayNo = date.getDay();
const dateNo = date.getDate();
const monthNo = date.getMonth();

let arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let arr2 = ["January", "February", "March", "April", "May", "June", "July", "August", "August", "October", "October", "December"];

day.innerText = arr[dayNo];
todayDate.innerText = dateNo + "  " + arr2[monthNo];


console.log(dayNo, dateNo, monthNo);

const getInfo = async(event) => {
    event.preventDefault();
    cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = " Please enter some value!!";
        city_name.style.color = "#0097e6";
        datahide[0].classList.add("data_hide");
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f23beeeaf3e153d2b0e2e7cde7e3a0ec`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
            temp.innerHTML = arrData[0].main.temp + `<sup>o</sup>` + "C";

            const tempMod = arrData[0].weather[0].main;

            //condition to check weather icon status
            if (tempMod == "Clear") {
                temp_status.innerHTML =
                    `<i class="fas fa-sun" style="color: #FFFF00"></i>`;
            } else if (tempMod == "Clouds") {
                temp_status.innerHTML =
                    ` <i class="fas fa-cloud-meatball" style="color: #fff"></i>`;
            } else if (tempMod == "Rain") {
                temp_status.innerHTML =
                    `<i class="fas fa-cloud-rain"></i>`;
            } else {
                temp_status.innerHTML =
                    `<i class="fas fa-sun" style="color: #FFFF00"></i>`;
            }
            datahide[0].classList.remove("data_hide");
        } catch {
            city_name.innerText = " Please enter the valid city!!";
            datahide[0].classList.add("data_hide");
        }
    }

}


submitBtn.addEventListener('click', getInfo);