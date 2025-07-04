document.getElementById("snackForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const goal = form.goal.value;
  const allergies = form.allergies.value;
  const snacksPerDay = parseInt(form.snacks.value);
  const delivery = form.delivery.value;

  const snackIdeas = generateSnackIdeas(goal, snacksPerDay);
  const result = document.getElementById("result");
  const snackList = document.getElementById("snackList");

  snackList.innerHTML = snackIdeas.map(snack => `<li>${snack}</li>`).join("");
  result.classList.remove("hidden");
});

function generateSnackIdeas(goal, count) {
  const snacks = {
    high_protein: ["Greek yogurt", "Beef jerky", "Protein bar", "Hard-boiled eggs", "Cottage cheese"],
    low_sugar: ["Carrot sticks", "Celery with peanut butter", "Rice cakes", "Cucumber slices", "Plain popcorn"],
    keto: ["Cheese cubes", "Olives", "Boiled eggs", "Avocado slices", "Macadamia nuts"],
    adhd_friendly: ["Apple slices + peanut butter", "Trail mix", "String cheese", "Energy bites", "Dark chocolate chips"]
  };

  const options = snacks[goal] || [];
  const selected = [];

  for (let i = 0; i < count; i++) {
    selected.push(options[i % options.length]);
  }

  return selected;
}
