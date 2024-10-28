import type {PlayerRef} from '@remotion/player';
import React from 'react';
import styles from './player.module.css';
import {PlayerFullscreen} from './PlayerFullscreen';
import {PlayerSeekBar} from './PlayerSeekBar';
import {PlayerVolume} from './PlayerVolume';
import {PlayPauseButton} from './PlayPauseButton';
import {TimeDisplay} from './TimeDisplay';

export const PlayerControls: React.FC<{
	playerRef: React.RefObject<PlayerRef>;
	durationInFrames: number;
	fps: number;
	setmountPlayerAudio: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({playerRef, durationInFrames, fps, setmountPlayerAudio}) => {
	return (
		<div className={styles['controls-wrapper']}>
			<div className={styles['start-controls']}>
				<PlayPauseButton playerRef={playerRef} />
				<PlayerSeekBar
					durationInFrames={durationInFrames}
					playerRef={playerRef}
					inFrame={null}
					outFrame={null}
					onSeekEnd={() => undefined}
					onSeekStart={() => undefined}
				/>
				<TimeDisplay
					playerRef={playerRef}
					durationInFrames={durationInFrames}
					fps={fps}
				/>
			</div>
			<div className={styles['end-controls']}>
				<PlayerVolume
					playerRef={playerRef}
					setmountPlayerAudio={setmountPlayerAudio}
				/>
				<PlayerFullscreen playerRef={playerRef} />
			</div>
		</div>
	);
};
