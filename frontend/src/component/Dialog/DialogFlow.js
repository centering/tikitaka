import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import getTreeFromFlatData from 'react-sortable-tree';

const DialogFlow = ({ flow_data, onChange }) => {

  return (
      <>
        <div style={{ height: 800 }}>
          <SortableTree
            treeData={flow_data}
            onChange={treeData => onChange({ treeData })}
          />
        </div>
      </>
  );
};

export default DialogFlow;


