const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  const repositoryExists = repositories.some(r=>r.id == id)
  if(!repositoryExists){
    return response.status(404).json({error:"Repositoty not found"})
  }
  repositoryIndex = repositories.findindex(
    repository => repository.id === id
  );
  
  if (repositoryIndex > 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  updatedRepository.push(id);
  updatedRepository.push(repositories[repositoryIndex].likes);

  

  repositories[repositoryIndex] = updatedRepository;

  return response.json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryExists = repositories.some(
    repository => repository.id == id
  );

  if (repositoryExists == false) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const indexRepository = repositories.findIndex(
    r=>r.id == id
  )

  repositories.splice(indexRepository, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex == -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.json({ likes: likes });
});

module.exports = app;
