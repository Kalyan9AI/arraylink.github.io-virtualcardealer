// Sample car data (replace with your actual data)
const cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2022, price: 25000, miles: 15000, image: './images/toyota-camry.jpg' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2021, price: 22000, miles: 20000, image: './images/honda-civic.jpg' },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2023, price: 35000, miles: 5000, image: './images/ford-mustang.jpg' },
];


function displayCars() {
    const carListings = document.getElementById('car-listings');
    
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.make} ${car.model}">
            <h3>${car.year} ${car.make} ${car.model}</h3>
            <p>Price: $${car.price.toLocaleString()}</p>
            <p>Mileage: ${car.miles.toLocaleString()} miles</p>
        `;
        carListings.appendChild(carCard);
    });
}

// Call the function when the page loads
window.onload = displayCars;
