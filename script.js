const input = document.getElementById("input");
input.addEventListener("keypress", onKeyPress);

function onKeyPress(e) {
  const input = document.getElementById("input");
  if (e.keyCode === 13 && input.value !== "") {
    e.preventDefault();
    fetchData();
  }
}

async function fetchData() {
  const inputValue = document.getElementById("input").value;

  if (inputValue !== "") {
    try {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`
      );
      const json = await data.json();
      const text = document.getElementById("name");
      text.innerText = json.name;
      text.classList.toggle("error", false);
      text.classList.toggle("info-name", true);

      const info = document.getElementById("card_info");
      const newImg = document.createElement("img");
      const img = info.firstElementChild;
      newImg.src = json.sprites.other.dream_world.front_default;

      info.replaceChild(newImg, img);

      document.getElementById("input").value = "";
    } catch (err) {
      const text = document.getElementById("name");
      text.classList.remove("info-name");
      text.classList.add("error");
      text.innerText = "Lo siento, ese pokemon no existe.";

      const info = document.getElementById("card_info");
      const div = document.createElement("div");
      div.classList.add("error-img");
      const img = info.firstElementChild;

      info.replaceChild(div, img);
      document.getElementById("input").value = "";
    }
  }
}
