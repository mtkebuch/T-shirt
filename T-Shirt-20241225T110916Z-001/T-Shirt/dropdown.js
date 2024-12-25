// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'dropdown'
    var dropdowns = document.querySelectorAll('.dropdown');

    // Iterate over each dropdown element
    dropdowns.forEach(function(dropdown) {
        var button = dropdown.querySelector('.dropbtn'); // Select the button inside the dropdown
        var content = dropdown.querySelector('.dropdown-content'); // Select the content inside the dropdown

        // Show the dropdown content when the button is hovered over
        button.addEventListener('mouseover', function() {
            content.style.display = 'block';
        });

        // Hide the dropdown content when the button is not hovered over
        button.addEventListener('mouseout', function() {
            content.style.display = 'none';
        });

        // Keep the dropdown content visible when it is hovered over
        content.addEventListener('mouseover', function() {
            content.style.display = 'block';
        });

        // Hide the dropdown content when it is not hovered over
        content.addEventListener('mouseout', function() {
            content.style.display = 'none';
        });
    });

    // Select the star and cart icons
    const starIcon = document.getElementById('star-icon');
    const cartIcon = document.getElementById('cart-icon');
    // Select the popups for star and cart
    const starPopup = document.getElementById('star-popup');
    const cartPopup = document.getElementById('cart-popup');
    // Select the lists inside the popups
    const starredItems = document.getElementById('starred-items');
    const cartItems = document.getElementById('cart-items');
    // Select the counters
    const starCounter = document.getElementById('star-counter');
    const cartCounter = document.getElementById('cart-counter');

    // Function to toggle the visibility of the popup
    function togglePopup(icon, popup, otherPopup, items, emptyMessage) {
        const rect = icon.getBoundingClientRect(); // Get the position of the icon
        // Position the popup below the top right corner of the icon
        popup.style.top = `${rect.bottom + window.scrollY}px`;
        popup.style.left = `${rect.right + window.scrollX - popup.offsetWidth}px`;
        // Toggle the display of the popup
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
        // Hide the other popup if it is open
        otherPopup.style.display = 'none';

        // If the list is empty, display the empty message
        if (items.children.length === 0) {
            items.innerHTML = `<li>${emptyMessage}</li>`;
        }
    }

    // Function to add a list item and update the counter
    function addListItem(list, counter, text) {
        const listItem = document.createElement('li'); // Create a new list item
        listItem.textContent = text; // Set the text content of the list item
        list.appendChild(listItem); // Append the list item to the list
        counter.textContent = list.children.length; // Update the counter
    }

    // Add click event listeners to the icons to toggle the popups
    starIcon.addEventListener('click', function() {
        togglePopup(starIcon, starPopup, cartPopup, starredItems, 'You have no starred items.');
    });

    cartIcon.addEventListener('click', function() {
        togglePopup(cartIcon, cartPopup, starPopup, cartItems, 'Your cart is empty.');
    });

    // Close the popups when clicking outside of them
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.icon')) {
            starPopup.style.display = 'none';
            cartPopup.style.display = 'none';
        }
    });

    // Example usage: Add items to the starred and cart lists
    addListItem(starredItems, starCounter, 'Starred Item 1');
    addListItem(starredItems, starCounter, 'Starred Item 2');
    addListItem(cartItems, cartCounter, 'Cart Item 1');
    
});