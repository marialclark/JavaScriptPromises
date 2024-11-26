// Part 2: Deck of Cards
$(function() {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  // 1.
  $.getJSON(`${baseURL}/new/draw/?count=1`).then(data => {
      let { suit, value } = data.cards[0];
      console.log(`${value} of ${suit}`);
  });

  // 2.
  let card1 = null;
  let card2 = null;
  $.getJSON(`${baseURL}/new/draw/?count=1`)
    .then(data => {
      card1 = data.cards[0];
      let deckID = data.deck_id;
      return $.getJSON(`${baseURL}/${deckID}/draw/?count=1`);
    })
    .then(data => {
      card2 = data.cards[0];
      console.log(`${card1.value} of ${card1.suit}`);
      console.log(`${card2.value} of ${card2.suit}`);
    });

    // 3.
    let deckID = null;
    $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
      deckID = data.deck_id;
      $('button').show();
    });

    $('button').on('click', function() {
      $.getJSON(`${baseURL}/${deckID}/draw/?count=1`)
        .then(data => {
          let cardImage = data.cards[0].image;
          $('#card-display').append(
            $('<img>', {
              src: cardImage
            })
          );
          if (data.remaining === 0) {
            // Disable button
            $('button').prop('disabled', true);

            // Displays message letting user know the deck is finished.
            $('#card-display').append(
              $('<div>', {
                text: 'Deck finished. Refresh for new deck.',
                class: 'alert alert-warning mt-4',
              })
            );
          }
        });
    });
});
