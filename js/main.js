document.addEventListener('DOMContentLoaded', function() {
    // Sample vehicle data (in a real app, this would come from a database)
    const vehicles = [
        { id: 1, make: 'Toyota', model: 'Camry', year: 2023, price: 25000, image: 'images/camry.jpg' },
        { id: 2, make: 'Honda', model: 'Accord', year: 2022, price: 27000, image: 'images/accord.jpg' },
        { id: 3, make: 'Ford', model: 'Mustang', year: 2023, price: 45000, image: 'images/mustang.jpg' }
    ];
    
    const vehicleContainer = document.getElementById('vehicle-container');
    const filterButton = document.getElementById('filter-button');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    const priceRange = document.getElementById('price');
    const priceValue = document.getElementById('price-value');
    
    // Display all vehicles initially
    displayVehicles(vehicles);
    
    // Update price value display
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = '$' + Number(this.value).toLocaleString();
        });
    }
    
    // Apply filters when button is clicked
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const selectedMake = makeSelect.value;
            const selectedModel = modelSelect.value;
            const maxPrice = parseInt(priceRange.value);
            
            const filteredVehicles = vehicles.filter(vehicle => {
                return (selectedMake === '' || vehicle.make.toLowerCase() === selectedMake) &&
                       (selectedModel === '' || vehicle.model.toLowerCase() === selectedModel) &&
                       vehicle.price <= maxPrice;
            });
            
            displayVehicles(filteredVehicles);
        });
    }
    
    // Function to display vehicles
    function displayVehicles(vehiclesToShow) {
        if (!vehicleContainer) return;
        
        vehicleContainer.innerHTML = '';
        
        vehiclesToShow.forEach(vehicle => {
            const vehicleCard = document.createElement('div');
            vehicleCard.className = 'vehicle-card';
            vehicleCard.innerHTML = `
                <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
                <h3>${vehicle.make} ${vehicle.model}</h3>
                <p class="year">${vehicle.year}</p>
                <p class="price">$${vehicle.price.toLocaleString()}</p>
                <div class="card-actions">
                    <button class="view-details" data-id="${vehicle.id}">View Details</button>
                    <button class="add-favorite" data-id="${vehicle.id}">♡</button>
                </div>
            `;
            vehicleContainer.appendChild(vehicleCard);
        });
        
        // Add event listeners to the newly created buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const vehicleId = this.getAttribute('data-id');
                window.location.href = `vehicle-details.html?id=${vehicleId}`;
            });
        });
        
        document.querySelectorAll('.add-favorite').forEach(button => {
            button.addEventListener('click', function() {
                const vehicleId = this.getAttribute('data-id');
                this.textContent = '♥';
                this.classList.add('favorited');
                // Save to localStorage or similar
                saveFavorite(vehicleId);
            });
        });
    }
    
    function saveFavorite(vehicleId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(vehicleId)) {
            favorites.push(vehicleId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }
});
