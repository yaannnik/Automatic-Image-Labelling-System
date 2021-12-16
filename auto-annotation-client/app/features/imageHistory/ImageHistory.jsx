/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Item, Label, Dropdown, Progress } from 'semantic-ui-react';
import log from 'electron-log';

export default function ImageHistory(props) {
  const { imglist } = props;
  console.log(imglist);
  const items = [
    {
      childKey: 0,
      image: imglist[0],
      // header: 'Header',
      // description: 'Mask',
      // meta: 'Width',
      // extra: 'Height',
    },
    {
      childKey: 1,
      image: imglist[1],
      // header: 'Header',
      // description: 'Mask',
      // meta: 'Width',
      // extra: 'Height',
    },
    {
      childKey: 2,
      image: imglist[2],
      // header: 'Mask',
      // description: 'Frame',
      // meta: 'Width',
      // extra: 'Height',
    },
  ];

  return (
    <div>
      <Label as="a" size="huge" color="green" tag>
        Revised history
      </Label>
      <Item.Group items={items} />
    </div>
  );
}
