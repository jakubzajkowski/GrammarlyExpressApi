import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import User from '../db/schema';

interface TextCheckRequests {
  word: string;
  language: string;
  _id: string;
}

const SynonymsCheckController = async (req: Request, res: Response) => {
  try {
    const { word, language, _id }: TextCheckRequests = req.body;

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_SECRET_KEY
      });

    const promptGrammar: string = `You will be provided with a word in ${language}, and you will write synonyms of this word or words that can replace this word`;

    const user = await User.findOne({ _id });

    if (user){
        if (user?.plan=='free'){
            if (user.prompts as number <= 1000){
              if (word){
              await User.findByIdAndUpdate({_id:_id},{prompts: (user.prompts as number)+1})
                const responseGrammar = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                    {
                        "role": "system",
                        "content": promptGrammar
                    },
                    {
                        "role": "user",
                        "content": `${word}`
                    },
                    ],
                    temperature: 0,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                });
                    return res.json({success:{words: responseGrammar.choices[0].message?.content}})
              }
              else{
                    return res.json({error: 'No content'})
              }
            }
            else{
                return res.json({error: 'You used your free plan ai prompts'})
              }
        }
        if (user?.plan=='premium'){
            if (user.prompts as number <= 10000){
              if (word){
              await User.findByIdAndUpdate({_id:_id},{prompts: (user.prompts as number)+1})
                const responseGrammar = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                    {
                        "role": "system",
                        "content": promptGrammar
                    },
                    {
                        "role": "user",
                        "content": `${word}`
                    },
                    ],
                    temperature: 0,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                });
                    return res.json({success:{words: responseGrammar.choices[0].message?.content}})
              }
              else{
                    return res.json({error: 'No content'})
              }
            }
            else{
                return res.json({error: 'You used your premium plan ai prompts'})
              }
        }
        if (user?.plan=='buisness'){
            if (user.prompts as number <= 20000){
              if (word){
              await User.findByIdAndUpdate({_id:_id},{prompts: (user.prompts as number)+1})
                const responseGrammar = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                    {
                        "role": "system",
                        "content": promptGrammar
                    },
                    {
                        "role": "user",
                        "content": `${word}`
                    },
                    ],
                    temperature: 0,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                });
                    return res.json({success:{words: responseGrammar.choices[0].message?.content}})
              }
              else{
                    return res.json({error: 'No content'})
              }
            }
            else{
                return res.json({error: 'You used your buisness plan ai prompts'})
              }
        }
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}
export default SynonymsCheckController