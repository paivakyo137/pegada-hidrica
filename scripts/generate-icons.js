const fs = require("fs");
const path = require("path");

const dir = path.join("public", "images", "food");
fs.mkdirSync(dir, { recursive: true });

const items = {
  rice: ["#E8C170", "Ar"],
  coffee: ["#6F4E37", "Cf"],
  beef: ["#C0392B", "Cb"],
  pork: ["#E8A0A0", "Su"],
  chicken: ["#F4D03F", "Fr"],
  milk: ["#F7F9FC", "Le"],
  cheese: ["#F1C40F", "Qj"],
  tomato: ["#E74C3C", "To"],
  lettuce: ["#2ECC71", "Al"],
  carrot: ["#E67E22", "Ce"],
  potato: ["#D4A574", "Bt"],
  beans: ["#8E5A3C", "Fe"],
  bread: ["#D4A017", "Pa"],
  apple: ["#C0392B", "Ma"],
  banana: ["#F4D03F", "Bn"],
  orange: ["#E67E22", "Lj"],
  egg: ["#F5F0DC", "Ov"],
  chocolate: ["#5D3A1A", "Ch"],
  beer: ["#F0C14A", "Cv"],
  sugar: ["#ECF0F1", "Ac"],
};

for (const [name, [color, label]] of Object.entries(items)) {
  const dark = ["#F7F9FC", "#ECF0F1", "#F5F0DC", "#F4D03F"].includes(color);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="18" fill="${color}"/>
  <path d="M32 10c6 9 16 16 16 24a16 16 0 1 1-32 0c0-8 10-15 16-24z" fill="rgba(30,144,255,0.22)"/>
  <text x="32" y="40" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="${dark ? "#2C3E50" : "white"}">${label}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${name}.svg`), svg);
}

fs.writeFileSync(
  path.join("public", "images", "drop.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 3c4.5 7 11 12.2 11 18.2C27 26.4 22.1 31 16 31S5 26.4 5 21.2C5 15.2 11.5 10 16 3Z" fill="#1E90FF"/></svg>`,
);

console.log("icons ok");
