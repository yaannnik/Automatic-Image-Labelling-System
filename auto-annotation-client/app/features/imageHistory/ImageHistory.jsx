/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Item, Label, Dropdown, Progress } from 'semantic-ui-react';
import log from 'electron-log';

export default function TagCategoryPage(props: any) {
  // const { imgList } = props;
  const items = [
    {
      childKey: 0,
      image: 'Images/WechatIMG856.jpeg',
      header: 'Header',
      description: 'Mask',
      meta: 'Width',
      extra: 'Height',
    },
    {
      childKey: 1,
      image: 'Images/WechatIMG471.jpeg',
      header: 'Header',
      description: 'Mask',
      meta: 'Width',
      extra: 'Height',
    },
    {
      childKey: 2,
      image: 'Images/WechatIMG509.jpeg',
      header: 'Mask',
      description: 'Frame',
      meta: 'Width',
      extra: 'Height',
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
