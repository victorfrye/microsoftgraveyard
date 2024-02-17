'use client';

import { useEffect, useState } from "react";
import { Button, Card, CardFooter, CardHeader, Image, Link, Persona, Text } from "@fluentui/react-components";
import Headstone from "@microsoft-graveyard/components/graveyard/headstone";
import { Corpse, getExpectedDeathDate, getFullName, getLifeDates, getObituary, isDead } from "@microsoft-graveyard/models/corpse";
import { News16Regular } from "@fluentui/react-icons";
// import Corpse from "@microsoft-graveyard/models/corpse";

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

export default function Graveyard(): JSX.Element {
    let [corpses, setCorpses] = useState<Corpse[]>([]);
    const today: Date = new Date();

    useEffect(() => {
        fetchCorpses();
    }, []);

    const fetchCorpses = async () => {
        const response = await fetch('./data/corpses.json');
        const data: ICorpsesData = await response.json();

        // setCorpses(data.corpses);
        setCorpses(data.corpses.map((corpse: ICorpse) => { return new Corpse(corpse.name, corpse.qualifier, corpse.birthDate ? new Date(corpse.birthDate) : undefined, new Date(corpse.deathDate), corpse.description, corpse.link) }));
    }

    const renderGraves = (): JSX.Element[] => {
        return corpses.map((corpse, index) => {
            console.log("corpse: ", corpse);
            console.log("corpse.deathDate: ", corpse.deathDate);
            console.log("corpse.isDead(): ", isDead(corpse, today));

            return <li className='col-8 col-md-5 col-xl-3 d-flex my-3 mx-md-4 rounded text-light m-3' key={index}>
                <Card key={index}>
                    <CardHeader
                        image={
                            <Image
                                src={isDead(corpse, today) ? "/images/headstone.svg" : "/images/coffin.svg"}
                                alt="a headstone for that which is dead"
                                height={72}
                                width={72}
                            />
                        }
                        header={<Text as="h2" weight="bold" className="text-primary">{getFullName(corpse)}</Text>}
                        description={<Text as="p" >{isDead(corpse, today) ? getLifeDates(corpse) : getExpectedDeathDate(corpse)}</Text>}                    
                    />
                    <Text as="p">{getObituary(corpse, today)}</Text>
                    <CardFooter className="mt-auto">
                        <Button as="a" appearance="primary" icon={<News16Regular />} href={corpse.link} target="_blank" rel="noreferrer noopener" className="">
                            Read The News
                        </Button>
                    </CardFooter>
                </Card>

                {/* <Persona
                    avatar={{
                        icon: { as: Headstone() },
                        idForColor: corpse.name,
                        color: "colorful",
                        shape: "square",
                        size: 72
                    }}
                    primaryText={<Text as="h2" weight="bold" className="text-primary"><Link as="a" appearance="subtle" inline href={corpse.link} target="_blank" rel="noreferrer noopener">{getFullName(corpse)}</Link></Text>}
                    secondaryText={<Text as="p">{isDead(corpse, today) ? getLifeDates(corpse) : getExpectedDeathDate(corpse)}</Text>}
                    tertiaryText={<Text as="p">{getObituary(corpse, today)}</Text>}
                    presence={{ status: isDead(corpse, today) ? "offline" : "available" }}
                    size="huge"
                /> */}
            </li >
        }
        );
    }

    return (
        <section id="graveyard">
            <ul className="d-flex flex-wrap justify-content-center p-0">
                {renderGraves()}
            </ul>
        </section>
    )
}
