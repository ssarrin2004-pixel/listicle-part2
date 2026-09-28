const renderExercises = async () => {
  const response = await fetch('/api/exercises')
  const exercises = await response.json()

  const container = document.getElementById('exercise-list')

  exercises.forEach((exercise) => {
    const card = document.createElement('article')

    card.innerHTML = `
      <img src="${exercise.image}" alt="${exercise.name}">
      <h3>${exercise.name}</h3>
      <p><strong>Muscle group:</strong> ${exercise.muscle_group}</p>
      <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
      <a href="/exercises/${exercise.slug}" role="button">View details</a>
    `

    container.appendChild(card)
  })
}

renderExercises()