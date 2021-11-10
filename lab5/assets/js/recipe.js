// Find a recipe in the cocktail db API

var cocktail = location.href.split('/').pop().replace('.html','');
getRecipe(cocktail);

function getRecipe () {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+ cocktail)
    .then(function (response) {
      return response.json();
    })
    .then(function (recipeJson) {
        recipe = recipeJson.drinks[0];
        document.querySelector('#name').innerHTML = recipe.strDrink; // recipe name
        document.querySelector('#recipeImg').setAttribute('src',recipe.strDrinkThumb) // recipe image
        document.querySelector('#instructions').innerHTML = recipe.strInstructions; // recipe instructions

        const ingList = document.querySelector('#ingredients');
        let count = 1;
        let checkIngredients = true;

        // Set the ingredients list
        while (checkIngredients) {
            ing = "strIngredient".concat(count.toString());
            meas = "strMeasure".concat(count.toString());
            if ((meas in recipe && recipe[meas] !== null) && (ing in recipe && recipe[ing] !== null)) {
                let listItem = document.createElement("li");
                if (meas in recipe && recipe[meas] !== null) {
                    let ingString = recipe[ing].concat(', ', recipe[meas]);
                    listItem.appendChild(document.createTextNode(ingString));
                } else {
                    listItem.appendChild(document.createTextNode(recipe[ing]));
                }

                ingList.append(listItem);
                count++;
            } else {
                checkIngredients = false;
            }
        }
    })};
