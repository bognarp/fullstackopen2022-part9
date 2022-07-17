import express from 'express';

import calculateBmi from './bmiCalculator';
import parseWebBmiQuery from './parseWebBmiQuery';

const app = express();

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
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
