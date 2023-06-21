export const codeArr = [{
  codeType: 'tsx',
  code: `<div className="father ">
  <div className="child">
    <div className="child-item ">1</div>
    <div className="child-item ">2</div>
    <div className="child-item ">3</div>
    <div className="child-item ">4</div>
  </div>
</div>`
}, {
  codeType: 'less',
  code: `
  .father {
    width: 800px;
    height: 200px;
    // border: 1px solid #333;
    padding: 20px 0px;
    background-color: dodgerblue;
    overflow: hidden;
  
    .child {
      display: flex;
      margin: 20px -10px;
      background-color: limegreen;
  
      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        height: 100px;
        font-size: 20px;
        // border: 30px solid #333;
        margin: 10px;
        background-color: lightseagreen;
        flex-grow: 1;
      }
    }`
}
]
