document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.getElementById('card-grid');
    const gridLevelSelect = document.getElementById('grid-level');
    const allowedFlipsSpan = document.getElementById('allowed-flips');
    const wrongFlipsSpan = document.getElementById('wrong-flips');
    const matchedFlipsSpan = document.getElementById('matched-flips');
    const remainingFlipsSpan = document.getElementById('remaining-flips');
    const accuracySpan = document.getElementById('accuracy');
    const bonusSpan = document.getElementById('bonus');
    const tipsSpan = document.getElementById('tips');

    // Event listener for when grid level changes
    gridLevelSelect.addEventListener('change', () => {
        const level = parseInt(gridLevelSelect.value);
        generateCards(level);
    });

    // Function to generate cards based on selected level
    function generateCards(level) {
        cardGrid.innerHTML = ''; // Clear existing cards

        // Calculate total number of cards
        const totalCards = level * level;

        // Calculate card size dynamically based on viewport size and grid level
        const headerHeight = document.querySelector('.header').offsetHeight;
        const availableHeight = window.innerHeight - headerHeight - 30; // Adjust 30 for padding
        const availableWidth = window.innerWidth - 30; // Adjust 30 for padding

        const maxCardWidth = Math.floor(availableWidth / level) - 10; // Adjust 10 for grid gap
        const maxCardHeight = Math.floor(availableHeight / level) - 10; // Adjust 10 for grid gap
        const cardSize = Math.min(maxCardWidth, maxCardHeight);

        // Create card elements
        for (let i = 1; i <= totalCards; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.width = `${cardSize}px`;
            card.style.height = `${cardSize}px`;

            // Create card inner elements
            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.innerHTML = `<img src="./Images/cardFront.png" alt="Image">`;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.textContent = i;

            // Append card front and back to card inner
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);

            // Append card inner to card
            card.appendChild(cardInner);

            // Add click event listener to flip the card
            card.addEventListener('click', () => {
                card.classList.add('flip');
                setTimeout(() => {
                    card.classList.remove('flip');
                }, 1000);
                // Update game stats here
                // Example: increment wrong flips count
                let wrongFlips = parseInt(wrongFlipsSpan.textContent);
                wrongFlips++;
                wrongFlipsSpan.textContent = wrongFlips;
            });

            // Append card to card grid
            cardGrid.appendChild(card);
        }

        // Apply CSS grid styles based on selected level
        cardGrid.style.gridTemplateColumns = `repeat(${level}, 1fr)`;
        cardGrid.style.gridTemplateRows = `repeat(${level}, 1fr)`;
    }

    // Initial generation of cards
    generateCards(parseInt(gridLevelSelect.value));

    // Re-generate cards on window resize to adjust card size
    window.addEventListener('resize', () => {
        const level = parseInt(gridLevelSelect.value);
        generateCards(level);
    });
});
