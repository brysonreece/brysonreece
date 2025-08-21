import { ComponentProps } from 'react';

export function ExternalLink({ target, rel, ...props }: ComponentProps<'a'>) {
    return <a target={target || '_blank'} rel={rel || 'noopener noreferrer'} {...props} />;
}
