import React from 'react';

import './stars-count.css';
import { getShortNumber } from '../../utils/utils';

const StarsCount = ({ starsCount }) => {
  return (
    <div className="stars-count">
      <img src={require("../../images/star.svg")} alt="" />
      <span className="stars-count__name">{getShortNumber(starsCount)}</span>
    </div>
  );
};

export default StarsCount;