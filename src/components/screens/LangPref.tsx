import React, { Fragment, memo, useContext } from 'react'
import cx from 'classnames'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'
import Window from './Window'

import { langEnglishNames, langs } from '../../i18n/langs'
import { entries } from '../../utils/typeHelpers'
import { AvailableLangType } from '../../i18n/types'
import {
  SCREEN_LANG_PREF,
  UPDATE_ERATHIAN,
  UPDATE_LANG,
} from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import TooltipAll from '../special/TooltipAll'

const LangPref = () => {
  const lang: AvailableLangType = useAppSelector((state) => state.lang.code)
  const erathian: boolean = useAppSelector((state) => state.lang.erathian)
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const erathianLabel = (() => {
    const er = _.i18n('ERATHIAN')
    if (er !== undefined) {
      const arr = er.split('%s')
      return [
        <Fragment key={0}>{arr[0]}</Fragment>,
        <span key={1} className="erathian text-2xl p-0">
          Erathian
        </span>,
        <Fragment key={2}>{arr[1]}</Fragment>,
      ]
    }
    return null
  })()

  return (
    <Window screenActionType={SCREEN_LANG_PREF}>
      <div className="my-5 flex flex-wrap justify-center no-erathian">
        {entries(langs)
          .sort(([codeA], [codeB]) => codeA.localeCompare(codeB))
          .map(([code, name]) => (
            <TooltipAll key={code} title={langEnglishNames[code]}>
              <button
                key={code}
                lang={code}
                className={cx('m-2', { active: code === lang })}
                onClick={() => {
                  dispatch({
                    type: UPDATE_LANG,
                    lang: code,
                  })
                }}
              >
                {name}
              </button>
            </TooltipAll>
          ))}
      </div>
      <label className="justify-center">
        <input
          type="checkbox"
          checked={erathian}
          onChange={(e) => {
            dispatch({
              type: UPDATE_ERATHIAN,
              erathian: e.target.checked,
            })
          }}
        />
        <span className="no-erathian">{erathianLabel}</span>
      </label>
    </Window>
  )
}

export default memo(LangPref)
