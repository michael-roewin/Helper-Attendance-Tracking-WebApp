import { LegacyRef, forwardRef } from 'react';
import './Avatar.scss';

interface AvatarProps {
  initials: string;
  className?: string
}

const Avatar =  forwardRef(function Avatar(props: AvatarProps, ref: LegacyRef<HTMLDivElement> | undefined) {
  return (
    <div ref={ref} {...props} className={`avatar rounded-full h-12 w-12 flex items-center justify-center ${props?.className}`}>
      <h3 className="m-0 capitalize">{props?.initials}</h3>
    </div>
  )
});

export default Avatar;