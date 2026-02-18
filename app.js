const express = require('express');
const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);
const app = express();

//middleware
app.use(express.json());

// app.get('/', (req, res) => {
//   //res.status(200).send('Hello from the server side');
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Ratours' });
// });
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

// create new tour
app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  //res.send('Successful');
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    },
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
