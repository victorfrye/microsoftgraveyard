'use client';

import { useEffect, useState } from "react";
import { Persona, Text } from "@fluentui/react-components";
import Headstone from "@microsoft-graveyard/components/graveyard/headstone";
// import Corpse from "@microsoft-graveyard/models/corpse";

interface ICorpseJson {
    corpses: Corpse[];
}

export default function Graveyard(): JSX.Element {
    let [corpses, setCorpses] = useState<Corpse[]>([]);
    const _today: Date = new Date();

    useEffect(() => {
        fetchCorpses();
    }, []);

    const fetchCorpses = async () => {
        const response = await fetch('./data/corpses.json');
        const data: ICorpseJson = await response.json();

        setCorpses(data.corpses);
    }

    const renderGraves = (): JSX.Element[] => {
        return corpses.map((corpse, index) =>
            <li className='col-8 col-md-5 col-xl-3 d-flex my-3 mx-md-4 rounded text-light m-3' key={index}>
                <Persona
                    avatar={{
                        icon: { as: Headstone() },
                        idForColor: corpse.name,
                        color: "colorful",
                        shape: "square",
                        size: 72
                    }}
                    primaryText={<Text as="h2" weight="bold" className="text-primary">{corpse.getFullName()}</Text>}
                    secondaryText={<Text as="p" block>{corpse.getObituary(_today)}</Text>}
                    tertiaryText={<Text as="p" block>{corpse.isDead(_today) ? corpse.getLifeDates() : corpse.getExpectedDeathDate()}</Text>}
                    presence={{ status: corpse.isDead(_today) ? "offline" : "available" }}
                    size="huge"
                />
            </li >
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
