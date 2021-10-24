import React, { ReactChild, ReactNode, useEffect, useState } from 'react'

export enum CardVariant {
	outlined = 'outlined',
	primary = 'primary',
}

interface CardProps {
	width: string,
	height: string,
	children?: ReactNode | ReactChild,
	variant: CardVariant,
	
}

const Card: React.FC<CardProps> = ({ width, height, children, variant }) => {
	const [state, setState] = useState<number>(0);
	useEffect(() => {
		console.log(state);
		

	}, [state])
	return (
		<div style={{
			width,
			height, 
			backgroundColor: 'grey', 
			border: variant === CardVariant.outlined ? '2px solid yellow' : 'none',
			background: variant === CardVariant.primary ? 'blue' : 'grey',
		}}
		onClick={() => setState((prev) => prev += 1)}
		>
			<p>{state}</p>
			{children}
		</div>
	)
}

export default Card

