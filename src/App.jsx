import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useCallback } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numChecked, setNumChecked] = useState(false);
  const [charChecked, setCharChecked] = useState(false);
  const [currentPassword, setPassword] = useState("");
  const passwordRef = useRef(null);

  useEffect(() => {
    generatePassword(length);
  }, [numChecked, charChecked, length]);

  const handleCopy = () => {
    if (currentPassword === "") {
      return;
    }
    try {
      navigator.clipboard.writeText(currentPassword);
      passwordRef.current.select();
      toast.success("Password copied to clipboard!");
    } catch (error) {
      alert("Error Copying");
    }
  };

  function numberChangeEvent(event) {
    setLength(event.target.value);
  }

  function numberLengthChange() {
    generatePassword(length);
  }

  function numbersChecked() {
    setNumChecked(!numChecked);
  }

  function charactersChecked() {
    setCharChecked(!charChecked);
  }

  const generatePassword = useCallback((length) => {
    if (length > 25 || length < 8) {
      console.log("Password Length should be between 8-25 characters");
      return;
    }

    let arr = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const numArray = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
    ];
    const charArray = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "_",
      "=",
      "+",
      "[",
      "]",
      "{",
      "}",
      ";",
      ":",
      "'",
      '"',
      ",",
      ".",
      "/",
      "<",
      ">",
      "?",
      "|",
      "`",
      "~",
    ];

    if (numChecked) {
      arr = [...numArray, ...arr];
    }
    if (charChecked) {
      arr = [...arr, ...charArray];
    }
    let password = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      password = password + arr[randomIndex];
    }
    setPassword(password);
    console.log(password);
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-black p-5 bg-green-100">
        <h1 className="text-3xl p-2 m-3">Password Generator</h1>
        <div className="flex justify-items-end">
          <input
            className={`border-black border-2 p-2`}
            value={currentPassword}
            readOnly
            ref={passwordRef}
            
          ></input>
          <button
            className="border-2 border-black  bg-red-200 ml-2 p-1"
            onClick={handleCopy}
          >
            Copy Password
          </button>
        </div>
        <div className="flex">
          <label className="p-2 flex items-center justify-center">
            <input
              type="number"
              min={8}
              max={25}
              onChange={(event) => numberChangeEvent(event)}
              className="border-2 border-black"
              placeholder=" Length of password"
              defaultValue={8}
            ></input>
            <button
              className="border-2 border-black bg-red-200 ml-2 pr-2 pl-2"
              onClick={() => numberLengthChange()}
            >
              Generate More
            </button>
          </label>
          <label className="p-2 flex items-center justify-center">
            <input type="checkbox" onChange={() => numbersChecked()}></input>
            Numbers
          </label>
          <label className="p-2 flex items-center justify-center">
            <input type="checkbox" onChange={() => charactersChecked()}></input>
            Chars
          </label>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
