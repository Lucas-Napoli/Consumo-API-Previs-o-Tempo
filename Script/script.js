// variaveis dos elementos
const apiKey = "13c0896a2e3a4650b9d0929e6f974c88";
const apiCountryURL = "https://countryflagsapi.com/png/";

const InputCidade = document.querySelector("#city-input");
const PesquisarBtn = document.querySelector("#search");


const ElementoCidade = document.querySelector("#city");
const ElementoTemperatura = document.querySelector("#temperatura span");
const ElementoDescricao = document.querySelector("#descricao");
const ElementoIcone = document.querySelector("#weather-icon");
const ElementoBandeira = document.querySelector("#country");
const ElementoUmidade = document.querySelector("#umidade span");
const ElementoVento = document.querySelector("#vento span");
const ElementoTexto = document.querySelector("#Text-Error");
const ContainerTempo = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");



// Funções 

const getWeatherdata = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)
    const data = await res.json();

    return data;
}

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    ContainerTempo.classList.add("hide");
};

const mostrarTempo = async (city) => {
    hideInformation();

    const data = await getWeatherdata(city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
    }

    ElementoCidade.innerText = data.name;
    ElementoTemperatura.innerText = parseInt(data.main.temp);
    ElementoDescricao.innerText = data.weather[0].description;
    ElementoIcone.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    ElementoBandeira.setAttribute("src", apiCountryURL + data.sys.country);
    ElementoUmidade.innerText = `${data.main.humidity}%`;
    ElementoVento.innerText = `${data.wind.speed}km/h`
    ContainerTempo.classList.remove("hide");
}


// Eventos
PesquisarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = InputCidade.value;

    mostrarTempo(city);
});

InputCidade.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        mostrarTempo(city);
    }
})
