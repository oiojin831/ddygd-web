import React from "react";
import "./App.css";
import { SuspenseWithPerf, useFirestoreDocData, useFirestore } from "reactfire";

function Burrito() {
  // lazy load the Firestore SDK
  const firestore = useFirestore();

  // create a document reference
  const burritoRef = firestore()
    .collection("tryreactfire")
    .doc("burrito");

  // subscribe to the doc. just one line!
  interface Burrito {
    yummy: boolean;
    eungjin: string;
  }

  const burrito: Burrito = useFirestoreDocData(burritoRef);

  // get the value from the doc
  const { yummy, eungjin } = burrito;

  return (
    <div>
      <p>The burrito is {yummy ? "good" : "bad"}</p>
      <p>The eungjin is {eungjin}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <SuspenseWithPerf
        fallback={"loading burrito status..."}
        traceId={"load-burrito-status"}
      >
        <Burrito />
      </SuspenseWithPerf>
    </div>
  );
}

export default App;
