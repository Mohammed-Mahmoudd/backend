const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mohammed:aEvGKeuICi320WNP@nodejsexpresscluster.4hpfnvt.mongodb.net/?retryWrites=true&w=majority&appName=NodejsExpressCluster"
  )
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((error) => {
    console.log("Error with connected to mongoose " + error);
  });

const Article = require("./models/Article");

const app = express();
app.use(express.json());

app.get("/numbers", (req, res) => {
  let numbers = 0;
  for (let i = 0; i <= 100; i++) {
    numbers += i + "_";
  }
  res.send(`The number now is: ${numbers}`);
});

app.get("/findsum/:number1/:number2", (req, res) => {
  console.log(req.params);
  const numberOne = req.params.number1;
  const numberTwo = req.params.number2;

  const total = parseInt(numberOne) + parseInt(numberTwo);
  res.send(`Total is: ${total}`);
});

app.get("/sayHello", (req, res) => {
  console.log(req.body);

  res.json({
    name: req.body.name,
    age: req.query.age,
  });
});
app.get("/file", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + "--";
  }

  res.render("index.ejs", {
    name: "mohammed",
    numbers: numbers,
  });
});

app.post("/post", (req, res) => {
  res.send("post is good");
});
app.put("/put", (req, res) => {
  res.send("put is good");
});
app.patch("/patch", (req, res) => {
  res.send("patch is good");
});

app.listen("3000", () => {
  console.log("port is opened successfully");
});

// === Articles End Points ===//

app.post("/newArticle", (req, res) => {
  console.log(req.body);
  const newArticle = new Article();
  newArticle.body = req.body.body;
  newArticle.title = req.body.title;
  newArticle.likesNumber = req.body.likesNumber;
  newArticle
    .save()
    .then(() => {
      res.send("good");
    })
    .catch((error) => {
      res.send(`error ${error}`);
    });
});

app.get("/getAllArticles", async (req, res) => {
  try {
    const Articles = await Article.find();

    res.json(Articles);
  } catch (error) {
    console.log("erro");
  }
});

app.get("/getSpecificArticle/:articleId", async (req, res) => {
  try {
    const id = req.params.articleId;
    const Articles = await Article.findById(id);

    res.json(Articles);
  } catch (error) {
    res.send("error");
  }
});

app.delete("/getSpecificArticle/:articleId", async (req, res) => {
  try {
    const id = req.params.articleId;
    const Articles = await Article.findByIdAndDelete(id);

    res.json(Articles);
  } catch (error) {
    res.send("error");
  }
});

app.get("/displayArticlesInHTML", async (req, res) => {
  try {
    const allArticles = await Article.find();
    res.render("index.ejs", {
      allArticles: allArticles,
    });
  } catch (error) {
    res.send("error", error);
  }
});
