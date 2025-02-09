import "./App.css";
import Dice from "./components/Dice";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

interface Dice {
    value: number;
    isHeld: boolean;
    id: string;
}

export default function App() {
    const [diceArray, setDiceArray] = useState<Dice[]>(() => generateRandomDices());
    const buttonRef = useRef<HTMLButtonElement>(null);
    console.log(buttonRef);

    // const numberMap: Map<number, number> = new Map();
    const isWin =
        diceArray.every((dice) => dice.isHeld) &&
        diceArray.every((dice) => dice.value === diceArray[0].value);

    // put focus on roll button when game won
    useEffect(() => {
        if (isWin && buttonRef.current) {
            buttonRef.current.focus();
        }
    }, [isWin]);

    // generate 10 random dices after refreshing
    function generateRandomDices() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        }));
    }

    // roll all unheld dices
    function rollDices() {
        if (isWin) {
            setDiceArray(generateRandomDices());
        } else {
            setDiceArray((prevdices) => {
                return prevdices.map((dice) => {
                    return dice.isHeld ? dice : { ...dice, value: Math.ceil(Math.random() * 6) };
                });
            });
        }
    }

    // ********* a way to check isWin (useEffect) ***********
    /*
    // Add useEffect to track held dice
    useEffect(() => {
        // Clear previous map
        numberMap.clear();
        // Count held dice
        diceArray.forEach((dice) => {
            if (dice.isHeld) {
                const currentCount = numberMap.get(dice.value) || 0;
                numberMap.set(dice.value, currentCount + 1);
            }
        });

        // Check win condition
        const values = Array.from(numberMap.values());
        if (numberMap.size === 1 && values[0] === 10) {
            console.log("complete the game");
        }
    }, [diceArray]);
    */

    // hold a unheld dice, turn it into light green
    // add/pop its value to numberMap
    function holdDice(id: string) {
        setDiceArray((prevDices) =>
            prevDices.map((dice) => (dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice))
        );
    }

    const diceElements = diceArray.map((diceObj) => (
        <Dice
            key={diceObj.id}
            value={diceObj.value}
            isHeld={diceObj.isHeld}
            handleClick={() => holdDice(diceObj.id)}
        />
    ));

    return (
        <main>
            {isWin && <Confetti />}
            <h2 className="instructions">Tenzies</h2>
            <p className="instructions">选择并刷新直到所有骰子变成相同的数字。（点击骰子可固定）</p>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-button" onClick={rollDices} ref={buttonRef}>
                {isWin ? "再玩一局" : "刷新"}
            </button>
        </main>
    );
}
