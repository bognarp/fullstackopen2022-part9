import express from 'express';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { parseExercisesBody, parseWebBmiQuery } from './requestParsers';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	try {
		const bmiValues = parseWebBmiQuery(req.query);
		const { weight, height } = bmiValues;
		const bmi = calculateBmi(height, weight);

		res.json({
			weight,
			height,
			bmi,
		});
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong...';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(400).json({ error: errorMessage });
	}
});

app.post('/exercises', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const { exerciseHours, target } = parseExercisesBody(req.body);
		const periodResult = calculateExercises(exerciseHours, target);

		res.json(periodResult);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong...';
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		res.status(400).json({ error: errorMessage });
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
