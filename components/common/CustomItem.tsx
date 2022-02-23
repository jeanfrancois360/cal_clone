import Link from 'next/link';
import React from 'react';

const CustomItem = ({ text, imagePath, url }: Props) => {
  return (
    <li className="w-full my-2">
      <Link href={url}>
        <a className="flex items-center justify-start w-full px-2 py-1 text-gray-300 hover:text-primary hover:bg-secondary">
          {imagePath}
          <span className="ml-3">{text}</span>
        </a>
      </Link>
    </li>
  );
};

interface Props {
  url: string;
  imagePath: any;
  text: string;
}

export default CustomItem;
