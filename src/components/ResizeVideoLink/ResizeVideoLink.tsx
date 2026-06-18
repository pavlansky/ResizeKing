'use client';

import FileTypeCard from '@/components/FileTypeCard/FileTypeCard';
import cardClasses from '@/components/FileTypeCard/FileTypeCard.module.css';
import { Link } from '@/i18n/navigation';
import { useFFmpegConext } from '@/context/FFmpegcontext';

interface ResizeVideoLinkProps {
  label: string;
}

export default function ResizeVideoLink({ label }: ResizeVideoLinkProps) {
  const { load } = useFFmpegConext();
  return (
    <Link
      href={'/resize-video'}
      style={{ display: 'flex', textDecoration: 'none' }}
      onClick={() => void load()}
    >
      <FileTypeCard
        label={label}
        iconClass={cardClasses.videoIcon}
      />
    </Link>
  );
}
