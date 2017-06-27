// change these thresholds higher to make more stable but not too high to where we can never rotate towards it
//maybe move_factor can help? im not sure have not edited it

export const GYRO_MOVE_THRESHOLD_X = .100; //.055
export const GYRO_MOVE_THRESHOLD_Y = .100;

export const MOVE_FACTOR_Y = 40;
export const MOVE_FACTOR_X = MOVE_FACTOR_Y * .8;