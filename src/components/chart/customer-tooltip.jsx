import React from 'react';
import { Typography, Badge } from '@arco-design/web-react';
import './style/index.less'

const { Text } = Typography;

export default function CustomTooltip(props) {
  const { formatter = (value) => value, color, name } = props;
  return (
    <div className='customer-tooltip'>
      <div className='customer-tooltip-title'>
        <Text bold>{props.title}</Text>
      </div>
      <div>
        {props.data.map((item, index) => (
          <div className='customer-tooltip-item' key={index}>
            <div>
              <Badge color={color || item.color} />
              {name || item.name}
            </div>
            <div>
              <Text bold>{formatter(item.value)}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}