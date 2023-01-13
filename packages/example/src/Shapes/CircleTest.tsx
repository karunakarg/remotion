import {Circle} from '@remotion/shapes';
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const CircleTest: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center',
			}}
		>
			<Circle
				width={100}
				height={100}
				fill="green"
				stroke="red"
				strokeWidth={1}
			/>
		</AbsoluteFill>
	);
};

export default CircleTest;
