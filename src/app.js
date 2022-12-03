import express from "express";
import morgan from "morgan";
import routerApi from "./routes/index";

const app = express();

app.use(express.json());

/* app.get('/', (req, res) => {
    res.json({
        brand: 'Nike'
    });
}); */

routerApi(app);

// Settings
app.set('port', 5005);

// Middlewares
app.use(morgan("dev"));

export default app;