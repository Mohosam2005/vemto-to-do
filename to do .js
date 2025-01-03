document.addEventListener("DOMContentLoaded", () => {
    const addCategoryButton = document.getElementById("addCategoryButton");
    const newCategoryInput = document.getElementById("newCategoryInput");
    const categoriesList = document.getElementById("categoriesList");

    // Load categories from localStorage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Display categories dynamically
    function displayCategories() {
        categoriesList.innerHTML = ''; // Clear previous categories
        categories.forEach(category => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="add.html?category=${category}">${category}</a>`;
            categoriesList.appendChild(listItem);
        });
    }

    // Add new category
    addCategoryButton.addEventListener("click", () => {
        const categoryName = newCategoryInput.value.trim();
        if (categoryName && !categories.includes(categoryName)) {
            categories.push(categoryName);
            localStorage.setItem("categories", JSON.stringify(categories)); // Save to localStorage
            newCategoryInput.value = ""; // Clear input
            displayCategories(); // Update the category list
        } else {
            alert("Please enter a valid category or avoid duplicates.");
        }
    });

    // Display categories on page load
    displayCategories();
});
