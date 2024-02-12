import dotenv from 'dotenv';
import inquirer from 'inquirer'
dotenv.config()

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-3.5-turbo'
});







const promptFunc = async (input) => {
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n"],
        ["user", input],
    ]);
    try {
        const outputParser = new StringOutputParser()

        const chain = prompt.pipe(chatModel).pipe(outputParser);

        const res = await chain.invoke(prompt);
        console.log(res);
    }
    catch (err) {
        console.error(err);
    }
};

const init = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Ask a coding question:',
        },
    ]).then((inquirerResponse) => {
        promptFunc(inquirerResponse.name)
    });
};

init();

