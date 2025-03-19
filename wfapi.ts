const apiUrl = 'https://dish.avifoodsystems.com/api/menu-items/week';
const data = {
    date: '3/19/25',
    locationId: 96,
    mealId: 149,
};

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
};

fetch(apiUrl, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error("Wellesley Fresh API not ok!");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    })