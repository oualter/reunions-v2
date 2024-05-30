'use client'
import { useContext, useState, useRef, useLayoutEffect } from 'react'
import microfictionsContext from '../contexts/microfictions.context'
import { Slider } from './ui/slider'

const YearsSlider = ({ className, ...props }) => {
  const yearsContext = useContext(microfictionsContext)
  const { defaultpins, handleDisplayPins, selectedMicrofictions } = yearsContext
  const yearsArr = []
  let yearsArrToSlider
  defaultpins.map((elt) => {
    const { Date } = elt
    // get the year value of the date
    const yearValue = Date.split('/')[2]
    // incrémente le tableau des années
    yearsArr.push(yearValue)
    // fonction qui enlève les années doublons
    function YearsArrFiltered(year) {
      return year.filter((value, index) => year.indexOf(value) === index)
    }
    // variable qui contient le bon tableau
    const yearsArray = YearsArrFiltered(yearsArr)
    yearsArrToSlider = yearsArray
  })
  const yearsDivisionCount =
    yearsArrToSlider < 16 ? yearsArrToSlider.length : 10
  if (!yearsArrToSlider) return false

  const yearsArrToSliderInt = Array.from(yearsArrToSlider, (x) => parseInt(x))
  // const minYear = Math.min(...yearsArrToSliderInt)
  const minYear =
    Math.min(...yearsArrToSliderInt) < 1970
      ? 1970
      : Math.min(...yearsArrToSliderInt)
  // console.log('minYear => ', minYear)
  const maxYear = Math.max(...yearsArrToSliderInt)
  const era = maxYear - minYear
  const step = Math.round(era / (yearsDivisionCount + 1))
  const maxYearSlider = minYear + (yearsDivisionCount + 1) * step + 1

  return (
    <div className="slider-wrapper fixed hidden sm:block sm:h-[50%] lg:h-[60vh] xl:h-[75vh] w-[80px] top-[140px] z-10000">
      <Slider
        label="Années"
        defaultValue={[maxYearSlider]}
        min={minYear}
        max={maxYearSlider + 2}
        className="h-full"
        onValueCommit={(event) => {
          handleDisplayPins(event)
        }}
      />
    </div>
  )
}
export default YearsSlider
