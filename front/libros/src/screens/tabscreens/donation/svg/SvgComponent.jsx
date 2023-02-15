import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
	<Svg
		width={37}
		height={35}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<Path
			d='m11.5 24.5 7-7m0 0 7 7m-7-7v15.75m14-7.45a9.625 9.625 0 0 0-6.125-17.05c-.382 0-.74-.2-.934-.529A13.119 13.119 0 0 0 14.125 1.75C6.876 1.75 1 7.626 1 14.875c0 3.616 1.462 6.89 3.827 9.264'
			stroke='#FF3D45'
			strokeWidth={1.667}
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</Svg>
);

export default SvgComponent;
