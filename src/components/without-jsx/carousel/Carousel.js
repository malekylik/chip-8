import React, { useState, useEffect, useRef, createRef, } from 'react';

import Circle from './components/Circle/Circle';

import './Carousel.less';

function scan(xs, f, acc) {
  var result = [acc];
  let newAcc = acc;

  for (var i = 0; i < xs.length; i++) {
    newAcc = f(newAcc, xs[i]);

    result.push(newAcc);
  }

  return result;
}

// function groupBy(call, arrLike) {
//   const groupedArr = [];
//   let i = 0;

//   for (; i < arrLike.length; i++) {
//     const group = [arrLike[i]];

//     while (i < arrLike.length - 1 && call(arrLike[i], arrLike[i + 1])) {
//       group.push(arrLike[i + 1]);

//       i++;
//     }

//     groupedArr.push(group);
//   }

//   return groupedArr;
// };

const breakBySteps = (call, arrLike) => {
  const steps = [];

  for (let i = 0; i < arrLike.length; i++) {
    const group = [arrLike[i]];
    let acc = arrLike[i];

    while (i < arrLike.length - 1 && call(acc, arrLike[i + 1])) {
      group.push(arrLike[i + 1]);

      acc += arrLike[i + 1];
      i++;
    }

    steps.push(group);
  }

  return steps;
};

function zip(a, b) {
  const res = [];

  for (let i = 0; i < a.length && i < b.length; i++) {
    res.push([a[i], b[i]]);
  }

  return res;
}

const breakArray = (config, arrLike) => {
  const newArray = [];
  let startIndx = 0;
  let endIndex = 0;

  for (let i = 0; i < config.length && endIndex < arrLike.length; i++) {
    endIndex += config[i];

    newArray.push(arrLike.slice(startIndx, endIndex));

    startIndx = endIndex;
  }

  return newArray;
}

const tail = arr => arr[arr.length - 1];

const getElementWidth = e => e.getBoundingClientRect().width;

const Carousel = (props) => {
  const { children } = props;
  const [currentOffset, setCurrentOffset] = useState(-0);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsAmount, setStepsAmount] = useState(0);
  const [steps, setSteps] = useState([[0]]);
  const [elementsOffsets, setElementsOffsets] = useState([]);
  const elementsRefs = useRef(children.map(() => createRef()));
  const wrapperRef = useRef();

  const getElementsRefs = () => elementsRefs.current;

  useEffect(() => {
    const callback = () => {
      const containerWidth = getElementWidth(wrapperRef.current);
      const sizes = getElementsRefs(elementsRefs).map(ref => getElementWidth(ref.current));
      const elementSteps = scan(sizes, (acc, e) => acc + e, 0);
      // const offsetsByStep = scan(sizes, (acc, e) => acc + e <= containerWidth ?  acc + e : e, 0);
      // const steps = groupBy((a, b) => a[1] <= b[1], zipped).map((a => a.map(([a, _]) => a)));
      const steps = breakBySteps((acc, el) => acc + el <= containerWidth, sizes);
      const breaked = breakArray(steps.map(step => step.length), elementSteps.slice(0, elementSteps.length - 1));
      const zipped = zip(breaked, steps);
      const elementsOffsets = zip(elementSteps.slice(0, elementSteps.length - 1), sizes);
      const stepsAmount = steps.length;

      console.log('containerWidth', containerWidth);
      // console.log('sizes', sizes);
      // console.log('elementSteps', elementSteps);
      console.log('elementsOffsets', elementsOffsets);
      // console.log('stepsAmount', stepsAmount);
      // console.log('offsetsByStep', offsetsByStep);
      // console.log('breaked', breaked);
      // console.log('zipped', zipped);
      console.log('steps', zipped);

      setSteps(zipped);
      setElementsOffsets(elementsOffsets);
      setStepsAmount(stepsAmount);
    };

    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, []);

  const getTransformOffset = (i) => steps[i][0][0];

  const shiftLastStepIndx = () => {
    let freeSpace = getElementWidth(wrapperRef.current);
    let i = elementsOffsets.length - 1;

    while (freeSpace - (elementsOffsets[i][1]) > 0 && i >= 0) {
      freeSpace -= elementsOffsets[i][1];
      i -=1;
    }

    i = i + 1 < elementsOffsets.length ? i + 1 : i;

    return elementsOffsets[i][0];
  }

  const onCircleClick = i => () => {
    const newOffset = (i === stepsAmount - 1) ? shiftLastStepIndx(i) : getTransformOffset(i);
    // const newOffset = getTransformOffset(i);

    const containerWidth = getElementWidth(wrapperRef.current);
    const elementsInStepWidth = tail(scan(elementsOffsets.slice(elementsOffsets.findIndex(([off, _]) => off === newOffset)), (acc, [_, size]) => acc + size, 0).filter((size, i) => size < containerWidth || i < 2));
    const marginForCentring = ((containerWidth - elementsInStepWidth) / 2) | 0;
    const centredOffset = newOffset - marginForCentring < 0 ? 0 : newOffset - marginForCentring;
    // const centredOffset = newOffset;

    setCurrentOffset(-centredOffset);
    setCurrentStep(i);
  };

  const circles = [];

  for (let i = 0; i < stepsAmount; i++) {
    circles.push(<Circle key={i} onClick={onCircleClick(i)} />)
  }

  console.log('currentStep', currentStep);
  
  return (
    <div>
      <div ref={wrapperRef} className='carousel'>
        <div className='carousel__wrapper' style={{ transform: `translate3d(${currentOffset}px, 0, 0)` }}>
          {React.Children.map(children, 
            (child, i) => {
              return (
                <div ref={getElementsRefs(elementsRefs)[i]} key={i}>{child}</div>
              );
            }
          )}
        </div>
      </div>
      <div>
        {stepsAmount > 1 && circles}
      </div>
    </div>
  );
};

export default Carousel;
