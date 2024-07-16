document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.getElementById('card-grid');
    const gridLevelSelect = document.getElementById('grid-level');

    // Event listener for when grid level changes
    gridLevelSelect.addEventListener('change', () => {
        const level = parseInt(gridLevelSelect.value);
        generateCards(level);
    });

    // Function to generate cards based on selected level
    function generateCards(level) {
        cardGrid.innerHTML = ''; // Clear existing cards

        const totalCards = level * level;
        const cardValues = Array.from({ length: totalCards }, (_, index) => index + 1);

        cardValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <img src="./Images/cardFront.png" alt="Image">
                    </div>
                    <div class="card-back">
                        <p>${value}</p>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => {
                card.classList.add('flip');
                setTimeout(() => {
                    card.classList.remove('flip');
                }, 1000);
            });
            cardGrid.appendChild(card);
        });
    }

    // Initial generation of cards
    generateCards(parseInt(gridLevelSelect.value));
});
