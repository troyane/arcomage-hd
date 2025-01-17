const fit = (contains: boolean) => {
  return (
    parentWidth: number,
    parentHeight: number,
    childWidth: number,
    childHeight: number,
    scale = 1,
    offsetX = 0.5,
    offsetY = 0.5,
  ) => {
    const childRatio = childWidth / childHeight
    const parentRatio = parentWidth / parentHeight
    let width = parentWidth * scale
    let height = parentHeight * scale

    if (contains ? childRatio > parentRatio : childRatio < parentRatio) {
      height = width / childRatio
    } else {
      width = height * childRatio
    }

    return {
      width,
      height,
      offsetX: (parentWidth - width) * offsetX,
      offsetY: (parentHeight - height) * offsetY,
    }
  }
}

export const contain = fit(true)
export const cover = fit(false)
