import express from 'express';

const app = express();

app.get('/', (reques, response) => {
  return response.json({ msg: 'Ok' });
});

app.listen(3002);
