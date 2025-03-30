import OpenAI from 'openai';
import { OPENAI_SERVER_API_KEY } from './constants';

const openai = new OpenAI({
    apiKey: OPENAI_SERVER_API_KEY,
    dangerouslyAllowBrowser: true,
});

export default openai;
