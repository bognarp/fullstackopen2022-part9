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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 4));
