import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import { useParams } from "react-router-dom";

import DeckForm from "./form";

function DeckEdit() {
  const [deck, setDeck] = useState({ name: "", description: "" });

  const history = useHistory();
  const { deckId } = useParams();

  console.log("deck in edit:", deck);
  useEffect(loadDeck, [deckId]);

  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }

  function submitHandler(updatedDeck) {
    updateDeck(updatedDeck).then(() => {
      history.push(`/decks/${deckId}`);
    });
  }

  function cancel() {
    history.goBack();
  }

  // This is why I had the conditional render only once we have the deck id then load the form 🤦🏻‍♂️
  const renderForm = deck.id ? (
    <DeckForm onCancel={cancel} onSubmit={submitHandler} initialState={deck} />
  ) : (
    <p>Loading...</p>
  );

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      {renderForm}
    </div>
  );
}

export default DeckEdit;