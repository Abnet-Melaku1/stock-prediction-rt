import OpenAI from 'openai';

interface Env {
	OPENAI_API_KEY: string;
}

interface Message {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

interface GenerateReportRequest {
	messages: Message[];
	persona?: 'beginner' | 'active trader' | 'value investor';
}

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		const url = new URL(request.url);
		const pathname = url.pathname;

		try {
			if (pathname === '/generate-report') {
				return await handleGenerateReport(request, env);
			}

			return new Response('Not Found', { status: 404, headers: corsHeaders });
		} catch (e) {
			const error = e as Error;
			return new Response(JSON.stringify({ error: error.message }), {
				headers: corsHeaders,
				status: 500,
			});
		}
	},
};

async function handleGenerateReport(request: Request, env: Env): Promise<Response> {
	const openai = new OpenAI({
		apiKey: env.OPENAI_API_KEY,
	});

	const body = (await request.json()) as GenerateReportRequest;
	const messages = body.messages;
	const persona = body.persona || 'beginner';

	messages.unshift({
		role: 'system',
		content: `You are a financial analyst writing a report for a ${persona}. Use language and insights appropriate for a ${persona}.`,
	});

	const chatCompletion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages,
		temperature: 1.1,
	});

	return new Response(JSON.stringify(chatCompletion.choices[0].message), {
		headers: corsHeaders,
	});
}
