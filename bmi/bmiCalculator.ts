interface BmiValues {
	height: number;
	weight: number;
}

function parseBmiArguments(args: Array<string>): BmiValues {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
		throw new Error('Provided values were not numbers!');
	} else {
		return { height: Number(args[2]), weight: Number(args[3]) };
	}
}

function calculateBmi(height: number, weight: number): string {
	const bmi = Number((weight / (height / 100) ** 2).toFixed(1));

	if (bmi < 16) {
		return 'Underweight (Severe thinness)';
	} else if (16 <= bmi && bmi <= 16.9) {
		return 'Underweight (Moderate thinness)';
	} else if (17 <= bmi && bmi <= 18.4) {
		return 'Underweight (Mild thinness)';
	} else if (18.5 <= bmi && bmi <= 24.9) {
		return 'Normal (healthy weight)';
	} else if (25 <= bmi && bmi <= 29.9) {
		return 'Overweight (Pre-obese)';
	} else if (30 <= bmi && bmi <= 34.9) {
		return 'Obese (Class I)';
	} else if (35 <= bmi && bmi <= 39.9) {
		return 'Obese (Class II)';
	} else {
		return 'Obese (Class III)';
	}
}

try {
	const { weight, height } = parseBmiArguments(process.argv);
	console.log(calculateBmi(height, weight));
} catch (error: unknown) {
	let errorMessage = 'Something went wrong....';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
