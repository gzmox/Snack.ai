document.getElementById("snackForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const goal = form.goal.value;
  const allergies = form.allergies.value;
  const snacks = parseInt(form.snacks.value);

  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal, allergies, snacks })
  });

  const data = await response.json();
  const result = document.getElementById("result");
  const snackList = document.getElementById("snackList");

  snackList.innerHTML = data.result
    .split('\n')
    .filter(line => line.trim())
    .map(line => `<li>${line.replace(/^[-*•]\s*/, '')}</li>`)
    .join("");

  result.classList.remove("hidden");
});
