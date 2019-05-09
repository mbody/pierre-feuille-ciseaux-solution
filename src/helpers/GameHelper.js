import rock from "../assets/images/rock.png";
import paper from "../assets/images/paper.png";
import scissors from "../assets/images/scissors.png";

export interface Option {
    id: string;
    img: any;
}
export const OPTIONS:Option[] = [
    {
        id: 'rock',
        img: rock
    },
    {
        id: 'paper',
        img: paper
    },
    {
        id: 'scissors',
        img: scissors
    }];

export const RESULT = {
    playerWon: 'playerWon',
    playerLost: 'playerLost',
    draw: 'draw',
};

/**
 * a table with the player choice in row, and computer choice in column,
 *.----------.------.-------.----------.
 *|          | Rock | Paper | Scissors |
 *:----------+------+-------+----------:
 *| Rock     | draw |  lost |     wins |
 *:----------+------+-------+----------:
 *| Paper    | wins |  draw |     lost |
 *:----------+------+-------+----------:
 *| Scissors | lost |  wins |     draw |
 *'----------'------'-------'----------'
 *
 * @type {Array}
 */
const resultTable = [
    [RESULT.draw, RESULT.playerLost, RESULT.playerWon],
    [RESULT.playerWon, RESULT.draw, RESULT.playerLost],
    [RESULT.playerLost, RESULT.playerWon, RESULT.draw]
];



export class GameHelper {


    static generateComputerChoice() {
        const r = Math.floor(Math.random() * 3);
        return OPTIONS[r];
    }

    static calculateWhoWins(playerChoice, computerChoice) {

        const playerIndex = OPTIONS.indexOf(playerChoice);
        const computerIndex = OPTIONS.indexOf(computerChoice);

        return resultTable[playerIndex][computerIndex];
    }

    static getResultMessage(result) {
        let msg = '';
        switch (result) {
            case RESULT.playerWon :
                msg = 'Bravo !';
                break;
            case RESULT.playerLost :
                msg = 'Perdu !';
                break;
            case RESULT.draw :
                msg = 'Egalité !';
                break;
        }
        return msg;
    };
}
