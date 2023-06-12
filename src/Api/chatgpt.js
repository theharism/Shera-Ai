export async function chatWithGPT3(chatMessages,content) {

  if(content){
    chatMessages.unshift({ id: 0, message: content, sender: "system" })
  }

  let apiMessages = chatMessages.map((messageObject) => {
    var role = "";
    if (messageObject.sender === "ChatGPT") {
      role = "assistant";
    } else if (messageObject.sender === "user") {
      role = "user";
    } else {
      role = "system";
    }
    return { content: messageObject.message, role: role };
  });

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: apiMessages,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const result = await response.json();
    const reply = result.choices[0].message.content;
    return reply;
  } catch (error) {
    console.log("GPT Error", error);
    return "Error Generating Text";
  }
}
