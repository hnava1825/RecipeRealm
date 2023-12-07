const recipesContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector("#btnFind");
const suggestionLinks = document.querySelectorAll(".suggestion-link");

btnFind.addEventListener("click", () => loadRecipes(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        loadRecipes(txtSearch.value);
    }
});

// Add event listeners for suggestion links
suggestionLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent the default anchor click behavior
        const type = e.target.getAttribute("data-type");
        loadRecipes(type);
    });
});

/* Recipe Loader */
function loadRecipes(type = "Meal Prep") {
    const url = `/recipes?type=${type}`;
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('errorMsg');
    loader.style.display = 'block';
    errorMsg.style.display = 'none';

    fetch(url)
        .then(response => {
            loader.style.display = 'none';
            if (!response.ok) {
                throw new Error(`Problem fetching recipes, please try again later (${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            renderRecipes(data.hits || data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            errorMsg.textContent = `Failed to fetch recipes, Please check your connection and try again. ${error.message}`;
            errorMsg.style.display = 'block';
        });
}

/* Recipe Renderer */
function renderRecipes(recipes) {
    recipesContainer.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" />
            <div class="recipe-content">
                <h3>${recipe.recipe.label}</h3>
                <p>Calories: ${recipe.recipe.calories.toFixed(2)}</p>
                <p>Diet Label: ${recipe.recipe.dietLabels.join(', ')}</p>
                <p>Health Label: ${recipe.recipe.healthLabels.join(', ')}</p>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            </div>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

/* Home Button */
const btnHome = document.querySelector("#btnHome");

btnHome.addEventListener("click", (e) => {
    e.preventDefault();
    txtSearch.value = "";
    loadRecipes("Meal Prep"); // Load the default recipes
});

loadRecipes("Meal Prep"); // Load initial recipes
