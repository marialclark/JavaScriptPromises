// Part 1: Number Facts

let baseURL = "http://numbersapi.com";
let favNumber = 2;

// 1.
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data)
});

// 2.
let numbers = [2, 22, 222, 2222];
$.getJSON(`${baseURL}/${numbers}?json`)
.then(data => {
  const p = document.createElement("p");
  p.textContent = JSON.stringify(data);
  document.body.appendChild(p);
});

// 3.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(favNumberFacts => {
  favNumberFacts.forEach(data => $("body").append(`<p>${data.text}</p>`));
})



