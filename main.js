
const cities = [ 
    { arabName: "سوهاج", isoName: "SHG" },
    { arabName: "شمال سيناء", isoName: "SIN" },
    { arabName: "قنا", isoName: "KN" },
    { arabName: "مطروح", isoName: "MT" },
    { arabName: "كفر الشيخ", isoName: "KFS" },
    { arabName: "جنوب سيناء", isoName: "JS" },
    { arabName: "دمياط", isoName: "DT" },
    { arabName: "بورسعيد", isoName: "PTS" },
    { arabName: "بني سويف", isoName: "BNS" },
    { arabName: "أسيوط", isoName: "AST" },
    { arabName: "أسوان", isoName: "ASN" },
    { arabName: "الشرقية", isoName: "SHR" },
    { arabName: "السويس", isoName: "SUZ" },
    { arabName: "الوادي الجديد", isoName: "WAD" },
    { arabName: "الأقصر", isoName: "LX" },
    { arabName: "القليوبية", isoName: "KB" },
    { arabName: "القاهرة", isoName: "C" },
    { arabName: "المنيا", isoName: "MN" },
    { arabName: "المنُوفيّة", isoName: "MNF" },
    { arabName: "الجيزة", isoName: "GZ" },
    { arabName: "الإسماعيلية", isoName: "IS" },
    { arabName: "الإسكندرية", isoName: "ALX" },
    { arabName: "الغربية", isoName: "GH" },
    { arabName: "الفيوم", isoName: "FYM" },
    { arabName: "البحيرة", isoName: "BH" },
    { arabName: "البحر الأحمر", isoName: "BA" },
    { arabName: "الدقهلية", isoName: "DK" }
];

let slider = document.querySelector(".carousel-inner");

function fillCities() {
    let perSlide = Math.ceil(cities.length / 3); // عدد العناصر في كل سلايد

    for (let i = 0; i < 3; i++) {
        // أنشئ عنصر الـcarousel-item
        let carouselItem = document.createElement("div");
        carouselItem.className = i === 0 ? "carousel-item active" : "carousel-item";

        // div جوة السلايد علشان يحوي المحافظات
        let slide = document.createElement("div");
        slide.style.display = "flex";
        slide.style.flexWrap = "wrap"; // يوزعهم كويس
        slide.style.justifyContent = "center";

        // احسب بداية ونهاية كل جروب
        let start = i * perSlide;
        let end = Math.min(start + perSlide, cities.length);

        for (let j = start; j < end; j++) {
            let span = document.createElement("span");
            span.textContent = cities[j].arabName; // أو isoName لو عايزة الكود
            span.style.color = "aliceblue";
            span.style.fontSize = "18px";
            span.style.fontFamily = "fantasy";
            span.style.margin = "10px 25px";

            slide.appendChild(span);
        }

        carouselItem.appendChild(slide);
        slider.appendChild(carouselItem);
    }
}

fillCities();


const url = `https://api.aladhan.com/v1/timingsByCity?country=EG`
function getTimings(cityName) {
    axios.get(`${url}&city=${cityName}`)
    .then((Response) => {
        console.log(Response);
        console.log(Response.data.data.date);
        
        document.querySelector(".milady").innerHTML = `
        <h2>${Response.data.data.date.gregorian.date} <= التاريخ الميلادي</h2>
        `
        document.querySelector(".higri").innerHTML = `
        <h2>${Response.data.data.date.hijri.date} <= التاريخ الهجري </h2>
        `
        let salawatTimes = Response.data.data.timings
        console.log(salawatTimes);
        let timings = document.querySelector(".salawatTimes")
        
        addAdanToDiv("Fajr", (salawatTimes.Fajr));
        addAdanToDiv("Sunrise", salawatTimes.Sunrise);
        addAdanToDiv("Dhuhr", salawatTimes.Dhuhr);
        addAdanToDiv("Asr", salawatTimes.Asr);
        addAdanToDiv("Maghrib", salawatTimes.Maghrib);
        addAdanToDiv("Isha", salawatTimes.Isha);
    
    })
}

getTimings("SHG")

function addAdanToDiv(id, adan) {
    document.querySelector(`#${id} #time`).innerHTML = adan
}

let citiesFromSlider = document.querySelectorAll("span")
function getTimingsOfCity() {
    citiesFromSlider.forEach((el) => {
        el.addEventListener("click", () => {
            cities.forEach((city) => {
                if(el.innerHTML == city.arabName) {
                    document.getElementById("h1").innerHTML = city.arabName
                    let nameofcity = city.isoName
                    getTimings(nameofcity)
                    
                }
            })
            
        })
    })
}

getTimingsOfCity()


