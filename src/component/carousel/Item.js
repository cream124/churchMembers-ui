import * as React from 'react';
import PanelComp from '../Common/Panel/PanelComp';

export default function Item(props) {
  const { item } = props;
  return (
    <>
      <PanelComp
        // margin="0.7em"
        // padding="0.7em"
        // elevation="0"
        minHeight="30em"
        image={true}
        urlImage={item.image}
      >

      </PanelComp>
    </>
  );
}

