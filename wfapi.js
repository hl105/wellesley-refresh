const date = "3/19/25"
const locationId = 96
const mealId = 149

const apiUrl = `https://dish.avifoodsystems.com/api/menu-items/week?date=${date}&locationId=${locationId}&mealId=${mealId}`;

class Dish {
    constructor(id, name, description) {
        this.id = id,
        this.name = name,
        this.description = description
    }

    toString() {
        return `${this.name} (${this.id}): ${this.description}`
    }
}

function extract(food) {
    let menus = {};
    food.forEach(dish => {
        let date = dish.date.slice(0,10);
        if (!(date in menus)) {
            menus[date] = {};
        }
        if (!(dish.stationName in menus[date])) {
            menus[date][dish.stationName] = [];
        }
        menus[date][dish.stationName].push(new Dish(dish.id, dish.name, dish.description));
    });
    return menus;
}



fetch(apiUrl)
.then(response => {
    if (!response.ok) {
        throw new Error("Wellesley Fresh API not ok!");
    }
    return response.json();
})
.then(data => {
    const stations = extract(data);
    console.log(stations);
    console.log(stations['2025-03-19']['HOMESTYLE LUNCH'][0]);
})
.catch(error => {
    console.error('Error:', error);
});