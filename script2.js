import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from 'dotenv';
import inquirer from 'inquirer'
dotenv.config()

const chatModel = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-3.5-turbo'
});


const parser = StructuredOutputParser.fromNamesAndDescriptions({
    answer: "answer to the user's question",
    source: "source used to answer the user's question, should be a website.",
});

const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
        "Answer the users question as best as possible.\n{format_instructions}\n{question}"
    ),
    chatModel,
    parser,
]);

// console.log(parser.getFormatInstructions());


const response = await chain.invoke({
    question: "What is the capital of France?",
    format_instructions: parser.getFormatInstructions(),
});

console.log(response);
// { answer: 'Paris', source: 'https://en.wikipedia.org/wiki/Paris' }