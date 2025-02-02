document.addEventListener("DOMContentLoaded", () => {
    let jsonData = [];

    // Fetch JSON data
    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            updateUI("daily"); // Default to Daily on load
        })
        .catch(error => console.error("Error loading data:", error));

    // Add event listeners to buttons
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            document.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
            
            // Add active class to the clicked button
            this.classList.add("active");

            // Get the timeframe text from the clicked button and convert to lowercase
            let timeframe = this.textContent.toLowerCase();
            updateUI(timeframe);
        });
    });

    // Function to update UI based on selected timeframe (daily, weekly, monthly)
    function updateUI(timeframe) {
        jsonData.forEach(item => {
            // Normalize title to match class names (remove spaces, lowercase)
            let cardClass = item.title.toLowerCase().replace(/\s+/g, '') + "_card";
            console.log(cardClass)
            let card = document.querySelector(`.${cardClass}`); // Get the card element

            if (card) {
                let currentElement = card.querySelector(".current"); // Get current time element
                let previousElement = card.querySelector(".previous"); // Get previous time element

                if (currentElement && previousElement) {
                    // Update the current and previous values based on selected timeframe
                    currentElement.textContent = `${item.timeframes[timeframe].current}hrs`;
                    previousElement.textContent = `Previous - ${item.timeframes[timeframe].previous}hrs`;
                }
            } else {
                console.warn(`Card not found for: ${item.title}`);
            }
        });
    }
});