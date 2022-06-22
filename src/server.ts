import app from "./app";
import { DBSource } from "./db/data-source";

const { SERVER_PORT: port } = process.env || 5000;

app.listen(port, () => {
  DBSource.initialize()
    .then(() => console.log(`Server Running on Port ${port}`))
    .catch((err) => console.log(`Failed to connect to database. Error ${err.message}`));
});
