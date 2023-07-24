"use strict";

const amd = document.querySelector("#amd");
const usd = document.querySelector("#usd");

amd.addEventListener("input", () => {
    const request = new XMLHttpRequest();

    setTimeout(() => {
        if (typeof (amd.value) !== "number" && isNaN(amd.value)) {
            usd.value = "";
            amd.value = "";
        }
    }, 10);

    request.open("GET", "js/exchange.json");

    request.setRequestHeader("Content-type", "application/json; charset=utf-8");

    request.send();

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.response);
            usd.value = (parseFloat(amd.value) / parseFloat(data.current.usd)).toFixed(2);
        } else {
            usd.value = "Something went wrong!";
        }
    });
});

usd.addEventListener("input", () => {
    const request = new XMLHttpRequest();

    setTimeout(() => {
        if (typeof (usd.value) !== "number" && isNaN(usd.value)) {
            usd.value = "";
            amd.value = "";
        }
    }, 10);

    request.open("GET", "js/exchange.json");

    request.setRequestHeader("Content-type", "application/json; charset=utf-8");

    request.send();

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.response);
            amd.value = (parseFloat(usd.value) * parseFloat(data.current.usd)).toFixed(2);
        } else {
            amd.value = "Something went wrong!";
        }
    });
});

const resetFormBtn = document.querySelector("#resetFormBtn");

resetFormBtn.addEventListener("click", () => {
    document.querySelector("form").reset();
})