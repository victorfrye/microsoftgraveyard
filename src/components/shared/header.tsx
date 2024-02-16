'use client';

import { Text } from "@fluentui/react-text";
import ProfileAvatar from "./avatar";

export default function Header() {
    return (
        <header id="header" className="d-flex align-items-center">
            <ProfileAvatar />

            <div className="d-flex flex-column p-3 gap-1">
                <Text as="h1" className="text-primary">Microsoft Graveyard</Text>
                <Text as="em" className="text-secondary">In remembrance of those killed by Microsoft</Text>
            </div>
        </header>
    )
}
