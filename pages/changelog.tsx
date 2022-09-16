import {NextPage} from 'next';
import Section from '../components/layout/section';
import {ChangesGroup} from '../components/changelog/changes';
import Container from '../components/layout/container';
import {useEffect, useState} from 'react';
import {Change, WhatsNewResponse} from '../types/whatsNewResponse';
import Row from '../components/layout/row';
import Column from '../components/layout/column';
import {Card} from '../components/cards/card';

const Changelog: NextPage = () => {
    const [build, setBuild] = useState("build");
    const [buildDate, setBuildDate] = useState("date");
    const [fixChanges, setFixChanges] = useState(new Array<Change>);
    const [newChanges, setNewChanges] = useState(new Array<Change>);
    const [improvChanges, setImprovChanges] = useState(new Array<Change>);
    const [balanceChanges, setBalanceChanges] = useState(new Array<Change>);

    useEffect(() => {
        fetch('https://changelog.unitystation.org/whats-new').then(
            (response) => response.json().then(
                (data: WhatsNewResponse) => {
                    setBuild(data.build);
                    setBuildDate(data.changes[0].date_added);
                    setFixChanges(data.changes.filter((change) => change.category === 'FIX'));
                    setNewChanges(data.changes.filter((change) => change.category === 'NEW'));
                    setImprovChanges(data.changes.filter((change) => change.category === 'IMPROVEMENT'));
                    setBalanceChanges(data.changes.filter((change) => change.category === 'BALANCE'));
                }
            )
        )
    }, []);


    return (
        <>
            <Section>
                <Container>
                    <div className={"p-5"}>
                        <Column>
                            <Row>
                                <h1 className={"text-5xl font-bold text-center"}>Latest changes</h1>
                            </Row>
                            <Row>
                                <div>
                                    <h2 className={"text-2xl font-bold text-left"}>Build: {build}</h2>
                                    <h2 className={"text-2xl font-bold text-left"}>Date: {buildDate}</h2>
                                </div>
                            </Row>
                        </Column>
                        <Column>
                            <Row>
                                <Card>
                                    {newChanges.length > 0 &&
                                    <ChangesGroup changes={newChanges} title={"New"} />
                                    }
                                    {fixChanges.length > 0 &&
                                    <ChangesGroup changes={fixChanges} title={"Fixes"} />
                                    }
                                    {improvChanges.length > 0 &&
                                    <ChangesGroup changes={improvChanges} title={"Improvements"} />
                                    }
                                    {balanceChanges.length > 0 &&
                                    <ChangesGroup changes={balanceChanges} title={"Balance"} />
                                    }
                                </Card>
                            </Row>
                        </Column>
                    </div>
                </Container>
            </Section>
        </>
    )
}

export default Changelog;
