export async function chatWithGPT3(chatMessages, content) {
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
      //stream:true
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

    //  const reader = response.body.getReader()

    //  console.log(reader)
      const result = await response.json();
      const reply = result.choices[0].message.content;
      return reply;
    } catch (error) {
      console.log("GPT Error", error);
      return "Error Generating Text";
    }
  }
//   const API_URL = "https://api.openai.com/v1/chat/completions";
//   const API_KEY = "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";

//   //const API_KEY = "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"
//   try {
//     // Fetch the response from the OpenAI API with the signal from AbortController
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: "hi" }],
//        // stream: true, // For streaming responses
//       }),
//     });

//      // Read the response as a stream of data
//      const reader = response.body.getReader;
//      console.log(reader)
//      let decoder;// = new TextDecoder("utf-8");
  
//      while (true) {
//        const { done, value } = await reader.read();
//        if (done) {
//          break;
//        }
//        // Massage and parse the chunk of data
//        const chunk = decoder.decode(value);
//        const lines = chunk.split("\\n");
//        const parsedLines = lines
//          .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
//          .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
//          .map((line) => JSON.parse(line)); // Parse the JSON string
 
//        for (const parsedLine of parsedLines) {
//          const { choices } = parsedLine;
//          const { delta } = choices[0];
//          const { content } = delta;
//          // Update the UI with the new content
//          if (content) {
//            resultText.innerText += content;
//          }
//        }
//      }

//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
