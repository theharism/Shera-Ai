export async function generateImage(prompt) {

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: {
                    "Authorization": "Bearer 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",
                    "Content-Type": "text/plain"
                },
                method: "POST",
                body: JSON.stringify({ "inputs": prompt }),
            });

        const result = await response.blob();
        return result;

    } catch (error) {
        console.log('Images Error' + error)
    }
}