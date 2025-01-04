const CHARACTERS_SINGLE = require("./characters-single.json");
const CHARACTERS_SPOTLIGHT = require("./characters-spotlight.json");
const CHARACTERS_ALL = require("./characters-all.json");

module.exports = [
  {
    id: "get-characters",
    url: "/api/characters",
    method: "GET",
    variants: [
      {
        id: "all",
        type: "json",
        options: {
          status: 200,
          body: CHARACTERS_ALL,
        },
      },
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: CHARACTERS_SINGLE,
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 400,

          body: {
            message: "Error",
          },
        },
      },
      {
        id: "real",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const spotlight = req.param("spotlight");
            if (spotlight) {
              res.status(200);
              res.send(CHARACTERS_SPOTLIGHT);
            } else {
              res.status(200);
              res.send(CHARACTERS_ALL);
            }
          },
        },
      },
    ],
  },
  {
    id: "get-character-by-id",
    url: "/api/characters/:id",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: CHARACTERS_SINGLE[0],
        },
      },
      {
        id: "id-3",
        type: "json",
        options: {
          status: 200,
          body: CHARACTERS_ALL[2],
        },
      },
      {
        id: "real",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const characterId = req.params.id;
            const character = CHARACTERS_ALL.find(
              (characterData) => characterData.id === Number(characterId),
            );
            if (character) {
              res.status(200);
              res.send(character);
            } else {
              res.status(404);
              res.send({
                message: "User not found",
              });
            }
          },
        },
      },
    ],
  },
  {
    id: "get-spotlight-characters",
    url: "/api/spotlight-characters",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: CHARACTERS_SPOTLIGHT,
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 400,

          body: {
            message: "Error",
          },
        },
      },
    ],
  },
];
