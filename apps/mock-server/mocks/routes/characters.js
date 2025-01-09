const CHARACTERS_SINGLE = require("../data/characters-single.json");
const CHARACTERS_SPOTLIGHT = require("../data/characters-spotlight.json");
const CHARACTERS_ALL_1 = require("../data/characters-all-1.json");
const CHARACTERS_ALL_2 = require("../data/characters-all-2.json");

module.exports = [
  {
    id: "get-characters",
    url: "/characters",
    method: "GET",
    variants: [
      {
        id: "all",
        type: "json",
        options: {
          status: 200,
          body: CHARACTERS_ALL_1,
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
              res.send(CHARACTERS_ALL_1);
            }
          },
        },
      },
    ],
  },
  {
    id: "get-character-by-id",
    url: "/characters/:id",
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
        id: "real",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const characterId = req.params.id;
            const character = CHARACTERS_ALL_1.find(
              (characterData) => characterData.id === Number(characterId)
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
    id: "search-characters",
    url: "/characters/query",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: CHARACTERS_ALL_2,
        },
      },
    ],
  },
];
