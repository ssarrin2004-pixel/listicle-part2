const renderExercise = async () => {
  const slug = window.location.pathname.split('/').pop()

  const response = await fetch(`/api/exercises/${slug}`)

  if (!response.ok) {
    window.location.href = '/404'
    return
  }

  const exercise = await response.json()

  document.title = `${exercise.name} | Calisthenics Moves`

  const container = document.getElementById('exercise-detail')

  container.innerHTML = `
    <img src="${exercise.image}" alt="${exercise.name}">
    <h1>${exercise.name}</h1>
    <p><strong>Muscle group:</strong> ${exercise.muscle_group}</p>
    <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
    <h3>How to do it</h3>
    <p>${exercise.description}</p>
  `
}

renderExercise()