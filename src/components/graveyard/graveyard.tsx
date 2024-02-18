'use client';

import { useEffect, useState } from "react";
import { Button, Card, CardFooter, CardHeader, Image, Text, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { News16Regular } from "@fluentui/react-icons";
import { Corpse, getExpectedDeathDate, getFullName, getLifeDates, getObituary, isDead } from "@microsoft-graveyard/models/corpse";

interface ICorpse {
    name: string;
    qualifier: string | undefined;
    birthDate: string | undefined;
    deathDate: string;
    description: string;
    link: string;
}

interface ICorpsesData {
    corpses: ICorpse[];
}

const useStyles = makeStyles({
    graveItem: {

    },
    graveItemHeader: {
        fontSize: tokens.lineHeightBase400,
        lineHeight: tokens.lineHeightBase500,
    },
    graveList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        ...shorthands.padding('0')
    },
    graveCard: {
        backgroundColor: tokens.colorNeutralBackground2,
    }
});

const Graveyard = (): JSX.Element => {
    let [corpses, setCorpses] = useState<Corpse[]>([]);
    const today: Date = new Date();
    const styles = useStyles();

    useEffect(() => {
        fetchCorpses();
    }, []);

    const fetchCorpses = async () => {
        const response = await fetch('./data/corpses.json');
        const data: ICorpsesData = await response.json();

        setCorpses(
            data.corpses?.map(
                (corpse: ICorpse) => {
                    return new Corpse(
                        corpse.name,
                        corpse.qualifier,
                        corpse.birthDate ? new Date(corpse.birthDate) : undefined,
                        new Date(corpse.deathDate),
                        corpse.description,
                        corpse.link
                    )
                }
            ).sort((a, b) => b.deathDate[Symbol.toPrimitive]('number') - a.deathDate[Symbol.toPrimitive]('number')));
    }

    const renderGraves = (): JSX.Element[] => {
        return corpses.map((corpse, index) =>
            <li className='col-8 col-md-5 col-xl-3 d-flex my-3 mx-md-4 rounded text-light m-3' key={index}>
                <Card key={index} className={styles.graveCard}>
                    <CardHeader
                        image={
                            <Image
                                src={isDead(corpse, today) ? "/images/headstone.svg" : "/images/coffin.svg"}
                                alt="a headstone for that which is dead"
                                height={72}
                                width={72}
                            />
                        }
                        header={<Text as="h2" weight="bold" block className={styles.graveItemHeader}>{getFullName(corpse)}</Text>}
                        description={
                            <Text as="p" >{isDead(corpse, today) ? getLifeDates(corpse) : getExpectedDeathDate(corpse)}</Text>
                        }
                    />
                    <Text as="p">{getObituary(corpse, today)}</Text>
                    <CardFooter className="mt-auto">
                        <Button as="a" appearance="primary" icon={<News16Regular />} href={corpse.link} target="_blank" rel="noreferrer noopener" className="">
                            Read the news
                        </Button>
                    </CardFooter>
                </Card>
            </li >
        );
    }

    return (
        <section id="graveyard">
            <ul className={styles.graveList}>
                {renderGraves()}
            </ul>
        </section>
    )
}

export default Graveyard;  
