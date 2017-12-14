import * as React from "react";

import * as moment from 'moment';
import { ComposedChart, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

const PriceChart = React.createClass({
  render () {
    const {
      tokensPriceChart
    } = this.props;

let data = [
      // {name: 'Page A', uv: 4000, pv: 9000},
      // {name: 'Page B', uv: 3000, pv: 7222},
      // {name: 'Page C', uv: 2000, pv: 6222},
      // {name: 'Page D', uv: 1223, pv: 5400},
      // {name: 'Page E', uv: 1890, pv: 3200},
      // {name: 'Page F', uv: 2390, pv: 2500},
      // {name: 'Page G', uv: 3490, pv: 1209},
];

    if (tokensPriceChart.success) {
      data = tokensPriceChart.data.data.map(item => ({
        name: moment(item.time).format("hh:mm"),
        uv: item.time,
        price: item.high,
        volumeTo: item.volumeTo
      }))
    }

    return (
      <div>
        <h4>Price change:</h4>

        <ComposedChart width={900} height={300} data={data} syncId="anyId"
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Line type='monotone' dataKey='price' stroke='#82ca9d' fill='#82ca9d' />
          {/*<Bar dataKey='volumeTo' barSize={10} fill='#413ea0'/>*/}
          <Brush />
        </ComposedChart>

    </div>
    );
  }
});

import { connect } from 'react-redux'

export default connect(
  state => ({
    tokensPriceChart: state.chaingear.tokensPriceChart
  })
)(PriceChart);


// import { Grid } from '@vx/grid';
// import { Group } from '@vx/group';
// import { curveBasis, curveMonotoneX } from '@vx/curve';
// import { GradientOrangeRed, LinearGradient } from '@vx/gradient';
// import { genDateValue, appleStock } from '@vx/mock-data';
// import { AxisLeft, AxisBottom } from '@vx/axis';
// import { AreaClosed, LinePath, Line } from '@vx/shape';
// import { scaleTime, scaleLinear } from '@vx/scale';
// import { extent, max, bisector } from 'd3-array';
// import { withParentSize } from '@vx/responsive';
// import { withTooltip, Tooltip } from '@vx/tooltip';
// import { localPoint } from '@vx/event';

// const data = genDateValue(40);

// // accessors
// const x = d => d.date;
// const y = d => d.value;

// // responsive utils for axis ticks
// function numTicksForHeight(height) {
//   if (height <= 300) return 3;
//   if (300 < height && height <= 600) return 5;
//   return 10;
// }

// function numTicksForWidth(width) {
//   if (width <= 300) return 2;
//   if (300 < width && width <= 400) return 5;
//   return 10;
// }

// const PriceChart = ({  }) => {
//   const width = 600;
//   const height = 400;
//   const margin = {
//     left: 70,
//     right: 0,
//     top: 100,
//     bottom: 100
//   };

//   console.log(data);

//   if (width < 10) return null;

//   // bounds
//   const xMax = width - margin.left - margin.right;
//   const yMax = height - margin.top - margin.bottom;

//   // scales
//   const xScale = scaleTime({
//     range: [0, xMax],
//     domain: extent(data, x),
//   });
//   const yScale = scaleLinear({
//     range: [yMax, 0],
//     domain: [0, max(data, y)],
//     nice: true,
//   });

//   // // scale tick formats
//   // const yFormat = yScale.tickFormat ? yScale.tickFormat() : identity;
//   // const xFormat = xScale.tickFormat ? xScale.tickFormat() : identity;

//   return (
//     <svg width={width} height={height}>
//       <GradientOrangeRed
//         id="linear"
//         vertical={false}
//         fromOpacity={0.8}
//         toOpacity={0.3}
//       />
//       <rect
//         x={0}
//         y={0}
//         width={width}
//         height={height}
//         fill="#f4419f"
//         rx={14}
//       />
//       <Grid
//         top={margin.top}
//         left={margin.left}
//         xScale={xScale}
//         yScale={yScale}
//         stroke="rgba(142, 32, 95, 0.9)"
//         width={xMax}
//         height={yMax}
//         numTicksRows={numTicksForHeight(height)}
//         numTicksColumns={numTicksForWidth(width)}
//       />
//       <Group top={margin.top} left={margin.left}>
//         <AreaClosed
//           data={data}
//           xScale={xScale}
//           yScale={yScale}
//           x={x}
//           y={y}
//           strokeWidth={2}
//           stroke={'transparent'}
//           fill={'url(#linear)'}
//           curve={curveBasis}
//         />
//         <LinePath
//           data={data}
//           xScale={xScale}
//           yScale={yScale}
//           x={x}
//           y={y}
//           stroke={"url('#linear')"}
//           strokeWidth={2}
//           curve={curveBasis}
//         />
//       </Group>
//       <AxisLeft
//         top={margin.top}
//         left={margin.left}
//         scale={yScale}
//         hideZero
//         numTicks={numTicksForHeight(height)}
//         label="value"
//         labelProps={{
//           fill: '#8e205f',
//           textAnchor: 'middle',
//           fontSize: 12,
//           fontFamily: 'Arial',
//         }}
//         stroke="#1b1a1e"
//         tickStroke="#8e205f"
//         tickLabelProps={(value, index) => ({
//           fill: '#8e205f',
//           textAnchor: 'end',
//           fontSize: 10,
//           fontFamily: 'Arial',
//           dx: '-0.25em',
//           dy: '0.25em',
//         })}
//       />
//       <AxisBottom
//         top={height - margin.bottom}
//         left={margin.left}
//         scale={xScale}
//         numTicks={numTicksForWidth(width)}
//         label="time"
//       >
//         {props => {
//           const tickLabelSize = 10;
//           const tickRotate = 45;
//           const tickColor = '#8e205f';
//           const axisCenter =
//             (props.axisToPoint.x - props.axisFromPoint.x) / 2;
//           return (
//             <g className="my-custom-bottom-axis">
//               {props.ticks.map((tick, i) => {
//                 const tickX = tick.to.x;
//                 const tickY =
//                   tick.to.y + tickLabelSize + props.tickLength;
//                 return (
//                   <Group
//                     key={`vx-tick-${tick.value}-${i}`}
//                     className={'vx-axis-tick'}
//                   >
//                     <Line
//                       from={tick.from}
//                       to={tick.to}
//                       stroke={tickColor}
//                     />
//                     <text
//                       transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
//                       fontSize={tickLabelSize}
//                       textAnchor="middle"
//                       fill={tickColor}
//                     >
//                       {tick.formattedValue}
//                     </text>
//                   </Group>
//                 );
//               })}
//               <text
//                 textAnchor="middle"
//                 transform={`translate(${axisCenter}, 50)`}
//                 fontSize="8"
//               >
//                 {props.label}
//               </text>
//             </g>
//           );
//         }}
//       </AxisBottom>
//     </svg>
//   );
// };

// const data = genDateValue(10);
// //appleStock; 
// //genDateValue(40);
// // appleStock;

// const width = 750;
// const height = 400;

// // const xStock = d => new Date(d.date);
// // // const y = d => d.close;
// // const yScale2 = d => d.value;

// const xFunc = (d: any) => new Date(d.date);
// const yFunc = d => d.value;

// // Bounds
// const margin = {
//   top: 60,
//   bottom: 60,
//   left: 80,
//   right: 80,
// };





// const PriceChart = (props) => {
//   const {
//     // parentWidth: width,
//     // parentHeight: height,
//     tooltipLeft,
//     tooltipTop,
//     showTooltip,
//     hideTooltip,
//     tooltipData,
//   } = props;
//   let _svg;

// const xMax = width - margin.left - margin.right;
// const yMax = height - margin.top - margin.bottom;


// const xScale = scaleTime({
//   range: [0, xMax],
//   domain: extent(data, xFunc)
// });
// const yScale = scaleLinear({
//   range: [yMax, 0],
//   domain: [0, max(data, yFunc)],
// });

// const yScale2 = scaleLinear({
//   range: [yMax, 0],
//   domain: [0, max(data, yFunc) + yMax / 3],
//   nice: true
// });


//   return (
//  <div>
//     <svg ref={s => (_svg = s)} width={width} height={height}>
//       <LinearGradient
//         from='#fbc2eb'
//         to='#a6c1ee'
//         id='gradient'
//       />

//       <Group top={margin.top} left={margin.left}>

//         <AreaClosed
//           data={data}
//           xScale={xScale}
//           yScale={yScale}
//           x={xFunc}
//           y={yFunc}
//           fill={"url(#gradient)"}
//           stroke={""}
//            curve={curveMonotoneX}
//            onMouseLeave={data => event => hideTooltip()}
//            onMouseMove={data => event => {
//               let { x } = localPoint(_svg, event);
//               let _x = x - margin.left;
//               const x0 = xScale.invert(_x);
//               // const y = xScale(_x);

//               const index = bisector(d => d).left(data.map(d => d.date).reverse(), x0)
//               // const bisectDate = bisector(d => {
//               //   return d.date;
//               // }).right;
//               // const index = bisectDate(data, x0);
//               // debugger
//               // const d0 = data[index - 1];
//               const d1 = data[index];
//               // let d = d1;

//               console.log(' d1 >> ', d1);
//               showTooltip({
//                 tooltipData: x,
//                 tooltipLeft: _x,
//                 tooltipTop: yScale2(d1.value)
//               })
//               // if (d0 && d1)
//               //   d = x0 - (+xFunc(d0.date)) > (+xFunc(d1.date)) - x0 ? d1 : d0;

//               // if (d)
//               // showTooltip({
//               //   tooltipData: d,
//               //   tooltipLeft: x,
//               //   tooltipTop: yScale2(d.value)
//               // });
//           }}
//         />
//         {tooltipData &&
//           <g>
//             <Line
//               from={{ x: tooltipLeft, y: 0 }}
//               to={{ x: tooltipLeft, y: yMax }}
//               stroke="white"
//               style={{ pointerEvents: 'none' }}
//               strokeDasharray="2,2"
//             />
//             <circle
//               cx={tooltipLeft}
//               cy={tooltipTop + 1}
//               r={4}
//               fill="black"
//               fillOpacity={0.1}
//               stroke="black"
//               strokeOpacity={0.1}
//               strokeWidth={2}
//               style={{pointerEvents: 'none'}}
//             />
//             <circle
//               cx={tooltipLeft}
//               cy={tooltipTop}
//               r={4}
//               fill="rgba(92, 119, 235, 1.000)"
//               stroke="white"
//               strokeWidth={2}
//               style={{pointerEvents: 'none'}}
//             />
//           </g>}
//         <AxisLeft
//           scale={yScale}
//           top={0}
//           left={0}
//           label={'Price ($)'}
//           stroke={'#1b1a1e'}
//           tickTextFill={'#1b1a1e'}
//         />

//         <AxisBottom
//           scale={xScale}
//           top={yMax}
//           label={'Time'}
//           stroke={'#1b1a1e'}
//           tickTextFill={'#1b1a1e'}
//         />

//       </Group>
//     </svg>
//   </div>
//   );
// }

// export default withParentSize(withTooltip(PriceChart));;

// import { AreaClosed, Line, Bar } from '@vx/shape';
// import { appleStock } from '@vx/mock-data';
// import { curveMonotoneX } from '@vx/curve';
// import { LinearGradient } from '@vx/gradient';
// import { GridRows, GridColumns } from '@vx/grid';
// import { scaleTime, scaleLinear } from '@vx/scale';
// import { withTooltip, Tooltip } from '@vx/tooltip';
// import { localPoint } from '@vx/event';
// import { extent, max, bisector } from 'd3-array';
// import { timeFormat } from 'd3-time-format';

// // const stock = appleStock.slice(800);
// const formatDate = timeFormat("%b %d, '%y %H %M");

// // accessors
// const xStock = d => new Date(d.date);
// const yStock = d => d.close;
// const bisectDate = bisector(d => new Date(d.date)).left;

// class Area extends React.Component<any, any> {
//   svg;
//   constructor(props) {
//     super(props);
//     this.handleTooltip = this.handleTooltip.bind(this);
//   }
//   handleTooltip({ event, data, xStock, xScale, yScale }) {
//     const { showTooltip } = this.props;
//     const { x } = localPoint(event);
//     const x0 = xScale.invert(x);
//     const index = bisectDate(data, x0, 1);
//     const d0 = data[index - 1];
//     const d1 = data[index];
//     let d = d0;
//     if (d1 && d1.date) {
//       d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
//     }
//     showTooltip({
//       tooltipData: d,
//       tooltipLeft: x,
//       tooltipTop: yScale(d.close),
//     });
//   }
//   render() {
//     const {
//       width,
//       height,
//       margin,
//       showTooltip,
//       hideTooltip,
//       tooltipData,
//       tooltipTop,
//       tooltipLeft,
//       events,
//       tokensPriceChart,
//     } = this.props;

//     console.log(' > ', tokensPriceChart)

//     let stock = [];

//     if (tokensPriceChart.success) {
//       // stock = [
//       //   {
//       //     date: '2007-04-26T08:00:00.000Z',
//       //     close: 100
//       //   },
//       //   {
//       //     date: '2007-04-25T07:00:00.000Z',
//       //     close: 170
//       //   },
//       //   {
//       //     date: '2007-04-24T06:00:00.000Z',
//       //     close: 90
//       //   }
//       // ]
//       stock = appleStock.slice(2, 4);
//       // tokensPriceChart.data.data.map((item, index) => ({
//       //   date: moment(item.time).format(),
//       //   close: item.high
//       // })).slice(2, 100).concat([
//       //   {
//       //     date: "2017-12-14T11:50:00+03:00",
//       //     close: 10000
//       //   }
//       // ]);
//       // tokensPriceChart.data.data.map(item => ({
//       //   date: (new Date(item.time)).toString(),
//       //   close: item.volumeFrom
//       // }))
//       // appleStock.slice(2, 10);
//       console.log(stock)
//       //tokensPriceChart.data.data;
//     }

//     if (width < 10) return null;

//     // bounds
//     const xMax = width - margin.left - margin.right;
//     const yMax = height - margin.top - margin.bottom;

//     // scales
//     const xScale = scaleTime({
//       range: [0, xMax],
//       domain: extent(stock, xStock),
//     });
//     const yScale = scaleLinear({
//       range: [yMax, 0],
//       domain: [0, max(stock, yStock) + yMax / 3],
//       nice: true,
//     });

//     return (
//       <div>
//         <svg ref={s => (this.svg = s)} width={width} height={height}>
//           <rect
//             x={0}
//             y={0}
//             width={width}
//             height={height}
//             fill="#32deaa"
//             rx={14}
//           />
//           <defs>
//             <linearGradient
//               id="gradient"
//               x1="0%"
//               y1="0%"
//               x2="0%"
//               y2="100%"
//             >
//               <stop
//                 offset="0%"
//                 stopColor="#FFFFFF"
//                 stopOpacity={1}
//               />
//               <stop
//                 offset="100%"
//                 stopColor="#FFFFFF"
//                 stopOpacity={0.2}
//               />
//             </linearGradient>
//           </defs>
//           <GridRows
//             lineStyle={{ pointerEvents: 'none' }}
//             scale={yScale}
//             width={xMax}
//             strokeDasharray="2,2"
//             stroke="rgba(255,255,255,0.3)"
//           />
//           <GridColumns
//             lineStyle={{ pointerEvents: 'none' }}
//             scale={xScale}
//             height={yMax}
//             strokeDasharray="2,2"
//             stroke="rgba(255,255,255,0.3)"
//           />
//           <AreaClosed
//             data={stock}
//             xScale={xScale}
//             yScale={yScale}
//             x={xStock}
//             y={yStock}
//             strokeWidth={1}
//             stroke={'url(#gradient)'}
//             fill={'url(#gradient)'}
//             curve={curveMonotoneX}
//           />
//           <Bar
//             x={0}
//             y={0}
//             width={width}
//             height={height}
//             fill="transparent"
//             rx={14}
//             data={stock}
//             onTouchStart={data => event =>
//               this.handleTooltip({
//                 event,
//                 data,
//                 xStock,
//                 xScale,
//                 yScale,
//               })}
//             onTouchMove={data => event =>
//               this.handleTooltip({
//                 event,
//                 data,
//                 xStock,
//                 xScale,
//                 yScale,
//               })}
//             onMouseMove={data => event =>
//               this.handleTooltip({
//                 event,
//                 data,
//                 xStock,
//                 xScale,
//                 yScale,
//               })}
//             onMouseLeave={data => event => hideTooltip()}
//           />
//           {tooltipData && (
//             <g>
//               <Line
//                 from={{ x: tooltipLeft, y: 0 }}
//                 to={{ x: tooltipLeft, y: yMax }}
//                 stroke="rgba(92, 119, 235, 1.000)"
//                 strokeWidth={2}
//                 style={{ pointerEvents: 'none' }}
//                 strokeDasharray="2,2"
//               />
//               <circle
//                 cx={tooltipLeft}
//                 cy={tooltipTop + 1}
//                 r={4}
//                 fill="black"
//                 fillOpacity={0.1}
//                 stroke="black"
//                 strokeOpacity={0.1}
//                 strokeWidth={2}
//                 style={{ pointerEvents: 'none' }}
//               />
//               <circle
//                 cx={tooltipLeft}
//                 cy={tooltipTop}
//                 r={4}
//                 fill="rgba(92, 119, 235, 1.000)"
//                 stroke="white"
//                 strokeWidth={2}
//                 style={{ pointerEvents: 'none' }}
//               />
//             </g>
//           )}
//         </svg>
//         {tooltipData && (
//           <div>
//             <Tooltip
//               top={tooltipTop - 12}
//               left={tooltipLeft + 12}
//               style={{
//                 backgroundColor: 'rgba(92, 119, 235, 1.000)',
//                 color: 'white',
//               }}
//             >
//               {`$${yStock(tooltipData)}`}
//             </Tooltip>
//             <Tooltip
//               top={yMax - 14}
//               left={tooltipLeft}
//               style={{
//                 transform: 'translateX(-50%)',
//               }}
//             >
//               {formatDate(xStock(tooltipData))}
//             </Tooltip>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// import { connect } from 'react-redux';

// export default connect(
//   state => ({
//     tokensPriceChart: state.chaingear.tokensPriceChart
//   })
// )(withTooltip(Area));

