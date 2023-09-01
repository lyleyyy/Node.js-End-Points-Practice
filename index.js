const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://lazebear.github.io",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*",
  })
);

const tasks = [
  {
    id: 1,
    description: "task 1",
    done: false,
  },

  {
    id: 2,
    description: "task 2",
    done: false,
  },

  {
    id: 3,
    description: "task 3",
    done: false,
  },

  {
    id: 4,
    description: "task 4",
    done: false,
  },
];

app.get("/tasks", (req, res) => {
  if (req.query.description) {
    const foundTasksByDes = tasks.filter((task) =>
      task.description.includes(req.query.description)
    );
    res.send(foundTasksByDes);
  } else {
    res.send(tasks);
  }
});

app.get("/tasks/:id", (req, res) => {
  const reqId = req.params.id;
  const foundIdx = tasks.findIndex((task) => {
    return task.id.toString() === reqId;
  });

  if (foundIdx === -1) {
    // res.status(404).send("The task Id can not be found.");
    res.send("The task Id can not be found.");
  } else {
    const foundTaskbyId = tasks[foundIdx];

    res.send(foundTaskbyId);
  }
});

app.put("/tasks/:id", (req, res) => {
  const reqId = req.params.id;
  const foundIdx = tasks.findIndex((task) => {
    return task.id.toString() === reqId;
  });

  if (foundIdx === -1) {
    res.send("The task Id can not be found, and update is not valid.");
  } else {
    // const updateDes = req.body.description;
    const updateDone = req.body.done;

    // [tasks[foundId].description, tasks[foundId].done] = [updateDes, updateDone];
    tasks[foundIdx].done = updateDone;
    res.send(tasks[foundIdx]);
  }
});

app.post("/tasks", (req, res) => {
  const newId = tasks[tasks.length - 1].id + 1;

  const newTask = {
    id: newId,
    description: req.body.description,
    done: false,
  };

  tasks.push(newTask);

  res.send(tasks[tasks.length - 1]);
});

app.delete("/tasks/:id", (req, res) => {
  const reqId = req.params.id;
  const foundIdx = tasks.findIndex((task) => {
    return task.id.toString() === reqId;
  });

  if (foundIdx === -1) {
    res.send("No task found and delete request is invalid.");
  } else {
    const deleteTask = tasks[foundIdx];
    tasks.splice(foundIdx, 1);
    res.status(200).send({
      msg: "Target task deleted successfully.",
      deletedTask: deleteTask,
    });
  }
});

app.listen("3000", () => {
  console.log("Server is listening on port 3000...");
});
