import "dotenv/config";

const getOpenAIAPIResponse= async(messages)=>{
    const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },

    body: JSON.stringify({
      model: "gpt-4o-mini",

      messages,
    })
  };

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );

    const data = await response.json();

    return data.choices[0].message.content;
  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });
  } 
}

export default getOpenAIAPIResponse;