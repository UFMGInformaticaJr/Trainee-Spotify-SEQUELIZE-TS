import { app } from './config/express-config.js';

app.listen(3030, () => {
  console.log("API listening on port 3030");
});