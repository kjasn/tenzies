import "../App.css";

interface DiceProps {
    value: number;
    isHeld: boolean;
    handleClick: () => void;
}

export default function Dice(props: DiceProps) {
    return (
        // add held-dice to its className directly rather than change it to held-dice
        <button
            className={`dice ${props.isHeld ? "held-dice" : ""}`}
            onClick={props.handleClick}
            aria-pressed={props.isHeld}
            aria-label={`Dice with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >
            {props.value}
        </button>
    );
}
