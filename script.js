const PHONE = "525522129163"; // Cambia aquí tu WhatsApp con lada. Ejemplo: 525522129163
const PRICE = 800;

const products = [
  {branch:"Dinamarca", player:"Curry", team:"Warriors", number:30, style:"Vintage", color:"Blanco", sizes:["L"]},
  {branch:"Dinamarca", player:"LeBron", team:"Lakers", number:23, style:"Especial", color:"Blanco", sizes:["L"]},
  {branch:"Dinamarca", player:"Wembanyama", team:"Spurs", number:1, style:"Actual", color:"Negro", sizes:["XL"]},
  {branch:"Dinamarca", player:"Edwards", team:"Wolves", number:5, style:"Vintage", color:"Negro", sizes:["L"]},
  {branch:"Dinamarca", player:"Jokic", team:"Nuggets", number:15, style:"Actual", color:"Azul", sizes:["XL"]},
  {branch:"Mexico", player:"Jordan", team:"Bulls", number:23, style:"Vintage", color:"Rojo", sizes:["M","L"]},
  {branch:"Mexico", player:"Rose", team:"Bulls", number:1, style:"Fan", color:"Negro", sizes:["M"]},
  {branch:"Mexico", player:"Kobe", team:"Lakers", number:24, style:"Fan", color:"Amarillo", sizes:["M","L"]},
  {branch:"Mexico", player:"Curry", team:"Warriors", number:30, style:"Fan", color:"Negro", sizes:["M"]},
  {branch:"Mexico", player:"Curry", team:"All Star", number:30, style:"Fan", color:"Gris", sizes:["M"]},
  {branch:"Mexico", player:"LeBron", team:"Lakers", number:23, style:"Fan", color:"Morado", sizes:["M","L"]},
  {branch:"Mexico", player:"Tatum", team:"Celtics", number:0, style:"Fan", color:"Verde", sizes:["M","L"]},
  {branch:"Mexico", player:"LaMelo", team:"Hornets", number:1, style:"Fan", color:"Azul", sizes:["M"]},
  {branch:"Mexico", player:"Wembanyama", team:"Spurs", number:1, style:"Fan", color:"Blanco", sizes:["M","L"]},
  {branch:"Mexico", player:"Doncic", team:"Lakers", number:77, style:"Fan", color:"Amarillo", sizes:["M"]}
];

const popular = ["Jordan Bulls 23", "Kobe Lakers 8", "Kobe Lakers 24", "LeBron Lakers 23", "Curry Warriors 30", "Wembanyama Spurs 1", "Doncic Lakers 77", "Iverson 76ers 3", "McGrady Raptors 1", "Rodman Bulls 91", "Jokic Nuggets 15", "Edwards Wolves 5", "Tatum Celtics 0", "Wade Heat 3"];

const $ = s => document.querySelector(s);
const productsEl = $("#products");
const search = $("#search");
const sizeFilter = $("#sizeFilter");
const branchFilter = $("#branchFilter");

function wa(text){ return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`; }
function buyText(p){ return `Hola Jersey Run MX, me interesa este jersey:\n\nJugador: ${p.player}\nEquipo: ${p.team}\nNúmero: ${p.number}\nColor: ${p.color}\nTallas: ${p.sizes.join(", ")}\nPrecio: $${PRICE} MXN\n\n¿Me confirmas disponibilidad y forma de pago?`; }
function card(p){
  return `<article class="card">
    <div class="jersey-art"><div class="player"><div>${p.player}</div><div class="num">${p.number}</div></div></div>
    <div class="card-body">
      <h3>${p.player} ${p.number}</h3>
      <p class="meta">${p.team} · ${p.color} · ${p.branch}</p>
      <div class="tags"><span class="tag">${p.style}</span>${p.sizes.map(s=>`<span class="tag">Talla ${s}</span>`).join("")}</div>
      <div class="price-row"><span class="price">$${PRICE}</span><a class="btn primary wa" href="${wa(buyText(p))}" target="_blank" rel="noopener">Lo quiero</a></div>
    </div>
  </article>`;
}
function render(){
  const q = search.value.toLowerCase().trim();
  const size = sizeFilter.value;
  const branch = branchFilter.value;
  const filtered = products.filter(p => {
    const blob = `${p.player} ${p.team} ${p.number} ${p.style} ${p.color} ${p.branch} ${p.sizes.join(" ")}`.toLowerCase();
    return (!q || blob.includes(q)) && (!size || p.sizes.includes(size)) && (!branch || p.branch === branch);
  });
  productsEl.innerHTML = filtered.map(card).join("") || `<p class="muted">No encontramos ese modelo en stock. Pídelo sobre pedido por WhatsApp.</p>`;
}
[search,sizeFilter,branchFilter].forEach(el => el.addEventListener("input", render));
$("#chips").innerHTML = popular.map(x=>`<span class="chip">${x}</span>`).join("");
$("#whatsappHero").href = wa("Hola Jersey Run MX, quiero ver el inventario disponible.");
$("#whatsappBottom").href = wa("Hola Jersey Run MX, quiero comprar un jersey.");
$("#customOrder").href = wa("Hola Jersey Run MX, quiero pedir un jersey sobre pedido. Busco:\n\nJugador:\nEquipo:\nTalla:");
render();
