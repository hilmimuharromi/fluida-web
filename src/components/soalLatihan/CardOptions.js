import React from 'react';
import {
  CardRow,
  CardFooter,
  Input,
  Checkbox,
} from '@material-tailwind/react';
export default function CardSoal(props) {
  const { options, setOptions, disabled, answer,  keyQuestion} = props;

  const onChangeStatus = (data, key) => {
    const newOptions = options.map((item) => {
      if (item.key === key) {
        item.isTrue = true;
      } else {
        item.isTrue = false;
      }
      return item;
    });
    setOptions(newOptions);
  };

  const onChangeOption = (data, key) => {
    const newOptions = options.map((item) => {
      if (item.key === key) {
        item.option = data;
      }
      return item;
    });
    setOptions(newOptions);
  };

  const getAnswer  = (item) => {
    const isFound = answer.find((a) => a.key === keyQuestion)
    console.log(isFound, item)
    if(isFound && item.key === isFound.selectedOption) {
      return true
    }  else {
      return  false
    }
  }

  return (
      <CardFooter>
        {options &&
          options.map((item) => (
            <CardRow>
              <div className='w-6/12 m-5'>
                <Input
                disabled={disabled}
                  type='text'
                  color='lightBlue'
                  size='regular'
                  outline={true}
                  placeholder={`Option ${item.key}`}
                  value={item.option}
                  onChange={(e) => onChangeOption(e.target.value, item.key)}
                />
              </div>
              <Checkbox
                disabled={disabled}
                value={true}
                onChange={(e) => onChangeStatus(e.target.value, item.key)}
                checked={item.isTrue}
                color='lightBlue'
                text='benar'
                className=""
                id={`checkbox-${item.key}`}
              />
              {
                answer  && answer.length > 0 &&
                <div className='flex h-100 ml-5'>
                  <Checkbox
                   disabled={disabled}
                   value={true}
                   onChange={(e) => onChangeStatus(e.target.value, item.key)}
                   checked={getAnswer(item)}
                   color='lightBlue'
                   text='jawaban user'
                   id={`checkbox-${item.key}`}
                 />
                </div>
              }
            </CardRow>
          ))}
      </CardFooter>
  );
}
