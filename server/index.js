import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";


const app = express();

dotenv.config();

app.use( cors ({
    credentials : true, 
    origin: 'http://localhost:3000, https://project-05-app.vercel.app/'

}))

app.use(cors(
    {
        origin: ["http://localhost:3000","https://project-05-app.vercel.app"],
        methods: ["POST", "GET", "PATCH", "DELETE" ], // Perubahan disini ke 'methods'
        credentials: true,
    }));

app.use(cookieParser());
app.use(express.json());
app.use(router);


app.use("/", (req, res) => {
    res.send("Server is running");
});
app.listen(process.env.PORT, ()=> console.log(' Server berjalan pada port '+ process.env.PORT) )