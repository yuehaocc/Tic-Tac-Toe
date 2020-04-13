import React from 'react';

class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }

  incrementCount() {
    console.log('incrementCount')
    // 注意：这样 *不会* 像预期的那样工作。
    // this.setState({ count: this.state.count + 1 });
    this.setState((state) => ({count: state.count + 1}))
  }

  handleSomething() {
    console.log('handleSomething')
    // 假设 `this.state.count` 从 0 开始。
    this.incrementCount();
    this.incrementCount();
    this.incrementCount();
    console.log('handleSomething count', this.state.count);
    // 当 React 重新渲染该组件时，`this.state.count` 会变为 1，而不是你期望的 3。

    // 这是因为上面的 `incrementCount()` 函数是从 `this.state.count` 中读取数据的，
    // 但是 React 不会更新 `this.state.count`，直到该组件被重新渲染。
    // 所以最终 `incrementCount()` 每次读取 `this.state.count` 的值都是 0，并将它设为 1。

    // 问题的修复参见下面的说明。
  }

  render() {
    return (
      <div className="Test">
        <h1>Test</h1>
        <h2>num:{this.state.count}</h2>
        <button onClick={() => this.handleSomething()}>btn</button>
      </div>
    )
  }
}

export default Test;