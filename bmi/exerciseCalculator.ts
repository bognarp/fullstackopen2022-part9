interface PeriodResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface Rating {
	rating: 1 | 2 | 3;
	ratingDescription:
		| 'not enough...double your effort'
		| 'not too bad...could be better'
		| 'perfect';
}

interface ExerciseValues {
	exerciseHours: Array<number>;
	target: number;
}

function parseExerciseArguments(args: Array<string>): ExerciseValues {
	if (args.length < 4) throw new Error('Not enough arguments');

	const argsNum = args.slice(2).map((arg) => {
		if (isNaN(Number(arg))) {
			throw new Error('Provided values were not numbers!');
		} else {
			return Number(arg);
		}
	});
	const exerciseHours = argsNum.slice(0, -1);
	const target = argsNum.slice(-1);

	return { exerciseHours, target: target[0] };
}

function calculateExercises(
	exerciseHours: Array<number>,
	target: number
): PeriodResult {
	const periodLength = exerciseHours.length;
	const trainingDays = exerciseHours.reduce(
		(count, hour) => (hour > 0 ? count + 1 : count),
		0
	);
	const average =
		exerciseHours.reduce((sum, hour) => sum + hour) / periodLength;
	const success = average >= target;

	const calculateRating = (target: number, average: number): Rating => {
		const performance = average / target;
		if (0.5 <= performance && performance < 1) {
			return { rating: 2, ratingDescription: 'not too bad...could be better' };
		} else if (1 <= performance) {
			return { rating: 3, ratingDescription: 'perfect' };
		} else {
			return {
				rating: 1,
				ratingDescription: 'not enough...double your effort',
			};
		}
	};

	return {
		periodLength,
		trainingDays,
		success,
		target,
		average,
		...calculateRating(target, average),
	};
}

try {
	const { exerciseHours, target } = parseExerciseArguments(process.argv);
	console.log(calculateExercises(exerciseHours, target));
} catch (error) {
	console.log('Something went wrong...' + error);
}
