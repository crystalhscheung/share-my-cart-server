exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      username: "Albus",
      email: "albus@mail.com",
      password: "1234abcd",
      avatar: "albus.jpeg",
      bio: "Just a wizard spreading love. Headmaster by day, romantic by night. Usually found sipping on lemon drops, dispensing wise words, and trying to matchmake for my Hogwarts students. #LoveConquersAll",
    },
    {
      id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      username: "Bellatrix",
      email: "bellatrix@mail.com",
      password: "1234abcd",
      avatar: "bellatrix.jpeg",
      bio: "Dark witch on a mission to bring chaos to the wizarding world. Proud Death Eater. Lover of all things twisted and evil. Usually found cackling, practicing dark magic, and causing general mayhem. #DarkIsTheNewBlack ",
    },
    {
      id: "90ac3319-70d1-4a51-b91d-ba6c2464408c",
      username: "Cedric",
      email: "cedric@mail.com",
      password: "1234abcd",
      avatar: "cedric.webp",
      bio: "Hogwarts heartthrob, Quidditch star, and all-around charmer. Always looking dashing and ready for the next adventure. Can often be found seeking out new challenges on the Quidditch field or winning over the ladies with my winning smile. #HogwartsHeartthrob ",
    },
    {
      id: "bfc9bea7-66f1-44e9-879b-4d363a888eb4",
      username: "Draco",
      email: "draco@mail.com",
      password: "1234abcd",
      avatar: "draco.jpeg",
      bio: "Slytherin prince, wizarding world socialite, and part-time snark master. Known for my impeccable style, quick wit, and love of all things luxurious. Can usually be found sipping on butterbeer at the Leaky Cauldron or stirring up trouble at Hogwarts. #SlytherinStyle #DracosWorld",
    },
    {
      id: "89898957-04ba-4bd0-9f5c-a7aea7447963",
      username: "Dolores",
      email: "dolores@mail.com",
      password: "1234abcd",
      avatar: "dolores.webp",
      bio: "Former Professor of Defense Against the Dark Arts, cat enthusiast, and lover of all things pink and sparkly. Always on the hunt for the latest and greatest in magical fashion, and never afraid to speak my mind. Can usually be found grading essays or cooing over my collection of pet Kneazles. #DefenseAgainstTheFabulous #PinkIsMySignatureColor",
    },
    {
      id: "ade0a47b-cee6-4693-b4cd-a7e6cb25f4b7",
      username: "Hermione",
      email: "hermione@mail.com",
      password: "1234abcd",
      avatar: "hermione.jpeg",
      bio: "Bookworm, boss witch, and champion of all things smart and sassy. Never seen without a stack of books in hand or a clever comeback on the tip of my tongue. Can usually be found in the library, saving the wizarding world one spell at a time, or advocating for House Elf rights. #BookNerdGoals #WitBeyondMeasure",
    },
    {
      id: "bb1491eb-30e6-4728-a5fa-72f89feaf622",
      username: "Minerva",
      email: "minerva@mail.com",
      password: "1234abcd",
      avatar: "minerva.jpeg",
      bio: "Transfiguration Professor and Head of Gryffindor House, master of wit and sarcasm. Always ready with a steely glare or a perfectly timed quip. Can usually be found grading essays, putting naughty students in their place, or plotting with Albus to take down Voldemort. #NoNonsenseAttitude ",
    },
    {
      id: "150a36cf-f38e-4f59-8e31-39974207372d",
      username: "Neville",
      email: "neville@mail.com",
      password: "1234abcd",
      avatar: "neville.webp",
      bio: "Herbology enthusiast, Hogwarts hero, and forgetful friend. Can often be found tending to the greenhouses, fighting against the Dark Arts, or trying to remember where I left my Remembrall. #PlantPower #ForgetfulButFriendly",
    },
    {
      id: "84e96018-4022-434e-80bf-000ce4cd12b8",
      username: "Rubeus",
      email: "rubeus@mail.com",
      password: "1234abcd",
      avatar: "rubeus.jpeg",
      bio: "Keeper of Keys and Grounds at Hogwarts, nature lover, and big-hearted giant. Can often be found tending to the Forbidden Forest, rescuing magical creatures, or regaling students with tales of my adventures. Pro tip: always carry a large enough bag for all the magical creatures you might find. #GiantHeart #FriendToAllCreatures",
    },
    {
      id: "c05b9a93-8682-4ab6-aff2-92ebb4bbfc14",
      username: "Tom",
      email: "tom@mail.com",
      password: "1234abcd",
      avatar: "tom.jpeg",
      bio: "Aspiring wizarding world conqueror, and owner of the most famous nose in the wizarding world. Can often be found plotting his next evil scheme, recruiting followers to the Dark Arts, or experimenting with his latest cloak design. Pro tip: always choose the darker color palette for a more ominous look and heavier nose shadow for extra villainous flair. #HeWhoMustNotBeNamed #NoseGameStrong",
    },
    {
      id: "25ce5d91-a262-4dcf-bb87-42b87546bcfa",
      username: "JK",
      email: "jk@mail.com",
      password: "1234abcd",
      avatar: "jk.png",
      bio: "Wizarding wordsmith and Hogwarts alumni. When she's not casting spells with her pen, she can be found sipping Butterbeer at The Leaky Cauldron or searching for new ways to sneak in Muggle references. #WizardingWednesday",
    },
  ]);
};
