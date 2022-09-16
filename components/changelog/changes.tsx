import {Change} from '../../types/whatsNewResponse';
import {CardBody, CardTitle} from '../cards/card';
import Container from '../layout/container';
import Link from 'next/link';


export function ChangeEntry (props: Change) {
    const { description, author_url, author_username, pr_url, pr_number } = props;
    return (
        <>
            <p className={"font-semibold"}>
                {description}
            </p>
            <p className={"font-extralight mb-1"}>
                done by <Link href={author_url}>{author_username}</Link> on PR #<Link href={pr_url}>{pr_number}</Link>
            </p>
        </>
    )
}



export function ChangesGroup(props: { changes: Array<Change>, title: string }) {
    const {changes, title} = props;
    return (
        <Container>
            <CardTitle>{title}</CardTitle>
            <CardBody>
                <ul className={"list-disc"}>
                    {
                        changes?.map((change) => <li><ChangeEntry {...change}/></li>)
                    }
                </ul>
            </CardBody>
        </Container>
    )
}
