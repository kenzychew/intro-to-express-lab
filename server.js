const express = require('express')
const app = express()
const port = 3000
//* Landing Page
app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>')
})

//* 1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
  const { username } = req.params;
  res.send(`Hello there, ${username}!`);
});

//* 2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
  const { number } = req.params;

  if (isNaN(number)) {
    res.send('You must specify a number.');
    return;
  }

  const result = Math.floor(Math.random() * (parseInt(number) + 1));
  res.send(`You rolled a ${result}`);
});

//* 3. I Want THAT One!
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

app.get('/collectibles/:id', (req, res) => {
  const { id } = req.params;

  if (id >= collectibles.length || id < 0) {
    res.send('This item is not yet in stock. Check back soon!')
    return
  }

  const item = collectibles[id]
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
})

//* 4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = [...shoes];

    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

    if (minPrice) filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    if (maxPrice) filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    if (type) filteredShoes = filteredShoes.filter(shoe => shoe.type === type);

    res.send(filteredShoes);
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})