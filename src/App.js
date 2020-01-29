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
  const burrito = useFirestoreDocData(burritoRef);

  // get the value from the doc
  const isYummy = burrito.yummy;
  const eungjin = burrito.eungjin;

  return <div>
    <p>The burrito is {isYummy ? "good" : "bad"}</p>
    <p>The eungjin is {eungjin}</p>
  </div>
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
