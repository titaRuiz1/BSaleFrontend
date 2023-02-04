import apiFetch from "./api-fetch";


export async function sendFeedbacks(body) {
  console.log('answers en SERVICE', body)
  const feedback = await apiFetch(`feedback`, {
    body: body,
  })
  console.log('feedback en Service', feedback)
  // sessionStorage.setItem('feedback', feedback);
  return feedback;
}

