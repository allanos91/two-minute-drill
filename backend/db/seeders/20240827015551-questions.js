'use strict';

const { Prediction } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Prediction.bulkCreate([
      {
        type: "win or lose",
        content: "Packers Eagles week 1"
      },
      {
        type: "season record",
        content: "Chiefs"
      },
      {
        type: "season record",
        content: "Ravens"
      },
      {
        type: "season record",
        content: "Packers"
      },
      {
        type: "season record",
        content: "Broncos"
      },
      {
        type: "season record",
        content: "Seahawks"
      },
      {
        type: "season record",
        content: "49ers"
      },
      {
        type: "season record",
        content: "Rams"
      },
      {
        type: "season record",
        content: "Bears"
      },
      {
        type: "season record",
        content: "Vikings"
      },
      {
        type: "season record",
        content: "Lions"
      },
      {
        type: "season record",
        content: "Browns"
      },
      {
        type: "season record",
        content: "Saints"
      },
      {
        type: "season record",
        content: "Buccaneers"
      },
      {
        type: "season record",
        content: "Falcons"
      },
      {
        type: "season record",
        content: "Commanders"
      },
      {
        type: "season record",
        content: "Cardinals"
      },
      {
        type: "season record",
        content: "Eagles"
      },
      {
        type: "season record",
        content: "Cowboys"
      },
      {
        type: "season record",
        content: "Giants"
      },
      {
        type: "season record",
        content: "Jets"
      },
      {
        type: "season record",
        content: "Bills"
      },
      {
        type: "season record",
        content: "Dolphins"
      },
      {
        type: "season record",
        content: "Steelers"
      },
      {
        type: "season record",
        content: "Titans"
      },
      {
        type: "season record",
        content: "Jaguars"
      },
      {
        type: "season record",
        content: "Chargers"
      },
      {
        type: "season record",
        content: "Raiders"
      },
      {
        type: "season record",
        content: "Panthers"
      },
      {
        type: "season record",
        content: "Bengals"
      },
      {
        type: "season record",
        content: "Patriots"
      },
      {
        type: "season record",
        content: "Texans"
      },
      {
        type: "season record",
        content: "Colts"
      },

      {
        type: "team points",
        content: "Ravens week 1"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 1"
      },
      {
        type: "over/under",
        content: "Chargers 18.5 week 1"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 2"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 3"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 4"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 5"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 6"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 7"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 8"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 9"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 10"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 11"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 12"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 13"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 14"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 15"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 16"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 17"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 18"
      },
      {
        type: "win or lose",
        content: "Bears Titans week 1"
      },
      {
        type: "win or lose",
        content: "Bears Texans week 2"
      },
      {
        type: "win or lose",
        content: "Bears Colts week 3"
      },
      {
        type: "win or lose",
        content: "Bears Rams week 4"
      },
      {
        type: "win or lose",
        content: "Bears Panthers week 5"
      },
      {
        type: "win or lose",
        content: "Bears Jaguars week 6"
      },
      {
        type: "win or lose",
        content: "Bears Commanders week 8"
      },
      {
        type: "win or lose",
        content: "Bears Cardinals week 9"
      },
      {
        type: "win or lose",
        content: "Bears Patriots week 10"
      },
      {
        type: "win or lose",
        content: "Bears Packers week 11"
      },
      {
        type: "win or lose",
        content: "Bears Vikings week 12"
      },
      {
        type: "win or lose",
        content: "Bears Lions week 13"
      },
      {
        type: "win or lose",
        content: "Bears 49ers week 14"
      },
      {
        type: "win or lose",
        content: "Bears Vikings week 15"
      },
      {
        type: "win or lose",
        content: "Bears Lions week 16"
      },
      {
        type: "win or lose",
        content: "Bears Seahawks week 17"
      },
      {
        type: "win or lose",
        content: "Bears Packers week 18"
      },
      {
        type: "win or lose",
        content: "Ravens Chiefs week 1"
      },
      {
        type: "win or lose",
        content: "Panthers Saints week 1"
      },
      {
        type: "win or lose",
        content: "Vikings Giants week 1"
      },
      {
        type: "win or lose",
        content: "Texans Colts week 1"
      },
      {
        type: "win or lose",
        content: "Patriots Bengals week 1"
      },
      {
        type: "win or lose",
        content: "Cardinals Bills week 1"
      },
      {
        type: "win or lose",
        content: "Jaguars Dolphins week 1"
      },
      {
        type: "win or lose",
        content: "Broncos Seahawks week 1"
      },
      {
        type: "win or lose",
        content: "Cowboys Browns week 1"
      },
      {
        type: "win or lose",
        content: "Rams Lions week 1"
      },
      {
        type: "win or lose",
        content: "Steelers Falcons week 1"
      },
      {
        type: "win or lose",
        content: "Raiders Chargers week 1"
      },
      {
        type: "win or lose",
        content: "Commanders Buccaneers week 1"
      },
      {
        type: "win or lose",
        content: "Jets 49ers week 1"
      },
      {
        type: "win or lose",
        content: "Bills Dolphins week 2"
      },
      {
        type: "win or lose",
        content: "49ers Vikings week 2"
      },
      {
        type: "win or lose",
        content: "Jets Titans week 2"
      },
      {
        type: "win or lose",
        content: "Seahawks Patriots week 2"
      },
      {
        type: "win or lose",
        content: "Browns Jaguars week 2"
      },
      {
        type: "win or lose",
        content: "Saints Cowboys week 2"
      },
      {
        type: "win or lose",
        content: "Rams Cardinals week 2"
      },
      {
        type: "win or lose",
        content: "Bengals Chiefs week 2"
      },
      {
        type: "win or lose",
        content: "Buccaneers Lions week 2"
      },
      {
        type: "win or lose",
        content: "Chargers Panthers week 2"
      },
      {
        type: "win or lose",
        content: "Colts Packers week 2"
      },
      {
        type: "win or lose",
        content: "Raiders Ravens week 2"
      },
      {
        type: "win or lose",
        content: "Giants Commanders week 2"
      },
      {
        type: "win or lose",
        content: "Steelers Broncos week 2"
      },
      {
        type: "win or lose",
        content: "Falcons Eagles week 2"
      },
      {
        type: "win or lose",
        content: "Patriots Jets week 3"
      },
      {
        type: "win or lose",
        content: "Giants Browns week 3"
      },
      {
        type: "win or lose",
        content: "Packers Titans week 3"
      },
      {
        type: "win or lose",
        content: "Broncos Buccaneers week 3"
      },
      {
        type: "win or lose",
        content: "Panthers Raiders week 3"
      },
      {
        type: "win or lose",
        content: "49ers Rams week 3"
      },
      {
        type: "win or lose",
        content: "Chiefs Falcons week 3"
      },
      {
        type: "win or lose",
        content: "Eagles Saints week 3"
      },
      {
        type: "win or lose",
        content: "Texans Vikings week 3"
      },
      {
        type: "win or lose",
        content: "Chargers Steelers week 3"
      },
      {
        type: "win or lose",
        content: "Dolphins Seahawks week 3"
      },
      {
        type: "win or lose",
        content: "Ravens Cowboys week 3"
      },
      {
        type: "win or lose",
        content: "Lions Cardinals week 3"
      },
      {
        type: "win or lose",
        content: "Jaguars Bills week 3"
      },
      {
        type: "win or lose",
        content: "Commanders Bengals week 3"
      },
      {
        type: "win or lose",
        content: "Cowboys Giants week 4"
      },
      {
        type: "win or lose",
        content: "Broncos Jets week 4"
      },
      {
        type: "win or lose",
        content: "Vikings Packers week 4"
      },
      {
        type: "win or lose",
        content: "Bengals Panthers week 4"
      },
      {
        type: "win or lose",
        content: "Saints Falcons week 4"
      },
      {
        type: "win or lose",
        content: "Patriots 49ers week 4"
      },
      {
        type: "win or lose",
        content: "Chiefs Chargers week 4"
      },
      {
        type: "win or lose",
        content: "Bills Ravens week 4"
      },
      {
        type: "win or lose",
        content: "Eagles Buccaneers week 4"
      },
      {
        type: "win or lose",
        content: "Steelers Colts week 4"
      },
      {
        type: "win or lose",
        content: "Jaguars Texans week 4"
      },
      {
        type: "win or lose",
        content: "Commanders Cardinals week 4"
      },
      {
        type: "win or lose",
        content: "Browns Raiders week 4"
      },
      {
        type: "win or lose",
        content: "Titans Dolphins week 4"
      },
      {
        type: "win or lose",
        content: "Seahawks Lions week 4"
      },
      {
        type: "win or lose",
        content: "Buccaneers Falcons week 5"
      },
      {
        type: "win or lose",
        content: "Jets Vikings week 5"
      },
      {
        type: "win or lose",
        content: "Colts Jaguars week 5"
      },
      {
        type: "win or lose",
        content: "Ravens Bengals week 5"
      },
      {
        type: "win or lose",
        content: "Bills Texans week 5"
      },
      {
        type: "win or lose",
        content: "Cardinals 49ers week 5"
      },
      {
        type: "win or lose",
        content: "Giants Seahawks week 5"
      },
      {
        type: "win or lose",
        content: "Dolphins Patriots week 5"
      },
      {
        type: "win or lose",
        content: "Browns Commanders week 5"
      },
      {
        type: "win or lose",
        content: "Raiders Broncos week 5"
      },
      {
        type: "win or lose",
        content: "Packers Rams week 5"
      },
      {
        type: "win or lose",
        content: "Cowboys Steelers week 5"
      },
      {
        type: "win or lose",
        content: "Saints Chiefs week 5"
      },
      {
        type: "win or lose",
        content: "49ers Seahawks week 5"
      },
      {
        type: "win or lose",
        content: "Cardinals Packers week 6"
      },
      {
        type: "win or lose",
        content: "Commanders Ravens week 6"
      },
      {
        type: "win or lose",
        content: "Colts Titans week 6"
      },
      {
        type: "win or lose",
        content: "Steelers Raiders week 6"
      },
      {
        type: "win or lose",
        content: "Falcons Panthers week 6"
      },
      {
        type: "win or lose",
        content: "Buccaneers Saints week 6"
      },
      {
        type: "win or lose",
        content: "Browns Eagles week 6"
      },
      {
        type: "win or lose",
        content: "Texans Patriots week 6"
      },
      {
        type: "win or lose",
        content: "Chargers Broncos week 6"
      },
      {
        type: "win or lose",
        content: "Lions Cowboys week 6"
      },
      {
        type: "win or lose",
        content: "Bengals Giants week 6"
      },
      {
        type: "win or lose",
        content: "Bills Jets week 6"
      },
      {
        type: "win or lose",
        content: "Broncos Saints week 7"
      },
      {
        type: "win or lose",
        content: "Patriots Jaguars week 7"
      },
      {
        type: "win or lose",
        content: "Chiefs 49ers week 7"
      },
      {
        type: "win or lose",
        content: "Cardinals Dolphins week 8"
      },
      {
        type: "win or lose",
        content: "Packers Jaguars week 8"
      },
      {
        type: "win or lose",
        content: "Ravens Browns week 8"
      },
      {
        type: "win or lose",
        content: "Saints Panthers week 9"
      },
      {
        type: "win or lose",
        content: "Commanders Giants week 9"
      },
      {
        type: "win or lose",
        content: "Rams Seahawks week 9"
      },
      {
        type: "win or lose",
        content: "Giants Panthers week 10"
      },
      {
        type: "win or lose",
        content: "Falcons Saints week 10"
      },
      {
        type: "win or lose",
        content: "Steelers Commanders week 10"
      },
      {
        type: "win or lose",
        content: "Broncos Chiefs week 10"
      },
      {
        type: "win or lose",
        content: "Bills Colts week 10"
      },
      {
        type: "win or lose",
        content: "Lions Texans week 10"
      },
      {
        type: "win or lose",
        content: "Rams Patriots week 11"
      },
      {
        type: "win or lose",
        content: "Jaguars Lions week 11"
      },
      {
        type: "win or lose",
        content: "Falcons Broncos week 11"
      },
      {
        type: "win or lose",
        content: "Cowboys Commanders week 12"
      },
      {
        type: "win or lose",
        content: "Cardinals Seahawks week 12"
      },
      {
        type: "win or lose",
        content: "Eagles Rams week 12"
      },
      {
        type: "win or lose",
        content: "Cardinals Seahawks week 13"
      },
      {
        type: "win or lose",
        content: "Eagles Rams week 13"
      },
      {
        type: "win or lose",
        content: "Patriots Jets week 13"
      },
      {
        type: "win or lose",
        content: "Cowboys Commanders week 14"
      },
      {
        type: "win or lose",
        content: "Lions Texans week 14"
      },
      {
        type: "win or lose",
        content: "Patriots Jets week 14"
      },
      {
        type: "win or lose",
        content: "Cowboys Commanders week 15"
      },
      {
        type: "win or lose",
        content: "Lions Texans week 15"
      },
      {
        type: "win or lose",
        content: "Patriots Jets week 15"
      },
      {
        type: "win or lose",
        content: "Cowboys Commanders week 16"
      },
      {
        type: "win or lose",
        content: "Lions Texans week 16"
      },
      {
        type: "win or lose",
        content: "Patriots Jets week 16"
      },
      {
        type: "win or lose",
        content: "Cowboys Commanders week 17"
      },
      {
        type: "win or lose",
        content: "Lions Texans week 17"
      },
      {
        type: "win or lose",
        content: "Patriots Jets week 17"
      },
      {
        type: "win or lose",
        content: "Cowboys Commanders week 18"
      },
      {
        type: "win or lose",
        content: "Lions Texans week 18"
      },
      {
        type: "win or lose",
        content: "Panthers Jets week 18"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 1"
      },
      {
        type: "over/under",
        content: "Panthers 18.5 week 1"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 2"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 3"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 4"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 5"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 6"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 7"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 8"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 9"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 10"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 11"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 12"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 13"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 14"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 15"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 16"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 17"
      },
      {
        type: "over/under",
        content: "Panthers 17.5 week 18"
      },
      {
        type: "win or lose",
        content: "Panthers Jets week 18"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 1"
      },
      {
        type: "over/under",
        content: "Cardinals 18.5 week 1"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 2"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 3"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 4"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 5"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 6"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 7"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 8"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 9"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 10"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 11"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 12"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 13"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 14"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 15"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 16"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 17"
      },
      {
        type: "over/under",
        content: "Cardinals 17.5 week 18"
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
