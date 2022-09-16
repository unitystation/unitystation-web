import Link from 'next/link';

interface StyledLinkProps {
    href: string;
    className?: string;
    children?: React.ReactNode;
    newTab?: boolean;
}

const StyledLink = (props: StyledLinkProps) => {
    const { href, className,  children, newTab} = props;
    return (
        <Link href={href}>
            <a className={className} target={newTab ? "_blank": ""}>
                {children}
            </a>
        </Link>
    );
}

export default StyledLink;
