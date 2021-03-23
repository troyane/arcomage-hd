import {
  CLEAR_CARD,
  DISCARD_CARD,
  DISCARD_CARD_MAIN,
  REMOVE_CARD,
  SWITCH_LOCK,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { map, withLatestFrom, filter, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'
import { Observable, merge, of } from 'rxjs'
import playSound from '../utils/playSound'

export const discardCardEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(DISCARD_CARD)),
    mergeMap(({ index, position, owner }) =>
      merge(
        of({
          type: CLEAR_CARD,
        }),
        of({
          type: DISCARD_CARD_MAIN,
          index,
        }),
        new Observable(() => {
          playSound('deal')
        }),
        of({
          type: REMOVE_CARD,
          index,
          position,
          owner,
        }),
        of({
          type: SWITCH_LOCK,
        }),
      ),
    ),
  )

export default discardCardEpic