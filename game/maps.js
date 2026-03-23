// ═══════════════════════════════════════════════════════════════
// NEBULA CONQUEST — MAP LIBRARY (serveur)
// Toutes les cartes extraites du client HTML
// ═══════════════════════════════════════════════════════════════

const MAP_LIBRARY = [
  {
  "name": "Berceau Solaire",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Omiimir", "radius": 154, "orbitRadius": 1010, "orbitSpeed": 0.0186, "angle": 3.622, "color": "#FFE44D",
      "planets": [
        { "name": "Vorenxis", "radius": 115, "orbitRadius": 450, "orbitSpeed": 0.0451, "angle": 6.049, "flore": 60, "faune": 31,
          "moons": [
            { "name": "Omiarria", "radius": 28, "orbitRadius": 198, "orbitSpeed": 0.3028, "angle": 54.086, "flore": 31, "faune": 59 },
            { "name": "Lyrondis", "radius": 26, "orbitRadius": 198, "orbitSpeed": 0.3028, "angle": 51.863, "flore": 17, "faune": 60 },
            { "name": "Velalzar", "radius": 35, "orbitRadius": 247, "orbitSpeed": 0.2917, "angle": 48.066, "flore": 13, "faune": 57 }
          ]
        },
        { "name": "Ithosmus", "radius": 71, "orbitRadius": 450, "orbitSpeed": 0.0451, "angle": 10.169, "flore": 42, "faune": 79,
          "moons": [
            { "name": "Nebisdis", "radius": 26, "orbitRadius": 181, "orbitSpeed": 0.3159, "angle": 44.733, "flore": 14, "faune": 26 },
            { "name": "Eriunis", "radius": 41, "orbitRadius": 181, "orbitSpeed": 0.3159, "angle": 46.609, "flore": 35, "faune": 34 }
          ]
        },
        { "name": "Synaxra", "radius": 84, "orbitRadius": 268, "orbitSpeed": 0.0616, "angle": 4.193, "flore": 11, "faune": 74, "moons": [] }
      ]
    },
    {
      "name": "Thalarmir", "radius": 208, "orbitRadius": 1010, "orbitSpeed": 0.0186, "angle": 1.384, "color": "#7CB9FF",
      "planets": [
        { "name": "Auredis", "radius": 108, "orbitRadius": 478, "orbitSpeed": 0.0432, "angle": 6.688, "flore": 13, "faune": 24,
          "moons": [
            { "name": "Sigaxria", "radius": 48, "orbitRadius": 184, "orbitSpeed": 0.3418, "angle": 27.737, "flore": 8, "faune": 48 },
            { "name": "Thaliria", "radius": 35, "orbitRadius": 184, "orbitSpeed": 0.3418, "angle": 25.809, "flore": 41, "faune": 47 },
            { "name": "Erionton", "radius": 25, "orbitRadius": 232, "orbitSpeed": 0.2729, "angle": 18.924, "flore": 14, "faune": 31 }
          ]
        },
        { "name": "Draumus", "radius": 125, "orbitRadius": 478, "orbitSpeed": 0.0432, "angle": 3.132, "flore": 89, "faune": 20, "moons": [] }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "Nébuleuse Pourpre",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Nebatis", "radius": 188, "orbitRadius": 1232, "orbitSpeed": 0.0154, "angle": 2.353, "color": "#FF6B6B",
      "planets": [
        { "name": "Celavyn", "radius": 95, "orbitRadius": 509, "orbitSpeed": 0.0644, "angle": 13.517, "flore": 82, "faune": 79,
          "moons": [
            { "name": "Thalumvyn", "radius": 30, "orbitRadius": 194, "orbitSpeed": 0.3461, "angle": 57.744, "flore": 20, "faune": 45 },
            { "name": "Eriitis", "radius": 20, "orbitRadius": 194, "orbitSpeed": 0.3461, "angle": 60.616, "flore": 11, "faune": 2 },
            { "name": "Draumir", "radius": 42, "orbitRadius": 280, "orbitSpeed": 0.2143, "angle": 34.799, "flore": 47, "faune": 6 }
          ]
        },
        { "name": "Pyxith", "radius": 75, "orbitRadius": 817, "orbitSpeed": 0.0441, "angle": 5.877, "flore": 32, "faune": 97,
          "moons": [
            { "name": "Celirlux", "radius": 30, "orbitRadius": 135, "orbitSpeed": 0.2486, "angle": 47.871, "flore": 18, "faune": 37 },
            { "name": "Xorospha", "radius": 24, "orbitRadius": 232, "orbitSpeed": 0.2569, "angle": 48.418, "flore": 23, "faune": 51 },
            { "name": "Velanria", "radius": 30, "orbitRadius": 135, "orbitSpeed": 0.2486, "angle": 45.36, "flore": 20, "faune": 6 },
            { "name": "Palaxria", "radius": 23, "orbitRadius": 232, "orbitSpeed": 0.2569, "angle": 46.037, "flore": 44, "faune": 34 }
          ]
        },
        { "name": "Sigadon", "radius": 96, "orbitRadius": 817, "orbitSpeed": 0.0441, "angle": 2.525, "flore": 95, "faune": 25,
          "moons": [
            { "name": "Ithalux", "radius": 39, "orbitRadius": 171, "orbitSpeed": 0.3034, "angle": 28.292, "flore": 43, "faune": 46 }
          ]
        }
      ]
    },
    {
      "name": "Velelvyn", "radius": 212, "orbitRadius": 1232, "orbitSpeed": 0.0154, "angle": -1.331, "color": "#FFB830",
      "planets": [
        { "name": "Vorirnis", "radius": 111, "orbitRadius": 606, "orbitSpeed": 0.0481, "angle": 3.695, "flore": 93, "faune": 28,
          "moons": [
            { "name": "Vorirbus", "radius": 20, "orbitRadius": 166, "orbitSpeed": 0.2122, "angle": 13.618, "flore": 45, "faune": 59 },
            { "name": "Corenmir", "radius": 23, "orbitRadius": 257, "orbitSpeed": 0.2615, "angle": 14.888, "flore": 5, "faune": 7 },
            { "name": "Velumvyn", "radius": 36, "orbitRadius": 257, "orbitSpeed": 0.2615, "angle": 19.723, "flore": 36, "faune": 10 },
            { "name": "Draumus", "radius": 53, "orbitRadius": 257, "orbitSpeed": 0.2615, "angle": 17.518, "flore": 40, "faune": 21 },
            { "name": "Palalvyn", "radius": 36, "orbitRadius": 166, "orbitSpeed": 0.2122, "angle": 10.991, "flore": 49, "faune": 40 }
          ]
        },
        { "name": "Nebosra", "radius": 122, "orbitRadius": 606, "orbitSpeed": 0.0481, "angle": 0.765, "flore": 77, "faune": 66,
          "moons": [
            { "name": "Coraxth", "radius": 57, "orbitRadius": 239, "orbitSpeed": 0.2785, "angle": 13.813, "flore": 36, "faune": 23 },
            { "name": "Auredis", "radius": 50, "orbitRadius": 239, "orbitSpeed": 0.2785, "angle": 9.667, "flore": 16, "faune": 52 },
            { "name": "Synirtis", "radius": 23, "orbitRadius": 344, "orbitSpeed": 0.2913, "angle": 13.367, "flore": 32, "faune": 57 },
            { "name": "Lyrosth", "radius": 59, "orbitRadius": 344, "orbitSpeed": 0.2913, "angle": 11.266, "flore": 27, "faune": 47 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "Les Cinq Flammes",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Coriszar", "radius": 166, "orbitRadius": 1513, "orbitSpeed": 0.0151, "angle": 0.959, "color": "#FFB830",
      "planets": [
        { "name": "Velenxis", "radius": 114, "orbitRadius": 413, "orbitSpeed": 0.0453, "angle": 1.638, "flore": 94, "faune": 82,
          "moons": [
            { "name": "Paliton", "radius": 48, "orbitRadius": 196, "orbitSpeed": 0.1595, "angle": 4.007, "flore": 42, "faune": 16 },
            { "name": "Zanadon", "radius": 60, "orbitRadius": 196, "orbitSpeed": 0.1595, "angle": 6.275, "flore": 5, "faune": 51 }
          ]
        },
        { "name": "Auristis", "radius": 117, "orbitRadius": 920, "orbitSpeed": 0.0324, "angle": -1.063, "flore": 28, "faune": 42,
          "moons": [
            { "name": "Itheldon", "radius": 22, "orbitRadius": 194, "orbitSpeed": 0.3312, "angle": 13.179, "flore": 45, "faune": 56 },
            { "name": "Voridon", "radius": 26, "orbitRadius": 194, "orbitSpeed": 0.3312, "angle": 10.7, "flore": 34, "faune": 54 }
          ]
        },
        { "name": "Thalarlux", "radius": 124, "orbitRadius": 920, "orbitSpeed": 0.0324, "angle": 0.65, "flore": 51, "faune": 64,
          "moons": [
            { "name": "Lyrumir", "radius": 33, "orbitRadius": 252, "orbitSpeed": 0.1527, "angle": 2.608, "flore": 44, "faune": 49 }
          ]
        },
        { "name": "Lyrelton", "radius": 110, "orbitRadius": 920, "orbitSpeed": 0.0324, "angle": 2.623, "flore": 1, "faune": 3,
          "moons": [
            { "name": "Thalendis", "radius": 23, "orbitRadius": 270, "orbitSpeed": 0.271, "angle": 4.708, "flore": 50, "faune": 42 },
            { "name": "Vorismus", "radius": 31, "orbitRadius": 270, "orbitSpeed": 0.271, "angle": 10.454, "flore": 5, "faune": 22 },
            { "name": "Corenmir", "radius": 27, "orbitRadius": 218, "orbitSpeed": 0.216, "angle": 6.329, "flore": 34, "faune": 19 }
          ]
        }
      ]
    },
    {
      "name": "Ithexis", "radius": 243, "orbitRadius": 1513, "orbitSpeed": 0.0151, "angle": 3.213, "color": "#FF6B6B",
      "planets": [
        { "name": "Zanosnis", "radius": 72, "orbitRadius": 495, "orbitSpeed": 0.0494, "angle": 1.722, "flore": 88, "faune": 75,
          "moons": [
            { "name": "Auranra", "radius": 34, "orbitRadius": 149, "orbitSpeed": 0.1583, "angle": 2.169, "flore": 6, "faune": 59 },
            { "name": "Siganton", "radius": 26, "orbitRadius": 149, "orbitSpeed": 0.1583, "angle": 0.388, "flore": 38, "faune": 58 },
            { "name": "Kryaxpha", "radius": 39, "orbitRadius": 206, "orbitSpeed": 0.183, "angle": 4.578, "flore": 38, "faune": 42 }
          ]
        },
        { "name": "Celenria", "radius": 109, "orbitRadius": 930, "orbitSpeed": 0.0309, "angle": -0.336, "flore": 99, "faune": 66,
          "moons": [
            { "name": "Nebelria", "radius": 31, "orbitRadius": 179, "orbitSpeed": 0.2834, "angle": 6.308, "flore": 31, "faune": 19 },
            { "name": "Thalaxvyn", "radius": 51, "orbitRadius": 179, "orbitSpeed": 0.2834, "angle": 1.83, "flore": 42, "faune": 60 }
          ]
        },
        { "name": "Lyrenxis", "radius": 127, "orbitRadius": 495, "orbitSpeed": 0.0494, "angle": -1.607, "flore": 44, "faune": 93, "moons": [] },
        { "name": "Celumton", "radius": 115, "orbitRadius": 930, "orbitSpeed": 0.0309, "angle": 2.969, "flore": 37, "faune": 33,
          "moons": [
            { "name": "Kryanis", "radius": 27, "orbitRadius": 237, "orbitSpeed": 0.3072, "angle": 3.178, "flore": 5, "faune": 24 },
            { "name": "Erielvyn", "radius": 26, "orbitRadius": 279, "orbitSpeed": 0.1855, "angle": 3.263, "flore": 44, "faune": 41 },
            { "name": "Velivyn", "radius": 36, "orbitRadius": 237, "orbitSpeed": 0.3072, "angle": 6.637, "flore": 20, "faune": 13 },
            { "name": "Voraxnis", "radius": 57, "orbitRadius": 237, "orbitSpeed": 0.3072, "angle": 1.624, "flore": 18, "faune": 21 },
            { "name": "Velipha", "radius": 22, "orbitRadius": 237, "orbitSpeed": 0.3072, "angle": 2.523, "flore": 2, "faune": 13 }
          ]
        }
      ]
    },
    {
      "name": "Corumlux", "radius": 221, "orbitRadius": 1513, "orbitSpeed": 0.0151, "angle": -1.37, "color": "#FF8C42",
      "planets": [
        { "name": "Nebumth", "radius": 123, "orbitRadius": 493, "orbitSpeed": 0.065, "angle": 5.733, "flore": 16, "faune": 81, "moons": [] },
        { "name": "Lyralpha", "radius": 95, "orbitRadius": 806, "orbitSpeed": 0.0491, "angle": 2.966, "flore": 65, "faune": 8,
          "moons": [
            { "name": "Kryubus", "radius": 49, "orbitRadius": 176, "orbitSpeed": 0.1657, "angle": 14.12, "flore": 45, "faune": 29 },
            { "name": "Synirdis", "radius": 23, "orbitRadius": 176, "orbitSpeed": 0.1657, "angle": 16.421, "flore": 30, "faune": 16 },
            { "name": "Palelmus", "radius": 37, "orbitRadius": 176, "orbitSpeed": 0.1657, "angle": 16.462, "flore": 16, "faune": 32 },
            { "name": "Sigarth", "radius": 44, "orbitRadius": 371, "orbitSpeed": 0.322, "angle": 21.655, "flore": 41, "faune": 52 },
            { "name": "Vorirzar", "radius": 40, "orbitRadius": 371, "orbitSpeed": 0.322, "angle": 19.235, "flore": 31, "faune": 21 }
          ]
        },
        { "name": "Celaxdon", "radius": 83, "orbitRadius": 806, "orbitSpeed": 0.0491, "angle": 7.288, "flore": 77, "faune": 100,
          "moons": [
            { "name": "Synevyn", "radius": 47, "orbitRadius": 271, "orbitSpeed": 0.1785, "angle": 14.206, "flore": 20, "faune": 31 },
            { "name": "Erialux", "radius": 51, "orbitRadius": 426, "orbitSpeed": 0.298, "angle": 26.721, "flore": 32, "faune": 14 },
            { "name": "Aurirvyn", "radius": 56, "orbitRadius": 426, "orbitSpeed": 0.298, "angle": 22.301, "flore": 23, "faune": 18 },
            { "name": "Omialdis", "radius": 33, "orbitRadius": 271, "orbitSpeed": 0.1785, "angle": 16.351, "flore": 28, "faune": 15 }
          ]
        }
      ]
    },
    {
      "name": "Zanosria", "radius": 209, "orbitRadius": 3080, "orbitSpeed": 0.0118, "angle": -0.136, "color": "#FFB830",
      "planets": [
        { "name": "Pyxirlux", "radius": 111, "orbitRadius": 550, "orbitSpeed": 0.0475, "angle": 2.856, "flore": 22, "faune": 53,
          "moons": [
            { "name": "Ithonnis", "radius": 26, "orbitRadius": 244, "orbitSpeed": 0.3019, "angle": 3.652, "flore": 26, "faune": 37 },
            { "name": "Palath", "radius": 44, "orbitRadius": 244, "orbitSpeed": 0.3019, "angle": 5.757, "flore": 23, "faune": 13 }
          ]
        },
        { "name": "Ithaxdon", "radius": 80, "orbitRadius": 550, "orbitSpeed": 0.0475, "angle": -0.628, "flore": 23, "faune": 80,
          "moons": [
            { "name": "Zanamir", "radius": 43, "orbitRadius": 162, "orbitSpeed": 0.3118, "angle": 2.684, "flore": 11, "faune": 35 },
            { "name": "Zetovyn", "radius": 23, "orbitRadius": 162, "orbitSpeed": 0.3118, "angle": 0.449, "flore": 13, "faune": 45 }
          ]
        }
      ]
    },
    {
      "name": "Synaxra", "radius": 242, "orbitRadius": 3080, "orbitSpeed": 0.0118, "angle": -2.405, "color": "#7CB9FF",
      "planets": [
        { "name": "Pyxelra", "radius": 77, "orbitRadius": 529, "orbitSpeed": 0.0458, "angle": 2.666, "flore": 40, "faune": 19,
          "moons": [
            { "name": "Nebuton", "radius": 27, "orbitRadius": 192, "orbitSpeed": 0.2246, "angle": -1.265, "flore": 49, "faune": 43 },
            { "name": "Lyriria", "radius": 48, "orbitRadius": 192, "orbitSpeed": 0.2246, "angle": 3.303, "flore": 40, "faune": 29 },
            { "name": "Nebismus", "radius": 27, "orbitRadius": 261, "orbitSpeed": 0.2635, "angle": 2.385, "flore": 22, "faune": 12 },
            { "name": "Pyxosra", "radius": 28, "orbitRadius": 261, "orbitSpeed": 0.2635, "angle": 1.147, "flore": 49, "faune": 22 },
            { "name": "Draapha", "radius": 48, "orbitRadius": 261, "orbitSpeed": 0.2635, "angle": -1.824, "flore": 11, "faune": 22 }
          ]
        },
        { "name": "Corapha", "radius": 105, "orbitRadius": 529, "orbitSpeed": 0.0458, "angle": 0.006, "flore": 47, "faune": 47,
          "moons": [
            { "name": "Pyxoslux", "radius": 35, "orbitRadius": 160, "orbitSpeed": 0.2045, "angle": -1.015, "flore": 16, "faune": 35 },
            { "name": "Zanora", "radius": 47, "orbitRadius": 160, "orbitSpeed": 0.2045, "angle": 0.604, "flore": 10, "faune": 19 }
          ]
        },
        { "name": "Nebisxis", "radius": 99, "orbitRadius": 743, "orbitSpeed": 0.0331, "angle": 1.245, "flore": 19, "faune": 49,
          "moons": [
            { "name": "Thalirth", "radius": 40, "orbitRadius": 160, "orbitSpeed": 0.3096, "angle": 0.097, "flore": 28, "faune": 25 },
            { "name": "Palalvyn", "radius": 30, "orbitRadius": 266, "orbitSpeed": 0.2675, "angle": 0.33, "flore": 15, "faune": 27 },
            { "name": "Synospha", "radius": 21, "orbitRadius": 266, "orbitSpeed": 0.2675, "angle": 3.132, "flore": 25, "faune": 18 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "Éclipse Jumelle",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Draosmus", "radius": 185, "orbitRadius": 1687, "orbitSpeed": 0.016, "angle": 1.281, "color": "#FFB830",
      "planets": [
        { "name": "Draonmir", "radius": 117, "orbitRadius": 625, "orbitSpeed": 0.0489, "angle": 7.088, "flore": 64, "faune": 59,
          "moons": [
            { "name": "Voronbus", "radius": 31, "orbitRadius": 184, "orbitSpeed": 0.1696, "angle": 19.048, "flore": 36, "faune": 46 },
            { "name": "Eriath", "radius": 38, "orbitRadius": 311, "orbitSpeed": 0.1759, "angle": 21.705, "flore": 3, "faune": 1 },
            { "name": "Zetaxlux", "radius": 48, "orbitRadius": 311, "orbitSpeed": 0.1759, "angle": 23.49, "flore": 43, "faune": 56 }
          ]
        },
        { "name": "Omiirria", "radius": 74, "orbitRadius": 1002, "orbitSpeed": 0.038, "angle": 8.234, "flore": 68, "faune": 35,
          "moons": [
            { "name": "Pyxaltis", "radius": 39, "orbitRadius": 210, "orbitSpeed": 0.1712, "angle": 20.036, "flore": 50, "faune": 36 },
            { "name": "Synedon", "radius": 52, "orbitRadius": 210, "orbitSpeed": 0.1712, "angle": 22.513, "flore": 40, "faune": 19 }
          ]
        },
        { "name": "Kryonxis", "radius": 123, "orbitRadius": 1002, "orbitSpeed": 0.038, "angle": 4.194, "flore": 76, "faune": 9,
          "moons": [
            { "name": "Erianvyn", "radius": 49, "orbitRadius": 218, "orbitSpeed": 0.3216, "angle": 46.587, "flore": 7, "faune": 55 },
            { "name": "Nebanria", "radius": 32, "orbitRadius": 331, "orbitSpeed": 0.1937, "angle": 17.911, "flore": 25, "faune": 59 }
          ]
        }
      ]
    },
    {
      "name": "Xorilux", "radius": 241, "orbitRadius": 1687, "orbitSpeed": 0.016, "angle": -1.493, "color": "#FF8C42",
      "planets": [
        { "name": "Synonth", "radius": 112, "orbitRadius": 978, "orbitSpeed": 0.0364, "angle": 2.267, "flore": 62, "faune": 66,
          "moons": [
            { "name": "Veluxis", "radius": 21, "orbitRadius": 191, "orbitSpeed": 0.2171, "angle": 20.388, "flore": 16, "faune": 42 },
            { "name": "Xorendon", "radius": 26, "orbitRadius": 405, "orbitSpeed": 0.2605, "angle": 21.248, "flore": 8, "faune": 56 },
            { "name": "Corixis", "radius": 57, "orbitRadius": 405, "orbitSpeed": 0.2605, "angle": 22.763, "flore": 12, "faune": 50 },
            { "name": "Palumxis", "radius": 24, "orbitRadius": 405, "orbitSpeed": 0.2605, "angle": 19.193, "flore": 46, "faune": 33 }
          ]
        }
      ]
    },
    {
      "name": "Palazar", "radius": 218, "orbitRadius": 2797, "orbitSpeed": 0.01, "angle": 3.014, "color": "#FFE44D",
      "planets": [
        { "name": "Kryaxria", "radius": 86, "orbitRadius": 473, "orbitSpeed": 0.0676, "angle": 2.985, "flore": 67, "faune": 19,
          "moons": [
            { "name": "Aurenxis", "radius": 45, "orbitRadius": 192, "orbitSpeed": 0.1675, "angle": 6.178, "flore": 11, "faune": 54 },
            { "name": "Corenria", "radius": 34, "orbitRadius": 243, "orbitSpeed": 0.2531, "angle": 10.621, "flore": 41, "faune": 10 },
            { "name": "Kryardis", "radius": 36, "orbitRadius": 192, "orbitSpeed": 0.1675, "angle": 3.636, "flore": 30, "faune": 55 }
          ]
        },
        { "name": "Draanpha", "radius": 91, "orbitRadius": 801, "orbitSpeed": 0.0356, "angle": 0.29, "flore": 86, "faune": 72,
          "moons": [
            { "name": "Ithumvyn", "radius": 54, "orbitRadius": 176, "orbitSpeed": 0.2399, "angle": 7.553, "flore": 46, "faune": 55 },
            { "name": "Xorenra", "radius": 32, "orbitRadius": 176, "orbitSpeed": 0.2399, "angle": 5.581, "flore": 48, "faune": 47 }
          ]
        },
        { "name": "Sigomus", "radius": 112, "orbitRadius": 801, "orbitSpeed": 0.0356, "angle": 4.304, "flore": 5, "faune": 37,
          "moons": [
            { "name": "Celarria", "radius": 56, "orbitRadius": 213, "orbitSpeed": 0.1754, "angle": 4.289, "flore": 9, "faune": 26 },
            { "name": "Eriudis", "radius": 54, "orbitRadius": 213, "orbitSpeed": 0.1754, "angle": 6.821, "flore": 11, "faune": 20 },
            { "name": "Xorenton", "radius": 59, "orbitRadius": 379, "orbitSpeed": 0.1939, "angle": 2.932, "flore": 40, "faune": 54 },
            { "name": "Omiidis", "radius": 32, "orbitRadius": 379, "orbitSpeed": 0.1939, "angle": 6.383, "flore": 32, "faune": 17 }
          ]
        }
      ]
    },
    {
      "name": "Pyxudon", "radius": 244, "orbitRadius": 2797, "orbitSpeed": 0.01, "angle": -0.392, "color": "#FF6B6B",
      "planets": [
        { "name": "Sigozar", "radius": 94, "orbitRadius": 542, "orbitSpeed": 0.0519, "angle": 0.458, "flore": 53, "faune": 29,
          "moons": [
            { "name": "Vorirmus", "radius": 46, "orbitRadius": 222, "orbitSpeed": 0.3025, "angle": 1.216, "flore": 33, "faune": 60 },
            { "name": "Aurandis", "radius": 44, "orbitRadius": 222, "orbitSpeed": 0.3025, "angle": 5.132, "flore": 44, "faune": 10 },
            { "name": "Thalepha", "radius": 35, "orbitRadius": 149, "orbitSpeed": 0.1575, "angle": 1.677, "flore": 37, "faune": 12 }
          ]
        },
        { "name": "Zetalra", "radius": 99, "orbitRadius": 734, "orbitSpeed": 0.0553, "angle": -1.113, "flore": 11, "faune": 75,
          "moons": [
            { "name": "Syniria", "radius": 40, "orbitRadius": 159, "orbitSpeed": 0.3499, "angle": 6.648, "flore": 26, "faune": 37 },
            { "name": "Corirxis", "radius": 30, "orbitRadius": 159, "orbitSpeed": 0.3499, "angle": 3.067, "flore": 34, "faune": 42 },
            { "name": "Zanazar", "radius": 60, "orbitRadius": 354, "orbitSpeed": 0.2866, "angle": 3.025, "flore": 40, "faune": 47 }
          ]
        },
        { "name": "Celipha", "radius": 71, "orbitRadius": 542, "orbitSpeed": 0.0519, "angle": 3.612, "flore": 32, "faune": 96,
          "moons": [
            { "name": "Zetalmir", "radius": 34, "orbitRadius": 129, "orbitSpeed": 0.1568, "angle": 1.444, "flore": 4, "faune": 7 },
            { "name": "Palenton", "radius": 23, "orbitRadius": 129, "orbitSpeed": 0.1568, "angle": -0.731, "flore": 37, "faune": 16 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "Amas Titanesque",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Corellux", "radius": 168, "orbitRadius": 936, "orbitSpeed": 0.0172, "angle": 1.398, "color": "#FFB830",
      "planets": [
        { "name": "Ithalria", "radius": 96, "orbitRadius": 487, "orbitSpeed": 0.0556, "angle": 4.343, "flore": 45, "faune": 16,
          "moons": [
            { "name": "Aurumpha", "radius": 22, "orbitRadius": 169, "orbitSpeed": 0.1503, "angle": 8.77, "flore": 42, "faune": 18 },
            { "name": "Erialria", "radius": 33, "orbitRadius": 169, "orbitSpeed": 0.1503, "angle": 11.17, "flore": 50, "faune": 26 },
            { "name": "Zanumtis", "radius": 20, "orbitRadius": 169, "orbitSpeed": 0.1503, "angle": 9.762, "flore": 50, "faune": 24 }
          ]
        },
        { "name": "Zanumra", "radius": 81, "orbitRadius": 487, "orbitSpeed": 0.0556, "angle": 2.269, "flore": 40, "faune": 49,
          "moons": [
            { "name": "Kryexis", "radius": 42, "orbitRadius": 180, "orbitSpeed": 0.3424, "angle": 25.716, "flore": 47, "faune": 18 },
            { "name": "Thaluxis", "radius": 49, "orbitRadius": 180, "orbitSpeed": 0.3424, "angle": 24.297, "flore": 4, "faune": 19 },
            { "name": "Xorelmir", "radius": 36, "orbitRadius": 242, "orbitSpeed": 0.2466, "angle": 16.115, "flore": 39, "faune": 52 },
            { "name": "Voruria", "radius": 34, "orbitRadius": 242, "orbitSpeed": 0.2466, "angle": 14.53, "flore": 42, "faune": 53 }
          ]
        }
      ]
    },
    {
      "name": "Nebanlux", "radius": 178, "orbitRadius": 936, "orbitSpeed": 0.0172, "angle": -0.908, "color": "#FF6B6B",
      "planets": [
        { "name": "Velonlux", "radius": 92, "orbitRadius": 368, "orbitSpeed": 0.0519, "angle": 1.987, "flore": 38, "faune": 60,
          "moons": [
            { "name": "Auranxis", "radius": 37, "orbitRadius": 179, "orbitSpeed": 0.2778, "angle": 13.421, "flore": 7, "faune": 36 }
          ]
        },
        { "name": "Ithospha", "radius": 89, "orbitRadius": 368, "orbitSpeed": 0.0519, "angle": 4.726, "flore": 50, "faune": 97,
          "moons": [
            { "name": "Zetera", "radius": 32, "orbitRadius": 144, "orbitSpeed": 0.1765, "angle": 5.847, "flore": 26, "faune": 16 },
            { "name": "Synalbus", "radius": 35, "orbitRadius": 144, "orbitSpeed": 0.1765, "angle": 10.091, "flore": 45, "faune": 49 }
          ]
        },
        { "name": "Zanumvyn", "radius": 78, "orbitRadius": 629, "orbitSpeed": 0.0476, "angle": 5.433, "flore": 30, "faune": 86,
          "moons": [
            { "name": "Aurumth", "radius": 43, "orbitRadius": 218, "orbitSpeed": 0.3409, "angle": 13.397, "flore": 0, "faune": 19 },
            { "name": "Synaxxis", "radius": 24, "orbitRadius": 218, "orbitSpeed": 0.3409, "angle": 17.809, "flore": 36, "faune": 54 }
          ]
        }
      ]
    },
    {
      "name": "Voroton", "radius": 171, "orbitRadius": 2322, "orbitSpeed": 0.0155, "angle": 0.253, "color": "#FF8C42",
      "planets": [
        { "name": "Coronlux", "radius": 104, "orbitRadius": 746, "orbitSpeed": 0.034, "angle": 0.013, "flore": 34, "faune": 48,
          "moons": [
            { "name": "Kryabus", "radius": 38, "orbitRadius": 213, "orbitSpeed": 0.2691, "angle": 2.005, "flore": 8, "faune": 1 },
            { "name": "Erienis", "radius": 48, "orbitRadius": 213, "orbitSpeed": 0.2691, "angle": 4.988, "flore": 26, "faune": 20 },
            { "name": "Velexis", "radius": 29, "orbitRadius": 450, "orbitSpeed": 0.3281, "angle": 4.716, "flore": 10, "faune": 27 },
            { "name": "Omielxis", "radius": 50, "orbitRadius": 450, "orbitSpeed": 0.3281, "angle": 1.591, "flore": 38, "faune": 20 },
            { "name": "Palalxis", "radius": 57, "orbitRadius": 450, "orbitSpeed": 0.3281, "angle": 6.408, "flore": 15, "faune": 36 },
            { "name": "Kryisria", "radius": 53, "orbitRadius": 450, "orbitSpeed": 0.3281, "angle": 6.274, "flore": 11, "faune": 33 }
          ]
        },
        { "name": "Thalendon", "radius": 116, "orbitRadius": 746, "orbitSpeed": 0.034, "angle": 3.567, "flore": 25, "faune": 63,
          "moons": [
            { "name": "Sigalra", "radius": 23, "orbitRadius": 209, "orbitSpeed": 0.2724, "angle": 3.654, "flore": 44, "faune": 18 },
            { "name": "Corolux", "radius": 60, "orbitRadius": 302, "orbitSpeed": 0.1807, "angle": 0.91, "flore": 45, "faune": 52 },
            { "name": "Voraxlux", "radius": 42, "orbitRadius": 209, "orbitSpeed": 0.2724, "angle": 6.116, "flore": 48, "faune": 16 }
          ]
        }
      ]
    },
    {
      "name": "Corandis", "radius": 216, "orbitRadius": 2322, "orbitSpeed": 0.0155, "angle": 1.943, "color": "#FFB830",
      "planets": [
        { "name": "Nebuzar", "radius": 71, "orbitRadius": 321, "orbitSpeed": 0.0661, "angle": 6.543, "flore": 25, "faune": 6, "moons": [] },
        { "name": "Zanalxis", "radius": 119, "orbitRadius": 643, "orbitSpeed": 0.0465, "angle": 3.444, "flore": 12, "faune": 85,
          "moons": [
            { "name": "Zetirbus", "radius": 42, "orbitRadius": 178, "orbitSpeed": 0.2048, "angle": 21.437, "flore": 19, "faune": 47 },
            { "name": "Lyrisxis", "radius": 32, "orbitRadius": 178, "orbitSpeed": 0.2048, "angle": 18.995, "flore": 33, "faune": 0 },
            { "name": "Vorirmir", "radius": 29, "orbitRadius": 242, "orbitSpeed": 0.2663, "angle": 23.548, "flore": 34, "faune": 40 },
            { "name": "Kryeldis", "radius": 37, "orbitRadius": 242, "orbitSpeed": 0.2663, "angle": 22.121, "flore": 35, "faune": 2 }
          ]
        }
      ]
    },
    {
      "name": "Aurovyn", "radius": 156, "orbitRadius": 2322, "orbitSpeed": 0.0155, "angle": 4.504, "color": "#FF8C42",
      "planets": [
        { "name": "Omiedis", "radius": 117, "orbitRadius": 994, "orbitSpeed": 0.0283, "angle": 3.701, "flore": 32, "faune": 3,
          "moons": [
            { "name": "Velumria", "radius": 24, "orbitRadius": 156, "orbitSpeed": 0.2336, "angle": 2.979, "flore": 35, "faune": 39 }
          ]
        },
        { "name": "Zanarmir", "radius": 107, "orbitRadius": 654, "orbitSpeed": 0.0586, "angle": 6.159, "flore": 32, "faune": 46,
          "moons": [
            { "name": "Draalux", "radius": 30, "orbitRadius": 151, "orbitSpeed": 0.2427, "angle": 7.305, "flore": 14, "faune": 58 }
          ]
        },
        { "name": "Ithilux", "radius": 113, "orbitRadius": 654, "orbitSpeed": 0.0586, "angle": 4.099, "flore": 20, "faune": 26,
          "moons": [
            { "name": "Palonth", "radius": 54, "orbitRadius": 234, "orbitSpeed": 0.3252, "angle": 11.079, "flore": 40, "faune": 52 },
            { "name": "Draellux", "radius": 24, "orbitRadius": 234, "orbitSpeed": 0.3252, "angle": 13.061, "flore": 9, "faune": 2 },
            { "name": "Kryirbus", "radius": 33, "orbitRadius": 234, "orbitSpeed": 0.3252, "angle": 8.551, "flore": 29, "faune": 26 }
          ]
        },
        { "name": "Thalonis", "radius": 123, "orbitRadius": 994, "orbitSpeed": 0.0283, "angle": 5.201, "flore": 21, "faune": 71,
          "moons": [
            { "name": "Vorilux", "radius": 33, "orbitRadius": 201, "orbitSpeed": 0.3049, "angle": 6.651, "flore": 22, "faune": 6 },
            { "name": "Corabus", "radius": 26, "orbitRadius": 201, "orbitSpeed": 0.3049, "angle": 10.775, "flore": 33, "faune": 5 },
            { "name": "Thalirxis", "radius": 46, "orbitRadius": 257, "orbitSpeed": 0.3295, "angle": 4.538, "flore": 32, "faune": 41 }
          ]
        },
        { "name": "Kryarra", "radius": 78, "orbitRadius": 363, "orbitSpeed": 0.0598, "angle": 7.601, "flore": 32, "faune": 28,
          "moons": [
            { "name": "Draodon", "radius": 35, "orbitRadius": 131, "orbitSpeed": 0.3141, "angle": 12.252, "flore": 35, "faune": 39 },
            { "name": "Thalanpha", "radius": 29, "orbitRadius": 131, "orbitSpeed": 0.3141, "angle": 15.444, "flore": 16, "faune": 56 }
          ]
        }
      ]
    },
    {
      "name": "Thalezar", "radius": 218, "orbitRadius": 3265, "orbitSpeed": 0.009, "angle": 3.01, "color": "#7CB9FF",
      "planets": [
        { "name": "Kryalria", "radius": 110, "orbitRadius": 516, "orbitSpeed": 0.0415, "angle": -1.319, "flore": 23, "faune": 1,
          "moons": [
            { "name": "Paluria", "radius": 36, "orbitRadius": 181, "orbitSpeed": 0.3235, "angle": 1.745, "flore": 48, "faune": 25 },
            { "name": "Kryosvyn", "radius": 23, "orbitRadius": 181, "orbitSpeed": 0.3235, "angle": -0.878, "flore": 18, "faune": 40 },
            { "name": "Draisdis", "radius": 37, "orbitRadius": 181, "orbitSpeed": 0.3235, "angle": 3.857, "flore": 35, "faune": 23 }
          ]
        },
        { "name": "Omiondis", "radius": 123, "orbitRadius": 516, "orbitSpeed": 0.0415, "angle": 2.197, "flore": 76, "faune": 3, "moons": [] }
      ]
    },
    {
      "name": "Lyralzar", "radius": 210, "orbitRadius": 3265, "orbitSpeed": 0.009, "angle": -0.561, "color": "#FFB830",
      "planets": [
        { "name": "Auranxis", "radius": 73, "orbitRadius": 492, "orbitSpeed": 0.0659, "angle": -1.631, "flore": 34, "faune": 92,
          "moons": [
            { "name": "Thalubus", "radius": 29, "orbitRadius": 137, "orbitSpeed": 0.1645, "angle": -0.439, "flore": 47, "faune": 30 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "Sentinelle Rouge",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Omianlux", "radius": 156, "orbitRadius": 1935, "orbitSpeed": 0.0126, "angle": 0.288, "color": "#FFE44D",
      "planets": [
        { "name": "Celixis", "radius": 94, "orbitRadius": 547, "orbitSpeed": 0.043, "angle": 1.368, "flore": 25, "faune": 33,
          "moons": [
            { "name": "Erienpha", "radius": 38, "orbitRadius": 177, "orbitSpeed": 0.1573, "angle": 5.311, "flore": 9, "faune": 9 },
            { "name": "Corenra", "radius": 36, "orbitRadius": 177, "orbitSpeed": 0.1573, "angle": 6.695, "flore": 30, "faune": 52 },
            { "name": "Pyxiria", "radius": 47, "orbitRadius": 334, "orbitSpeed": 0.2015, "angle": 10.248, "flore": 32, "faune": 42 },
            { "name": "Thalonlux", "radius": 23, "orbitRadius": 334, "orbitSpeed": 0.2015, "angle": 11.77, "flore": 15, "faune": 6 }
          ]
        },
        { "name": "Xorumlux", "radius": 102, "orbitRadius": 547, "orbitSpeed": 0.043, "angle": -0.618, "flore": 72, "faune": 43,
          "moons": [
            { "name": "Corardis", "radius": 54, "orbitRadius": 179, "orbitSpeed": 0.2404, "angle": 10.03, "flore": 16, "faune": 49 },
            { "name": "Xoraxnis", "radius": 51, "orbitRadius": 179, "orbitSpeed": 0.2404, "angle": 13.064, "flore": 37, "faune": 5 },
            { "name": "Zanalbus", "radius": 40, "orbitRadius": 356, "orbitSpeed": 0.1933, "angle": 11.776, "flore": 11, "faune": 12 },
            { "name": "Kryaldis", "radius": 27, "orbitRadius": 179, "orbitSpeed": 0.2404, "angle": 11.419, "flore": 42, "faune": 57 }
          ]
        },
        { "name": "Erialmir", "radius": 128, "orbitRadius": 867, "orbitSpeed": 0.0424, "angle": 2.957, "flore": 99, "faune": 17,
          "moons": [
            { "name": "Paloszar", "radius": 28, "orbitRadius": 237, "orbitSpeed": 0.2305, "angle": 8.062, "flore": 36, "faune": 46 },
            { "name": "Sigosvyn", "radius": 60, "orbitRadius": 237, "orbitSpeed": 0.2305, "angle": 5.893, "flore": 1, "faune": 43 },
            { "name": "Erioszar", "radius": 28, "orbitRadius": 458, "orbitSpeed": 0.2349, "angle": 11.13, "flore": 17, "faune": 16 },
            { "name": "Synodis", "radius": 34, "orbitRadius": 458, "orbitSpeed": 0.2349, "angle": 5.822, "flore": 27, "faune": 44 }
          ]
        }
      ]
    },
    {
      "name": "Xoraria", "radius": 190, "orbitRadius": 1935, "orbitSpeed": 0.0126, "angle": 3.549, "color": "#FFB830",
      "planets": [
        { "name": "Thalelzar", "radius": 124, "orbitRadius": 779, "orbitSpeed": 0.0371, "angle": 2.159, "flore": 23, "faune": 61,
          "moons": [
            { "name": "Sigenpha", "radius": 26, "orbitRadius": 310, "orbitSpeed": 0.2278, "angle": 18.436, "flore": 18, "faune": 47 },
            { "name": "Kryonmus", "radius": 50, "orbitRadius": 310, "orbitSpeed": 0.2278, "angle": 16.289, "flore": 22, "faune": 60 },
            { "name": "Palopha", "radius": 59, "orbitRadius": 488, "orbitSpeed": 0.174, "angle": 15.865, "flore": 49, "faune": 59 },
            { "name": "Vorarxis", "radius": 39, "orbitRadius": 488, "orbitSpeed": 0.174, "angle": 12.998, "flore": 10, "faune": 35 }
          ]
        },
        { "name": "Synaxmir", "radius": 103, "orbitRadius": 779, "orbitSpeed": 0.0371, "angle": 4.58, "flore": 70, "faune": 6,
          "moons": [
            { "name": "Palera", "radius": 46, "orbitRadius": 219, "orbitSpeed": 0.297, "angle": 22.181, "flore": 2, "faune": 53 },
            { "name": "Kryelth", "radius": 48, "orbitRadius": 219, "orbitSpeed": 0.297, "angle": 19.818, "flore": 11, "faune": 8 },
            { "name": "Zetumxis", "radius": 26, "orbitRadius": 397, "orbitSpeed": 0.2508, "angle": 17.933, "flore": 13, "faune": 46 },
            { "name": "Thalirlux", "radius": 50, "orbitRadius": 397, "orbitSpeed": 0.2508, "angle": 19.393, "flore": 27, "faune": 29 }
          ]
        },
        { "name": "Thalith", "radius": 127, "orbitRadius": 779, "orbitSpeed": 0.0371, "angle": 6.459, "flore": 41, "faune": 95,
          "moons": [
            { "name": "Pyxalria", "radius": 47, "orbitRadius": 276, "orbitSpeed": 0.3101, "angle": 19.814, "flore": 7, "faune": 19 },
            { "name": "Kryaria", "radius": 34, "orbitRadius": 276, "orbitSpeed": 0.3101, "angle": 18.527, "flore": 44, "faune": 48 },
            { "name": "Lyranpha", "radius": 50, "orbitRadius": 276, "orbitSpeed": 0.3101, "angle": 22.404, "flore": 37, "faune": 5 },
            { "name": "Draolux", "radius": 21, "orbitRadius": 555, "orbitSpeed": 0.2183, "angle": 16.984, "flore": 36, "faune": 30 }
          ]
        }
      ]
    },
    {
      "name": "Omialth", "radius": 232, "orbitRadius": 4030, "orbitSpeed": 0.0105, "angle": -1.198, "color": "#FF6B6B",
      "planets": [
        { "name": "Erienmus", "radius": 90, "orbitRadius": 536, "orbitSpeed": 0.0635, "angle": 0.308, "flore": 34, "faune": 71,
          "moons": [
            { "name": "Velosbus", "radius": 35, "orbitRadius": 165, "orbitSpeed": 0.2917, "angle": 4.634, "flore": 45, "faune": 21 },
            { "name": "Aurirth", "radius": 39, "orbitRadius": 165, "orbitSpeed": 0.2917, "angle": 5.478, "flore": 39, "faune": 16 },
            { "name": "Xorellux", "radius": 49, "orbitRadius": 165, "orbitSpeed": 0.2917, "angle": 1.303, "flore": 11, "faune": 2 },
            { "name": "Vorirra", "radius": 29, "orbitRadius": 165, "orbitSpeed": 0.2917, "angle": 3.042, "flore": 21, "faune": 53 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "Le Carrousel",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Draenton", "radius": 217, "orbitRadius": 2431, "orbitSpeed": 0.0143, "angle": -0.277, "color": "#7CB9FF",
      "planets": [
        { "name": "Synenra", "radius": 104, "orbitRadius": 463, "orbitSpeed": 0.0601, "angle": 5.166, "flore": 97, "faune": 59,
          "moons": [
            { "name": "Lyrenis", "radius": 39, "orbitRadius": 175, "orbitSpeed": 0.2832, "angle": 27.581, "flore": 33, "faune": 28 }
          ]
        },
        { "name": "Voronth", "radius": 72, "orbitRadius": 1071, "orbitSpeed": 0.0366, "angle": 1.295, "flore": 88, "faune": 14,
          "moons": [
            { "name": "Pyxevyn", "radius": 40, "orbitRadius": 312, "orbitSpeed": 0.3013, "angle": 28.358, "flore": 18, "faune": 5 },
            { "name": "Corelnis", "radius": 44, "orbitRadius": 419, "orbitSpeed": 0.3108, "angle": 32.166, "flore": 23, "faune": 39 }
          ]
        },
        { "name": "Corolux", "radius": 81, "orbitRadius": 1071, "orbitSpeed": 0.0366, "angle": 4.896, "flore": 81, "faune": 3,
          "moons": [
            { "name": "Zanisra", "radius": 33, "orbitRadius": 151, "orbitSpeed": 0.2381, "angle": 24.823, "flore": 39, "faune": 59 },
            { "name": "Ithedis", "radius": 40, "orbitRadius": 300, "orbitSpeed": 0.3239, "angle": 35.161, "flore": 16, "faune": 9 },
            { "name": "Draanton", "radius": 22, "orbitRadius": 300, "orbitSpeed": 0.3239, "angle": 37.903, "flore": 16, "faune": 31 }
          ]
        }
      ]
    },
    {
      "name": "Pyxardon", "radius": 175, "orbitRadius": 2431, "orbitSpeed": 0.0143, "angle": 1.135, "color": "#FF8C42",
      "planets": [
        { "name": "Lyrarvyn", "radius": 95, "orbitRadius": 643, "orbitSpeed": 0.058, "angle": 3.718, "flore": 32, "faune": 22,
          "moons": [
            { "name": "Nebovyn", "radius": 31, "orbitRadius": 157, "orbitSpeed": 0.1557, "angle": 8.463, "flore": 25, "faune": 17 },
            { "name": "Palemir", "radius": 20, "orbitRadius": 157, "orbitSpeed": 0.1557, "angle": 10.598, "flore": 48, "faune": 50 }
          ]
        },
        { "name": "Eriirzar", "radius": 109, "orbitRadius": 1093, "orbitSpeed": 0.0335, "angle": 5.581, "flore": 44, "faune": 21,
          "moons": [
            { "name": "Coreton", "radius": 59, "orbitRadius": 248, "orbitSpeed": 0.1685, "angle": 10.239, "flore": 20, "faune": 31 },
            { "name": "Pyxeltis", "radius": 20, "orbitRadius": 455, "orbitSpeed": 0.3029, "angle": 18.166, "flore": 13, "faune": 23 },
            { "name": "Vorara", "radius": 46, "orbitRadius": 455, "orbitSpeed": 0.3029, "angle": 22.333, "flore": 34, "faune": 32 }
          ]
        },
        { "name": "Eriora", "radius": 112, "orbitRadius": 1093, "orbitSpeed": 0.0335, "angle": 2.004, "flore": 37, "faune": 51,
          "moons": [
            { "name": "Corirth", "radius": 26, "orbitRadius": 251, "orbitSpeed": 0.2819, "angle": 20.066, "flore": 47, "faune": 34 }
          ]
        }
      ]
    },
    {
      "name": "Xoronmus", "radius": 174, "orbitRadius": 2431, "orbitSpeed": 0.0143, "angle": 4.426, "color": "#FF8C42",
      "planets": [
        { "name": "Pyxoton", "radius": 83, "orbitRadius": 557, "orbitSpeed": 0.0394, "angle": -0.175, "flore": 9, "faune": 37,
          "moons": [
            { "name": "Vorara", "radius": 48, "orbitRadius": 180, "orbitSpeed": 0.2277, "angle": 1.548, "flore": 11, "faune": 58 }
          ]
        },
        { "name": "Eriarth", "radius": 98, "orbitRadius": 875, "orbitSpeed": 0.0334, "angle": 3.745, "flore": 2, "faune": 11,
          "moons": [
            { "name": "Palaldis", "radius": 20, "orbitRadius": 181, "orbitSpeed": 0.184, "angle": 1.559, "flore": 24, "faune": 3 },
            { "name": "Auranton", "radius": 29, "orbitRadius": 181, "orbitSpeed": 0.184, "angle": -0.975, "flore": 18, "faune": 37 }
          ]
        },
        { "name": "Kryaxbus", "radius": 104, "orbitRadius": 875, "orbitSpeed": 0.0334, "angle": 1.452, "flore": 6, "faune": 88,
          "moons": [
            { "name": "Zetizar", "radius": 34, "orbitRadius": 243, "orbitSpeed": 0.3376, "angle": 5.585, "flore": 34, "faune": 40 },
            { "name": "Nebirmir", "radius": 25, "orbitRadius": 243, "orbitSpeed": 0.3376, "angle": 3.839, "flore": 48, "faune": 10 },
            { "name": "Thalaxvyn", "radius": 50, "orbitRadius": 450, "orbitSpeed": 0.2912, "angle": 7.412, "flore": 38, "faune": 1 }
          ]
        }
      ]
    },
    {
      "name": "Lyralmir", "radius": 221, "orbitRadius": 2431, "orbitSpeed": 0.0143, "angle": 2.491, "color": "#FFB830",
      "planets": [
        { "name": "Velemus", "radius": 98, "orbitRadius": 543, "orbitSpeed": 0.0662, "angle": 2.016, "flore": 96, "faune": 84,
          "moons": [
            { "name": "Synenra", "radius": 47, "orbitRadius": 174, "orbitSpeed": 0.2072, "angle": 7.589, "flore": 9, "faune": 3 }
          ]
        },
        { "name": "Aurirxis", "radius": 98, "orbitRadius": 543, "orbitSpeed": 0.0662, "angle": 5.528, "flore": 79, "faune": 30,
          "moons": [
            { "name": "Eriudon", "radius": 35, "orbitRadius": 220, "orbitSpeed": 0.2196, "angle": 7.392, "flore": 37, "faune": 45 },
            { "name": "Thalelvyn", "radius": 56, "orbitRadius": 220, "orbitSpeed": 0.2196, "angle": 11.648, "flore": 45, "faune": 56 }
          ]
        },
        { "name": "Thalaldis", "radius": 112, "orbitRadius": 1223, "orbitSpeed": 0.0317, "angle": -1.527, "flore": 36, "faune": 5,
          "moons": [
            { "name": "Lyrura", "radius": 39, "orbitRadius": 396, "orbitSpeed": 0.2974, "angle": 10.879, "flore": 22, "faune": 51 },
            { "name": "Eriulux", "radius": 55, "orbitRadius": 396, "orbitSpeed": 0.2974, "angle": 13.298, "flore": 8, "faune": 7 },
            { "name": "Zetalux", "radius": 29, "orbitRadius": 562, "orbitSpeed": 0.2876, "angle": 11.759, "flore": 50, "faune": 29 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "David et Goliath",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Pyxirvyn", "radius": 216, "orbitRadius": 2216, "orbitSpeed": 0.0154, "angle": 0.4, "color": "#FF8C42",
      "planets": [
        { "name": "Coristis", "radius": 97, "orbitRadius": 606, "orbitSpeed": 0.0453, "angle": 3.731, "flore": 76, "faune": 99,
          "moons": [
            { "name": "Zanenlux", "radius": 45, "orbitRadius": 192, "orbitSpeed": 0.1994, "angle": 11.206, "flore": 9, "faune": 16 },
            { "name": "Velolux", "radius": 54, "orbitRadius": 192, "orbitSpeed": 0.1994, "angle": 13.44, "flore": 41, "faune": 40 },
            { "name": "Thalidon", "radius": 41, "orbitRadius": 254, "orbitSpeed": 0.2922, "angle": 14.579, "flore": 50, "faune": 32 }
          ]
        },
        { "name": "Sigeldon", "radius": 118, "orbitRadius": 1093, "orbitSpeed": 0.0366, "angle": 5.996, "flore": 47, "faune": 42,
          "moons": [
            { "name": "Zetizar", "radius": 25, "orbitRadius": 319, "orbitSpeed": 0.2202, "angle": 6.957, "flore": 30, "faune": 17 },
            { "name": "Erianxis", "radius": 38, "orbitRadius": 319, "orbitSpeed": 0.2202, "angle": 5.523, "flore": 48, "faune": 5 },
            { "name": "Ithamir", "radius": 32, "orbitRadius": 188, "orbitSpeed": 0.3252, "angle": 13.165, "flore": 33, "faune": 1 },
            { "name": "Synumlux", "radius": 21, "orbitRadius": 319, "orbitSpeed": 0.2202, "angle": 8.582, "flore": 14, "faune": 27 }
          ]
        },
        { "name": "Lyraxton", "radius": 89, "orbitRadius": 1668, "orbitSpeed": 0.0207, "angle": 3.761, "flore": 5, "faune": 42,
          "moons": [
            { "name": "Vorantis", "radius": 25, "orbitRadius": 133, "orbitSpeed": 0.3325, "angle": 13.92, "flore": 7, "faune": 31 },
            { "name": "Draenria", "radius": 28, "orbitRadius": 201, "orbitSpeed": 0.3169, "angle": 14.008, "flore": 1, "faune": 27 },
            { "name": "Aurara", "radius": 24, "orbitRadius": 201, "orbitSpeed": 0.3169, "angle": 15.949, "flore": 23, "faune": 18 },
            { "name": "Xorumbus", "radius": 43, "orbitRadius": 201, "orbitSpeed": 0.3169, "angle": 11.76, "flore": 6, "faune": 49 }
          ]
        },
        { "name": "Zetisnis", "radius": 96, "orbitRadius": 1093, "orbitSpeed": 0.0366, "angle": 3.98, "flore": 26, "faune": 45,
          "moons": [
            { "name": "Erielpha", "radius": 46, "orbitRadius": 216, "orbitSpeed": 0.2526, "angle": 11.431, "flore": 43, "faune": 26 },
            { "name": "Siganmir", "radius": 33, "orbitRadius": 216, "orbitSpeed": 0.2526, "angle": 14.116, "flore": 4, "faune": 43 }
          ]
        },
        { "name": "Auronton", "radius": 99, "orbitRadius": 1668, "orbitSpeed": 0.0207, "angle": 1.535, "flore": 69, "faune": 11,
          "moons": [
            { "name": "Corondis", "radius": 26, "orbitRadius": 275, "orbitSpeed": 0.1633, "angle": 9.284, "flore": 3, "faune": 29 },
            { "name": "Coristh", "radius": 30, "orbitRadius": 275, "orbitSpeed": 0.1633, "angle": 13.139, "flore": 50, "faune": 55 },
            { "name": "Celennis", "radius": 59, "orbitRadius": 275, "orbitSpeed": 0.1633, "angle": 3.793, "flore": 48, "faune": 49 }
          ]
        },
        { "name": "Pyxoria", "radius": 126, "orbitRadius": 1668, "orbitSpeed": 0.0207, "angle": 0.027, "flore": 92, "faune": 48,
          "moons": [
            { "name": "Zetirmir", "radius": 25, "orbitRadius": 445, "orbitSpeed": 0.2365, "angle": 18.431, "flore": 0, "faune": 54 },
            { "name": "Lyrenpha", "radius": 52, "orbitRadius": 312, "orbitSpeed": 0.2293, "angle": 17.824, "flore": 15, "faune": 27 },
            { "name": "Zetismir", "radius": 42, "orbitRadius": 312, "orbitSpeed": 0.2293, "angle": 13.577, "flore": 1, "faune": 18 },
            { "name": "Veluzar", "radius": 48, "orbitRadius": 445, "orbitSpeed": 0.2365, "angle": 16.54, "flore": 50, "faune": 23 }
          ]
        }
      ]
    },
    {
      "name": "Nebonbus", "radius": 199, "orbitRadius": 2216, "orbitSpeed": 0.0154, "angle": -2.204, "color": "#7CB9FF",
      "planets": [
        { "name": "Velozar", "radius": 96, "orbitRadius": 632, "orbitSpeed": 0.0537, "angle": 2.038, "flore": 32, "faune": 28,
          "moons": [
            { "name": "Synepha", "radius": 28, "orbitRadius": 233, "orbitSpeed": 0.205, "angle": 0.052, "flore": 12, "faune": 41 },
            { "name": "Corumzar", "radius": 32, "orbitRadius": 233, "orbitSpeed": 0.205, "angle": 2.029, "flore": 10, "faune": 40 },
            { "name": "Xoraxvyn", "radius": 20, "orbitRadius": 233, "orbitSpeed": 0.205, "angle": 4.158, "flore": 11, "faune": 22 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "Trois Royaumes",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Auraxtis", "radius": 234, "orbitRadius": 896, "orbitSpeed": 0.0209, "angle": 0.175, "color": "#FF8C42",
      "planets": [
        { "name": "Zetendon", "radius": 79, "orbitRadius": 454, "orbitSpeed": 0.0441, "angle": 1.042, "flore": 63, "faune": 7, "moons": [] }
      ]
    },
    {
      "name": "Synonra", "radius": 183, "orbitRadius": 1594, "orbitSpeed": 0.0146, "angle": -2.303, "color": "#FFB830",
      "planets": [
        { "name": "Ithupha", "radius": 87, "orbitRadius": 323, "orbitSpeed": 0.0702, "angle": 1.086, "flore": 25, "faune": 85, "moons": [] },
        { "name": "Velirton", "radius": 129, "orbitRadius": 484, "orbitSpeed": 0.0603, "angle": 4.205, "flore": 70, "faune": 82,
          "moons": [
            { "name": "Zanumton", "radius": 44, "orbitRadius": 210, "orbitSpeed": 0.1783, "angle": 2.054, "flore": 45, "faune": 21 },
            { "name": "Zeteton", "radius": 22, "orbitRadius": 210, "orbitSpeed": 0.1783, "angle": 5.965, "flore": 46, "faune": 9 }
          ]
        }
      ]
    },
    {
      "name": "Xorarria", "radius": 162, "orbitRadius": 2750, "orbitSpeed": 0.0101, "angle": -0.008, "color": "#FF6B6B",
      "planets": [
        { "name": "Corarra", "radius": 107, "orbitRadius": 495, "orbitSpeed": 0.0514, "angle": -0.49, "flore": 92, "faune": 21,
          "moons": [
            { "name": "Palatis", "radius": 30, "orbitRadius": 181, "orbitSpeed": 0.1852, "angle": 0.108, "flore": 38, "faune": 18 },
            { "name": "Zetosria", "radius": 33, "orbitRadius": 181, "orbitSpeed": 0.1852, "angle": 1.577, "flore": 11, "faune": 8 }
          ]
        },
        { "name": "Synitis", "radius": 75, "orbitRadius": 495, "orbitSpeed": 0.0514, "angle": 3.411, "flore": 10, "faune": 87,
          "moons": [
            { "name": "Lyrevyn", "radius": 52, "orbitRadius": 197, "orbitSpeed": 0.2333, "angle": 1.428, "flore": 41, "faune": 11 }
          ]
        },
        { "name": "Lyralton", "radius": 77, "orbitRadius": 495, "orbitSpeed": 0.0514, "angle": 1.705, "flore": 9, "faune": 37,
          "moons": [
            { "name": "Pyxaldis", "radius": 36, "orbitRadius": 168, "orbitSpeed": 0.233, "angle": 0.105, "flore": 21, "faune": 9 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "Avant-Poste",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Zanispha", "radius": 201, "orbitRadius": 1838, "orbitSpeed": 0.0139, "angle": 0.624, "color": "#FF6B6B",
      "planets": [
        { "name": "Omiumdon", "radius": 83, "orbitRadius": 519, "orbitSpeed": 0.0429, "angle": -0.346, "flore": 0, "faune": 44,
          "moons": [
            { "name": "Palennis", "radius": 47, "orbitRadius": 195, "orbitSpeed": 0.3486, "angle": 13.282, "flore": 3, "faune": 9 },
            { "name": "Thalalra", "radius": 49, "orbitRadius": 195, "orbitSpeed": 0.3486, "angle": 10.302, "flore": 23, "faune": 24 }
          ]
        },
        { "name": "Corarth", "radius": 105, "orbitRadius": 1150, "orbitSpeed": 0.0274, "angle": 3.38, "flore": 61, "faune": 8,
          "moons": [
            { "name": "Aurarpha", "radius": 53, "orbitRadius": 283, "orbitSpeed": 0.2453, "angle": 7.433, "flore": 11, "faune": 0 },
            { "name": "Sigirlux", "radius": 26, "orbitRadius": 283, "orbitSpeed": 0.2453, "angle": 10.037, "flore": 30, "faune": 19 },
            { "name": "Ithadis", "radius": 44, "orbitRadius": 483, "orbitSpeed": 0.2643, "angle": 11.321, "flore": 24, "faune": 34 }
          ]
        }
      ]
    },
    {
      "name": "Eriera", "radius": 221, "orbitRadius": 1838, "orbitSpeed": 0.0139, "angle": 3.725, "color": "#FFB830",
      "planets": [
        { "name": "Vorellux", "radius": 129, "orbitRadius": 564, "orbitSpeed": 0.0445, "angle": 1.117, "flore": 52, "faune": 82,
          "moons": [
            { "name": "Sigelzar", "radius": 31, "orbitRadius": 243, "orbitSpeed": 0.3198, "angle": 7.655, "flore": 29, "faune": 22 },
            { "name": "Thaloxis", "radius": 48, "orbitRadius": 243, "orbitSpeed": 0.3198, "angle": 9.824, "flore": 43, "faune": 33 }
          ]
        },
        { "name": "Zanondis", "radius": 104, "orbitRadius": 1142, "orbitSpeed": 0.0284, "angle": -0.759, "flore": 39, "faune": 8,
          "moons": [
            { "name": "Sigarvyn", "radius": 21, "orbitRadius": 394, "orbitSpeed": 0.3444, "angle": 8.176, "flore": 39, "faune": 6 },
            { "name": "Pyxelnis", "radius": 55, "orbitRadius": 394, "orbitSpeed": 0.3444, "angle": 6.026, "flore": 44, "faune": 15 },
            { "name": "Xoruton", "radius": 41, "orbitRadius": 275, "orbitSpeed": 0.2538, "angle": 8.049, "flore": 4, "faune": 14 }
          ]
        }
      ]
    },
    {
      "name": "Celanlux", "radius": 169, "orbitRadius": 3217, "orbitSpeed": 0.0106, "angle": -0.792, "color": "#FFB830",
      "planets": [
        { "name": "Palumnis", "radius": 77, "orbitRadius": 699, "orbitSpeed": 0.0369, "angle": 0.297, "flore": 47, "faune": 36,
          "moons": [
            { "name": "Omionvyn", "radius": 47, "orbitRadius": 233, "orbitSpeed": 0.1559, "angle": 1.675, "flore": 20, "faune": 39 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  },
  {
  "name": "Étoile du Berger",
  "blackHole": { "x": 0, "y": 0, "radius": 300 },
  "suns": [
    {
      "name": "Draenria", "radius": 214, "orbitRadius": 2399, "orbitSpeed": 0.0113, "angle": 0.65, "color": "#FF8C42",
      "planets": [
        { "name": "Celanria", "radius": 122, "orbitRadius": 436, "orbitSpeed": 0.0568, "angle": 1.343, "flore": 87, "faune": 81, "moons": [] },
        { "name": "Voralmir", "radius": 94, "orbitRadius": 714, "orbitSpeed": 0.0475, "angle": -0.192, "flore": 68, "faune": 20,
          "moons": [
            { "name": "Zetentis", "radius": 20, "orbitRadius": 216, "orbitSpeed": 0.3141, "angle": 10.928, "flore": 9, "faune": 43 }
          ]
        },
        { "name": "Omiadon", "radius": 78, "orbitRadius": 951, "orbitSpeed": 0.0465, "angle": 4.004, "flore": 29, "faune": 20,
          "moons": [
            { "name": "Palirbus", "radius": 49, "orbitRadius": 173, "orbitSpeed": 0.3296, "angle": 9.924, "flore": 24, "faune": 33 },
            { "name": "Nebavyn", "radius": 49, "orbitRadius": 173, "orbitSpeed": 0.3296, "angle": 11.685, "flore": 42, "faune": 28 },
            { "name": "Vorebus", "radius": 39, "orbitRadius": 308, "orbitSpeed": 0.1627, "angle": 6.876, "flore": 19, "faune": 9 }
          ]
        }
      ]
    },
    {
      "name": "Zananlux", "radius": 166, "orbitRadius": 2399, "orbitSpeed": 0.0113, "angle": 2.782, "color": "#FFE44D",
      "planets": [
        { "name": "Sigiria", "radius": 106, "orbitRadius": 564, "orbitSpeed": 0.0622, "angle": 1.895, "flore": 37, "faune": 30,
          "moons": [
            { "name": "Zetiszar", "radius": 46, "orbitRadius": 251, "orbitSpeed": 0.2558, "angle": 7.416, "flore": 17, "faune": 44 }
          ]
        },
        { "name": "Coripha", "radius": 117, "orbitRadius": 919, "orbitSpeed": 0.0408, "angle": 0.021, "flore": 94, "faune": 14,
          "moons": [
            { "name": "Lyrelria", "radius": 55, "orbitRadius": 224, "orbitSpeed": 0.2308, "angle": 8.22, "flore": 18, "faune": 60 }
          ]
        },
        { "name": "Voreldon", "radius": 81, "orbitRadius": 318, "orbitSpeed": 0.0814, "angle": 3.665, "flore": 71, "faune": 90, "moons": [] }
      ]
    },
    {
      "name": "Coreltis", "radius": 242, "orbitRadius": 1199, "orbitSpeed": 0.0191, "angle": -1.36, "color": "#7CB9FF",
      "planets": [
        { "name": "Omialria", "radius": 96, "orbitRadius": 464, "orbitSpeed": 0.0686, "angle": 3.269, "flore": 85, "faune": 23,
          "moons": [
            { "name": "Palalxis", "radius": 22, "orbitRadius": 174, "orbitSpeed": 0.3051, "angle": 11.845, "flore": 16, "faune": 39 },
            { "name": "Pyxenzar", "radius": 53, "orbitRadius": 174, "orbitSpeed": 0.3051, "angle": 9.542, "flore": 31, "faune": 34 }
          ]
        },
        { "name": "Velonis", "radius": 94, "orbitRadius": 464, "orbitSpeed": 0.0686, "angle": 5.409, "flore": 35, "faune": 71,
          "moons": [
            { "name": "Sigaxria", "radius": 32, "orbitRadius": 175, "orbitSpeed": 0.2668, "angle": 5.247, "flore": 13, "faune": 26 }
          ]
        },
        { "name": "Thalosxis", "radius": 127, "orbitRadius": 864, "orbitSpeed": 0.0342, "angle": 3.734, "flore": 66, "faune": 68,
          "moons": [
            { "name": "Celirvyn", "radius": 20, "orbitRadius": 220, "orbitSpeed": 0.2425, "angle": 4.952, "flore": 28, "faune": 20 },
            { "name": "Voraxth", "radius": 41, "orbitRadius": 220, "orbitSpeed": 0.2425, "angle": 9.496, "flore": 29, "faune": 38 }
          ]
        }
      ]
    },
    {
      "name": "Paloria", "radius": 202, "orbitRadius": 3362, "orbitSpeed": 0.0109, "angle": -0.575, "color": "#FF6B6B",
      "planets": [
        { "name": "Voruth", "radius": 89, "orbitRadius": 457, "orbitSpeed": 0.0458, "angle": 1.106, "flore": 94, "faune": 25,
          "moons": [
            { "name": "Ithonmir", "radius": 26, "orbitRadius": 209, "orbitSpeed": 0.1523, "angle": 3.085, "flore": 23, "faune": 35 },
            { "name": "Zetenzar", "radius": 34, "orbitRadius": 209, "orbitSpeed": 0.1523, "angle": 1.284, "flore": 32, "faune": 49 }
          ]
        },
        { "name": "Draeldon", "radius": 123, "orbitRadius": 457, "orbitSpeed": 0.0458, "angle": -1.003, "flore": 63, "faune": 82, "moons": [] }
      ]
    },
    {
      "name": "Zanarth", "radius": 188, "orbitRadius": 3362, "orbitSpeed": 0.0109, "angle": -2.279, "color": "#7CB9FF",
      "planets": [
        { "name": "Synudon", "radius": 129, "orbitRadius": 517, "orbitSpeed": 0.0666, "angle": -1.074, "flore": 79, "faune": 39,
          "moons": [
            { "name": "Zanirdis", "radius": 38, "orbitRadius": 232, "orbitSpeed": 0.1999, "angle": -2.348, "flore": 48, "faune": 5 },
            { "name": "Lyrisbus", "radius": 39, "orbitRadius": 232, "orbitSpeed": 0.1999, "angle": 0.617, "flore": 40, "faune": 20 }
          ]
        },
        { "name": "Kryidon", "radius": 117, "orbitRadius": 1004, "orbitSpeed": 0.0289, "angle": 2.6, "flore": 12, "faune": 40,
          "moons": [
            { "name": "Omionbus", "radius": 31, "orbitRadius": 235, "orbitSpeed": 0.2411, "angle": -1.086, "flore": 14, "faune": 33 },
            { "name": "Vorondis", "radius": 36, "orbitRadius": 340, "orbitSpeed": 0.3437, "angle": 1.176, "flore": 1, "faune": 31 },
            { "name": "Corandon", "radius": 35, "orbitRadius": 340, "orbitSpeed": 0.3437, "angle": 3.741, "flore": 42, "faune": 42 }
          ]
        }
      ]
    }
  ],
  "asteroidBelts": []
  }
];

module.exports = MAP_LIBRARY;
