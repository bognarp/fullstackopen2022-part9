import { ParsedQs } from 'qs';

import { BmiValues } from './bmiCalculator';
import { ExerciseValues } from './exerciseCalculator';

const MISSING_PARAMETER_ERROR = 'parameters missing';
const MALFORMATTED_PARAMETER_ERROR = 'malformatted parameters';

export function parseWebBmiQuery(query: ParsedQs): BmiValues {
	const { height, weight } = query;

	if (isNaN(Number(height)) || isNaN(Number(weight))) {
		throw new Error(MALFORMATTED_PARAMETER_ERROR);
	} else {
		return { height: Number(height), weight: Number(weight) };
	}
}

export function parseExercisesBody(requestBody: {
	daily_exercises: Array<number>;
	target: number;
}): ExerciseValues {
	if (
		!requestBody ||
		requestBody.daily_exercises === undefined ||
		requestBody.target === undefined
	) {
		throw new Error(MISSING_PARAMETER_ERROR);
	}
	const { target } = requestBody;
	let { daily_exercises } = requestBody;

	if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
		throw new Error(MALFORMATTED_PARAMETER_ERROR);
	}

	daily_exercises = daily_exercises.map((arg) => {
		if (isNaN(Number(arg))) {
			throw new Error(MALFORMATTED_PARAMETER_ERROR);
		} else {
			return Number(arg);
		}
	});

	return { exerciseHours: daily_exercises, target: Number(target) };
}
