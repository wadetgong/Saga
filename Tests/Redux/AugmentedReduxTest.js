import { reducer, initialState, setArObject, move, MOVE_FACTOR_Y, MOVE_FACTOR_X } from '../../App/Redux/AugmentedRedux'

test('move', () => {
  const state = reducer(initialState, move({ x: 1.0, y: 1.0 }, 100, 100))

  expect(state.gyroX).toBe(1.0)
  expect(state.gyroY).toBe(1.0)
  expect(state.xOffset).toBe(100 * MOVE_FACTOR_X * 1.0)
  expect(state.yOffset).toBe(100 * MOVE_FACTOR_Y * 1.0)
})

test('setArObject', () => {
  const state = reducer(initialState, setArObject({
    startingPosX: 100,
    startingPosY: 100
  }))


  expect(state.arObject).toEqual({
    startingPosX: 100,
    startingPosY: 100
  })
})
