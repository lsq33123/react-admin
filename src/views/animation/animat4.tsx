/** @format */

// /** @format */

// import React, {useRef} from 'react'
// import clamp from 'lodash-es/clamp'
// import swap from 'lodash-move'
// import {useGesture} from 'react-use-gesture'
// import {useSprings, animated, interpolate} from 'react-spring'
// import './index.less'
// // Returns fitting styles for dragged/idle items
// const fn = (order, down?, originalIndex?, curIndex?, y?): any => index =>
//   down && index === originalIndex
//     ? {y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex'}
//     : {y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false}

// function PageView({items}) {
//   const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
//   const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
//   // const bind = useGesture(({args: [originalIndex], down, delta: [, y]}) => {
//   const bind = useGesture({
//     onDrag: ({down, offset: [x, y]}) => {
//       const curIndex = order.current.indexOf(originalIndex)
//       const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
//       const newOrder = swap(order.current, curIndex, curRow)
//       ;(setSprings as any)(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
//       if (!down) order.current = newOrder
//     },
//   })

//   // const bind = useGesture({
//   //   onDrag: ({down, offset: [x, y]}) => set({x, y}),
//   //   onMouseDown: () => console.log('mouse down'),
//   // })

//   // function DragAndMouseDown() {
//   //   const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
//   //   const bind = useGesture({
//   //     onDrag: ({ down, offset: [x, y] }) => set({ x, y }),
//   //     onMouseDown: () => console.log('mouse down')
//   //   })
//   //   return <animated.div {...bind()} style={{ x, y }} />
//   // }

//   return (
//     <div className="content-body" style={{height: items.length * 100}}>
//       {(springs as any).map(({zIndex, shadow, y, scale}, i) => (
//         <animated.div
//           {...bind(i)}
//           key={i}
//           style={{
//             zIndex,
//             boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
//             transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`),
//           }}
//           children={items[i]}
//         />
//       ))}
//     </div>
//   )
// }

// export default PageView
