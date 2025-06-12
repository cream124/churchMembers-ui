import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import slider from './slider.json';

export default function CarouselComp() {
  

  return (
    <Carousel>
      {
        slider.map(item => <Item key={item.id} item={item} />)
      }
    </Carousel>
  );
}

