import {
  UPDATE_AILEVEL,
  UPDATE_AILEVEL_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_AILEVEL)),
    mergeMap((action) => {
      const { aiLevel } = action
      lsSet((draft) => {
        if (draft.ai === undefined) {
          draft.ai = { aiLevel }
        } else {
          draft.ai.aiLevel = aiLevel
        }
      })
      return of<RootActionType>({
        type: UPDATE_AILEVEL_MAIN,
        aiLevel,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
