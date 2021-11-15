/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Item, Label, Dropdown, Progress } from 'semantic-ui-react';
import log from 'electron-log';

export default function TagCategoryPage(props: any) {
  // const { imgList } = props;
  const items = [
    {
      childKey: 0,
      image: '/Users/joanna/Desktop/CU/Courses/6893_big_data_analytics/project/auto-annotation-client/app/example/mockImage/cat.jpg',
      header: 'Cat',
      description: 'Frame',
      meta: 'Width',
      extra: 'Height',
    },
    {
      childKey: 1,
      image: '/Users/joanna/Desktop/CU/Courses/6893_big_data_analytics/project/auto-annotation-client/app/example/mockImage/tiger.jpg',
      header: 'Header',
      description: 'Tiger',
      meta: 'Width',
      extra: 'Height',
    },
    {
      childKey: 2,
      image: '/Users/joanna/Desktop/CU/Courses/6893_big_data_analytics/project/auto-annotation-client/app/example/mockImage/dog.jpg',
      header: 'Header',
      description: 'Dog',
      meta: 'Width',
      extra: 'Height',
    },
    {
      childKey: 3,
      image: '/Users/joanna/Desktop/CU/Courses/6893_big_data_analytics/project/auto-annotation-client/app/example/mockImage/cat.jpg',
      header: 'Cat',
      description: 'Frame',
      meta: 'Width',
      extra: 'Height',
    },
  ];

  return (
    <div>
      <h1> Revised annotation history </h1>
      <Item.Group items={items} />
    </div>
  );
}
