import {
	Board,
	BoardBlockType,
	forEachBoardBlock,
	GRID_BLOCK_SIZE,
	HITBOX_SIZE,
	PossibleBoardSpots,
} from "@/constants/Board";
import { colorToHex } from "@/constants/Color";
import { Hand } from "@/constants/Hand";
import { randomWithRange } from "@/constants/Math";
import {
	createEmptyBlockStyle,
	createFilledBlockStyle,
} from "@/constants/Piece";
import { useDroppable } from "@mgcrea/react-native-dnd";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	SharedValue,
	runOnJS,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withTiming,
} from "react-native-reanimated";

interface BlockGridProps {
	board: SharedValue<Board>;
	possibleBoardDropSpots: SharedValue<PossibleBoardSpots>;
	hand: SharedValue<Hand>
	draggingPiece: SharedValue<number | null>
}

interface BlockProps {
	x: number;
	y: number;
	board: SharedValue<Board>;
	possibleBoardDropSpots: SharedValue<PossibleBoardSpots>;
}

function encodeDndId(x: number, y: number): string {
	return `${x},${y}`;
}

function Block({ x, y, board, possibleBoardDropSpots }: BlockProps) {
	const boardSize = board.value.length;
	const loadBlockFlash = useSharedValue(0);
	const placedBlockFall = useSharedValue(0);
	const placedBlockDirectionX = useSharedValue(0);
	const placedBlockDirectionY = useSharedValue(0);
	const placedBlockRotation = useSharedValue(0);

	// Droppable logic
	const { props, activeId } = useDroppable({
		id: encodeDndId(x, y),
	});

	// Animation logic for block falling effect
	useAnimatedReaction(() => {
		return board.value[y][x].blockType
	}, (cur, prev) => {
		if (cur == BoardBlockType.EMPTY && (prev == BoardBlockType.FILLED || prev == BoardBlockType.HOVERED_BREAK_EMPTY || prev == BoardBlockType.HOVERED_BREAK_FILLED)) {
			const angle = Math.random() * Math.PI * 2;
			const distance = 200;
			const rotation = (Math.random() - 0.5) * Math.PI * 2;
			
			placedBlockDirectionX.value = Math.cos(angle) * distance;
			placedBlockDirectionY.value = Math.sin(angle) * distance;
			placedBlockRotation.value = rotation;
			
			placedBlockFall.value = withTiming(1, { 
				duration: 500 
			}, (finished) => {
				'worklet';
				if (finished) {
					placedBlockFall.value = 0;
				}
			});
		}
	});

	// Animation logic for loading flash effect
	useEffect(() => {
		if (board.value[y][x].blockType != BoardBlockType.EMPTY) 
			return;
		const step = 70;
		const upwardDelay = (boardSize - 1 - y) * step;
		const downwardDelay = 2 * y * step;
		
		loadBlockFlash.value = withDelay(
			upwardDelay,
			withSequence(
				withTiming(1, { duration: step }),
				withDelay(downwardDelay, withTiming(0, { duration: step }))
			)
		);
	}, [board.value[y][x].blockType]);

	// Main animated style for the block
	const animatedStyle = useAnimatedStyle(() => {
		const block = board.value[y][x];
		
		if (block.blockType == BoardBlockType.EMPTY && loadBlockFlash.value != 0) {
			return {
				...createFilledBlockStyle(block.color),
				opacity: Math.min(1, loadBlockFlash.value * 10),
			};
		}

		if (placedBlockFall.value > 0) {
			let progress = placedBlockFall.value;
			progress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);// easeOutCirc
			return {
				...createFilledBlockStyle(block.color),
				opacity: 1 - progress,
				transform: [
					{ scale: 1 - progress },
					{ 
						translateX: placedBlockDirectionX.value * progress 
					},
					{ 
						translateY: placedBlockDirectionY.value * progress 
					},
					{ 
						rotate: `${placedBlockRotation.value * progress}rad` 
					}
				]
			}
		}

		let style: any = createEmptyBlockStyle();
		if (block.blockType == BoardBlockType.FILLED || block.blockType == BoardBlockType.HOVERED) {
			style = {
				...createFilledBlockStyle(block.color),
				opacity: block.blockType == BoardBlockType.HOVERED ? 0.3 : 1,
			};
		} else if (block.blockType == BoardBlockType.HOVERED_BREAK_EMPTY || block.blockType == BoardBlockType.HOVERED_BREAK_FILLED) {
			const blockColor =
				block.blockType == BoardBlockType.HOVERED_BREAK_EMPTY
					? block.color
					: block.hoveredBreakColor;
			style = {
				...createFilledBlockStyle(blockColor),
				shadowColor: colorToHex(blockColor),
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: 0.8,
				shadowRadius: 15,
				elevation: 8
			};
		}

		return {...style, transform: []};
	});

	// Droppable hitbox animated style
	const droppableStyle = useAnimatedStyle(() => {
		const active = possibleBoardDropSpots.value[y][x] == 1;
		if (active) {
			// use a smaller size droppable than the block so that detection does not overlap with other blocks.
			return {
				width: HITBOX_SIZE,
				height: HITBOX_SIZE,
			};
		} else {
			return {
				width: 0,
				height: 0,
			};
		}
	}, [props, possibleBoardDropSpots]);

	const blockPositionStyle = {
		position: "absolute" as const,
		top: y * GRID_BLOCK_SIZE,
		left: x * GRID_BLOCK_SIZE,
	};

	return (
		<Animated.View
			style={[styles.emptyBlock, blockPositionStyle, animatedStyle]}
		>
			<Animated.View {...props} style={[styles.hitbox, droppableStyle]} />
		</Animated.View>
	);
}

export default function BlockGrid({
	board,
	possibleBoardDropSpots,
	draggingPiece,
	hand
}: BlockGridProps) {
	const blocks: JSX.Element[] = [];
	const boardLength = board.value.length;
	
	forEachBoardBlock(board.value, (_block, x, y) => {
		blocks.push(
			<Block 
				key={encodeDndId(x, y)}
				x={x}
				y={y}
				board={board}
				possibleBoardDropSpots={possibleBoardDropSpots}
			/>
		);
	});
	
	const gridStyle = useAnimatedStyle(() => {
		let style: any;
		if (draggingPiece.value == null) {
			style = {
				borderColor: 'white'
			}
		} else {
			style = {
				borderColor: colorToHex(hand.value[draggingPiece.value!]!.color)
			}
		}
		return style;
	});
	
	return (
		<Animated.View
			style={[
				styles.grid,
				{
					width: GRID_BLOCK_SIZE * boardLength + 6,
					height: GRID_BLOCK_SIZE * boardLength + 6,
				},
				gridStyle
			]}
		>
			{blocks}
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	emptyBlock: {
		width: GRID_BLOCK_SIZE,
		height: GRID_BLOCK_SIZE,
		margin: 0,
		borderWidth: 1,
		borderRadius: 0,
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
	},
	grid: {
		//width: GRID_BLOCK_SIZE * BOARD_LENGTH + 8,
		//height: GRID_BLOCK_SIZE * BOARD_LENGTH + 8,
		position: "relative",
		backgroundColor: "rgb(0, 0, 0, 1)",
		borderWidth: 3,
		borderRadius: 5,
		borderColor: "rgb(255, 255, 255)",
		opacity: 1,
	},
	hitbox: {
		width: HITBOX_SIZE,
		height: HITBOX_SIZE,
	},
});