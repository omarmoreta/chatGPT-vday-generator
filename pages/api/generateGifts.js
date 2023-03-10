import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (req, res) => {
  const { priceMin, priceMax, age, hobbies } = req.body;
  const prompt = generatePrompt(priceMin, priceMax, age, hobbies);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

const generatePrompt = (priceMin, priceMax, age, hobbies) => {
  return `Suggest Valentine's Day gift ideas between ${priceMin} and ${priceMax} for a ${age} years old that is into ${hobbies}.`;
}
