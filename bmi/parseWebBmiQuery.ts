import { ParsedQs } from 'qs';

import { BmiValues } from './bmiCalculator';

export default function parseWebBmiQuery(query: ParsedQs): BmiValues {
	const { height, weight } = query;

	if (isNaN(Number(height)) || isNaN(Number(weight))) {
		throw new Error('malformatted parameters');
	} else {
		return { height: Number(height), weight: Number(weight) };
	}
}
