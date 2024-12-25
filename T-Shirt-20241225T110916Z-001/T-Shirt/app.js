import library from './library.js';
import pricingPlansHTML from './pricingPlansHTML.js';

const itemsPerPage = 12;
let currentPage = 1;
let currentSort = 'default';
let currentView = 'grid'; // Default view is grid
let filters = {
    search: '',
    categories: [],
    price: [0, 200],
    colors: [],
    sizes: [],
    stock: [0, 300]
};

// Function to generate HTML for a product
function generateProductHTML(product) {
    const priceRange = `${Math.min(...product.sizes.map(size => size.price)).toFixed(2)} - ${Math.max(...product.sizes.map(size => size.price)).toFixed(2)}`;
    const firstTwoColors = product.colors.slice(0, 2).map(color => `<span class="color-circle" style="background-color: ${color.toLowerCase()};"></span>`).join('');
    const additionalColors = product.colors.length > 2 ? `+${product.colors.length - 2}` : '';
    const watermarkColors = {
        "-10%": "rgba(255, 0, 0, 0.7)",
        "Hot": "rgba(255, 165, 0, 0.7)",
        "Sale!": "rgba(0, 128, 0, 0.7)",
        "New": "rgba(0, 0, 255, 0.7)"
    };

    const watermarkHTML = (product.watermarks || []).map(watermark => `
        <div class="watermark" style="background-color: ${watermarkColors[watermark]}">${watermark}</div>
    `).join('');

    return `
        <div class="product ${currentView === 'list' ? 'list-view' : ''}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${watermarkHTML}
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${priceRange}</p>
                <div class="product-colors">
                    ${firstTwoColors}
                    <span class="additional-colors">${additionalColors}</span>
                    <div class="all-colors" style="display: none;">
                        ${product.colors.map(color => `<span class="color-circle" style="background-color: ${color.toLowerCase()};"></span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to sort products
function sortProducts(products, sortOption) {
    if (sortOption === 'price-asc') {
        return products.sort((a, b) => Math.min(...a.sizes.map(size => size.price)) - Math.min(...b.sizes.map(size => size.price)));
    } else if (sortOption === 'price-desc') {
        return products.sort((a, b) => Math.max(...b.sizes.map(size => size.price)) - Math.max(...a.sizes.map(size => size.price)));
    }
    return products;
}

function filterProducts(products) {
    return products.filter(product => {
        const priceRange = product.sizes.map(size => size.price);
        const minPrice = Math.min(...priceRange);
        const maxPrice = Math.max(...priceRange);

        const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
        const matchesPrice = minPrice >= filters.price[0] && maxPrice <= filters.price[1];
        const matchesColor = filters.colors.length === 0 || filters.colors.some(color => product.colors.includes(color));
        const matchesSize = filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.map(s => s.size).includes(size));
        const matchesStock = filters.stock === 'on-sale' ? product.watermarks && product.watermarks.includes('Sale!') : product.stock > 0;

        return matchesSearch && matchesCategory && matchesPrice && matchesColor && matchesSize && matchesStock;
    });
}

function displayProducts(page) {
    const productsGrid = document.querySelector('.productsGrid');
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const sortedProducts = sortProducts([...library], currentSort);
    const filteredProducts = filterProducts(sortedProducts);
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
    productsGrid.innerHTML = productsToDisplay.map(generateProductHTML).join('');

    // Add event listeners to show all colors on mouseenter
    document.querySelectorAll('.additional-colors').forEach(element => {
        element.addEventListener('mouseover', function() {
            this.nextElementSibling.style.display = 'flex';
        });
        element.addEventListener('mouseout', function() {
            this.nextElementSibling.style.display = 'none';
        });
    });

    updatePagination(filteredProducts.length);
    updateColorCounters(library); // Update color counters based on the entire library
    updateCategoryCounters(library); // Update category counters based on the entire library
    updateSizeCounters(library); // Update size counters based on the entire library
    // No need to update stock status counters as they don't have counters
}
// Function to update pagination buttons
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            displayProducts(currentPage);
        });
        pagination.appendChild(button);
    }
}

// Event listener for sorting options
document.getElementById('sort-options').addEventListener('change', function() {
    currentSort = this.value;
    displayProducts(currentPage);
});

// Event listeners for view options
document.getElementById('grid-view-icon').addEventListener('click', function() {
    currentView = 'grid';
    displayProducts(currentPage);
});

document.getElementById('list-view-icon').addEventListener('click', function() {
    currentView = 'list';
    displayProducts(currentPage);
});

// Event listeners for filters
document.getElementById('product-search').addEventListener('input', function() {
    filters.search = this.value;
    displayProducts(currentPage);
});

document.querySelectorAll('#product-categories input').forEach(input => {
    input.addEventListener('change', function() {
        filters.categories = Array.from(document.querySelectorAll('#product-categories input:checked')).map(input => input.value);
        displayProducts(currentPage);
    });
});

document.getElementById('price-slider').addEventListener('input', function() {
    const value = this.value;
    filters.price = [0, value];
    document.getElementById('price-range').textContent = `0 - ${value}`;
    displayProducts(currentPage);
});

document.querySelectorAll('#color-filter input').forEach(input => {
    input.addEventListener('change', function() {
        filters.colors = Array.from(document.querySelectorAll('#color-filter input:checked')).map(input => input.value);
        displayProducts(currentPage);
    });
});

document.querySelectorAll('#size-filter input').forEach(input => {
    input.addEventListener('change', function() {
        filters.sizes = Array.from(document.querySelectorAll('#size-filter input:checked')).map(input => input.value);
        displayProducts(currentPage);
    });
});



// Call the function to display products when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => displayProducts(currentPage));


document.addEventListener('DOMContentLoaded', () => {
    displayProducts(currentPage);

    const priceSlider = document.getElementById('price-slider');
    const sliderTrack = document.getElementById('slider-track');
    const handleLeft = document.getElementById('slider-handle-left');
    const handleRight = document.getElementById('slider-handle-right');
    const priceRange = document.getElementById('price-range');

    let minPrice = 0;
    let maxPrice = 200;
    let currentMinPrice = minPrice;
    let currentMaxPrice = maxPrice;

    function updatePriceRange() {
        priceRange.innerHTML = `Price range: $${currentMinPrice.toFixed(2)} - $${currentMaxPrice.toFixed(2)}`;
        filters.price = [currentMinPrice, currentMaxPrice];
        displayProducts(currentPage);
    }

    function handleMove(event, handle) {
        const sliderRect = priceSlider.getBoundingClientRect();
        const sliderWidth = sliderRect.width;
        const offsetX = event.clientX - sliderRect.left;

        if (handle === handleLeft) {
            const newLeft = Math.min(Math.max(0, offsetX), handleRight.offsetLeft);
            handleLeft.style.left = `${newLeft}px`;
            currentMinPrice = (newLeft / sliderWidth) * (maxPrice - minPrice);
        } else {
            const newRight = Math.max(Math.min(sliderWidth, offsetX), handleLeft.offsetLeft);
            handleRight.style.left = `${newRight}px`;
            currentMaxPrice = (newRight / sliderWidth) * (maxPrice - minPrice);
        }

        sliderTrack.style.left = `${handleLeft.offsetLeft}px`;
        sliderTrack.style.width = `${handleRight.offsetLeft - handleLeft.offsetLeft}px`;

        updatePriceRange();
    }

    handleLeft.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', onMouseMoveLeft);
        document.addEventListener('mouseup', onMouseUp);
    });

    handleRight.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', onMouseMoveRight);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMoveLeft(event) {
        handleMove(event, handleLeft);
    }

    function onMouseMoveRight(event) {
        handleMove(event, handleRight);
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMoveLeft);
        document.removeEventListener('mousemove', onMouseMoveRight);
        document.removeEventListener('mouseup', onMouseUp);
    }

    updatePriceRange();
});


// Function to get all unique colors from the product library
function getAllColors(products) {
    const colors = new Set();
    products.forEach(product => {
        product.colors.forEach(color => colors.add(color));
    });
    return Array.from(colors);
}

// Function to update the item counters for each color
function updateColorCounters(products) {
    const colorFilter = document.getElementById('color-filter');
    const colorItems = colorFilter.querySelectorAll('li');

    colorItems.forEach(item => {
        const color = item.getAttribute('data-color');
        const count = library.filter(product => product.colors.includes(color)).length;
        const counter = item.querySelector('.item-counter');
        counter.textContent = `${count}`;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const colorFilter = document.getElementById('color-filter');
    
    // Clear existing color filter items
    colorFilter.innerHTML = '';

    const allColors = getAllColors(library);

    allColors.forEach(color => {
        const colorItem = document.createElement('li');
        colorItem.setAttribute('data-color', color);
        colorItem.innerHTML = `
            <span class="filter-color-circle" style="background-color: ${color.toLowerCase()};"></span>
            ${color}
            <span class="item-counter">0</span>
        `;
        colorFilter.appendChild(colorItem);
    });

    const colorItems = colorFilter.querySelectorAll('li');

    colorItems.forEach(item => {
        item.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            filters.colors = [color]; // Set the selected color as the only filter
            displayProducts(currentPage);
        });
    });

    // Initial update of color counters
    updateColorCounters(library);
});


// Function to get all unique categories from the product library
function getAllCategories(products) {
    const categories = new Set();
    products.forEach(product => {
        categories.add(product.category);
    });
    return Array.from(categories);
}

// Function to update the item counters for each category
function updateCategoryCounters(products) {
    const categoryFilter = document.getElementById('category-filter');
    const categoryItems = categoryFilter.querySelectorAll('li');

    categoryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const count = library.filter(product => product.category === category).length;
        const counter = item.querySelector('.item-counter');
        counter.textContent = `${count}`;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    
    // Clear existing category filter items
    categoryFilter.innerHTML = '';

    const allCategories = getAllCategories(library);

    allCategories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.setAttribute('data-category', category);
        categoryItem.classList.add('filter-category');
        categoryItem.innerHTML = `
            ${category}
            <span class="item-counter">0</span>
        `;
        categoryFilter.appendChild(categoryItem);
    });

    const categoryItems = categoryFilter.querySelectorAll('li');

    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filters.categories = [category]; // Set the selected category as the only filter
            displayProducts(currentPage);
        });
    });

    // Initial update of category counters
    updateCategoryCounters(library);
});

// Function to get all unique sizes from the product library
function getAllSizes(products) {
    const sizes = new Set();
    products.forEach(product => {
        product.sizes.forEach(size => sizes.add(size.size));
    });
    return Array.from(sizes);
}

// Function to update the item counters for each size
function updateSizeCounters(products) {
    const sizeFilter = document.getElementById('size-filter');
    const sizeItems = sizeFilter.querySelectorAll('li');

    sizeItems.forEach(item => {
        const size = item.getAttribute('data-size');
        const count = library.filter(product => product.sizes.some(s => s.size === size)).length;
        const counter = item.querySelector('.item-counter');
        counter.textContent = `${count}`;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const sizeFilter = document.getElementById('size-filter');
    
    // Clear existing size filter items
    sizeFilter.innerHTML = '';

    const allSizes = getAllSizes(library);

    allSizes.forEach(size => {
        const sizeItem = document.createElement('li');
        sizeItem.setAttribute('data-size', size);
        sizeItem.classList.add('filter-size');
        sizeItem.innerHTML = `
            ${size}
            <span class="item-counter">0</span>
        `;
        sizeFilter.appendChild(sizeItem);
    });

    const sizeItems = sizeFilter.querySelectorAll('li');

    sizeItems.forEach(item => {
        item.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            filters.sizes = [size]; // Set the selected size as the only filter
            displayProducts(currentPage);
        });
    });

    // Initial update of size counters
    updateSizeCounters(library);
});

function updateStockStatusCounters(products) {
    const stockStatusFilter = document.getElementById('stock-status-filter');
    const stockStatusItems = stockStatusFilter.querySelectorAll('li');

    stockStatusItems.forEach(item => {
        const status = item.getAttribute('data-status');
        let count;
        if (status === 'on-sale') {
            count = library.filter(product => product.watermarks && product.watermarks.includes('Sale!')).length;
        } else if (status === 'in-stock') {
            count = library.filter(product => product.stock > 0).length;
        }
        item.textContent = status.replace('-', ' '); // Remove the counter
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const colorFilter = document.getElementById('color-filter');
    const categoryFilter = document.getElementById('category-filter');
    const sizeFilter = document.getElementById('size-filter');
    const stockStatusFilter = document.getElementById('stock-status-filter');
    
    // Clear existing filter items
    colorFilter.innerHTML = '';
    categoryFilter.innerHTML = '';
    sizeFilter.innerHTML = '';

    const allColors = getAllColors(library);
    const allCategories = getAllCategories(library);
    const allSizes = getAllSizes(library);

    allColors.forEach(color => {
        const colorItem = document.createElement('li');
        colorItem.setAttribute('data-color', color);
        colorItem.innerHTML = `
            <span class="filter-color-circle" style="background-color: ${color.toLowerCase()};"></span>
            ${color}
            <span class="item-counter">0</span>
        `;
        colorFilter.appendChild(colorItem);
    });

    allCategories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.setAttribute('data-category', category);
        categoryItem.classList.add('filter-category');
        categoryItem.innerHTML = `
            ${category}
            <span class="item-counter">0</span>
        `;
        categoryFilter.appendChild(categoryItem);
    });

    allSizes.forEach(size => {
        const sizeItem = document.createElement('li');
        sizeItem.setAttribute('data-size', size);
        sizeItem.classList.add('filter-size');
        sizeItem.innerHTML = `
            ${size}
            <span class="item-counter">0</span>
        `;
        sizeFilter.appendChild(sizeItem);
    });

    const colorItems = colorFilter.querySelectorAll('li');
    const categoryItems = categoryFilter.querySelectorAll('li');
    const sizeItems = sizeFilter.querySelectorAll('li');
    const stockStatusItems = stockStatusFilter.querySelectorAll('li');

    colorItems.forEach(item => {
        item.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            filters.colors = [color]; // Set the selected color as the only filter
            filters.categories = []; // Reset category filter
            filters.sizes = []; // Reset size filter
            filters.stock = ''; // Reset stock status filter
            currentPage = 1; // Reset to the first page
            displayProducts(currentPage);
        });
    });

    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filters.categories = [category]; // Set the selected category as the only filter
            filters.colors = []; // Reset color filter
            filters.sizes = []; // Reset size filter
            filters.stock = ''; // Reset stock status filter
            currentPage = 1; // Reset to the first page
            displayProducts(currentPage);
        });
    });

    sizeItems.forEach(item => {
        item.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            filters.sizes = [size]; // Set the selected size as the only filter
            filters.colors = []; // Reset color filter
            filters.categories = []; // Reset category filter
            filters.stock = ''; // Reset stock status filter
            currentPage = 1; // Reset to the first page
            displayProducts(currentPage);
        });
    });

    stockStatusItems.forEach(item => {
        item.addEventListener('click', function() {
            const status = this.getAttribute('data-status');
            if (status === 'on-sale') {
                filters.stock = 'on-sale'; // Set the filter to "on-sale"
            } else if (status === 'in-stock') {
                filters.stock = 'in-stock'; // Set the filter to "in-stock"
            }
            filters.colors = []; // Reset color filter
            filters.categories = []; // Reset category filter
            filters.sizes = []; // Reset size filter
            currentPage = 1; // Reset to the first page
            displayProducts(currentPage);
        });
    });

    // Initial update of counters
    updateColorCounters(library);
    updateCategoryCounters(library);
    updateSizeCounters(library);
    // No need to update stock status counters as they don't have counters
});

document.addEventListener('DOMContentLoaded', function() {
    const pricingPlansLink = document.getElementById('pricing-plans-link');
    const bigContainer = document.querySelector('.bigContainer');

    pricingPlansLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        bigContainer.innerHTML = pricingPlansHTML;

        // Initialize sliders after the HTML content has been inserted
        initializeSlider('slider-container-1', 'option-3months', 'option-forever');
        initializeSlider('slider-container-2', 'option-personal', 'option-corporate');
    });

    function initializeSlider(containerId, option1Id, option2Id) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID ${containerId} not found`);
            return;
        }
        const option1 = document.getElementById(option1Id);
        const option2 = document.getElementById(option2Id);
        const sliderHighlight = container.querySelector('.slider-highlight');

        option1.addEventListener('click', function() {
            sliderHighlight.style.transform = 'translateX(0)';
            option1.classList.add('selected');
            option2.classList.remove('selected');
        });

        option2.addEventListener('click', function() {
            sliderHighlight.style.transform = 'translateX(100%)';
            option2.classList.add('selected');
            option1.classList.remove('selected');
        });
    }

    // Other DOMContentLoaded code...
});