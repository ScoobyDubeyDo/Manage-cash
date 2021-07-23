import { useState } from "react";
import "./styles.css";
export default function App() {
  const [billAmt, setBillAmt] = useState("");
  const [cshGivn, setCshGivn] = useState("");
  const [btnVlu, setBtnVlu] = useState("CHECK");
  const [output, setOutput] = useState("");

  const notes = [2000, 500, 200, 100, 20, 10, 5, 1];
  let noteCounts = Array(8).fill(0);
  const amount = cshGivn - billAmt;

  const noteCounter = (amt) => {
    for (let i = 0; i < notes.length; i++) {
      if (amt >= notes[i]) {
        noteCounts[i] = Math.floor(amt / notes[i]);
        amt = amt - noteCounts[i] * notes[i];
      }
    }
  };
  const clickHandler = () => {
    if (parseInt(billAmt) >= parseInt(cshGivn)) {
      setOutput(
        <div className="err-dsply">
          The bill amount is less than or equal to the cash amount given.{" "}
        </div>
      );
    } else {
      if (parseInt(billAmt) > 0 && parseInt(cshGivn) > 0) {
        setBtnVlu("CHECK");
        noteCounter(amount);
        setOutput(
          <>
            <div>Return Change :</div>
            <table>
              <tr>
                <th>Notes</th>
                {notes.map((note) => {
                  return <td key={note}>{note}</td>;
                })}
              </tr>
              <tr>
                <th>No.of Notes</th>
                {noteCounts.map((noteCount) => {
                  return <td>{noteCount}</td>;
                })}
              </tr>
            </table>
          </>
        );
      } else {
        setBtnVlu("TRY AGAIN");
        setOutput(<div className="err-dsply"> Enter valid bill amount </div>);
      }
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Cash Register Manager</h1>
        <p>
          Enter the bill amount and cash given by the customer and know minimum
          number of notes to return.
        </p>
      </header>
      <label htmlFor="bill-amount">Bill Amount: </label>
      <input
        type="number"
        id="bill-amount"
        min="1"
        value={billAmt}
        onChange={(e) => setBillAmt(e.target.value)}
      />
      {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      <label htmlFor="cash-given"> Cash Given: </label>
      <input
        type="number"
        id="cash-given"
        value={cshGivn}
        onChange={(e) => setCshGivn(e.target.value)}
      />
      {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      <div className="output">{output}</div>

      {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      <button className="check-result" onClick={clickHandler}>
        {btnVlu}
      </button>
    </div>
  );
}
