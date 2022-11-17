import express from "express";
import minimist from "minimist"
import { roll } from "./lib/roll.js"

const app = express();
app.use(express.urlencoded({extended: true}))
const args = minimist(process.argv.slice(2));

let port = 5000;

if ("port" in args) {
	port = args.port;
}

app.get('/app/', (req, res) => {
	res.send('200 OK');
});

app.get('/app/roll/', (req, res) => {
	res.send(roll(6,2,1));
});

app.post('/app/roll/', (req,res) => {
	let sides = parseInt(req.body.sides);
	let dice = parseInt(req.body.dice);
	let rolls = parseInt(req.body.rolls);
	res.send(roll(sides,dice,rolls));
});

app.get('/app/roll/:sides/', (req, res) => {
	let sides = parseInt(req.params.sides);
   	res.send(roll(sides,2,1));
});

app.get('/app/roll/:sides/:dice/', (req, res) => {
	let sides = parseInt(req.params.sides);
	let dice = parseInt(req.params.dice);
	res.send(roll(sides,dice,1));
});

app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
	let sides = parseInt(req.params.sides);
	let dice = parseInt(req.params.dice);
	let rolls = parseInt(req.params.rolls);
	res.send(roll(sides,dice,rolls));
});

app.use(function(req, res) {
    res.send("404 NOT FOUND");
});


app.listen(port);
