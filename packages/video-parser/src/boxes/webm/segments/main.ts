import type {BufferIterator} from '../../../read-and-increment-offset';
import {expectSegment, type MatroskaSegment} from '../segments';

export type MainSegment = {
	type: 'main-segment';
	child: MatroskaSegment;
};

export const parseMainSegment = (iterator: BufferIterator): MainSegment => {
	const child = expectSegment(iterator);

	return {
		type: 'main-segment',
		child,
	};
};
