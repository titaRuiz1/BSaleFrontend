import apiFetch from "./api-fetch";


export async function sendFeedbacks(answers) {
  console.log('answers en SERVICE', answers)
  const feedback = await apiFetch(`feedback`, {
    body: answers,
  })
  console.log('answers en FEEDBACK', feedback)
  // sessionStorage.setItem('feedback', feedback);
  return feedback;
}

