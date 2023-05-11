import React from "react";
import { useEffect, useState } from "react";

// Build a game called Color Codes that displays a random color code HEX and asks the user to select which color it is.
// It should display 3 colored boxes, and the user should be able to click on one of them to select their answer.
// If the user selects the correct color, it should display a message saying "Correct!" and if they select the wrong color,
// it should display a message saying "Incorrect!".
// After each selection display a button to play again with the text "Play Again".
// When the user clicks the play again button, it should generate a new color code and new colored boxes,
// and they should be able to start the game again.
// To add styles, you can use the inline style property
// <div style={{ background: "#000000" }}>...</div>
// Criteria
// 1. The colored boxes should be displayed below the color code, and should be 100px by 100px in size.
// 2. The user should be able to click on one of the colored boxes to select their answer, ending the game.
// 3. If the user selects the correct color, it should display a message saying Correct! and a button to play again.
// 4. If the user selects the wrong color, it should display a message saying "Incorrect!" and a button to play again.
// 5. When the user clicks the play again button Play Again, it should generate a new color code and new colored boxes.
// 6. The container for the colored boxes should have a data-testid of color-container.
// 7. The colored boxes should have a data-testid of correct-color if it is the correct color,
// and incorrect-color if it is not the correct color.
// Note: Without the data-testid properties, your tests will fail.

export default function ColorCodes() {
  const [hexCode, setHexCode] = useState("");
  const [colorCodes, setColorCodes] = useState([]);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  function getHexCode() {
    const characters = "0123456789ABCDEF";
    let newHexCode = "#";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length); // in this case, the each character is the random index
      newHexCode += characters.charAt(randomIndex);
    }
    return newHexCode;
  }

  function getColors() {
    const newColors = [];

    for (let i = 0; i < 3; i++) {
      //   const randomHexCode = getHexCode();
      newColors.push(getHexCode()); // push the newHexCode into the newColors array but its found in the function getHexCode()
    }
    const randomIndex = Math.floor(Math.random() * newColors.length); // in this case, the color is the random index

    setHexCode(newColors[randomIndex]);
    setColorCodes(newColors);
  }

  function userSelect(answer) {
    if (answer === hexCode) {
      setMessage("Correct!");
    } else {
      setMessage("Incorrect!");
    }
    setIsGameOver(true);
  }

  function handleClick() {
    getHexCode();
    getColors();
    setMessage("");
    setIsGameOver(false);
  }

  useEffect(() => {
    getColors();
  }, []);

  return (
    <div className="container">
      <h1>Color Code Game</h1>
      <span>{hexCode}</span>

      <h2>Guess the color code!</h2>
      <div className="color-container" style={{}}>
        {colorCodes.map((color, index) => {
          return (
            <div
              className="color"
              key={index}
              onClick={() => (isGameOver ? null : userSelect(color))}
              style={{
                backgroundColor: color,
                width: "100px",
                height: "100px",
                display: "flex",
                flexDirection: "row",
              }}
            ></div>
          );
        })}
      </div>
      {message && (
        <div>
          <p>{message}</p>
          <button onClick={handleClick}>Play Again</button>
        </div>
      )}
    </div>
  );
}
