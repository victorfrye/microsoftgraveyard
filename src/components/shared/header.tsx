'use client';

import { Image, Text } from "@fluentui/react-components";

export default function Header() {
    return (
        <header id="header" className="d-flex justify-content-center align-items-center p-3">
            <Image src="/images/headstone.svg" alt="a headstone icon of Microsoft Graveyard" height={72} width={72} />

            <div className="d-flex flex-column p-3 gap-1">
                <Text as="h1" weight="bold" className="text-primary">Microsoft Graveyard</Text>
                <Text as="em" className="text-secondary">In remembrance of those killed by Microsoft</Text>
            </div>
        </header>
    )
}
