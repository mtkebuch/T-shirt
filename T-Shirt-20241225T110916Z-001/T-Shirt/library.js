const library = [
    {
        category: 'T-Shirts',
        name: 'Adult Quantity Tee',
        sizes: [
            { size: 'S', price: 17.99 },
            { size: 'M', price: 19.99 },
            { size: 'L', price: 21.99 },
            { size: 'XL', price: 23.99 },
            { size: 'XXL', price: 25.99 }
        ],
        material: 'Cotton',
        stock: 100,
        tag: 'basic',
        colors: ['Black', 'White', 'Gray', 'Blue', 'Red','Pink'],
        image: 'images/icons/clotheImages/AdultTee.png',
        watermarks: ["Hot"]
    },
    {
        category: 'T-Shirts',
        name: 'AOP Cut & Sew Tee',
        sizes: [
            { size: 'S', price: 22.99 },
            { size: 'M', price: 24.99 },
            { size: 'L', price: 26.99 },
            { size: 'XL', price: 28.99 },
            { size: 'XXL', price: 30.99 }
        ],
        material: 'Cotton',
        stock: 50,
        tag: 'graphic',
        colors: ['Black', 'White', 'Gray', 'Green', 'Yellow'],
        image: 'images/icons/clotheImages/prideTee.png'
    },
    {
        category: 'Hoodies',
        name: 'All-Over-Print Hoodie',
        sizes: [
            { size: 'S', price: 37.99 },
            { size: 'M', price: 39.99 },
            { size: 'L', price: 41.99 },
            { size: 'XL', price: 43.99 },
            { size: 'XXL', price: 45.99 }
        ],
        material: 'Polyester',
        stock: 30,
        tag: 'hoodie',
        colors: ['Black', 'White', 'Gray', 'Blue', 'Green'],
        image: 'images/icons/clotheImages/printhoodie.png',
        watermarks: ["-10%"]
    },
    {
        category: 'Hoodies',
        name: 'Premium Pullover Hoodie',
        sizes: [
            { size: 'S', price: 47.99 },
            { size: 'M', price: 49.99 },
            { size: 'L', price: 51.99 },
            { size: 'XL', price: 53.99 },
            { size: 'XXL', price: 55.99 }
        ],
        material: 'Polyester',
        stock: 20,
        tag: 'zip',
        colors: ['Black', 'White', 'Gray', 'Red', 'Blue'],
        image: 'images/icons/clotheImages/pulloverHoodie.png',
        watermarks: ["Sale!"]
    },
    {
        category: 'Accessories',
        name: 'Cap',
        sizes: [
            { size: 'One Size', price: 9.99 }
        ],
        material: 'Cotton',
        stock: 200,
        tag: 'cap',
        colors: ['Black', 'White', 'Gray', 'Red', 'Blue'],
        image: 'images/icons/clotheImages/cap.png',
        watermarks: ["-10%","Hot"]
    },
    {
        category: 'Accessories',
        name: 'Beanie',
        sizes: [
            { size: 'One Size', price: 14.99 }
        ],
        material: 'Wool',
        stock: 150,
        tag: 'beanie',
        colors: ['Blue'],
        image: 'images/icons/clotheImages/beanie.png'
    },
    {
        category: 'Pants',
        name: 'Joggers',
        sizes: [
            { size: 'S', price: 27.99 },
            { size: 'M', price: 29.99 },
            { size: 'L', price: 31.99 },
            { size: 'XL', price: 33.99 },
            { size: 'XXL', price: 35.99 }
        ],
        material: 'Cotton',
        stock: 75,
        tag: 'joggers',
        colors: ['Black', 'White', 'Gray', 'Blue', 'Green'],
        image: 'images/icons/clotheImages/joggers.jpeg',
        watermarks: ["Sale!"]
    },
    {
        category: 'Pants',
        name: 'Jeans',
        sizes: [
            { size: 'S', price: 32.99 },
            { size: 'M', price: 34.99 },
            { size: 'L', price: 36.99 },
            { size: 'XL', price: 38.99 },
            { size: 'XXL', price: 40.99 }
        ],
        material: 'Denim',
        stock: 60,
        tag: 'jeans',
        colors: ['Black', 'White', 'Gray', 'Blue', 'Green'],
        image: 'images/icons/clotheImages/Jeans.png'
    },
    {
        category: 'Shoes',
        name: 'Sneakers',
        sizes: [
            { size: '8', price: 57.99 },
            { size: '9', price: 59.99 },
            { size: '10', price: 61.99 },
            { size: '11', price: 63.99 },
            { size: '12', price: 65.99 }
        ],
        material: 'Leather',
        stock: 40,
        tag: 'sneakers',
        colors: ['White', 'Red', 'Blue'],
        image: 'images/icons/clotheImages/sneakers.png',
        watermarks: ["Hot"]
    },
    {
        category: 'Shoes',
        name: 'Running Shoes',
        sizes: [
            { size: '8', price: 67.99 },
            { size: '9', price: 69.99 },
            { size: '10', price: 71.99 },
            { size: '11', price: 73.99 },
            { size: '12', price: 75.99 }
        ],
        material: 'Mesh',
        stock: 50,
        tag: 'running',
        colors: ['Green','Gray'],
        image: 'images/icons/clotheImages/Runners.png',
        watermarks: ["Sale!","New"]
    },
    {
        category: 'Jackets',
        name: 'Bomber Jacket',
        sizes: [
            { size: 'S', price: 87.99 },
            { size: 'M', price: 89.99 },
            { size: 'L', price: 91.99 },
            { size: 'XL', price: 93.99 },
            { size: 'XXL', price: 95.99 }
        ],
        material: 'Nylon',
        stock: 25,
        tag: 'bomber',
        colors: ['Black', 'White', 'Gray', 'Green', 'Blue'],
        image: 'images/icons/clotheImages/bomber.png',
        watermarks: ["Hot", "Sale!"]
    },
    {
        category: 'Jackets',
        name: 'Leather Jacket',
        sizes: [
            { size: 'S', price: 97.99 },
            { size: 'M', price: 99.99 },
            { size: 'L', price: 101.99 },
            { size: 'XL', price: 103.99 },
            { size: 'XXL', price: 105.99 }
        ],
        material: 'Leather',
        stock: 15,
        tag: 'leather',
        colors: ['Black', 'White', 'Gray'],
        image: 'images/icons/clotheImages/leatherJacket.png'
    },
    {
        category: 'Socks',
        name: 'Ankle Socks',
        sizes: [
            { size: 'One Size', price: 4.99 }
        ],
        material: 'Cotton',
        stock: 300,
        tag: 'ankle',
        colors: ['Black', 'White', 'Gray', 'Blue', 'Green'],
        image: 'images/icons/clotheImages/ankleSocks.png'
    },
    {
        category: 'Socks',
        name: 'Crew Socks',
        sizes: [
            { size: 'One Size', price: 5.99 }
        ],
        material: 'Cotton',
        stock: 250,
        tag: 'crew',
        colors: ['Black', 'White', 'Gray', 'Red', 'Blue'],
        image: 'images/icons/clotheImages/crewSocks.png',
        watermarks: ["New"]
    },
    {
        category: 'Hats',
        name: 'Fedora',
        sizes: [
            { size: 'One Size', price: 19.99 }
        ],
        material: 'Wool',
        stock: 80,
        tag: 'fedora',
        colors: ['Black', 'White', 'Gray', 'Red', 'Blue'],
        image: 'images/icons/clotheImages/fedora.png',
        watermarks: ["Hot","New"]
    },
    {
        category: 'Hats',
        name: 'Sun Hat',
        sizes: [
            { size: 'One Size', price: 14.99 }
        ],
        material: 'Straw',
        stock: 100,
        tag: 'sunhat',
        colors: ['Black', 'White', 'Gray', 'Blue'],
        image: 'images/icons/clotheImages/sunHat.png'
    }
];

// Export the library for use in other files
export default library;