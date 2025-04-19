import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { groq } from "@ai-sdk/groq"
import { google } from "@ai-sdk/google"
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': google("gemini-1.5-pro"),
        'chat-model-reasoning': wrapLanguageModel({
          model: groq("deepseek-r1-distill-llama-70b"),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': google("gemini-1.5-pro"),
        'artifact-model': google("gemini-1.5-pro"),
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
