import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';

export default class DialogFlow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline'}] }
      ],
    };

    this.state.treeData = this.props.flow_data;
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
