import { LegacyRef, forwardRef } from 'react';
import './Avatar.scss';

interface AvatarProps {
  initials: string;
  className?: string
  height?: number;
  width?: number;
}

const Avatar =  forwardRef(function Avatar(props: AvatarProps, ref: LegacyRef<HTMLDivElement> | undefined) {
  const height = props?.height || 12;
  const width = props?.width || 12;

  return (
    <div ref={ref} {...props} className={`avatar rounded-full h-${height} w-${width} flex items-center justify-center ${props?.className}`}>
      <h3 className="m-0 capitalize">{props?.initials}</h3>
    </div>
  )
});

export default Avatar;