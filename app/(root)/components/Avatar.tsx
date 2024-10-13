
import React from 'react'

type Props = {
  letter:string
};

const Avatar = ({
    letter
} : Props ) => {
  return (
    <div
      className="
    h-12
    flex
    text-lg
    font-medium
    items-center
    justify-center 
    min-w-12
    bg-accent
    text-white
    rounded-full
    "
    >
      {letter}
    </div>
  );
}

export default Avatar